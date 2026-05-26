import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/analytics?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// Returns stats computed from PAID payments only
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate   = searchParams.get("endDate");

    // Build date filter
    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) dateFilter.gte = new Date(`${startDate}T00:00:00.000Z`);
    if (endDate)   dateFilter.lte = new Date(`${endDate}T23:59:59.999Z`);

    const whereClause = {
      status: "paid" as const,
      ...(Object.keys(dateFilter).length ? { created_at: dateFilter } : {}),
    };

    // ── Fetch all paid payments in range ──────────────────────────────────────
    const paidPayments = await prisma.payments.findMany({ where: whereClause });

    const totalRevenue = paidPayments.reduce((s, p) => s + Number(p.amount), 0);

    const orderPayments = paidPayments.filter(p => p.source_type === "order");
    const apptPayments  = paidPayments.filter(p => p.source_type === "appointment");

    const totalOrders       = orderPayments.length;
    const totalAppointments = apptPayments.length;

    // Revenue split
    const orderRevenue = orderPayments.reduce((s, p) => s + Number(p.amount), 0);
    const apptRevenue  = apptPayments.reduce((s, p) => s + Number(p.amount), 0);

    // ── Top 5 Services (from appointment payments) ────────────────────────────
    // Join with appointments → services to get service names
    const apptIds = apptPayments.map(p => p.source_id);
    let top5Services: { name: string; count: number; revenue: number }[] = [];

    if (apptIds.length > 0) {
      const appts = await prisma.appointments.findMany({
        where: { appointment_id: { in: apptIds } },
        include: { services: { select: { service_name: true, price: true } } },
      });

      // Group by service name
      const svcMap = new Map<string, { count: number; revenue: number }>();
      for (const appt of appts) {
        const name = appt.services?.service_name ?? "Không rõ";
        // Find payment amount for this appointment
        const pay = apptPayments.find(p => p.source_id === appt.appointment_id);
        const amount = pay ? Number(pay.amount) : Number(appt.services?.price ?? 0);
        const cur = svcMap.get(name) ?? { count: 0, revenue: 0 };
        svcMap.set(name, { count: cur.count + 1, revenue: cur.revenue + amount });
      }

      top5Services = [...svcMap.entries()]
        .map(([name, v]) => ({ name, ...v }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    }

    // ── Top 5 Products (from order payments) ──────────────────────────────────
    const orderIds = orderPayments.map(p => p.source_id);
    let top5Products: { name: string; count: number; revenue: number }[] = [];

    if (orderIds.length > 0) {
      const details = await prisma.order_details.findMany({
        where: { order_id: { in: orderIds } },
        include: { products: { select: { product_name: true } } },
      });

      const prodMap = new Map<string, { count: number; revenue: number }>();
      for (const d of details) {
        const name = d.products?.product_name ?? "Không rõ";
        const cur = prodMap.get(name) ?? { count: 0, revenue: 0 };
        prodMap.set(name, {
          count:   cur.count + (d.quantity ?? 1),
          revenue: cur.revenue + Number(d.price) * (d.quantity ?? 1),
        });
      }

      top5Products = [...prodMap.entries()]
        .map(([name, v]) => ({ name, ...v }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    }

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalAppointments,
      orderRevenue,
      apptRevenue,
      top5Services,
      top5Products,
    });
  } catch (err) {
    console.error("[GET /api/analytics]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

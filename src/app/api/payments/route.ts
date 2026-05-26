import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/payments – list all payments, optional ?status filter
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    const whereClause: any = {};
    if (status) whereClause.status = status;
    if (date) {
      whereClause.created_at = {
        gte: new Date(`${date}T00:00:00.000Z`),
        lte: new Date(`${date}T23:59:59.999Z`),
      };
    }

    const rows = await prisma.payments.findMany({
      where: whereClause,
      orderBy: { created_at: "desc" },
    });

    // Fetch staff info for appointment payments
    const appointmentIds = rows.filter(r => r.source_type === "appointment").map(r => r.source_id);
    const staffMap: Record<number, string> = {};
    
    if (appointmentIds.length > 0) {
      const schedules = await prisma.staff_schedules.findMany({
        where: { appointment_id: { in: appointmentIds } },
        include: { staff: true }
      });
      schedules.forEach(sch => {
        if (sch.staff?.full_name) {
          staffMap[sch.appointment_id] = sch.staff.full_name;
        }
      });
    }

    const results = rows.map(r => {
      return {
        ...r,
        assigned_staff: r.source_type === "appointment" ? (staffMap[r.source_id] || null) : null
      };
    });

    return NextResponse.json(results);
  } catch (err) {
    console.error("[GET /api/payments]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/payments – create a payment record
// Body: { source_type, source_id, amount, payment_method, receipt_image?, description? }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { source_type, source_id, amount, payment_method, receipt_image, description } = body;

    const payment = await prisma.payments.create({
      data: {
        source_type,
        source_id: Number(source_id),
        amount: Number(amount),
        payment_method: payment_method || "COD",
        receipt_image: receipt_image || null,
        description: description || null,
        status: "processing",
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (err) {
    console.error("[POST /api/payments]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

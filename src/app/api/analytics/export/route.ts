import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

// GET /api/analytics/export?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// Returns an Excel file with 3 sheets (Orders, Appointments, Product sales)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate   = searchParams.get("endDate");

    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) dateFilter.gte = new Date(`${startDate}T00:00:00.000Z`);
    if (endDate)   dateFilter.lte = new Date(`${endDate}T23:59:59.999Z`);

    const whereClause = {
      status: "paid" as const,
      ...(Object.keys(dateFilter).length ? { created_at: dateFilter } : {}),
    };

    const paidPayments = await prisma.payments.findMany({ where: whereClause, orderBy: { created_at: "desc" } });

    const orderIds = paidPayments.filter(p => p.source_type === "order").map(p => p.source_id);
    const apptIds  = paidPayments.filter(p => p.source_type === "appointment").map(p => p.source_id);

    // ── Fetch orders with details ──────────────────────────────────────────────
    const orders = orderIds.length > 0
      ? await prisma.orders.findMany({
          where: { order_id: { in: orderIds } },
          include: {
            customers:     { select: { full_name: true, phone: true, email: true } },
            order_details: { include: { products: { select: { product_name: true } } } },
          },
        })
      : [];

    // ── Fetch appointments ─────────────────────────────────────────────────────
    const appointments = apptIds.length > 0
      ? await prisma.appointments.findMany({
          where: { appointment_id: { in: apptIds } },
          include: {
            customers: { select: { full_name: true, phone: true, email: true } },
            services:  { select: { service_name: true } },
          },
        })
      : [];

    const fmt = (d: Date | null | undefined) => d ? new Date(d).toLocaleDateString("vi-VN") : "";

    // Sheet 1: Orders
    const orderData = [];
    orderData.push(["Mã đơn", "Khách hàng", "Số điện thoại", "Email", "Sản phẩm", "Tổng tiền", "Phương thức TT", "Ngày đặt"]);
    for (const o of orders) {
      const products = o.order_details.map(d => d.products?.product_name ?? "?").join(" | ");
      const pay = paidPayments.find(p => p.source_type === "order" && p.source_id === o.order_id);
      orderData.push([
        `ORD-${o.order_id}`,
        o.customers?.full_name ?? "",
        o.customers?.phone ?? "",
        o.customers?.email ?? "",
        products,
        Number(o.total_amount),
        pay?.payment_method ?? o.payment_method ?? "",
        fmt(o.created_at)
      ]);
    }

    // Sheet 2: Appointments
    const apptData = [];
    apptData.push(["Mã lịch hẹn", "Khách hàng", "Số điện thoại", "Email", "Tên thú cưng", "Dịch vụ", "Số tiền", "Phương thức TT", "Ngày hẹn"]);
    for (const a of appointments) {
      const pay = paidPayments.find(p => p.source_type === "appointment" && p.source_id === a.appointment_id);
      apptData.push([
        `APT-${a.appointment_id}`,
        a.customers?.full_name ?? "",
        a.customers?.phone ?? "",
        a.customers?.email ?? "",
        a.pet_name ?? "",
        a.services?.service_name ?? "",
        Number(pay?.amount ?? 0),
        pay?.payment_method ?? "",
        fmt(a.appointment_date)
      ]);
    }

    // Sheet 3: Product sales summary
    const allDetails = orders.flatMap(o => o.order_details);
    const prodMap = new Map<string, { count: number; revenue: number }>();
    for (const d of allDetails) {
      const name = d.products?.product_name ?? "Không rõ";
      const cur  = prodMap.get(name) ?? { count: 0, revenue: 0 };
      prodMap.set(name, { count: cur.count + (d.quantity ?? 1), revenue: cur.revenue + Number(d.price) * (d.quantity ?? 1) });
    }
    const prodRows = [...prodMap.entries()].sort((a, b) => b[1].count - a[1].count);
    
    const prodData = [];
    prodData.push(["Sản phẩm", "Số lượng bán", "Doanh thu"]);
    for (const [name, v] of prodRows) {
      prodData.push([name, v.count, v.revenue]);
    }

    // Build workbook
    const wb = XLSX.utils.book_new();
    
    const wsOrders = XLSX.utils.aoa_to_sheet(orderData);
    XLSX.utils.book_append_sheet(wb, wsOrders, "Danh sách đơn hàng");
    
    const wsAppts = XLSX.utils.aoa_to_sheet(apptData);
    XLSX.utils.book_append_sheet(wb, wsAppts, "Danh sách lịch hẹn");
    
    const wsProds = XLSX.utils.aoa_to_sheet(prodData);
    XLSX.utils.book_append_sheet(wb, wsProds, "Tổng hợp sản phẩm");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    const filename = `bao_cao_${startDate ?? "all"}_${endDate ?? "all"}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("[GET /api/analytics/export]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}


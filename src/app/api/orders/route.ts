import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders – list with optional filters + customer info
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();
    const customerId = searchParams.get("customer_id");

    const orders = await prisma.orders.findMany({
      where: {
        ...(status && { order_status: status }),
        ...(customerId && { customer_id: parseInt(customerId, 10) }),
      },
      select: {
        order_id: true,
        customer_id: true,
        total_amount: true,
        order_status: true,
        payment_method: true,
        created_at: true,
        customers: {
          select: { full_name: true, phone: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    // Flatten nested customer fields
    const rows = orders.map(({ customers, ...o }) => ({
      ...o,
      customer_name: customers?.full_name ?? null,
      customer_phone: customers?.phone ?? null,
    }));

    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/orders]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/orders
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id, total_amount, status, payment_method } = body;

    const order = await prisma.orders.create({
      data: {
        customer_id: customer_id ?? null,
        total_amount: total_amount ?? 0,
        order_status: status ?? "Pending",
        payment_method: payment_method ?? "COD",
      },
      select: { order_id: true },
    });

    return NextResponse.json(
      { order_id: order.order_id, message: "Tạo đơn hàng thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/orders]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

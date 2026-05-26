import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

// ─── GET /api/orders ──────────────────────────────────────────────────────────
// List orders with optional filters. Returns customer info + line items.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status     = searchParams.get("status")?.trim();
    const customerId = searchParams.get("customer_id");
    const date       = searchParams.get("date")?.trim();

    const orders = await prisma.orders.findMany({
      where: {
        ...(status     && { order_status: status }),
        ...(customerId && { customer_id: parseInt(customerId, 10) }),
        ...(date && {
          created_at: {
            gte: new Date(`${date}T00:00:00`),
            lte: new Date(`${date}T23:59:59`),
          },
        }),
      },
      select: {
        order_id:       true,
        customer_id:    true,
        total_amount:   true,
        order_status:   true,
        payment_method: true,
        receipt_image:  true,
        created_at:     true,
        customers: { select: { full_name: true, phone: true } },
        order_details: {
          select: {
            quantity: true,
            price:    true,
            products: { select: { product_name: true } },
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const rows = orders.map(({ customers, order_details, ...o }) => ({
      ...o,
      customer_name:  customers?.full_name ?? null,
      customer_phone: customers?.phone     ?? null,
      items: (order_details ?? []).map(d => ({
        product_name: d.products?.product_name ?? "Sản phẩm",
        quantity:     d.quantity ?? 1,
        price:        Number(d.price),
      })),
    }));

    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/orders]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// ─── POST /api/orders ─────────────────────────────────────────────────────────
// Create order + line items + decrement stock — all in one transaction.
// Body: { customer_id?, total_amount, payment_method?, status?, items[] }
// items[]: { id: number; qty: number; price: number }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_id,
      total_amount,
      payment_method = "COD",
      receipt_image  = null,
      status         = "Pending",
      items          = [],
    } = body as {
      customer_id?:    string | number | null;
      total_amount:    number;
      payment_method?: string;
      receipt_image?:  string | null;
      status?:         string;
      items?:          { id: number; qty: number; price: number }[];
    };

    // Session stores customer_id as string — always parse to int
    const custId = customer_id != null && !isNaN(Number(customer_id))
      ? Number(customer_id)
      : null;

    if (!custId) {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập để thực hiện đặt hàng." },
        { status: 401 }
      );
    }

    // Validate items have valid product IDs
    const validItems = items.filter(i => i.id > 0 && i.qty > 0);

    // Run everything in a single transaction for data consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const order = await tx.orders.create({
        data: {
          customer_id:    custId,
          total_amount:   Number(total_amount) || 0,
          order_status:   status,
          payment_method: payment_method,
          receipt_image:  receipt_image,
        },
        select: { order_id: true },
      });

      // 2. Create order_details line items
      if (validItems.length > 0) {
        await tx.order_details.createMany({
          data: validItems.map(i => ({
            order_id:   order.order_id,
            product_id: i.id,
            quantity:   i.qty,
            price:      i.price,
          })),
        });

        // 3. Decrement stock for each product (floor at 0)
        for (const item of validItems) {
          await tx.products.updateMany({
            where: {
              product_id: item.id,
              stock:      { gt: 0 }, // only decrement if stock > 0
            },
            data: {
              stock: { decrement: item.qty },
            },
          });
        }
      }

      return order;
    });

    // Notify admin about new order
    await createNotification({
      type:      "order",
      title:     `Đơn hàng mới #ORD-${result.order_id}`,
      message:   `Đơn hàng mới vừa được đặt với tổng giá trị ${new Intl.NumberFormat("vi-VN").format(Number(total_amount))}đ, đang chờ xử lý.`,
      source_id: result.order_id,
    });

    return NextResponse.json(
      { order_id: result.order_id, message: "Đặt hàng thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/orders]", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ", detail: String(err) },
      { status: 500 }
    );
  }
}

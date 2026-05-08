import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface OrderRow extends RowDataPacket {
  order_id: number;
  customer_id: number;
  total_amount: number;
  order_status: string;
  payment_method: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
}

// GET /api/orders
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const customerId = searchParams.get("customer_id");

    let sql = `
      SELECT
        o.order_id,
        o.customer_id,
        o.total_amount,
        o.order_status,
        o.payment_method,
        o.created_at,
        c.full_name AS customer_name,
        c.phone    AS customer_phone
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.customer_id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (status) {
      sql += " AND o.order_status = ?";
      params.push(status);
    }
    if (customerId) {
      sql += " AND o.customer_id = ?";
      params.push(customerId);
    }

    sql += " ORDER BY o.created_at DESC";

    const rows = await query<OrderRow[]>(sql, params);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/orders] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/orders
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id, total_amount, status, payment_method } = body;

    const result = await query<ResultSetHeader>(
      `INSERT INTO orders (customer_id, total_amount, order_status, payment_method)
       VALUES (?, ?, ?, ?)`,
      [
        customer_id ?? null,
        total_amount ?? 0,
        status ?? "Pending",
        payment_method ?? "COD",
      ]
    );

    return NextResponse.json(
      { order_id: result.insertId, message: "Tạo đơn hàng thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/orders] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

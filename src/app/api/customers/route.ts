import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface CustomerRow extends RowDataPacket {
  customer_id: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  created_at: string;
}

// GET /api/customers
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let sql = `
      SELECT customer_id, full_name, phone, email, address, created_at
      FROM customers
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (search) {
      sql += " AND (full_name LIKE ? OR phone LIKE ? OR email LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += " ORDER BY created_at DESC";

    const rows = await query<CustomerRow[]>(sql, params);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/customers] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/customers – register new customer
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone, email, address } = body;

    if (!full_name || !phone) {
      return NextResponse.json(
        { error: "Họ tên và số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    const result = await query<ResultSetHeader>(
      `INSERT INTO customers (full_name, phone, email, address)
       VALUES (?, ?, ?, ?)`,
      [full_name, phone, email ?? null, address ?? null]
    );

    return NextResponse.json(
      { customer_id: result.insertId, message: "Tạo khách hàng thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/customers] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface ProductRow extends RowDataPacket {
  product_id: number;
  product_name: string;
  category_id: number;
  category_name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  created_at: string;
}

// GET /api/products – list products (with optional filters)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") ?? "100");
    const offset = parseInt(searchParams.get("offset") ?? "0");

    let sql = `
      SELECT
        p.product_id,
        p.product_name,
        p.category_id,
        c.category_name,
        p.price,
        p.stock,
        p.description,
        p.image,
        p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (category) {
      sql += " AND c.category_name LIKE ?";
      params.push(`%${category}%`);
    }
    if (search) {
      sql += " AND p.product_name LIKE ?";
      params.push(`%${search}%`);
    }

    sql += " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const rows = await query<ProductRow[]>(sql, params);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/products] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/products – create product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_name, category_id, price, stock, description, image } = body;

    if (!product_name || price === undefined) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const result = await query<ResultSetHeader>(
      `INSERT INTO products (product_name, category_id, price, stock, description, image)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [product_name, category_id ?? null, price, stock ?? 0, description ?? "", image ?? ""]
    );

    return NextResponse.json(
      { product_id: result.insertId, message: "Tạo sản phẩm thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/products] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

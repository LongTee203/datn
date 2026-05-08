import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

interface CategoryRow extends RowDataPacket {
  category_id: number;
  category_name: string;
  description: string;
}

// GET /api/categories
export async function GET() {
  try {
    const rows = await query<CategoryRow[]>(
      "SELECT category_id, category_name, description FROM categories ORDER BY category_name ASC"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/categories] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

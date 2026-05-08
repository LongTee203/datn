import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface ServiceRow extends RowDataPacket {
  service_id: number;
  service_name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

// GET /api/services
export async function GET() {
  try {
    // Try with all expected columns; if 'duration' or 'image' don't exist, fall back
    const sql = `
      SELECT service_id, service_name, description, price,
             IFNULL(duration, 60) AS duration,
             IFNULL(image, '') AS image
      FROM services
      ORDER BY price ASC
    `;

    const rows = await query<ServiceRow[]>(sql);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/services] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/services
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { service_name, description, price, duration, image } = body;

    if (!service_name || price === undefined) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const result = await query<ResultSetHeader>(
      `INSERT INTO services (service_name, description, price, duration, image)
       VALUES (?, ?, ?, ?, ?)`,
      [service_name, description ?? "", price, duration ?? 60, image ?? ""]
    );

    return NextResponse.json(
      { service_id: result.insertId, message: "Tạo dịch vụ thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/services] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface AppointmentRow extends RowDataPacket {
  appointment_id: number;
  customer_id: number;
  service_id: number;
  pet_name: string;
  appointment_date: string;
  status: string;
  created_at: string;
  // JOINed fields
  customer_name: string;
  customer_phone: string;
  service_name: string;
}

// GET /api/appointments – list all with customer & service info
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    let sql = `
      SELECT
        a.appointment_id,
        a.customer_id,
        a.service_id,
        a.pet_name,
        a.appointment_date,
        a.status,
        a.created_at,
        c.full_name AS customer_name,
        c.phone    AS customer_phone,
        s.service_name
      FROM appointments a
      LEFT JOIN customers c ON a.customer_id = c.customer_id
      LEFT JOIN services  s ON a.service_id  = s.service_id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (status && status !== "all") {
      sql += " AND a.status = ?";
      params.push(status);
    }
    if (date) {
      sql += " AND DATE(a.appointment_date) = ?";
      params.push(date);
    }

    sql += " ORDER BY a.appointment_date DESC";

    const rows = await query<AppointmentRow[]>(sql, params);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/appointments] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/appointments – create new appointment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id, service_id, pet_name, appointment_date, status } = body;

    if (!pet_name || !appointment_date) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const result = await query<ResultSetHeader>(
      `INSERT INTO appointments (customer_id, service_id, pet_name, appointment_date, status)
       VALUES (?, ?, ?, ?, ?)`,
      [customer_id ?? null, service_id ?? null, pet_name, appointment_date, status ?? "Pending"]
    );

    return NextResponse.json(
      { appointment_id: result.insertId, message: "Tạo lịch hẹn thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/appointments] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

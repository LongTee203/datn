import { NextResponse } from "next/server";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

interface TableRow extends RowDataPacket {
  TABLE_NAME: string;
  TABLE_ROWS: number;
}

// GET /api/db-test – kiểm tra kết nối và liệt kê các bảng
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    // Lấy danh sách bảng trong database
    const [tables] = await connection.query<TableRow[]>(
      `SELECT TABLE_NAME, TABLE_ROWS
       FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE()
       ORDER BY TABLE_NAME`
    );

    // Kiểm tra kết nối
    const [pingResult] = await connection.query<RowDataPacket[]>("SELECT 1 AS ping");
    
    connection.release();

    return NextResponse.json({
      status: "✅ Kết nối database thành công!",
      database: process.env.DB_NAME ?? "pet_care_shop",
      host: process.env.DB_HOST ?? "localhost",
      tables: tables.map((t) => ({
        name: t.TABLE_NAME,
        rows: t.TABLE_ROWS,
      })),
      ping: pingResult[0],
    });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      {
        status: "❌ Kết nối thất bại",
        error: error.message,
        suggestion: "Kiểm tra lại thông tin trong file .env.local và đảm bảo MySQL/XAMPP đang chạy",
      },
      { status: 500 }
    );
  }
}

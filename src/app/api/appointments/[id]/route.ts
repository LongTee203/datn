import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

// PATCH /api/appointments/[id] – update status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Thiếu trường status" },
        { status: 400 }
      );
    }

    const result = await query<ResultSetHeader>(
      "UPDATE appointments SET status = ? WHERE appointment_id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy lịch hẹn" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    console.error("[PATCH /api/appointments/[id]] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/appointments/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await query<ResultSetHeader>(
      "DELETE FROM appointments WHERE appointment_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy lịch hẹn" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Xóa lịch hẹn thành công" });
  } catch (err) {
    console.error("[DELETE /api/appointments/[id]] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

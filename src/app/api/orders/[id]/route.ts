import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

// PATCH /api/orders/[id] – update status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Thiếu trường status" }, { status: 400 });
    }

    const result = await query<ResultSetHeader>(
      "UPDATE orders SET order_status = ? WHERE order_id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
    }

    return NextResponse.json({ message: "Cập nhật đơn hàng thành công" });
  } catch (err) {
    console.error("[PATCH /api/orders/[id]] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

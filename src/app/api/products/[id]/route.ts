import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { ResultSetHeader } from "mysql2";

// PATCH /api/products/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const fields: string[] = [];
    const values: unknown[] = [];

    if (body.product_name !== undefined) { fields.push("product_name = ?"); values.push(body.product_name); }
    if (body.price !== undefined) { fields.push("price = ?"); values.push(body.price); }
    if (body.stock !== undefined) { fields.push("stock = ?"); values.push(body.stock); }
    if (body.description !== undefined) { fields.push("description = ?"); values.push(body.description); }
    if (body.image !== undefined) { fields.push("image = ?"); values.push(body.image); }
    if (body.category_id !== undefined) { fields.push("category_id = ?"); values.push(body.category_id); }

    if (fields.length === 0) {
      return NextResponse.json({ error: "Không có trường nào để cập nhật" }, { status: 400 });
    }

    values.push(id);
    const result = await query<ResultSetHeader>(
      `UPDATE products SET ${fields.join(", ")} WHERE product_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    return NextResponse.json({ message: "Cập nhật sản phẩm thành công" });
  } catch (err) {
    console.error("[PATCH /api/products/[id]] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await query<ResultSetHeader>(
      "DELETE FROM products WHERE product_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    return NextResponse.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    console.error("[DELETE /api/products/[id]] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

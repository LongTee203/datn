import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/customers/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // We expect { is_active: boolean }
    if (typeof body.is_active !== "boolean") {
      return NextResponse.json({ error: "Trạng thái không hợp lệ" }, { status: 400 });
    }

    const updated = await prisma.customers.update({
      where: { customer_id: parseInt(id, 10) },
      data: { is_active: body.is_active }
    });

    return NextResponse.json({ 
      message: updated.is_active ? "Đã bật kích hoạt tài khoản" : "Đã tắt kích hoạt tài khoản" 
    });
  } catch (err) {
    console.error("[PATCH /api/customers/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/customers/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.customers.delete({
      where: { customer_id: parseInt(id, 10) }
    });

    return NextResponse.json({ message: "Đã xóa tài khoản thành công" });
  } catch (err) {
    console.error("[DELETE /api/customers/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

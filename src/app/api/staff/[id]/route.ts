import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/staff/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }  = await params;
    const staffId = parseInt(id, 10);
    const body    = await req.json();

    const data: Record<string, unknown> = {};
    if (typeof body.full_name  === "string")  data.full_name  = body.full_name;
    if (typeof body.phone      === "string")  data.phone      = body.phone;
    if (typeof body.email      === "string")  data.email      = body.email;
    if (typeof body.position   === "string")  data.position   = body.position;
    if (typeof body.is_active  === "boolean") data.is_active  = body.is_active;
    if (typeof body.avatar     === "string")  data.avatar     = body.avatar;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Không có dữ liệu hợp lệ" }, { status: 400 });
    }

    const updated = await prisma.staff.update({
      where: { staff_id: staffId },
      data,
    });

    return NextResponse.json({ message: "Cập nhật thành công", staff: updated });
  } catch (err) {
    console.error("[PATCH /api/staff/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/staff/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }  = await params;
    const staffId = parseInt(id, 10);
    await prisma.staff.delete({ where: { staff_id: staffId } });
    return NextResponse.json({ message: "Đã xóa nhân viên" });
  } catch (err) {
    console.error("[DELETE /api/staff/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

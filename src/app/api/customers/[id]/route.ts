import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/customers/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customer = await prisma.customers.findUnique({
      where: { customer_id: parseInt(id, 10) },
      include: { pets: true }
    });
    
    if (!customer) {
      return NextResponse.json({ error: "Không tìm thấy khách hàng" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeCustomer } = customer;
    return NextResponse.json(safeCustomer);
  } catch (err) {
    console.error("[GET /api/customers/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// PATCH /api/customers/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const updateData: Record<string, unknown> = {};
    if (typeof body.is_active === "boolean") updateData.is_active = body.is_active;
    if (typeof body.full_name === "string")  updateData.full_name = body.full_name;
    if (typeof body.phone === "string")      updateData.phone     = body.phone;
    if (typeof body.email === "string")      updateData.email     = body.email;
    if (typeof body.address === "string")    updateData.address   = body.address;
    if (typeof body.avatar === "string")     updateData.avatar    = body.avatar;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Không có dữ liệu hợp lệ" }, { status: 400 });
    }

    const updated = await prisma.customers.update({
      where: { customer_id: parseInt(id, 10) },
      data: updateData
    });

    return NextResponse.json({ 
      message: "Đã cập nhật thông tin thành công",
      customer: updated
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

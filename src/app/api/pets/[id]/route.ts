import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/pets/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, type, breed, age, weight, note } = body;

    const updated = await prisma.pets.update({
      where: { pet_id: parseInt(id, 10) },
      data: {
        ...(name !== undefined && { name }),
        ...(type !== undefined && { type }),
        ...(breed !== undefined && { breed: breed || null }),
        ...(age !== undefined && { age: age ? parseInt(age) : null }),
        ...(weight !== undefined && { weight: weight ? parseFloat(weight) : null }),
        ...(note !== undefined && { note: note || null }),
      },
    });

    return NextResponse.json({ message: "Cập nhật thành công", pet: updated });
  } catch (err) {
    console.error("[PATCH /api/pets/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/pets/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.pets.delete({ where: { pet_id: parseInt(id, 10) } });
    return NextResponse.json({ message: "Đã xóa thú cưng thành công" });
  } catch (err) {
    console.error("[DELETE /api/pets/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

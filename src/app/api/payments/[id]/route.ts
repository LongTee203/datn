import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/payments/[id] – update status (paid | cancelled | processing)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!["processing", "paid", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await prisma.payments.update({
      where: { payment_id: parseInt(id, 10) },
      data: { status: status as "processing" | "paid" | "cancelled" },
    });

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (err) {
    console.error("[PATCH /api/payments/:id]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

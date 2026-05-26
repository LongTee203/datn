import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id, name, type, breed, weight, age, note } = body;

    if (!customer_id || !name || !type) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const pet = await prisma.pets.create({
      data: {
        customer_id: parseInt(customer_id, 10),
        name,
        type,
        breed,
        weight: weight ? parseFloat(weight) : null,
        age: age ? parseInt(age, 10) : null,
        note,
      }
    });

    return NextResponse.json({ message: "Thêm thú cưng thành công", pet }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/pets]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

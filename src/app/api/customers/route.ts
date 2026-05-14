import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/customers
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();

    const customers = await prisma.customers.findMany({
      where: search
        ? {
            OR: [
              { full_name: { contains: search } },
              { phone: { contains: search } },
              { email: { contains: search } },
            ],
          }
        : undefined,
      select: {
        customer_id: true,
        full_name: true,
        phone: true,
        email: true,
        address: true,
        is_active: true,
        created_at: true,
        pets: true, // include pets array
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(customers);
  } catch (err) {
    console.error("[GET /api/customers]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/customers
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone, email, address, password, pets } = body;

    if (!full_name || !phone) {
      return NextResponse.json(
        { error: "Họ tên và số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : "";

    const customer = await prisma.customers.create({
      data: {
        full_name,
        phone,
        email: email ?? null,
        address: address ?? null,
        password: hashedPassword,
        pets: pets && pets.length > 0 ? {
          create: pets.map((p: any) => ({
            name: p.name,
            type: p.type,
            breed: p.breed ?? null,
            gender: p.gender ?? null,
            age: p.age ? parseInt(p.age) : null,
            weight: p.weight ? parseFloat(p.weight) : null,
          }))
        } : undefined
      },
      select: { customer_id: true },
    });

    return NextResponse.json(
      { customer_id: customer.customer_id, message: "Tạo khách hàng thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/customers]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

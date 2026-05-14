import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products – list with optional filters + pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category")?.trim();
    const search = searchParams.get("search")?.trim();
    const limit = parseInt(searchParams.get("limit") ?? "100", 10);
    const offset = parseInt(searchParams.get("offset") ?? "0", 10);

    const products = await prisma.products.findMany({
      where: {
        ...(search && { product_name: { contains: search } }),
        ...(category && {
          categories: { category_name: { contains: category } },
        }),
      },
      select: {
        product_id: true,
        product_name: true,
        category_id: true,
        price: true,
        stock: true,
        description: true,
        image: true,
        created_at: true,
        categories: {
          select: { category_name: true },
        },
      },
      orderBy: { created_at: "desc" },
      take: limit,
      skip: offset,
    });

    // Flatten category_name into each product row
    const rows = products.map(({ categories, ...p }) => ({
      ...p,
      category_name: categories?.category_name ?? null,
    }));

    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/products – create product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_name, category_id, price, stock, description, image } = body;

    if (!product_name || price === undefined) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const product = await prisma.products.create({
      data: {
        product_name,
        category_id: category_id ?? null,
        price,
        stock: stock ?? 0,
        description: description ?? null,
        image: image ?? null,
      },
      select: { product_id: true },
    });

    return NextResponse.json(
      { product_id: product.product_id, message: "Tạo sản phẩm thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/products]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

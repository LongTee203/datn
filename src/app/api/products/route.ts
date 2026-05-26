import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

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
        details: true,
        specifications: true,
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
    const formData = await req.formData();
    const product_name = formData.get("product_name") as string;
    const category_name = formData.get("category_name") as string;
    const priceStr = formData.get("price") as string;
    const stockStr = formData.get("stock") as string;
    const description = formData.get("description") as string;
    const details = formData.get("details") as string;
    const specifications = formData.get("specifications") as string;
    
    // Multiple files under 'images'
    const files = formData.getAll("images") as File[];

    if (!product_name || !priceStr) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const price = parseFloat(priceStr);
    const stock = stockStr ? parseInt(stockStr, 10) : 0;

    if (isNaN(price)) {
      return NextResponse.json({ error: "Giá không hợp lệ" }, { status: 400 });
    }

    // Process category
    let category_id = null;
    if (category_name) {
      let cat = await prisma.categories.findFirst({
        where: { category_name }
      });
      if (!cat) {
        cat = await prisma.categories.create({
          data: { category_name }
        });
      }
      category_id = cat.category_id;
    }

    // Process images
    const imageUrls: string[] = [];
    if (files && files.length > 0) {
      const uploadDir = path.join(process.cwd(), "public", "products");
      await fs.mkdir(uploadDir, { recursive: true });

      for (const file of files) {
        if (file.size > 0 && file.name) {
          try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, buffer);
            imageUrls.push(`/products/${fileName}`);
          } catch (uploadError) {
            console.error("File upload error:", uploadError);
          }
        }
      }
    }

    const imageJson = imageUrls.length > 0 ? JSON.stringify(imageUrls) : null;

    const product = await prisma.products.create({
      data: {
        product_name,
        category_id,
        price,
        stock,
        description: description ?? null,
        details: details ?? null,
        specifications: specifications ?? null,
        image: imageJson,
      },
      select: { product_id: true },
    });

    return NextResponse.json(
      { product_id: product.product_id, message: "Tạo sản phẩm thành công" },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[POST /api/products] ERR:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Lỗi máy chủ: ${msg}` }, { status: 500 });
  }
}

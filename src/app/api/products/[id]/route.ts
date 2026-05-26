import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import fs from "fs/promises";
import path from "path";
import { createNotification } from "@/lib/notifications";

type ProductUpdateData = Prisma.productsUpdateInput;

// GET /api/products/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    
    const product = await prisma.products.findUnique({
      where: { product_id: productId },
      include: {
        categories: { select: { category_name: true } }
      }
    });

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    const { categories, ...p } = product;
    return NextResponse.json({
      ...p,
      category_name: categories?.category_name ?? null
    });
  } catch (err: unknown) {
    console.error("[GET /api/products/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// PATCH /api/products/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    
    const formData = await req.formData().catch(() => null);
    const data: ProductUpdateData = {};

    if (formData) {
      const product_name = formData.get("product_name") as string;
      const category_name = formData.get("category_name") as string;
      const priceStr = formData.get("price") as string;
      const stockStr = formData.get("stock") as string;
      const description = formData.get("description") as string;
      const details = formData.get("details") as string;
      const specifications = formData.get("specifications") as string;
      const files = formData.getAll("images") as File[];

      if (product_name !== null) data.product_name = product_name;
      if (priceStr !== null) data.price = parseFloat(priceStr);
      if (stockStr !== null) data.stock = parseInt(stockStr, 10);
      if (description !== null) data.description = description;
      if (details !== null) data.details = details;
      if (specifications !== null) data.specifications = specifications;

      if (category_name) {
        let cat = await prisma.categories.findFirst({ where: { category_name } });
        if (!cat) cat = await prisma.categories.create({ data: { category_name } });
        data.categories = { connect: { category_id: cat.category_id } };
      }

      const imageUrls: string[] = [];
      if (files && files.length > 0) {
        const uploadDir = path.join(process.cwd(), "public", "products");
        await fs.mkdir(uploadDir, { recursive: true });

        let hasValidFile = false;
        for (const file of files) {
          if (file.size > 0 && file.name) {
            hasValidFile = true;
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
        if (hasValidFile) {
          data.image = JSON.stringify(imageUrls);
        }
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Không có trường nào để cập nhật" },
        { status: 400 }
      );
    }

    const updated = await prisma.products.update({
      where: { product_id: productId },
      data,
      select: { product_id: true, product_name: true, stock: true },
    });

    // Send low-stock notification if stock dropped to threshold (≤5)
    const LOW_STOCK_THRESHOLD = 5;
    if (
      updated.stock !== null &&
      updated.stock <= LOW_STOCK_THRESHOLD &&
      updated.stock >= 0
    ) {
      await createNotification({
        type:      "stock",
        title:     `Cảnh báo kho: "${updated.product_name}"`,
        message:   `Sản phẩm "${updated.product_name}" hiện chỉ còn ${updated.stock} đơn vị trong kho. Cần nhập thêm hàng.`,
        source_id: updated.product_id,
      });
    }

    return NextResponse.json({ message: "Cập nhật sản phẩm thành công" });
  } catch (err: unknown) {
    console.error("[PATCH /api/products/[id]]", err);
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
    const productId = parseInt(id, 10);

    await prisma.products.delete({ where: { product_id: productId } });

    return NextResponse.json({ message: "Xóa sản phẩm thành công" });
  } catch (err: unknown) {
    console.error("[DELETE /api/products/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

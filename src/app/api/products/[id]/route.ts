import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

type ProductUpdateData = Prisma.productsUpdateInput;

// PATCH /api/products/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    const body = await req.json();

    // Build update payload from only the fields present in the request body
    const data: ProductUpdateData = {};
    if (body.product_name !== undefined) data.product_name = body.product_name;
    if (body.price !== undefined) data.price = body.price;
    if (body.stock !== undefined) data.stock = body.stock;
    if (body.description !== undefined) data.description = body.description;
    if (body.image !== undefined) data.image = body.image;
    if (body.category_id !== undefined) {
      data.categories = body.category_id
        ? { connect: { category_id: body.category_id } }
        : { disconnect: true };
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Không có trường nào để cập nhật" },
        { status: 400 }
      );
    }

    await prisma.products.update({
      where: { product_id: productId },
      data,
    });

    return NextResponse.json({ message: "Cập nhật sản phẩm thành công" });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }
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
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }
    console.error("[DELETE /api/products/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

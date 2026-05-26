import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// PATCH /api/articles/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id, 10);
    
    const contentType = req.headers.get("content-type") || "";
    const data: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const content = formData.get("content") as string;
        const status = formData.get("status") as string;
        const file = formData.get("image") as File | null;

        if (title !== null) data.title = title;
        if (category !== null) data.category = category;
        if (description !== null) data.description = description;
        if (content !== null) data.content = content;
        if (status !== null) data.status = status;

        if (file && file.size > 0 && file.name) {
          const uploadDir = path.join(process.cwd(), "public", "articles");
          await fs.mkdir(uploadDir, { recursive: true });

          try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, buffer);
            data.image = `/articles/${fileName}`;
          } catch (uploadError) {
            console.error("File upload error:", uploadError);
          }
        } else {
          const imageUrlStr = formData.get("imageUrl") as string;
          if (imageUrlStr !== null) data.image = imageUrlStr;
        }
      }
    } else if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      if (body.status !== undefined) data.status = body.status;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Không có dữ liệu để cập nhật" }, { status: 400 });
    }

    const updated = await prisma.articles.update({
      where: { article_id: articleId },
      data,
    });

    return NextResponse.json({ message: "Cập nhật thành công", article: updated });
  } catch (err: unknown) {
    console.error("[PATCH /api/articles/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/articles/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id, 10);

    await prisma.articles.delete({ where: { article_id: articleId } });

    return NextResponse.json({ message: "Xóa bài viết thành công" });
  } catch (err: unknown) {
    console.error("[DELETE /api/articles/[id]]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

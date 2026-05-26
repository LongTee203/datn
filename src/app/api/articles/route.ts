import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// GET /api/articles
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim();
    
    const articles = await prisma.articles.findMany({
      where: {
        ...(status && status !== "all" && { status }),
      },
      orderBy: { created_at: "desc" }
    });

    return NextResponse.json(articles);
  } catch (err) {
    console.error("[GET /api/articles]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/articles
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string || "published";
    const file = formData.get("image") as File | null;

    if (!title || !category || !content) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    if (file && file.size > 0 && file.name) {
      const uploadDir = path.join(process.cwd(), "public", "articles");
      await fs.mkdir(uploadDir, { recursive: true });

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        imageUrl = `/articles/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
      }
    } else {
      // Allow passing a string URL directly if no file is uploaded
      const imageUrlStr = formData.get("imageUrl") as string;
      if (imageUrlStr) imageUrl = imageUrlStr;
    }

    const article = await prisma.articles.create({
      data: {
        title,
        category,
        description,
        content,
        status,
        image: imageUrl,
      },
    });

    return NextResponse.json({ article_id: article.article_id, message: "Tạo bài viết thành công" }, { status: 201 });
  } catch (err: unknown) {
    console.error("[POST /api/articles] ERR:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Lỗi máy chủ: ${msg}` }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// POST /api/customers/[id]/avatar — upload avatar image
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id, 10);

    const formData = await req.formData();
    const file = formData.get("avatar") as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "Không tìm thấy file" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Chỉ chấp nhận file ảnh (JPG, PNG, WEBP, GIF)" }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Kích thước ảnh tối đa 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/avatars/
    const uploadDir = path.join(process.cwd(), "public", "avatars");
    await fs.mkdir(uploadDir, { recursive: true });

    const ext      = file.name.split(".").pop() ?? "jpg";
    const fileName = `customer-${customerId}-${Date.now()}.${ext}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    const avatarUrl = `/avatars/${fileName}`;

    // Save path to DB
    await prisma.customers.update({
      where: { customer_id: customerId },
      data: { avatar: avatarUrl },
    });

    return NextResponse.json({ avatar: avatarUrl, message: "Cập nhật ảnh đại diện thành công" });
  } catch (err) {
    console.error("[POST /api/customers/[id]/avatar]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

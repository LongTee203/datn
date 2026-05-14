import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// GET /api/services
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("activeOnly") === "true";

    const services = await prisma.services.findMany({
      where: activeOnly ? { is_active: true } : undefined,
      select: {
        service_id: true,
        service_name: true,
        description: true,
        category: true,
        price: true,
        image: true,
        duration: true,
        is_active: true,
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(services);
  } catch (err) {
    console.error("[GET /api/services]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/services
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const service_name = formData.get("service_name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const priceStr = formData.get("price") as string;
    const durationStr = formData.get("duration") as string;
    const file = formData.get("image") as File | null;

    if (!service_name || !priceStr) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const price = parseFloat(priceStr);
    const duration = durationStr ? parseInt(durationStr, 10) : 30;

    if (isNaN(price)) {
      return NextResponse.json({ error: "Giá không hợp lệ" }, { status: 400 });
    }

    let imagePath = null;
    if (file && file.size > 0 && file.name) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "services");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const filePath = path.join(uploadDir, fileName);

        await fs.writeFile(filePath, buffer);
        imagePath = `/services/${fileName}`;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return NextResponse.json({ error: "Lỗi khi tải ảnh lên" }, { status: 500 });
      }
    }

    const service = await prisma.services.create({
      data: {
        service_name,
        description: description ?? null,
        category: category ?? "Vệ sinh & Spa",
        price,
        duration,
        image: imagePath,
        is_active: true,
      },
      select: { service_id: true },
    });

    return NextResponse.json(
      { service_id: service.service_id, message: "Tạo dịch vụ thành công" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[POST /api/services] ERR:", err);
    return NextResponse.json({ error: `Lỗi máy chủ: ${err.message || String(err)}` }, { status: 500 });
  }
}

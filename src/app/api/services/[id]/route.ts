import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// PATCH /api/services/[id]
export async function PATCH(
  req: Request,
  { params }: { params: any }
) {
  try {
    const resolvedParams = await params;
    const serviceId = parseInt(resolvedParams.id, 10);
    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const service_name = formData.get("service_name") as string | null;
      const description = formData.get("description") as string | null;
      const category = formData.get("category") as string | null;
      const priceStr = formData.get("price") as string | null;
      const durationStr = formData.get("duration") as string | null;
      const file = formData.get("image") as File | null;

      const updateData: any = {};
      if (service_name) updateData.service_name = service_name;
      if (description !== null) updateData.description = description;
      if (category !== null) updateData.category = category;
      if (priceStr) {
        const price = parseFloat(priceStr);
        if (!isNaN(price)) updateData.price = price;
      }
      if (durationStr) {
        const duration = parseInt(durationStr, 10);
        if (!isNaN(duration)) updateData.duration = duration;
      }

      if (file && file.size > 0 && file.name) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "services");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const filePath = path.join(uploadDir, fileName);

        await fs.writeFile(filePath, buffer);
        updateData.image = `/services/${fileName}`;
      }

      const service = await prisma.services.update({
        where: { service_id: serviceId },
        data: updateData,
      });

      return NextResponse.json(service);
    } else {
      // JSON body (for toggling is_active)
      const body = await req.json();
      const service = await prisma.services.update({
        where: { service_id: serviceId },
        data: body,
      });

      return NextResponse.json(service);
    }
  } catch (err: any) {
    console.error("[PATCH /api/services/[id]]", err.message);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  req: Request,
  { params }: { params: any }
) {
  try {
    const resolvedParams = await params;
    const serviceId = parseInt(resolvedParams.id, 10);
    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    await prisma.services.delete({
      where: { service_id: serviceId },
    });

    return NextResponse.json({ message: "Xóa thành công" });
  } catch (err: any) {
    console.error("[DELETE /api/services/[id]]", err.message);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

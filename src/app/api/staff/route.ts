import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// GET /api/staff – list with optional filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search    = searchParams.get("search")?.trim();
    const position  = searchParams.get("position")?.trim();
    const isActive  = searchParams.get("is_active");

    const staff = await prisma.staff.findMany({
      where: {
        ...(search   && { full_name: { contains: search } }),
        ...(position && { position:  { contains: position } }),
        ...(isActive !== null && isActive !== "" && {
          is_active: isActive === "true",
        }),
      },
      include: {
        staff_schedules: {
          include: {
            appointments: {
              include: { 
                services: true,
                customers: {
                  include: { pets: true }
                }
              }
            }
          }
        }
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(staff);
  } catch (err) {
    console.error("[GET /api/staff]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// POST /api/staff – create staff member with optional avatar upload
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const full_name = formData.get("full_name") as string;
    const phone     = formData.get("phone")     as string | null;
    const email     = formData.get("email")     as string | null;
    const position  = formData.get("position")  as string | null;
    const avatarFile = formData.get("avatar")   as File | null;

    if (!full_name?.trim()) {
      return NextResponse.json({ error: "Họ và tên là bắt buộc" }, { status: 400 });
    }

    // Upload avatar if provided
    let avatarUrl: string | null = null;
    if (avatarFile && typeof avatarFile === 'object' && avatarFile.name) {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (!allowed.includes(avatarFile.type)) {
        return NextResponse.json({ error: "Chỉ chấp nhận JPG, PNG, WEBP" }, { status: 400 });
      }
      const uploadDir = path.join(process.cwd(), "public", "staff");
      await fs.mkdir(uploadDir, { recursive: true });
      const ext      = avatarFile.name.split(".").pop() ?? "jpg";
      const fileName = `staff-${Date.now()}.${ext}`;
      const buffer   = Buffer.from(await avatarFile.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      avatarUrl = `/staff/${fileName}`;
    }

    const staff = await prisma.staff.create({
      data: {
        full_name: full_name.trim(),
        phone:     phone  || null,
        email:     email  || null,
        position:  position || null,
        avatar:    avatarUrl,
        is_active: true,
      },
    });

    return NextResponse.json(
      { staff_id: staff.staff_id, message: "Thêm nhân viên thành công" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/staff]", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ", detail: String(err) },
      { status: 500 }
    );
  }
}

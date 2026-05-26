import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Default values seeded on first read
const DEFAULTS: Record<string, string> = {
  phone:        "0862623135",
  email:        "lel435564@gmail.com",
  address:      "123 Lê Văn Hiến, Đông Ngạc, Từ Liêm, Hà Nội",
  open_from:    "08:00",
  open_to:      "20:00",
  facebook:     "facebook.com/petcareshop",
  zalo:         "0862623135",
  bank_name:    "Ngân hàng Quân Đội (MB Bank)",
  bank_number:  "0862623135",
  bank_account: "PetCare Shop",
};

// Upsert defaults that are missing in DB
async function seedDefaults() {
  for (const [key, value] of Object.entries(DEFAULTS)) {
    await prisma.shop_settings.upsert({
      where:  { key },
      update: {},          // do not overwrite existing values
      create: { key, value },
    });
  }
}

// GET /api/settings → returns all settings as { key: value } map
export async function GET() {
  try {
    await seedDefaults();
    const rows = await prisma.shop_settings.findMany();
    const result: Record<string, string> = {};
    for (const row of rows) result[row.key] = row.value;
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/settings]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

import { revalidatePath } from "next/cache";

// PUT /api/settings  body: { key: value, … }
export async function PUT(req: Request) {
  try {
    const body: Record<string, string> = await req.json();
    for (const [key, value] of Object.entries(body)) {
      await prisma.shop_settings.upsert({
        where:  { key },
        update: { value },
        create: { key, value },
      });
    }

    // Xóa cache của tất cả các trang để Footer và ContactPage cập nhật ngay lập tức
    revalidatePath("/", "layout");

    return NextResponse.json({ message: "Đã lưu cài đặt" });
  } catch (err) {
    console.error("[PUT /api/settings]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

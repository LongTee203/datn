import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── POST /api/contacts ───────────────────────────────────────────────────────
// Save contact message → also creates a system notification for admin
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, email, phone, message } = body as {
      full_name: string;
      email?: string;
      phone?: string;
      message: string;
    };

    if (!full_name || !message) {
      return NextResponse.json({ error: "Thiếu họ tên hoặc nội dung" }, { status: 400 });
    }

    // 1. Persist to contacts table
    const contact = await prisma.contacts.create({
      data: { full_name, email: email ?? null, phone: phone ?? null, message },
    });

    // 2. Fire a notification so admin sees it in /admin/notifications
    await prisma.notifications.create({
      data: {
        type:      "contact",
        title:     `Liên hệ mới từ ${full_name}`,
        message:   `Tên: ${full_name} | Email: ${email || "Không có"} | SĐT: ${phone || "Không có"}\nNội dung: ${message.length > 120 ? message.slice(0, 117) + "..." : message}`,
        source_id: contact.contact_id,
      },
    });

    return NextResponse.json({ success: true, contact_id: contact.contact_id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/contacts]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// ─── GET /api/contacts ────────────────────────────────────────────────────────
// Optional: list contacts for admin (with optional date filter via ?date=YYYY-MM-DD)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    const where = date
      ? {
          created_at: {
            gte: new Date(`${date}T00:00:00`),
            lte: new Date(`${date}T23:59:59`),
          },
        }
      : {};

    const contacts = await prisma.contacts.findMany({
      where,
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (err) {
    console.error("[GET /api/contacts]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── GET /api/notifications ───────────────────────────────────────────────────
// Query params:
//   ?date=YYYY-MM-DD  → filter by a specific day
//   ?type=order|booking|stock|contact  → filter by type
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const type = searchParams.get("type");

    // Build date range filter
    const dateFilter = date
      ? {
          created_at: {
            gte: new Date(`${date}T00:00:00`),
            lte: new Date(`${date}T23:59:59`),
          },
        }
      : {};

    const typeFilter = type && type !== "all" ? { type } : {};

    const notifications = await prisma.notifications.findMany({
      where: { ...dateFilter, ...typeFilter },
      orderBy: { created_at: "desc" },
      take: 200,
    });

    return NextResponse.json(notifications);
  } catch (err) {
    console.error("[GET /api/notifications]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// ─── POST /api/notifications ──────────────────────────────────────────────────
// Create a new notification (called internally by orders/bookings/contacts APIs)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, title, message, source_id } = body as {
      type:       string;
      title:      string;
      message:    string;
      source_id?: number;
    };

    const notification = await prisma.notifications.create({
      data: { type, title, message, source_id: source_id ?? null },
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (err) {
    console.error("[POST /api/notifications]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// ─── PATCH /api/notifications ─────────────────────────────────────────────────
// body: { id?: number, markAllRead?: true }
export async function PATCH(req: Request) {
  try {
    const { id, markAllRead } = await req.json();

    if (markAllRead) {
      await prisma.notifications.updateMany({ data: { is_read: true } });
    } else if (id) {
      await prisma.notifications.update({
        where: { notification_id: id },
        data:  { is_read: true },
      });
    }

    return NextResponse.json({ message: "Đã cập nhật" });
  } catch (err) {
    console.error("[PATCH /api/notifications]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// ─── DELETE /api/notifications ────────────────────────────────────────────────
// Delete all read notifications
export async function DELETE() {
  try {
    await prisma.notifications.deleteMany({ where: { is_read: true } });
    return NextResponse.json({ message: "Đã xóa thông báo cũ" });
  } catch (err) {
    console.error("[DELETE /api/notifications]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

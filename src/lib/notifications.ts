import { prisma } from "@/lib/prisma";

// ─── Types ────────────────────────────────────────────────────────────────────
type NotificationType = "order" | "booking" | "stock";

interface NotifyPayload {
  type:       NotificationType;
  title:      string;
  message:    string;
  source_id?: number;
}

// ─── Helper: create a notification record directly via Prisma ────────────────
// Use this inside API routes (server-side only) to avoid circular HTTP calls.
export async function createNotification(payload: NotifyPayload): Promise<void> {
  try {
    await prisma.notifications.create({
      data: {
        type:      payload.type,
        title:     payload.title,
        message:   payload.message,
        source_id: payload.source_id ?? null,
      },
    });
  } catch (err) {
    // Non-fatal: log but don't crash the parent request
    console.error("[createNotification]", err);
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/notifications/stream
 * Server-Sent Events endpoint.
 * Polls the DB every 5 s and pushes any notifications created since
 * the connection was opened (or since the last poll).
 *
 * Client receives events in the form:
 *   data: <JSON array of Notification objects>\n\n
 */
export async function GET() {
  let lastChecked = new Date();

  const stream = new ReadableStream({
    async start(controller) {
      const encode = (data: unknown) =>
        new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);

      // Send a heartbeat immediately so the browser knows the connection is alive
      controller.enqueue(encode({ type: "connected" }));

      const poll = async () => {
        try {
          const since = lastChecked;
          lastChecked = new Date();

          const newNotifs = await prisma.notifications.findMany({
            where: { created_at: { gt: since } },
            orderBy: { created_at: "desc" },
          });

          if (newNotifs.length > 0) {
            controller.enqueue(encode(newNotifs));
          }
        } catch {
          // DB error — keep stream alive, will retry next tick
        }
      };

      // Poll every 5 seconds
      const interval = setInterval(poll, 5000);

      // Clean up when the client disconnects
      return () => clearInterval(interval);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection:      "keep-alive",
      "X-Accel-Buffering": "no", // disable nginx buffering if applicable
    },
  });
}

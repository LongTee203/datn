import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}
function daysAgo(n: number) {
  const d = startOfToday();
  d.setDate(d.getDate() - n);
  return d;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
// GET /api/dashboard/stats
export async function GET() {
  try {
    const todayRange = { gte: startOfToday(), lte: endOfToday() };

    const [
      // 1. Revenue today: sum of paid payments created today
      revenueResult,

      // 2. Pending bookings count (lịch hẹn chờ xác nhận)
      pendingBookings,

      // 3. Pending orders count (đơn hàng chờ xử lý)
      pendingOrders,

      // 4. Revenue chart – last 7 days from payments (status=paid)
      revenueChart,
    ] = await Promise.all([
      prisma.payments.aggregate({
        _sum: { amount: true },
        where: { status: "paid", created_at: todayRange },
      }),

      prisma.appointments.count({
        where: { status: "Pending" },
      }),

      prisma.orders.count({
        where: { order_status: "Pending" },
      }),

      // Raw query: group paid payments by day for last 7 days
      prisma.$queryRaw<{ day: Date; revenue: number }[]>`
        SELECT
          DATE(created_at)             AS day,
          COALESCE(SUM(amount), 0)     AS revenue
        FROM payments
        WHERE created_at >= ${daysAgo(6)}
          AND status = 'paid'
        GROUP BY DATE(created_at)
        ORDER BY day ASC
      `,
    ]);

    return NextResponse.json({
      revenueToday:   Number(revenueResult._sum.amount ?? 0),
      pendingBookings,
      pendingOrders,
      revenueChart: revenueChart.map((r) => ({
        day:     r.day,
        revenue: Number(r.revenue),
      })),
    });
  } catch (err) {
    console.error("[GET /api/dashboard/stats]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

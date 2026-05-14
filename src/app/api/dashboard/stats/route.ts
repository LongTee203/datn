import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Start of today (00:00:00 local) as UTC Date */
function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
/** End of today (23:59:59.999) as UTC Date */
function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}
/** N days ago from start of today */
function daysAgo(n: number) {
  const d = startOfToday();
  d.setDate(d.getDate() - n);
  return d;
}
/** Start of current month */
function startOfMonth() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}
/** 1 hour ago */
function oneHourAgo() {
  return new Date(Date.now() - 60 * 60 * 1000);
}

// ─── Handler ──────────────────────────────────────────────────────────────────
// GET /api/dashboard/stats
export async function GET() {
  try {
    const today = { gte: startOfToday(), lte: endOfToday() };

    // Run all aggregations in parallel for performance
    const [
      revenueResult,
      bookingsToday,
      pendingBookings,
      newOrders,
      urgentOrders,
      newCustomers,
      customersToday,
      revenueChart,
    ] = await Promise.all([
      // Daily revenue (completed orders today)
      prisma.orders.aggregate({
        _sum: { total_amount: true },
        where: { created_at: today, order_status: "Completed" },
      }),

      // Bookings today
      prisma.appointments.count({
        where: { appointment_date: today },
      }),

      // Pending bookings
      prisma.appointments.count({
        where: { status: "Pending" },
      }),

      // New orders today
      prisma.orders.count({
        where: { created_at: today },
      }),

      // Urgent: pending orders older than 1 hour
      prisma.orders.count({
        where: {
          order_status: "Pending",
          created_at: { lt: oneHourAgo() },
        },
      }),

      // New customers this month
      prisma.customers.count({
        where: { created_at: { gte: startOfMonth() } },
      }),

      // New customers today
      prisma.customers.count({
        where: { created_at: today },
      }),

      // Revenue chart – last 7 days grouped by day
      // Prisma doesn't support groupBy on computed date columns, use $queryRaw
      prisma.$queryRaw<
        { day: Date; revenue: number; orders: bigint }[]
      >`
        SELECT
          DATE(created_at)              AS day,
          COALESCE(SUM(total_amount), 0) AS revenue,
          COUNT(*)                       AS orders
        FROM orders
        WHERE created_at >= ${daysAgo(6)}
          AND order_status = 'Completed'
        GROUP BY DATE(created_at)
        ORDER BY day ASC
      `,
    ]);

    return NextResponse.json({
      revenueToday: Number(revenueResult._sum.total_amount ?? 0),
      bookingsToday,
      pendingBookings,
      newOrders,
      urgentOrders,
      newCustomers,
      customersToday,
      revenueChart: revenueChart.map((r) => ({
        day: r.day,
        revenue: Number(r.revenue),
        orders: Number(r.orders),
      })),
    });
  } catch (err) {
    console.error("[GET /api/dashboard/stats]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

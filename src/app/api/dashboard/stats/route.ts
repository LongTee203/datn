import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

interface StatsRow extends RowDataPacket {
  value: number;
}

// GET /api/dashboard/stats – aggregate stats for admin dashboard
export async function GET() {
  try {
    // Daily revenue (sum of completed orders today)
    const [revenueToday] = await query<StatsRow[]>(
      `SELECT COALESCE(SUM(total_amount), 0) AS value
       FROM orders
       WHERE DATE(created_at) = CURDATE() AND order_status = 'Completed'`
    );

    // Today's bookings count
    const [bookingsToday] = await query<StatsRow[]>(
      `SELECT COUNT(*) AS value
       FROM appointments
       WHERE DATE(appointment_date) = CURDATE()`
    );

    // Pending bookings
    const [pendingBookings] = await query<StatsRow[]>(
      `SELECT COUNT(*) AS value
       FROM appointments
       WHERE status = 'Pending'`
    );

    // New orders count
    const [newOrders] = await query<StatsRow[]>(
      `SELECT COUNT(*) AS value
       FROM orders
       WHERE DATE(created_at) = CURDATE()`
    );

    // Urgent orders (pending for > 1 hour)
    const [urgentOrders] = await query<StatsRow[]>(
      `SELECT COUNT(*) AS value
       FROM orders
       WHERE order_status = 'Pending'
         AND created_at < DATE_SUB(NOW(), INTERVAL 1 HOUR)`
    );

    // New customers this month
    const [newCustomers] = await query<StatsRow[]>(
      `SELECT COUNT(*) AS value
       FROM customers
       WHERE MONTH(created_at) = MONTH(CURDATE())
         AND YEAR(created_at) = YEAR(CURDATE())`
    );

    // New customers today
    const [customersToday] = await query<StatsRow[]>(
      `SELECT COUNT(*) AS value
       FROM customers
       WHERE DATE(created_at) = CURDATE()`
    );

    // Revenue last 7 days (for chart)
    const revenueChart = await query<RowDataPacket[]>(
      `SELECT
         DATE(created_at)                     AS day,
         DAYOFWEEK(created_at)                AS dow,
         COALESCE(SUM(total_amount), 0)       AS revenue,
         COUNT(*)                             AS orders
       FROM orders
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
         AND order_status = 'Completed'
       GROUP BY DATE(created_at), DAYOFWEEK(created_at)
       ORDER BY day ASC`
    );

    return NextResponse.json({
      revenueToday: revenueToday?.value ?? 0,
      bookingsToday: bookingsToday?.value ?? 0,
      pendingBookings: pendingBookings?.value ?? 0,
      newOrders: newOrders?.value ?? 0,
      urgentOrders: urgentOrders?.value ?? 0,
      newCustomers: newCustomers?.value ?? 0,
      customersToday: customersToday?.value ?? 0,
      revenueChart,
    });
  } catch (err) {
    console.error("[GET /api/dashboard/stats] Error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

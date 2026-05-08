"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  revenueToday: number;
  bookingsToday: number;
  pendingBookings: number;
  newOrders: number;
  urgentOrders: number;
  newCustomers: number;
  customersToday: number;
  revenueChart: { day: string; dow: number; revenue: number; orders: number }[];
}

interface RecentAppointment {
  appointment_id: number;
  pet_name: string;
  customer_name: string;
  appointment_date: string;
  service_name: string;
  status: string;
}

interface RecentOrder {
  order_id: number;
  customer_name: string;
  total_amount: number;
  order_status: string;
  payment_method: string;
  created_at: string;
}

const STATUS_ORDER_LABEL: Record<string, string> = {
  Pending: "Chờ xác nhận", Processing: "Đang xử lý",
  Shipped: "Đang giao", Completed: "Hoàn tất", Cancelled: "Đã hủy",
};
const STATUS_ORDER_STYLE: Record<string, string> = {
  Pending:    "bg-[#fa746f]/20 text-[#6e0a12]",
  Processing: "bg-[#b6e7fe]/20 text-[#074355]",
  Shipped:    "bg-[#b6e7fe]/20 text-[#074355]",
  Completed:  "bg-[#82f6e7]/30 text-[#005c54]",
  Cancelled:  "bg-gray-100 text-gray-500",
};

function formatCurrency(v: number) {
  if (!v) return "0đ";
  return new Intl.NumberFormat("vi-VN").format(v) + "đ";
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Chào buổi sáng";
  if (h < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

function formatTime(dt: string) {
  if (!dt) return "—";
  const d = new Date(dt);
  const diff = d.getTime() - Date.now();
  if (Math.abs(diff) < 86400000) {
    return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "numeric" });
}

const DAYS = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export default function DashboardPage() {
  const [stats, setStats]       = useState<Stats | null>(null);
  const [appointments, setAppointments] = useState<RecentAppointment[]>([]);
  const [orders, setOrders]     = useState<RecentOrder[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [sRes, aRes, oRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/appointments?limit=5"),
          fetch("/api/orders?limit=5"),
        ]);
        if (sRes.ok) setStats(await sRes.json());
        if (aRes.ok) setAppointments(await aRes.json());
        if (oRes.ok) setOrders(await oRes.json());
      } catch { /* keep defaults */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  // Build 7-day chart – fill missing days with 0
  const chartData = (() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - 6 + i);
      const dayStr = d.toISOString().split("T")[0];
      const found  = stats?.revenueChart?.find(r => r.day?.startsWith(dayStr));
      return { label: DAYS[d.getDay()], revenue: found?.revenue ?? 0, isToday: i === 6 };
    });
  })();
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);

  return (
    <div className="min-h-screen">
      {/* Welcome Header */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">
            {getGreeting()}, Admin 👋
          </h2>
          <p className="text-[#56615f] mt-1">Cập nhật mới nhất về thánh đường thú cưng của bạn.</p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-[#56615f]">
            <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
            Đang tải dữ liệu...
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Doanh thu hôm nay", icon: "payments", bg: "bg-[#82f6e7]", iconColor: "text-[#006b62]",
            value: formatCurrency(stats?.revenueToday ?? 0),
            sub: <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">payments</span>Đơn hoàn thành</p>
          },
          {
            label: "Đặt lịch mới", icon: "calendar_today", bg: "bg-[#c6eae3]", iconColor: "text-[#446560]",
            value: stats?.bookingsToday ?? 0,
            sub: <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span>{stats?.pendingBookings ?? 0} lịch chờ xác nhận</p>
          },
          {
            label: "Đơn hàng mới", icon: "local_shipping", bg: "bg-[#b6e7fe]", iconColor: "text-[#346578]",
            value: stats?.newOrders ?? 0,
            sub: <p className="text-[#a83836] text-xs font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">priority_high</span>{stats?.urgentOrders ?? 0} đơn cần xử lý gấp</p>
          },
          {
            label: "Khách hàng mới", icon: "group", bg: "bg-[#d9e5e2]", iconColor: "text-[#56615f]",
            value: stats?.newCustomers ?? 0,
            sub: <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person_add</span>+{stats?.customersToday ?? 0} khách hôm nay</p>
          },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-2">{card.label}</p>
                <h3 className="text-2xl font-extrabold text-[#2a3433]">{loading ? "—" : card.value}</h3>
                {card.sub}
              </div>
              <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#006b62]/5 rounded-full blur-2xl" />
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold text-[#2a3433]">Biểu đồ doanh thu</h4>
              <p className="text-sm text-[#56615f]">7 ngày gần nhất (đơn Hoàn thành)</p>
            </div>
          </div>
          <div className="relative h-[300px] w-full flex items-end justify-between gap-4 pt-10">
            {chartData.map((day, i) => {
              const pct = maxRevenue > 0 ? (day.revenue / maxRevenue) * 90 + 10 : 10;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full group/bar">
                    {day.revenue > 0 && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {formatCurrency(day.revenue)}
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-2xl transition-all ${day.isToday ? "bg-[#006b62]" : "bg-[#82f6e7]/20 hover:bg-[#82f6e7]/40"}`}
                      style={{ height: `${pct}%`, minHeight: "4px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-[#56615f]/60 uppercase tracking-widest px-1">
            {chartData.map((d, i) => <span key={i}>{d.label}</span>)}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-[#e7f0ed] p-6 rounded-[2rem]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-[#2a3433]">Lịch sắp tới</h4>
            <Link className="text-[#006b62] text-xs font-bold hover:underline" href="/admin/bookings">Xem tất cả</Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-6 text-[#56615f] text-sm">Đang tải...</div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-6 text-[#56615f] text-sm">Chưa có lịch hẹn nào.</div>
            ) : (
              appointments.slice(0, 5).map(a => (
                <div key={a.appointment_id} className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#c6eae3] flex items-center justify-center text-[#446560]">
                    <span className="material-symbols-outlined">pets</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2a3433] truncate">{a.pet_name} ({a.service_name ?? "—"})</p>
                    <p className="text-[10px] text-[#56615f]">Chủ: {a.customer_name ?? "—"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-[#006b62]">{formatTime(a.appointment_date)}</p>
                    <p className="text-[10px] text-[#56615f]">{a.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-10 bg-white p-8 rounded-[2rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="text-xl font-bold text-[#2a3433]">Đơn hàng mới nhất</h4>
            <p className="text-sm text-[#56615f]">Cần được xử lý và vận chuyển</p>
          </div>
          <Link href="/admin/orders" className="text-[#006b62] text-xs font-bold hover:underline">Xem tất cả</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#56615f]/60 border-b border-gray-100">
                <th className="pb-6 px-4">Mã đơn</th>
                <th className="pb-6 px-4">Khách hàng</th>
                <th className="pb-6 px-4">Tổng tiền</th>
                <th className="pb-6 px-4">Trạng thái</th>
                <th className="pb-6 px-4 text-center">Thanh toán</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={5} className="py-6 text-center text-[#56615f]">Đang tải...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-center text-[#56615f]">Chưa có đơn hàng nào.</td></tr>
              ) : (
                orders.slice(0, 5).map(o => {
                  const initials = o.customer_name
                    ? o.customer_name.split(" ").map(w => w[0]).slice(-2).join("").toUpperCase()
                    : "?";
                  return (
                    <tr key={o.order_id} className="group hover:bg-[#eef5f3] transition-colors">
                      <td className="py-5 px-4 font-bold text-[#2a3433]">#{String(o.order_id).padStart(4,"0")}</td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#82f6e7] text-[#006b62] flex items-center justify-center font-bold text-xs">{initials}</div>
                          <span className="font-medium">{o.customer_name ?? "Khách vãng lai"}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 font-bold">{formatCurrency(o.total_amount)}</td>
                      <td className="py-5 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${STATUS_ORDER_STYLE[o.order_status] ?? "bg-gray-100 text-gray-500"}`}>
                          {STATUS_ORDER_LABEL[o.order_status] ?? o.order_status}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-center text-xs text-[#56615f]">{o.payment_method}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

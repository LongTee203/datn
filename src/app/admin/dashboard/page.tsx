"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
  revenueToday:    number;
  pendingBookings: number;
  pendingOrders:   number;
  revenueChart:    { day: string; revenue: number }[];
}

interface ContactSummary {
  contactsToday: number;
}

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalAppointments: number;
  orderRevenue: number;
  apptRevenue: number;
}

interface UpcomingAppointment {
  appointment_id: number;
  pet_name: string;
  customer_name: string | null;
  appointment_date: string;
  service_name: string | null;
  status: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function formatApptDate(dt: string) {
  if (!dt) return "—";
  const d = new Date(dt);
  return d.toLocaleString("vi-VN", {
    day: "2-digit", month: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ─── Donut Chart (SVG) ────────────────────────────────────────────────────────
function DonutChart({ orderRevenue, apptRevenue }: { orderRevenue: number; apptRevenue: number }) {
  const total = orderRevenue + apptRevenue;
  const orderPct = total > 0 ? orderRevenue / total : 0.5;
  const apptPct = total > 0 ? apptRevenue / total : 0.5;

  // SVG donut using stroke-dasharray on a circle r=40, circumference≈251.3
  const C = 2 * Math.PI * 40;
  const orderDash = orderPct * C;
  const apptDash = apptPct * C;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background ring */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#eef5f3" strokeWidth="14" />
          {/* Order revenue slice */}
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke="#006b62" strokeWidth="14"
            strokeDasharray={`${orderDash} ${C - orderDash}`}
            strokeLinecap="butt"
          />
          {/* Appointment revenue slice */}
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke="#82f6e7" strokeWidth="14"
            strokeDasharray={`${apptDash} ${C - apptDash}`}
            strokeDashoffset={-orderDash}
            strokeLinecap="butt"
          />
        </svg>
        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold text-[#56615f] uppercase tracking-wider">Tổng</p>
          <p className="text-xs font-extrabold text-[#2a3433] leading-tight">
            {new Intl.NumberFormat("vi-VN", { notation: "compact", maximumFractionDigits: 1 }).format(total)}đ
          </p>
        </div>
      </div>
      {/* Legend */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#006b62] inline-block" />
            <span className="text-[#56615f] font-medium">Đặt hàng</span>
          </div>
          <span className="font-bold text-[#2a3433]">
            {total > 0 ? Math.round(orderPct * 100) : 0}%
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#82f6e7] inline-block" />
            <span className="text-[#56615f] font-medium">Dịch vụ</span>
          </div>
          <span className="font-bold text-[#2a3433]">
            {total > 0 ? Math.round(apptPct * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
}

const DAYS = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [stats, setStats]           = useState<Stats | null>(null);
  const [analytics, setAnalytics]   = useState<AnalyticsData | null>(null);
  const [appointments, setAppointments] = useState<UpcomingAppointment[]>([]);
  const [contacts, setContacts]     = useState<ContactSummary>({ contactsToday: 0 });
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    async function load() {
      const today = new Date().toISOString().split("T")[0];
      try {
        const [sRes, aRes, anRes, nRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/appointments?status=Confirmed"),
          fetch(`/api/analytics?startDate=${today}&endDate=${today}`),
          fetch(`/api/notifications?date=${today}&type=contact`),
        ]);
        if (sRes.ok)  setStats(await sRes.json());
        if (anRes.ok) setAnalytics(await anRes.json());
        if (nRes.ok) {
          const notifs = await nRes.json();
          setContacts({ contactsToday: notifs.length });
        }
        if (aRes.ok) {
          const all: UpcomingAppointment[] = await aRes.json();
          const sorted = all.sort(
            (a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime()
          );
          setAppointments(sorted.slice(0, 5));
        }
      } catch { /* keep defaults */ }
      finally { setLoading(false); }
    }
    load();
  }, []);



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

      {/* Stats Cards — 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[
          {
            label:     "Doanh thu hôm nay",
            icon:      "payments",
            bg:        "bg-[#82f6e7]",
            iconColor: "text-[#006b62]",
            value:     formatCurrency(stats?.revenueToday ?? 0),
            sub: (
              <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">payments</span>
                Từ giao dịch đã thanh toán
              </p>
            ),
            href: undefined,
          },
          {
            label:     "Lịch hẹn chờ xác nhận",
            icon:      "calendar_today",
            bg:        "bg-[#c6eae3]",
            iconColor: "text-[#446560]",
            value:     stats?.pendingBookings ?? 0,
            sub: (
              <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                Đang chờ admin xác nhận
              </p>
            ),
            href: "/admin/bookings",
          },
          {
            label:     "Đơn hàng chờ xử lý",
            icon:      "local_shipping",
            bg:        "bg-[#b6e7fe]",
            iconColor: "text-[#346578]",
            value:     stats?.pendingOrders ?? 0,
            sub: (
              <p className="text-[#a83836] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">priority_high</span>
                Cần xử lý ngay
              </p>
            ),
            href: "/admin/orders",
          },
          {
            label:     "Liên hệ hôm nay",
            icon:      "mail",
            bg:        "bg-[#f3e8ff]",
            iconColor: "text-[#7c3aed]",
            value:     contacts.contactsToday,
            sub: (
              <p className="text-[#7c3aed] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">forum</span>
                Tin nhắn từ khách hàng
              </p>
            ),
            href: "/admin/notifications",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group cursor-pointer"
            onClick={() => card.href && (window.location.href = card.href)}
          >
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

      {/* Main Section: Donut | Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Donut Chart — 5 cols */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-bold text-[#2a3433]">Cơ cấu doanh thu</h4>
              <p className="text-xs text-[#56615f]">Hôm nay (đã thanh toán)</p>
            </div>
            <Link href="/admin/payments " className="text-[#006b62] text-xs font-bold hover:underline">
              Chi tiết
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {loading ? (
              <div className="text-[#56615f] text-sm">Đang tải...</div>
            ) : (
              <DonutChart
                orderRevenue={analytics?.orderRevenue ?? 0}
                apptRevenue={analytics?.apptRevenue ?? 0}
              />
            )}
          </div>
          {/* Total breakdown */}
          {!loading && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#56615f]">Đặt hàng</span>
                <span className="font-bold text-[#2a3433]">{formatCurrency(analytics?.orderRevenue ?? 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#56615f]">Dịch vụ</span>
                <span className="font-bold text-[#2a3433]">{formatCurrency(analytics?.apptRevenue ?? 0)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Appointments — Confirmed, sorted ascending — 7 cols */}
        <div className="lg:col-span-7 bg-[#e7f0ed] p-6 rounded-[2rem]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-[#2a3433]">Lịch sắp tới</h4>
            <Link className="text-[#006b62] text-xs font-bold hover:underline" href="/admin/bookings">
              Xem tất cả
            </Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-6 text-[#56615f] text-sm">Đang tải...</div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-6 text-[#56615f] text-sm">Không có lịch đã xác nhận.</div>
            ) : (
              appointments.map(a => (
                <div key={a.appointment_id} className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center text-[#446560] flex-shrink-0">
                    <span className="material-symbols-outlined text-lg">pets</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2a3433] truncate">{a.pet_name} ({a.service_name ?? "—"})</p>
                    <p className="text-[10px] text-[#56615f]">Chủ: {a.customer_name ?? "—"}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-extrabold text-[#006b62]">{formatApptDate(a.appointment_date)}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#82f6e7] text-[#006b62] font-bold">Xác nhận</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

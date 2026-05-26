"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
type NotifType = "order" | "booking" | "stock" | "contact";
type FilterType = "all" | NotifType;

interface Notification {
  notification_id: number;
  type:            NotifType;
  title:           string;
  message:         string;
  source_id:       number | null;
  is_read:         boolean;
  created_at:      string;
}

// ─── Config per type ──────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<NotifType, {
  icon:        string;
  iconBg:      string;
  iconColor:   string;
  borderColor: string;
  hoverColor:  string;
  badgeBg:     string;
  badge:       string;
  link:        string;
  linkLabel:   string;
}> = {
  order: {
    icon:        "shopping_bag",
    iconBg:      "bg-[#b6e7fe]/40",
    iconColor:   "text-[#346578]",
    borderColor: "border-[#346578]",
    hoverColor:  "group-hover:text-[#346578]",
    badgeBg:     "bg-[#b6e7fe] text-[#235669]",
    badge:       "MỚI",
    link:        "/admin/orders",
    linkLabel:   "Xem đơn hàng",
  },
  booking: {
    icon:        "event_available",
    iconBg:      "bg-[#82f6e7]/40",
    iconColor:   "text-[#006b62]",
    borderColor: "border-[#006b62]",
    hoverColor:  "group-hover:text-[#006b62]",
    badgeBg:     "bg-[#82f6e7] text-[#006b62]",
    badge:       "MỚI",
    link:        "/admin/bookings",
    linkLabel:   "Xem lịch hẹn",
  },
  stock: {
    icon:        "inventory",
    iconBg:      "bg-[#fa746f]/10",
    iconColor:   "text-[#a83836]",
    borderColor: "border-[#a83836]",
    hoverColor:  "group-hover:text-[#a83836]",
    badgeBg:     "bg-[#fa746f]/20 text-[#a83836]",
    badge:       "KHẨN",
    link:        "/admin/inventory",
    linkLabel:   "Nhập hàng",
  },
  contact: {
    icon:        "mail",
    iconBg:      "bg-[#f3e8ff]/60",
    iconColor:   "text-[#7c3aed]",
    borderColor: "border-[#7c3aed]",
    hoverColor:  "group-hover:text-[#7c3aed]",
    badgeBg:     "bg-[#f3e8ff] text-[#7c3aed]",
    badge:       "LIÊN HỆ",
    link:        "/admin/notifications",
    linkLabel:   "Xem tin nhắn",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff    = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1)  return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)   return `${hours} giờ trước`;
  return `${Math.floor(hours / 24)} ngày trước`;
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

// ─── Notification Card ────────────────────────────────────────────────────────
function NotificationCard({
  notif,
  onRead,
}: {
  notif:  Notification;
  onRead: (id: number) => void;
}) {
  const router = useRouter();
  const cfg    = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.order;

  const handleClick = () => {
    if (!notif.is_read) onRead(notif.notification_id);
  };

  if (notif.is_read) {
    return (
      <div
        className="group bg-[#eef5f3]/50 p-5 rounded-[1.5rem] flex gap-4 opacity-70 hover:opacity-100 transition-all cursor-pointer border border-transparent hover:border-[#a9b4b1]/20"
        onClick={handleClick}
      >
        <div className={`w-14 h-14 rounded-2xl ${cfg.iconBg} flex flex-shrink-0 items-center justify-center ${cfg.iconColor}`}>
          <span className="material-symbols-outlined text-3xl">{cfg.icon}</span>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-[#2a3433]">{notif.title}</h4>
            <span className="text-[11px] font-medium text-[#727d7a]">Đã đọc</span>
          </div>
          <p className="text-sm text-[#56615f] mt-1">{notif.message}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-[11px] text-[#727d7a] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {timeAgo(notif.created_at)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group bg-white p-5 rounded-[1.5rem] flex gap-4 border-l-4 ${cfg.borderColor} shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden`}
      onClick={handleClick}
    >
      <div className={`w-14 h-14 rounded-2xl ${cfg.iconBg} flex flex-shrink-0 items-center justify-center ${cfg.iconColor}`}>
        <span className="material-symbols-outlined text-3xl">{cfg.icon}</span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h4 className={`font-bold text-[#2a3433] ${cfg.hoverColor} transition-colors`}>{notif.title}</h4>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${cfg.badgeBg}`}>{cfg.badge}</span>
        </div>
        <p className="text-sm text-[#56615f] mt-1 leading-snug">{notif.message}</p>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-[11px] text-[#727d7a] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {timeAgo(notif.created_at)}
          </span>
          {cfg.link !== "/admin/notifications" && (
            <button
              onClick={(e) => { e.stopPropagation(); router.push(cfg.link); }}
              className={`text-xs font-bold ${cfg.iconColor} hover:underline`}
            >
              {cfg.linkLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Summary Stat Card (clickable filter) ────────────────────────────────────
interface StatCardProps {
  icon:      string;
  iconBg:    string;
  iconColor: string;
  label:     string;
  count:     number;
  countColor:string;
  active:    boolean;
  onClick:   () => void;
}

function StatCard({ icon, iconBg, iconColor, label, count, countColor, active, onClick }: StatCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left group ${
        active
          ? `${iconBg} ring-2 ring-offset-1 ring-current shadow-sm`
          : `${iconBg}/60 hover:${iconBg}`
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <span className="text-sm font-semibold text-[#2a3433] block">{label}</span>
          {active && (
            <span className="text-[10px] text-[#56615f] font-medium">Đang lọc</span>
          )}
        </div>
      </div>
      <span className={`text-xl font-bold ${countColor}`}>{String(count).padStart(2, "0")}</span>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading]             = useState(true);
  const [filter, setFilter]               = useState<FilterType>("all");
  const [selectedDate, setSelectedDate]   = useState<string>(todayISO());
  const [viewingToday, setViewingToday]   = useState(true);
  const [newIds, setNewIds]               = useState<Set<number>>(new Set());
  const sseRef                            = useRef<EventSource | null>(null);

  // Fetch with current date selection
  const fetchNotifications = useCallback(async (date?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (date) params.set("date", date);
      const res = await fetch(`/api/notifications?${params.toString()}`);
      if (res.ok) setNotifications(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load: today's notifications
  useEffect(() => {
    fetchNotifications(todayISO());
  }, [fetchNotifications]);

  // SSE: listen for realtime new notifications (only when viewing today)
  useEffect(() => {
    if (!viewingToday || typeof EventSource === "undefined") return;

    sseRef.current?.close();
    const es = new EventSource("/api/notifications/stream");
    sseRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (!Array.isArray(data)) return; // heartbeat

        const incoming: Notification[] = data;
        if (incoming.length === 0) return;

        // Prepend to list, avoiding duplicates
        setNotifications(prev => {
          const existingIds = new Set(prev.map(n => n.notification_id));
          const fresh = incoming.filter(n => !existingIds.has(n.notification_id));
          return [...fresh, ...prev];
        });

        // Track IDs for highlight animation
        setNewIds(prev => {
          const next = new Set(prev);
          incoming.forEach(n => next.add(n.notification_id));
          return next;
        });

        // Remove highlight after 4 s
        setTimeout(() => {
          setNewIds(prev => {
            const next = new Set(prev);
            incoming.forEach(n => next.delete(n.notification_id));
            return next;
          });
        }, 4000);
      } catch {
        // ignore
      }
    };

    return () => {
      es.close();
      sseRef.current = null;
    };
  }, [viewingToday]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const today = date === todayISO();
    setViewingToday(today);
    setFilter("all");
    fetchNotifications(date);
  };

  const markRead = async (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.notification_id === id ? { ...n, is_read: true } : n)
    );
    await fetch("/api/notifications", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id }),
    });
  };

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    await fetch("/api/notifications", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ markAllRead: true }),
    });
  };

  const clearOld = async () => {
    await fetch("/api/notifications", { method: "DELETE" });
    setNotifications(prev => prev.filter(n => !n.is_read));
  };

  // Apply type filter client-side
  const filtered = filter === "all"
    ? notifications
    : notifications.filter(n => n.type === filter);

  // Stats (for the selected date's data already loaded)
  const newBookings = notifications.filter(n => n.type === "booking").length;
  const newOrders   = notifications.filter(n => n.type === "order").length;
  const stockAlerts = notifications.filter(n => n.type === "stock").length;
  const contacts    = notifications.filter(n => n.type === "contact").length;
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const toggleFilter = (f: FilterType) => setFilter(prev => prev === f ? "all" : f);

  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">
            Thông báo hệ thống
          </h2>
          <p className="text-[#56615f] mt-1 text-sm">
            Cập nhật các hoạt động mới nhất từ cửa hàng và kho hàng của bạn.
            {unreadCount > 0 && (
              <span className="ml-2 bg-[#006b62] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} chưa đọc
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Date picker */}
          <div className="flex items-center gap-2 bg-white border border-[#a9b4b1]/20 rounded-full px-4 py-2 shadow-sm">
            <span className="material-symbols-outlined text-[#006b62] text-lg">calendar_today</span>
            <input
              type="date"
              value={selectedDate}
              max={todayISO()}
              onChange={e => handleDateChange(e.target.value)}
              className="text-sm font-semibold text-[#2a3433] outline-none bg-transparent cursor-pointer"
            />
            {!viewingToday && (
              <button
                onClick={() => handleDateChange(todayISO())}
                className="text-[10px] font-bold text-[#006b62] hover:underline ml-1"
              >
                Hôm nay
              </button>
            )}
          </div>

          <button
            onClick={markAllRead}
            className="px-5 py-2.5 rounded-full bg-[#c6eae3] text-[#375853] font-semibold text-sm flex items-center gap-2 hover:bg-[#b8dcd5] transition-all"
          >
            <span className="material-symbols-outlined text-lg">done_all</span>
            Đánh dấu đã đọc hết
          </button>
        </div>
      </div>

      {/* ── Bento Grid Layout ── */}
      <div className="grid grid-cols-12 gap-6 relative">

        {/* Side: Summary Cards */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#a9b4b1]/5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#2a3433]">
                {viewingToday ? "Tóm tắt hôm nay" : `Ngày ${selectedDate.split("-").reverse().join("/")}`}
              </h3>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="text-[11px] font-bold text-[#006b62] hover:underline"
                >
                  Bỏ lọc
                </button>
              )}
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 rounded-2xl bg-[#eef5f3] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <StatCard
                  icon="calendar_month"
                  iconBg="bg-[#82f6e7]/30"
                  iconColor="text-[#006b62]"
                  label="Lịch hẹn mới"
                  count={newBookings}
                  countColor="text-[#006b62]"
                  active={filter === "booking"}
                  onClick={() => toggleFilter("booking")}
                />
                <StatCard
                  icon="shopping_bag"
                  iconBg="bg-[#b6e7fe]/30"
                  iconColor="text-[#346578]"
                  label="Đơn hàng mới"
                  count={newOrders}
                  countColor="text-[#346578]"
                  active={filter === "order"}
                  onClick={() => toggleFilter("order")}
                />
                <StatCard
                  icon="warning"
                  iconBg="bg-[#fa746f]/10"
                  iconColor="text-[#a83836]"
                  label="Cảnh báo kho"
                  count={stockAlerts}
                  countColor="text-[#a83836]"
                  active={filter === "stock"}
                  onClick={() => toggleFilter("stock")}
                />
                <StatCard
                  icon="mail"
                  iconBg="bg-[#f3e8ff]/60"
                  iconColor="text-[#7c3aed]"
                  label="Liên hệ"
                  count={contacts}
                  countColor="text-[#7c3aed]"
                  active={filter === "contact"}
                  onClick={() => toggleFilter("contact")}
                />
              </div>
            )}

            {/* Hint */}
            <p className="text-[10px] text-[#a9b4b1] mt-4 text-center">
              Bấm vào ô để lọc thông báo
            </p>
          </div>
        </div>

        {/* Main: Notification List */}
        <div className="col-span-12 lg:col-span-8 space-y-4">

          {/* Active filter indicator */}
          {filter !== "all" && (
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2a3433] bg-white px-5 py-3 rounded-2xl shadow-sm">
              <span className="material-symbols-outlined text-lg text-[#006b62]">filter_alt</span>
              Đang hiển thị:{" "}
              {filter === "booking" && "Lịch hẹn mới"}
              {filter === "order"   && "Đơn hàng mới"}
              {filter === "stock"   && "Cảnh báo kho"}
              {filter === "contact" && "Tin nhắn liên hệ"}
              <button
                onClick={() => setFilter("all")}
                className="ml-auto text-[11px] font-bold text-[#a83836] hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}

          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-[1.5rem] bg-white animate-pulse shadow-sm" />
            ))
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-16 text-center shadow-sm">
              <span className="material-symbols-outlined text-6xl text-[#a9b4b1] mb-4 block">
                notifications_off
              </span>
              <p className="text-[#56615f] font-medium">Không có thông báo nào.</p>
            </div>
          ) : (
            filtered.map(notif => (
              <div
                key={notif.notification_id}
                className={newIds.has(notif.notification_id)
                  ? "animate-[slideInRight_0.3s_ease-out] ring-2 ring-[#006b62]/30 rounded-[1.5rem] transition-all"
                  : ""}
              >
                <NotificationCard notif={notif} onRead={markRead} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAB: clear read notifications */}
      <button
        onClick={clearOld}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#006b62] text-[#e2fff9] rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        title="Xóa thông báo đã đọc"
      >
        <span className="material-symbols-outlined text-2xl">delete_sweep</span>
        <span className="absolute right-full mr-4 bg-[#2a3433] text-[#f6faf8] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
          Xóa thông báo cũ
        </span>
      </button>
    </div>
  );
}

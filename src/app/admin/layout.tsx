"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import LogoutButton from "@/components/auth/LogoutButton";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Notification {
  notification_id: number;
  type: "order" | "booking" | "stock" | "contact";
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface ToastItem {
  id: number;
  notif: Notification;
}

// ─── Config per type ──────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  order:   { icon: "shopping_bag",    color: "text-[#346578]", bg: "bg-[#b6e7fe]" },
  booking: { icon: "event_available", color: "text-[#006b62]", bg: "bg-[#82f6e7]" },
  stock:   { icon: "inventory",       color: "text-[#a83836]", bg: "bg-[#fa746f]/20" },
  contact: { icon: "mail",            color: "text-[#7c3aed]", bg: "bg-[#f3e8ff]" },
} as const;

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { icon: "dashboard",        label: "Bảng điều khiển",  href: "/admin/dashboard" },
  { icon: "event",            label: "Quản lý đặt lịch", href: "/admin/bookings" },
  { icon: "receipt",          label: "Quản lý đơn hàng", href: "/admin/orders" },
  { icon: "person",           label: "Quản lý khách hàng", href: "/admin/customers" },
  { icon: "medical_services", label: "Quản lý dịch vụ",  href: "/admin/services" },
  { icon: "inventory_2",      label: "Quản lý kho hàng", href: "/admin/inventory" },
  { icon: "group",            label: "Quản lý nhân viên", href: "/admin/staff" },
  { icon: "edit_note",        label: "Quản lý bài viết", href: "/admin/blog" },
  { icon: "payments",         label: "Thanh toán",        href: "/admin/payments" },
  { icon: "assessment",       label: "Báo cáo & thống kê", href: "/admin/analytics" },
  { icon: "notifications",    label: "Thông báo",         href: "/admin/notifications" },
  { icon: "settings",         label: "Cài đặt",           href: "/admin/settings" },
];

// ─── Toast Component ──────────────────────────────────────────────────────────
function NotifToast({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const cfg = TYPE_CONFIG[item.notif.type] ?? TYPE_CONFIG.order;

  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), 6000);
    return () => clearTimeout(t);
  }, [item.id, onDismiss]);

  return (
    <div className="flex items-start gap-3 bg-white rounded-2xl shadow-xl p-4 w-80 border border-[#a9b4b1]/10 animate-[slideInRight_0.3s_ease-out]">
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex flex-shrink-0 items-center justify-center ${cfg.color}`}>
        <span className="material-symbols-outlined text-xl">{cfg.icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[#56615f] uppercase tracking-wide mb-0.5">
          Thông báo mới
        </p>
        <p className="text-sm font-bold text-[#2a3433] truncate">{item.notif.title}</p>
        <p className="text-xs text-[#56615f] mt-0.5 line-clamp-2">{item.notif.message}</p>
      </div>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(item.id)}
        className="text-[#a9b4b1] hover:text-[#2a3433] transition-colors flex-shrink-0 mt-0.5"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname                      = usePathname();
  const [hasUnread, setHasUnread]     = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toasts, setToasts]           = useState<ToastItem[]>([]);
  const toastIdRef                    = useRef(0);
  const sseRef                        = useRef<EventSource | null>(null);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ── Initial unread count ──────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/notifications")
      .then(r => r.ok ? r.json() : [])
      .then((data: Notification[]) => {
        const count = data.filter(n => !n.is_read).length;
        setUnreadCount(count);
        setHasUnread(count > 0);
      })
      .catch(() => {});
  }, []);

  // ── SSE connection (persists across route changes) ────────────────────────
  useEffect(() => {
    // Skip if EventSource not available (SSR safety)
    if (typeof EventSource === "undefined") return;

    // Close any existing connection before opening a new one
    sseRef.current?.close();

    const es = new EventSource("/api/notifications/stream");
    sseRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Heartbeat — ignore
        if (!Array.isArray(data)) return;

        const newNotifs: Notification[] = data;
        if (newNotifs.length === 0) return;

        // Update bell badge
        setHasUnread(true);
        setUnreadCount(prev => prev + newNotifs.length);

        // Show toast for each new notification
        newNotifs.forEach(notif => {
          const toastId = ++toastIdRef.current;
          setToasts(prev => [{ id: toastId, notif }, ...prev].slice(0, 5)); // max 5 toasts
        });
      } catch {
        // malformed JSON — ignore
      }
    };

    es.onerror = () => {
      // EventSource auto-reconnects on error — nothing to do
    };

    return () => {
      es.close();
      sseRef.current = null;
    };
  }, []); // only once — SSE lives for the entire admin session

  // ── Reset unread count when visiting notifications page ──────────────────
  useEffect(() => {
    if (pathname === "/admin/notifications") {
      // Give the page a moment to mark items as read, then recheck
      const t = setTimeout(() => {
        fetch("/api/notifications")
          .then(r => r.ok ? r.json() : [])
          .then((data: Notification[]) => {
            const count = data.filter((n: Notification) => !n.is_read).length;
            setUnreadCount(count);
            setHasUnread(count > 0);
          })
          .catch(() => {});
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <>
      {/* ── Toast stack (bottom-right, above everything) ── */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map(item => (
          <div key={item.id} className="pointer-events-auto">
            <NotifToast item={item} onDismiss={dismissToast} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex bg-[#f6faf8]">
        {/* ── Sidebar ── */}
        <aside className="w-64 shrink-0 flex flex-col fixed left-0 top-0 h-screen z-50 bg-[#eef5f3] py-6 px-4 gap-2 font-['Plus_Jakarta_Sans'] text-[14px]">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-2xl">pets</span>
            </div>
            <div className="text-2xl font-black text-primary tracking-tighter">
              PetCare<span className="text-secondary font-light">Shop</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto no-scrollbar">
            {navItems.map(({ icon, label, href }) => {
              const isActive = pathname === href || pathname?.startsWith(href + "/");
              const isNotif  = href === "/admin/notifications";
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#82f6e7] text-[#006b62] font-semibold border-l-4 border-[#006b62] shadow-sm active:scale-95"
                      : "text-[#2a3433] hover:translate-x-1 hover:bg-white/40 active:scale-95 font-medium"
                  }`}
                >
                  <span
                    className="material-symbols-outlined relative"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {icon}
                    {/* Sidebar unread dot */}
                    {isNotif && hasUnread && !isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#a83836] rounded-full" />
                    )}
                  </span>
                  <span className="flex-1">{label}</span>
                  {/* Unread count badge in sidebar */}
                  {isNotif && unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#a83836] text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="mt-auto flex flex-col gap-1.5 pt-4 border-t border-[#a9b4b1]/20">
            <div className="px-4 py-3 hover:translate-x-1 hover:bg-white/40 transition-all active:scale-95 rounded-xl cursor-pointer">
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col min-w-0 ml-64">
          {/* Top Bar */}
          <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-[#f6faf8] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex justify-end items-center px-8 font-['Plus_Jakarta_Sans'] text-sm font-medium">
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                {/* Bell button */}
                <Link
                  href="/admin/notifications"
                  className="w-10 h-10 flex items-center justify-center rounded-full text-[#006b62] hover:bg-[#eef5f3] transition-colors cursor-pointer duration-200 ease-in-out relative"
                >
                  <span className="material-symbols-outlined">notifications</span>
                  {hasUnread && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#a83836] rounded-full animate-pulse" />
                  )}
                  {/* Unread count on bell */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-[#a83836] text-white px-1 py-px rounded-full min-w-[16px] text-center leading-tight">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </Link>
              </div>

              <div className="h-8 w-[1px] bg-[#a9b4b1]/30" />

              <div className="flex items-center gap-3 cursor-pointer group hover:bg-[#eef5f3] transition-colors rounded-full p-1 pr-3 duration-200 ease-in-out">
                <div className="text-right">
                  <p className="text-sm font-bold text-[#006b62] leading-none">Admin Profile</p>
                  <p className="text-[11px] text-[#2a3433] font-medium mt-1">Quản trị viên</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#c6eae3] flex flex-shrink-0 items-center justify-center font-bold text-[#006b62] overflow-hidden border-2 border-[#82f6e7] group-hover:scale-105 transition-transform">
                  A
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 pt-28 pb-12 px-8 bg-[#f6faf8]">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

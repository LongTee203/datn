"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";

const navItems = [
  { icon: "dashboard", label: "Bảng điều khiển", href: "/admin/dashboard" },
  { icon: "event", label: "Quản lý đặt lịch", href: "/admin/bookings" },
  { icon: "receipt", label: "Quản lý đơn hàng", href: "/admin/orders" },
  { icon: "person", label: "Quản lý khách hàng", href: "/admin/customers" },
  { icon: "medical_services", label: "Quản lý dịch vụ", href: "/admin/services" },
  { icon: "inventory_2", label: "Quản lý kho hàng", href: "/admin/inventory" },
  { icon: "group", label: "Quản lý nhân viên", href: "/admin/staff" },
  { icon: "edit_note", label: "Quản lý bài viết", href: "/admin/blog" },
  { icon: "payments", label: "Thanh toán", href: "/admin/payments" },
  { icon: "assessment", label: "Báo cáo & thống kê", href: "/admin/analytics" },
  { icon: "notifications", label: "Thông báo", href: "/admin/notifications" },
  { icon: "settings", label: "Cài đặt", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[#f6faf8]">
      {/* ── Sidebar ── */}
      <aside
        className="w-64 shrink-0 flex flex-col fixed left-0 top-0 h-screen z-50 bg-[#eef5f3] py-6 px-4 gap-2 font-['Plus_Jakarta_Sans'] text-[14px]"
      >
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
            const isActive = pathname === href || pathname?.startsWith(href + '/');
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
                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {icon}
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="mt-auto flex flex-col gap-1.5 pt-4 border-t border-[#a9b4b1]/20">
          <Link
            href="#"
            className="flex items-center gap-3 text-[#2a3433] px-4 py-3 hover:translate-x-1 hover:bg-white/40 transition-all active:scale-95 rounded-xl cursor-pointer"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-medium">Trợ giúp</span>
          </Link>
          <div className="px-4 py-3 hover:translate-x-1 hover:bg-white/40 transition-all active:scale-95 rounded-xl cursor-pointer">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        {/* Top Bar */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-[#f6faf8] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex justify-between items-center px-8 font-['Plus_Jakarta_Sans'] text-sm font-medium">
          <div className="flex items-center bg-[#eef5f3] px-4 py-2 rounded-full w-96 focus-within:ring-2 focus-within:ring-[#006b62]/20 transition-all">
            <span className="material-symbols-outlined text-[#56615f] text-xl">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-full text-[#2a3433] outline-none pl-2" placeholder="Tìm kiếm..." type="text" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#006b62] hover:bg-[#eef5f3] transition-colors cursor-pointer duration-200 ease-in-out relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#a83836] rounded-full"></span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#006b62] hover:bg-[#eef5f3] transition-colors cursor-pointer duration-200 ease-in-out">
                <span className="material-symbols-outlined">help</span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-[#a9b4b1]/30"></div>
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
  );
}

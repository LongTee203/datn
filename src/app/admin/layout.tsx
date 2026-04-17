import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

const navItems = [
  { icon: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
  { icon: "people", label: "Khách hàng", href: "/admin/customers" },
  { icon: "calendar_month", label: "Lịch hẹn", href: "/admin/bookings" },
  { icon: "pets", label: "Dịch vụ", href: "/admin/services" },
  { icon: "inventory_2", label: "Sản phẩm", href: "/admin/products" },
  { icon: "bar_chart", label: "Thống kê", href: "/admin/analytics" },
  { icon: "settings", label: "Cài đặt", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f1f5f9" }}>
      {/* ── Sidebar ── */}
      <aside
        className="w-64 shrink-0 flex flex-col"
        style={{ backgroundColor: "#1e293b" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 px-6 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ color: "#2D6A4F", fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </span>
          <span className="text-white font-black text-lg tracking-tight">
            PetCare
          </span>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full ml-auto"
            style={{
              backgroundColor: "rgba(45,106,79,0.20)",
              color: "#2D6A4F",
            }}
          >
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map(({ icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                {icon}
              </span>
              {label}
            </Link>
          ))}
        </nav>

        {/* User info */}
        <div
          className="px-4 py-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#2D6A4F" }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">Admin</p>
              <p
                className="text-xs truncate"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                admin@gmail.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-bold text-[#111811]">
            Quản trị PetCare Plus
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <span
                className="material-symbols-outlined text-gray-500"
                style={{ fontSize: "22px" }}
              >
                notifications
              </span>
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
                style={{ backgroundColor: "#ff9f43" }}
              >
                3
              </span>
            </button>
            <LogoutButton />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

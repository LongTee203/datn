"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/services", label: "Dịch vụ" },
  { href: "/shop", label: "Cửa hàng" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#06100c]/80 backdrop-blur-md border-b border-[#f0f4f0] dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-4">
        {/* ── Logo ── */}
        <Link href="/home" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">pets</span>
          </div>
          <h2 className="text-[#111811] dark:text-white text-xl font-black tracking-tight font-headline">
            PetCare Plus
          </h2>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors ${
                pathname === href
                  ? "text-primary"
                  : "text-[#111811] dark:text-gray-200 hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3">
          {/* Cart icon */}
          <Link
            href="/shop/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Giỏ hàng"
          >
            <span className="material-symbols-outlined text-[#111811] text-2xl">shopping_cart</span>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-[9px] font-bold flex items-center justify-center bg-red-500 text-white">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </Link>
          {user ? (
            /* Logged-in state: avatar + name + logout */
            <>
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "#2D6A4F" }}
                >
                  {user.avatar}
                </div>
                <span className="text-sm font-semibold text-[#111811]">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="flex cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-gray-100 text-[#111811] text-sm font-bold hover:bg-gray-200 transition-all"
              >
                <span className="material-symbols-outlined text-sm mr-1">logout</span>
                Đăng xuất
              </button>
            </>
          ) : (
            /* Logged-out state */
            <>
              <Link
                href="/login"
                className="hidden sm:flex cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-white border border-gray-200 text-[#111811] text-sm font-bold hover:bg-gray-50 transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                href="/booking"
                className="flex cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-primary text-white text-sm font-bold hover:brightness-110 transition-all"
              >
                Đặt lịch ngay
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

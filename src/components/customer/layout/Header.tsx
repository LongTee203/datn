"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 glass-nav border-b border-gray-100 backdrop-blur-md">
        <div className="flex justify-between items-center h-20 px-4 md:px-10 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">pets</span>
              </div>
              <div className="text-2xl font-black text-primary tracking-tighter">
                PetCare<span className="text-secondary font-light">Shop</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link className={`font-label-md text-sm transition-all ${pathname === '/' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 hover:text-primary'}`} href="/">Trang chủ</Link>
            <Link className={`font-label-md text-sm transition-all ${pathname === '/about' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 hover:text-primary'}`} href="/about">Giới thiệu</Link>
            <Link className={`font-label-md text-sm transition-all ${pathname === '/shop' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 hover:text-primary'}`} href="/shop">Sản phẩm</Link>
            <Link className={`font-label-md text-sm transition-all ${pathname === '/services' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 hover:text-primary'}`} href="/services">Dịch vụ</Link>
            <div className="relative group cursor-pointer">
              <span className={`font-label-md text-sm transition-all py-2 block ${pathname?.startsWith('/price') ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}>Bảng giá</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(41,102,76,0.15)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                <div className="p-4 space-y-4 text-left">
                  <div>
                    <h4 className="font-bold text-primary mb-2 border-b border-gray-100 pb-1">Báo giá dịch vụ chó</h4>
                    <ul className="space-y-2">
                      <li><Link href="/price/dog-grooming" className="text-sm text-slate-600 hover:text-primary block transition-colors">Cắt tỉa lông chó</Link></li>
                      <li><Link href="/price/dog-hotel" className="text-sm text-slate-600 hover:text-primary block transition-colors">Khách sạn chó</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2 border-b border-gray-100 pb-1">Báo giá dịch vụ mèo</h4>
                    <ul className="space-y-2">
                      <li><Link href="/price/cat-grooming" className="text-sm text-slate-600 hover:text-primary block transition-colors">Cắt tỉa lông mèo</Link></li>
                      <li><Link href="/price/cat-hotel" className="text-sm text-slate-600 hover:text-primary block transition-colors">Khách sạn mèo</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2 border-b border-gray-100 pb-1">Báo giá tiêm phòng vắc xin</h4>
                    <ul className="space-y-2">
                      <li><Link href="/price/vaccine" className="text-sm text-slate-600 hover:text-primary block transition-colors">Bảng giá tiêm phòng</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link className={`font-label-md text-sm transition-all ${pathname === '/article' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 hover:text-primary'}`} href="/article">Kiến thức</Link>
            <Link className={`font-label-md text-sm transition-all ${pathname === '/contact' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 hover:text-primary'}`} href="/contact">Liên hệ</Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
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
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-primary"
                  >
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-[#111811] max-w-[100px] truncate">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-gray-100 text-[#111811] text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  <span className="material-symbols-outlined text-xs mr-1">logout</span>
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link className="hidden sm:block font-label-md text-sm text-slate-600 hover:text-primary transition-all font-bold" href="/login">Đăng nhập</Link>
            )}
            <Link href="/booking" className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-label-md text-sm hover:bg-secondary transition-all active:scale-95 inline-block text-center cursor-pointer">
              Đặt lịch<span className="hidden sm:inline"> ngay</span>
            </Link>
            <button
              className="md:hidden text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-white transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center h-20 px-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">pets</span>
              </div>
              <div className="text-2xl font-black text-primary tracking-tighter">
                PetCare<span className="text-secondary font-light">Shop</span>
              </div>
            </div>
            <button className="text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col p-6 gap-6 overflow-y-auto">
            <Link className="text-xl font-bold text-primary border-b border-gray-50 pb-2" href="/" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</Link>
            <Link className="text-xl font-medium text-slate-600 hover:text-primary transition-colors" href="/about" onClick={() => setIsMobileMenuOpen(false)}>Giới thiệu</Link>
            <Link className="text-xl font-medium text-slate-600 hover:text-primary transition-colors" href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Sản phẩm</Link>
            <Link className="text-xl font-medium text-slate-600 hover:text-primary transition-colors" href="/services" onClick={() => setIsMobileMenuOpen(false)}>Dịch vụ</Link>

            {/* Nested Links for Bảng giá */}
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary-light">
              <span className="font-bold text-primary text-lg">Bảng giá</span>
              <div className="pl-4 space-y-2">
                <p className="font-semibold text-sm text-slate-700">Dịch vụ chó</p>
                <Link href="/price/dog-grooming" className="block text-slate-600 hover:text-primary py-1" onClick={() => setIsMobileMenuOpen(false)}>Cắt tỉa lông chó</Link>
                <Link href="/price/dog-hotel" className="block text-slate-600 hover:text-primary py-1" onClick={() => setIsMobileMenuOpen(false)}>Khách sạn chó</Link>
              </div>
              <div className="pl-4 space-y-2 mt-2">
                <p className="font-semibold text-sm text-slate-700">Dịch vụ mèo</p>
                <Link href="/price/cat-grooming" className="block text-slate-600 hover:text-primary py-1" onClick={() => setIsMobileMenuOpen(false)}>Cắt tỉa lông mèo</Link>
                <Link href="/price/cat-hotel" className="block text-slate-600 hover:text-primary py-1" onClick={() => setIsMobileMenuOpen(false)}>Khách sạn mèo</Link>
              </div>
              <div className="pl-4 space-y-2 mt-2">
                <p className="font-semibold text-sm text-slate-700">Tiêm phòng</p>
                <Link href="/price/vaccine" className="block text-slate-600 hover:text-primary py-1" onClick={() => setIsMobileMenuOpen(false)}>Bảng giá tiêm phòng</Link>
              </div>
            </div>

            <Link className="text-xl font-medium text-slate-600 hover:text-primary transition-colors" href="/article" onClick={() => setIsMobileMenuOpen(false)}>Kiến thức</Link>
            <Link className="text-xl font-medium text-slate-600 hover:text-primary transition-colors" href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Liên hệ</Link>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="mt-auto p-6 border-t border-gray-100 flex flex-col gap-4 bg-white">
            {user ? (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-primary">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-[#111811] truncate max-w-[100px]">{user.name}</span>
                </div>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-500 font-bold">Đăng xuất</button>
              </div>
            ) : (
              <Link className="text-center py-4 text-primary font-bold border border-primary rounded-xl" href="/login" onClick={() => setIsMobileMenuOpen(false)}>Đăng nhập</Link>
            )}
            <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-wide text-center">Đặt lịch ngay</Link>
          </div>
        </div>
      </div>
    </>
  );
}

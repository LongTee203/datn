"use client";

import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main className="pt-32 pb-24 px-4 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-[#87faab] rounded-full flex items-center justify-center animate-bounce">
          <span className="material-symbols-outlined text-5xl text-[#005f31]">check</span>
        </div>
        <div className="absolute -inset-4 bg-[#87faab]/20 rounded-full animate-pulse -z-10"></div>
      </div>
      
      <h1 className="text-4xl font-extrabold text-[#0c361d] tracking-tight mb-4 font-headline">
        Đặt hàng thành công!
      </h1>
      <p className="text-lg text-[#3b6447] max-w-lg mb-10 leading-relaxed">
        Cảm ơn bạn đã tin tưởng PetCare Shop. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý. Chúng tôi sẽ sớm liên hệ để xác nhận thông tin giao hàng.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <Link 
          href="/profile" 
          className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100"
        >
          <span className="material-symbols-outlined">person</span>
          Xem đơn hàng
        </Link>
        <Link 
          href="/shop" 
          className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary-light transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          Tiếp tục mua sắm
        </Link>
      </div>

      <div className="mt-16 flex items-center gap-2 text-sm text-[#3b6447]">
        <span className="material-symbols-outlined text-sm">support_agent</span>
        Cần hỗ trợ? Liên hệ ngay <strong className="text-primary">1900 1234</strong>
      </div>
    </main>
  );
}

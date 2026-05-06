"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = totalPrice > 0 ? 1.30 : 0;
  const discount = totalPrice > 50 ? 5 : 0;
  const grandTotal = totalPrice + shipping - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      clearCart();
      router.push('/shop/checkout/success');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-6 text-primary">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h1 className="text-2xl font-bold text-on-surface mb-2">Giỏ hàng của bạn đang trống</h1>
        <p className="text-on-surface-variant mb-8">Hãy quay lại cửa hàng để chọn những món quà tuyệt vời cho thú cưng của bạn.</p>
        <Link 
          href="/shop" 
          className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-all"
        >
          Khám phá cửa hàng
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">Thanh toán</h1>
        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
          <Link href="/shop/cart" className="hover:text-primary transition-colors">Giỏ hàng</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-bold">Thanh toán</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Shipping & Payment Info */}
        <div className="lg:col-span-7 space-y-8">
          {/* Shipping Information */}
          <section className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              Thông tin nhận hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Họ và tên</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Nguyễn Văn An" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Số điện thoại</label>
                <input required type="tel" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="0901 234 567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
                <input required type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="an.nguyen@email.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Địa chỉ giao hàng</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Số nhà, tên đường, phường/xã..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Tỉnh / Thành phố</label>
                <select required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                  <option value="">Chọn tỉnh/thành</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Quận / Huyện</label>
                <select required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                  <option value="">Chọn quận/huyện</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">payments</span>
              Phương thức thanh toán
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-primary bg-primary-light/30 rounded-2xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-primary" />
                <div className="flex-grow">
                  <p className="font-bold text-on-surface">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-xs text-on-surface-variant">Thanh toán bằng tiền mặt khi nhận hàng</p>
                </div>
                <span className="material-symbols-outlined text-primary">payments</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="payment" className="w-5 h-5 accent-primary" />
                <div className="flex-grow">
                  <p className="font-bold text-on-surface">Chuyển khoản ngân hàng</p>
                  <p className="text-xs text-on-surface-variant">Chuyển khoản qua số tài khoản ngân hàng</p>
                </div>
                <span className="material-symbols-outlined text-slate-400">account_balance</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors opacity-50">
                <input type="radio" name="payment" disabled className="w-5 h-5 accent-primary" />
                <div className="flex-grow">
                  <p className="font-bold text-on-surface">Ví điện tử (MoMo/ZaloPay)</p>
                  <p className="text-xs text-on-surface-variant">Sắp ra mắt</p>
                </div>
                <span className="material-symbols-outlined text-slate-400">account_balance_wallet</span>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100 sticky top-32">
            <h2 className="text-xl font-bold text-on-surface mb-6">Đơn hàng ({totalCount})</h2>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-on-surface line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant">SL: {item.qty}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 mb-8">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Tạm tính</span>
                <span className="font-bold text-on-surface">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Phí vận chuyển</span>
                <span className="font-bold text-on-surface">${shipping.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Giảm giá</span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-on-surface">Tổng cộng</span>
                <span className="text-2xl font-black text-primary">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary shadow-lg shadow-green-100 active:scale-[0.98]'}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">lock</span>
                  Xác nhận đặt hàng
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-on-surface-variant mt-4">
              Bằng cách đặt hàng, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của PetCare Shop.
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}

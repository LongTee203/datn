"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalPrice, totalCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Collect shipping form values via refs
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const shipping = totalPrice > 0 ? 30000 : 0;
  const discount = totalPrice > 500000 ? 50000 : 0;
  const grandTotal = totalPrice + shipping - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let receiptUrl = "";
    if (paymentMethod === "Bank" && receiptFile) {
      const fd = new FormData();
      fd.append("file", receiptFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        receiptUrl = data.url;
      }
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: user?.id ?? null,
          total_amount: grandTotal,
          payment_method: paymentMethod,
          receipt_image: receiptUrl || null,
          status: "Pending",
          items: items.map(i => ({ id: i.id, qty: i.qty, price: i.price })),
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || errData.error || "Đặt hàng thất bại");
      }
      clearCart();
      router.push("/shop/checkout/success");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
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
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Số nhà, tên đường..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Tỉnh / Thành phố</label>
                <input
                  required
                  list="provinces"
                  name="province"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Nhập hoặc chọn tỉnh/thành..."
                />
                <datalist id="provinces">
                  <option value="An Giang" />
                  <option value="Bà Rịa - Vũng Tàu" />
                  <option value="Bắc Giang" />
                  <option value="Bắc Kạn" />
                  <option value="Bạc Liêu" />
                  <option value="Bắc Ninh" />
                  <option value="Bến Tre" />
                  <option value="Bình Định" />
                  <option value="Bình Dương" />
                  <option value="Bình Phước" />
                  <option value="Bình Thuận" />
                  <option value="Cà Mau" />
                  <option value="Cần Thơ" />
                  <option value="Cao Bằng" />
                  <option value="Đà Nẵng" />
                  <option value="Đắk Lắk" />
                  <option value="Đắk Nông" />
                  <option value="Điện Biên" />
                  <option value="Đồng Nai" />
                  <option value="Đồng Tháp" />
                  <option value="Gia Lai" />
                  <option value="Hà Giang" />
                  <option value="Hà Nam" />
                  <option value="Hà Nội" />
                  <option value="Hà Tĩnh" />
                  <option value="Hải Dương" />
                  <option value="Hải Phòng" />
                  <option value="Hậu Giang" />
                  <option value="Hòa Bình" />
                  <option value="Hưng Yên" />
                  <option value="Khánh Hòa" />
                  <option value="Kiên Giang" />
                  <option value="Kon Tum" />
                  <option value="Lai Châu" />
                  <option value="Lâm Đồng" />
                  <option value="Lạng Sơn" />
                  <option value="Lào Cai" />
                  <option value="Long An" />
                  <option value="Nam Định" />
                  <option value="Nghệ An" />
                  <option value="Ninh Bình" />
                  <option value="Ninh Thuận" />
                  <option value="Phú Thọ" />
                  <option value="Phú Yên" />
                  <option value="Quảng Bình" />
                  <option value="Quảng Nam" />
                  <option value="Quảng Ngãi" />
                  <option value="Quảng Ninh" />
                  <option value="Quảng Trị" />
                  <option value="Sóc Trăng" />
                  <option value="Sơn La" />
                  <option value="Tây Ninh" />
                  <option value="Thái Bình" />
                  <option value="Thái Nguyên" />
                  <option value="Thanh Hóa" />
                  <option value="Thừa Thiên Huế" />
                  <option value="Tiền Giang" />
                  <option value="TP Hồ Chí Minh" />
                  <option value="Trà Vinh" />
                  <option value="Tuyên Quang" />
                  <option value="Vĩnh Long" />
                  <option value="Vĩnh Phúc" />
                  <option value="Yên Bái" />
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Xã / Phường</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Nhập xã/phường..." />
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
                <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={e => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-primary" />
                <div className="flex-grow">
                  <p className="font-bold text-on-surface">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-xs text-on-surface-variant">Thanh toán bằng tiền mặt khi nhận hàng</p>
                </div>
                <span className="material-symbols-outlined text-primary">payments</span>
              </label>
              <label className="flex flex-col border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 p-4" onClick={() => setPaymentMethod("Bank")}>
                  <input type="radio" name="payment" value="Bank" checked={paymentMethod === "Bank"} onChange={e => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-primary" />
                  <div className="flex-grow">
                    <p className="font-bold text-on-surface">Chuyển khoản ngân hàng</p>
                    <p className="text-xs text-on-surface-variant">Chuyển khoản qua số tài khoản ngân hàng</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">account_balance</span>
                </div>
                {paymentMethod === "Bank" && (
                  <div className="pl-14 pr-4 pb-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm font-bold text-on-surface mb-2">Thông tin chuyển khoản:</p>
                      <p className="text-sm text-on-surface-variant">Ngân hàng: <strong>Vietcombank</strong></p>
                      <p className="text-sm text-on-surface-variant">Số tài khoản: <strong>1903123456789</strong></p>
                      <p className="text-sm text-on-surface-variant">Chủ tài khoản: <strong>PET CARE SHOP</strong></p>
                      <p className="text-sm text-on-surface-variant mb-4">Nội dung: <strong>Thanh toan don hang {user?.email || ""}</strong></p>

                      <label className="block text-sm font-bold text-on-surface mb-2">Tải lên ảnh chuyển khoản (Bắt buộc)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setReceiptFile(file);
                            setReceiptPreview(URL.createObjectURL(file));
                          }
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-[#6ef096] cursor-pointer"
                      />
                      {receiptPreview && (
                        <div className="mt-4 relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                          <img src={receiptPreview} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50 bg-[#eef5f3]">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-[#56615f]">inventory_2</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-on-surface line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant">SL: {item.qty}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{(item.price * item.qty).toLocaleString("vi-VN")}đ</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 mb-8">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Tạm tính</span>
                <span className="font-bold text-on-surface">{totalPrice.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Phí vận chuyển</span>
                <span className="font-bold text-on-surface">{shipping.toLocaleString("vi-VN")}đ</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Giảm giá</span>
                  <span className="font-bold">-{discount.toLocaleString("vi-VN")}đ</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-on-surface">Tổng cộng</span>
                <span className="text-2xl font-black text-primary">{grandTotal.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || (paymentMethod === "Bank" && !receiptFile)}
              className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  Xác nhận đặt hàng
                  <span className="material-symbols-outlined">shopping_bag</span>
                </>
              )}
            </button>
            {paymentMethod === "Bank" && !receiptFile && (
              <p className="text-xs text-error text-center mt-2">Vui lòng tải lên ảnh chuyển khoản.</p>
            )}
            <p className="text-[10px] text-center text-on-surface-variant mt-4">
              Bằng cách đặt hàng, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của PetCare Shop.
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalCount, totalPrice, removeItem, updateQty } = useCart();

  const shipping = totalPrice > 0 ? 30000 : 0;
  const discount = totalPrice > 500000 ? 50000 : 0;
  const grandTotal = totalPrice + shipping - discount;

  return (
    <div className="bg-white text-[#0c361d] min-h-screen">
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/shop"
              className="flex items-center gap-1 text-sm text-[#3b6447] hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Tiếp tục mua sắm
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0c361d] font-headline">
            Giỏ hàng của bạn
          </h1>
          <p className="text-[#3b6447] font-medium mt-1">
            {totalCount > 0
              ? `Bạn có ${totalCount} sản phẩm trong giỏ hàng.`
              : "Giỏ hàng đang trống."}
          </p>
        </header>

        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <span className="material-symbols-outlined text-7xl text-[#acecbb]">
              shopping_cart
            </span>
            <p className="text-xl font-bold text-[#0c361d]">
              Chưa có sản phẩm nào trong giỏ
            </p>
            <Link
              href="/shop"
              className="px-8 py-4 rounded-full font-bold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#2D6A4F" }}
            >
              Khám phá cửa hàng
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* ── Items list ── */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#cafdd4] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 group transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-[#b8f5c3]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-[#3b6447]">pets</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-lg font-bold text-[#0c361d]">{item.name}</h3>
                    <p className="text-[#3b6447] text-sm mb-4">{item.desc}</p>

                    <div className="flex items-center justify-center md:justify-start gap-4">
                      {/* Qty control */}
                      <div className="flex items-center bg-white rounded-full border border-[#acecbb] p-1 gap-1">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#cafdd4] rounded-full transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="px-4 font-bold text-[#0c361d]">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#cafdd4] rounded-full transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 font-medium text-sm flex items-center gap-1 hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Xóa
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-[#2D6A4F]">
                      {(item.price * item.qty).toLocaleString("vi-VN")}đ
                    </p>
                    {item.qty > 1 && (
                      <p className="text-xs text-[#3b6447]">
                        {item.price.toLocaleString("vi-VN")}đ × {item.qty}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Order summary ── */}
            <div className="lg:col-span-4">
              <div className="bg-emerald-50 rounded-2xl p-8 sticky top-28 border border-emerald-100">
                <h2 className="text-2xl font-bold text-[#0c361d] mb-6 font-headline">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#3b6447]">
                    <span>Tạm tính</span>
                    <span className="font-semibold text-[#0c361d]">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3b6447]">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold text-[#0c361d]">
                      {shipping.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#3b6447]">
                      <span>Giảm giá</span>
                      <span className="font-semibold text-emerald-600">
                        -{discount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  )}
                  <div className="border-t border-emerald-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-[#0c361d]">Tổng cộng</span>
                      <span className="text-2xl font-extrabold text-[#2D6A4F]">
                        {grandTotal.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <p className="text-xs text-[#3b6447] text-right mt-1">(Đã bao gồm VAT)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/shop/checkout"
                    className="w-full py-4 rounded-full font-extrabold text-lg hover:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#87faab", color: "#005f31" }}
                  >
                    Tiến hành thanh toán
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                  <Link
                    href="/shop"
                    className="block w-full text-center py-4 rounded-full font-bold border border-emerald-200 text-emerald-800 hover:bg-white transition-colors"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>

                {/* Trust badge */}
                <div className="mt-6 p-4 bg-white/60 rounded-xl border border-emerald-100">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-emerald-600">
                      verified_user
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#0c361d]">Thanh toán an toàn</p>
                      <p className="text-xs text-[#3b6447]">
                        Dữ liệu của bạn được mã hóa và bảo mật tuyệt đối.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── "Có thể bạn quan tâm" bento ── */}
        {items.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0c361d] mb-8 font-headline">
              Có thể bạn quan tâm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-[#cafdd4] rounded-2xl p-6 relative overflow-hidden h-56 flex flex-col justify-end">
                <span className="bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-xs font-bold w-fit mb-2">
                  ƯU ĐÃI THÁNG
                </span>
                <h3 className="text-2xl font-bold text-emerald-900">Gói Chăm Sóc Spa Tại Nhà</h3>
                <p className="text-emerald-800/70 mb-4">Combo thảo mộc hữu cơ giảm 20%</p>
                <Link
                  href="/shop"
                  className="bg-white text-emerald-900 px-6 py-2 rounded-full font-bold w-fit hover:scale-105 transition-transform inline-block"
                >
                  Xem ngay
                </Link>
              </div>
              <div className="bg-[#87faab] rounded-2xl p-6 flex flex-col justify-between">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#2D6A4F]">eco</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#004a25] text-lg">Đồ chơi bền vững</h3>
                  <p className="text-[#004a25]/70 text-sm">Nhựa sinh học 100%</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

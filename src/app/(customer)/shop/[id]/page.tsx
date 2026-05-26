"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  product_id: number;
  product_name: string;
  category_name: string;
  price: number;
  stock: number;
  description: string;
  details: string;
  specifications: string;
  image: string; // JSON array string
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${resolvedParams.id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await res.json();
        setProduct(data);
        
        let parsedImages: string[] = [];
        if (data.image) {
          try {
            parsedImages = JSON.parse(data.image);
            if (!Array.isArray(parsedImages)) parsedImages = [data.image];
          } catch {
            parsedImages = [data.image];
          }
        }
        setImages(parsedImages);
        if (parsedImages.length > 0) setActiveImage(parsedImages[0]);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [resolvedParams.id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;
    // Cap quantity at available stock
    const safeQty = Math.min(quantity, product.stock);
    for (let i = 0; i < safeQty; i++) {
      addItem({
        id:       product.product_id,
        name:     product.product_name,
        desc:     product.description || "",
        price:    Number(product.price),
        imageUrl: images.length > 0 ? images[0] : null,
      });
    }
    alert(`Đã thêm ${safeQty} sản phẩm vào giỏ hàng!`);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };

  if (loading) {
    return (
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 bg-[#f6f8f6] min-h-screen flex flex-col items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-[#006b62] text-5xl mb-4">progress_activity</span>
        <p className="text-[#56615f] font-medium">Đang tải sản phẩm...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 bg-[#f6f8f6] min-h-screen flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-[#a83836] text-6xl mb-4">error</span>
        <h2 className="text-2xl font-bold text-[#2a3433] mb-2">Lỗi tải sản phẩm</h2>
        <p className="text-[#56615f] mb-6">{error || "Sản phẩm không tồn tại hoặc đã bị xóa."}</p>
        <Link href="/shop" className="px-6 py-3 bg-[#006b62] text-white rounded-full font-bold hover:bg-[#005e56]">
          Quay lại cửa hàng
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 bg-[#f6f8f6] min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-[#56615f] text-sm font-medium">
        <Link href="/" className="hover:text-[#006b62] transition-colors">Trang chủ</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/shop" className="hover:text-[#006b62] transition-colors">Cửa hàng</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#2a3433] font-semibold">{product.product_name}</span>
      </nav>

      {/* Product Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left: Product Image & Gallery */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm flex items-center justify-center">
            {activeImage ? (
              <img 
                alt={product.product_name} 
                className="w-full h-full object-cover transition-all duration-300" 
                src={activeImage}
              />
            ) : (
              <span className="material-symbols-outlined text-9xl text-slate-300">inventory_2</span>
            )}
            {product.stock < 10 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Sắp hết hàng
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${activeImage === img ? 'ring-2 ring-[#006b62] ring-offset-2' : 'hover:opacity-80 border border-slate-200'}`}
                >
                  <img className="w-full h-full object-cover bg-white" src={img} alt={`Gallery ${idx}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <span className="px-3 py-1 bg-[#eef5f3] text-[#006b62] text-xs font-bold uppercase tracking-wider rounded-md mb-3 inline-block">
              {product.category_name || "Khác"}
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2a3433] tracking-tight mb-2 leading-tight">
              {product.product_name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`material-symbols-outlined fill-1`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="ml-2 text-[#2a3433] font-semibold">5.0</span>
              </div>
              <span className="text-[#56615f] text-sm">(Chưa có đánh giá)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-[#006b62]">{Number(product.price).toLocaleString('vi-VN')}đ</span>
          </div>

          <div className="space-y-4">
            <p className="text-[#56615f] leading-relaxed text-lg whitespace-pre-line">
              {product.description || "Chưa có mô tả ngắn."}
            </p>
          </div>

          {/* Product Controls */}
          <div className="space-y-6 pt-6 border-t border-slate-200 mt-2">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm uppercase tracking-wider text-[#56615f]">Số lượng</span>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center bg-white border border-slate-200 rounded-full px-2 py-1 shadow-sm">
                  <button onClick={decreaseQuantity} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-[#2a3433]" disabled={product.stock === 0}>
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-[#2a3433]">{quantity}</span>
                  <button onClick={increaseQuantity} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-[#2a3433]" disabled={product.stock === 0}>
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
                <span className="text-sm text-[#56615f] italic">
                  {product.stock > 0 ? `Còn ${product.stock} sản phẩm trong kho` : <span className="text-red-500 font-bold">Hết hàng</span>}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="px-8 py-4 rounded-full border-2 border-[#006b62] text-[#006b62] font-bold hover:bg-[#006b62]/5 disabled:opacity-50 disabled:hover:bg-transparent transition-all text-center flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Thêm vào giỏ
              </button>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="px-8 py-4 rounded-full bg-[#006b62] text-white font-bold hover:bg-[#005e56] disabled:opacity-50 disabled:hover:bg-[#006b62] transition-all text-center shadow-lg shadow-[#006b62]/20"
              >
                Mua Ngay
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-4">
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#005e56]">local_shipping</span>
              <span className="text-xs font-medium text-[#56615f]">Giao hàng toàn quốc</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#005e56]">verified_user</span>
              <span className="text-xs font-medium text-[#56615f]">100% Chất lượng</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#005e56]">support_agent</span>
              <span className="text-xs font-medium text-[#56615f]">Hỗ trợ tận tâm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {/* Left: Details */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#2a3433] flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="material-symbols-outlined text-[#006b62] text-3xl">description</span>
            Đặc điểm nổi bật
          </h2>
          
          <div className="prose prose-lg max-w-none text-[#56615f] whitespace-pre-wrap leading-relaxed">
            {product.details ? product.details : (
              <div className="italic text-slate-400">Đang cập nhật...</div>
            )}
          </div>
        </div>

        {/* Right: Specifications */}
        <div className="bg-[#f6f8f6] rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#006b62] flex items-center gap-3 border-b border-slate-200 pb-4">
            <span className="material-symbols-outlined text-[#006b62] text-3xl">info</span>
            Thông tin chi tiết sản phẩm
          </h2>
          
          <div className="prose prose-lg max-w-none text-[#56615f] whitespace-pre-wrap leading-relaxed">
            {product.specifications ? product.specifications : (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 italic shadow-sm">
                Nhà cung cấp chưa cập nhật nội dung chi tiết cho sản phẩm này.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

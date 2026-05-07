"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Mock product data (in a real app, fetch based on resolvedParams.id)
  const product = {
    id: Number(resolvedParams.id),
    name: "Thực Phẩm Mèo Hữu Cơ: Vị Cá Hồi & Rau Củ",
    price: 585000,
    oldPrice: 720000,
    desc: "Dòng sản phẩm thượng hạng được chế biến từ cá hồi tươi đánh bắt bền vững, kết hợp cùng các loại rau củ hữu cơ. Cung cấp đầy đủ dưỡng chất thiết yếu giúp mèo của bạn có bộ lông óng mượt và hệ tiêu hóa khỏe mạnh.",
    rating: 5,
    reviews: 128,
    stock: 15,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB23-63VyaRKz1_lWYRYyt7M-j3LpOf0xfklgiQMw09dtoHunDVKj9KF0y-o7T79EXKky7rwq-UfCZ995DUGqqvuV-5q2FyIY6FNhLlaceb8Xet7ycEETBX6dyOuYN1KlR8Fa2KaqJBNWE7qFIFLf9fUMnJW18vxTqb_5M9eGZJIq-gCl-P1uoe6AVJYFx5VRCcEhtzHdOICmivyAmOnDZ_-4Pzg4m5MMm3LUiLNF8Sf_LQa5REFXs03R0PS0jhgJuwyMt_xE5Kk4kA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCstMK-QGiM_wmKMMIx9PFdGspKC4t6QixwCmJvxz2T-YDc3FerCslR-wBv0ZD6eqzmmka7329gKVmD6artGVvLO3PXFeTbJpZI_kr-wvuHOnrDXd4QTVqr9JUG1lDFTUQmdMTCasBDbr-ZDsCVdh4sl1OIWDFSRjkpsgWhTTs9T-USHn-xWOF_WwEQQfuMtMW-FTQHWfTjeJkc3eGQXKBOxCytY0ci2U9hjyG4l_gIXrmC3cQZ6RSQxrJz6Bep0o-dkyvyvuBWfhDi",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZXjSOkZ7-hdb7XONDHWEd4OxY2FFuwBOa2WW4Z6itaiuNC1SmEWsEI75UJO70SpY93qVeBGOmtJXGuZ-Sm-T5AdLd8ShaGC8-qcJGw7svlr-GwhLRoFQtG7my2flelqhEGEw0Erj8Ulu92aC6HMzoJw_9ERs9v0a3nNhB-QB9Dv19dmkIDQ1v51esV4DAWzhI5hektM_qu2Q3HN3druqsSPl7JVcWzMPm0tqiI7ii8OlwxH2Xy8nXQFfuiYjn65FZO17y4ymPEjNK",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKqs_2ZwS0yeNaZW8H-iC4iXwV-JSS59gKh9lqCcJdjkYodNFI3Q2iDbFpbi5MPIqjL56nVYK1Z5eYxyWz0F_ERUdT6nocWFF7gWWygbyUi428cxzxVND7Tq8aL415PyGXdwYf8skAJvGw8dOU5CMzTYjTwX56JW7QTWSBNXompUPH4ck9LUlucPOkvbGusmrLkxg-TxC0R4CM3n6ix5azk_m_Ng6-z7qTfO9fvg0bl94herW_vy2ZARRUh4UEFMknNJE2_hLK20kn"
    ]
  };

  const [activeImage, setActiveImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    // Add the item multiple times if quantity > 1 (or update CartContext to handle quantity)
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        desc: product.desc,
        price: product.price,
        imageUrl: product.images[0]
      });
    }
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  return (
    <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 bg-[#f6f8f6] min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-[#56615f] text-sm font-medium">
        <Link href="/" className="hover:text-[#006b62] transition-colors">Trang chủ</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/shop" className="hover:text-[#006b62] transition-colors">Cửa hàng</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#2a3433] font-semibold">{product.name}</span>
      </nav>

      {/* Product Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left: Product Image & Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <img 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-300" 
              src={activeImage}
            />
            <div className="absolute top-4 left-4 bg-[#006b62] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">Mới nhất</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${activeImage === img ? 'ring-2 ring-[#006b62] ring-offset-2' : 'hover:opacity-80 border border-slate-200'}`}
              >
                <img className="w-full h-full object-cover" src={img} alt={`Gallery ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2a3433] tracking-tight mb-2 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`material-symbols-outlined ${i < product.rating ? "fill-1" : ""}`} style={i < product.rating ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                ))}
                <span className="ml-2 text-[#2a3433] font-semibold">4.8</span>
              </div>
              <span className="text-[#56615f] text-sm">({product.reviews} đánh giá)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-[#006b62]">{product.price.toLocaleString('vi-VN')}đ</span>
            {product.oldPrice && (
              <span className="text-xl text-[#56615f] line-through">{product.oldPrice.toLocaleString('vi-VN')}đ</span>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-[#56615f] leading-relaxed text-lg">
              {product.desc}
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-center gap-3 text-[#2a3433]">
                <span className="material-symbols-outlined text-[#006b62] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-medium text-[15px]">100% Nguyên liệu Hữu cơ (Organic)</span>
              </li>
              <li className="flex items-center gap-3 text-[#2a3433]">
                <span className="material-symbols-outlined text-[#006b62] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-medium text-[15px]">Không chất bảo quản nhân tạo</span>
              </li>
              <li className="flex items-center gap-3 text-[#2a3433]">
                <span className="material-symbols-outlined text-[#006b62] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-medium text-[15px]">Giàu Omega-3 và Vitamin thiết yếu</span>
              </li>
            </ul>
          </div>

          {/* Product Controls */}
          <div className="space-y-6 pt-6 border-t border-slate-200 mt-2">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm uppercase tracking-wider text-[#56615f]">Số lượng</span>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center bg-white border border-slate-200 rounded-full px-2 py-1 shadow-sm">
                  <button onClick={decreaseQuantity} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-[#2a3433]">
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-[#2a3433]">{quantity}</span>
                  <button onClick={increaseQuantity} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-[#2a3433]">
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
                <span className="text-sm text-[#56615f] italic">Chỉ còn {product.stock} sản phẩm trong kho</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleAddToCart}
                className="px-8 py-4 rounded-full border-2 border-[#006b62] text-[#006b62] font-bold hover:bg-[#006b62]/5 transition-all text-center flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Thêm vào giỏ
              </button>
              <button 
                onClick={handleAddToCart}
                className="px-8 py-4 rounded-full bg-[#006b62] text-white font-bold hover:bg-[#005e56] transition-all text-center shadow-lg shadow-[#006b62]/20"
              >
                Mua Ngay
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-4">
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#005e56]">local_shipping</span>
              <span className="text-xs font-medium text-[#56615f]">Giao hàng miễn phí</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#005e56]">verified_user</span>
              <span className="text-xs font-medium text-[#56615f]">100% Chính hãng</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#005e56]">history</span>
              <span className="text-xs font-medium text-[#56615f]">Đổi trả 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description Tabs */}
      <div className="bg-white rounded-3xl p-10 mb-24 border border-slate-200 shadow-sm">
        <h2 className="text-3xl font-bold mb-8 text-[#2a3433]">Thông tin chi tiết sản phẩm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#006b62]">Công dụng & Đặc điểm</h3>
            <p className="text-[#56615f] leading-relaxed">
              Sản phẩm được nghiên cứu bởi các chuyên gia thú y hàng đầu, đảm bảo cung cấp tỉ lệ vàng giữa Protein và chất xơ. Nguyên liệu cá hồi được sấy lạnh để giữ nguyên dưỡng chất và hương vị tươi ngon tự nhiên nhất.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-[#56615f]">Loại sản phẩm</span>
                <span className="text-[#2a3433] font-medium">Hạt khô hữu cơ</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-[#56615f]">Độ tuổi phù hợp</span>
                <span className="text-[#2a3433] font-medium">Mọi lứa tuổi</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-[#56615f]">Trọng lượng</span>
                <span className="text-[#2a3433] font-medium">2.5 kg</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f6f8f6] p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-[#006b62] mb-6">Thành phần dinh dưỡng</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-[#006b62] h-3 rounded-full w-[35%]"></div>
                </div>
                <span className="text-sm font-bold w-32 text-[#2a3433]">Protein (35%)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-[#006b62] h-3 rounded-full w-[18%]"></div>
                </div>
                <span className="text-sm font-bold w-32 text-[#2a3433]">Chất béo (18%)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-[#006b62] h-3 rounded-full w-[5%]"></div>
                </div>
                <span className="text-sm font-bold w-32 text-[#2a3433]">Chất xơ (5%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

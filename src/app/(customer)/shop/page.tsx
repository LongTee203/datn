"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  { name: "Thức ăn", icon: "restaurant" },
  { name: "Đồ chơi", icon: "sports_tennis" },
  { name: "Phụ kiện", icon: "link" },
  { name: "Chăm sóc lông", icon: "content_cut" },
];

interface Product {
  product_id: number;
  product_name: string;
  category_name: string;
  price: string | number;
  stock: number;
  description: string;
  image: string; // JSON string array or simple string
  created_at: string;
}

export default function ShopPage() {
  const { addItem, totalCount } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const activeCategoryName = CATEGORIES[activeCategoryIdx].name;

  function normalizeCategory(cat: string | null) {
    if (!cat) return "Thức ăn";
    const lower = cat.toLowerCase();
    if (lower.includes("thuc an") || lower.includes("thức ăn")) return "Thức ăn";
    if (lower.includes("do choi") || lower.includes("đồ chơi")) return "Đồ chơi";
    if (lower.includes("phu kien") || lower.includes("phụ kiện")) return "Phụ kiện";
    if (lower.includes("cham soc") || lower.includes("chăm sóc")) return "Chăm sóc lông";
    return "Thức ăn"; // Fallback to Thức ăn for anything else to ensure it displays somewhere
  }

  const filtered = products.filter((p) => {
    const pCat = normalizeCategory(p.category_name);
    const isCategoryMatch = pCat === activeCategoryName;
    const isSearchMatch = p.product_name.toLowerCase().includes(search.toLowerCase());
    const isPriceMatch = Number(p.price) <= maxPrice;
    return isCategoryMatch && isSearchMatch && isPriceMatch;
  });

  filtered.sort((a, b) => {
    const priceA = Number(a.price);
    const priceB = Number(b.price);
    if (sortOption === "price-asc") return priceA - priceB;
    if (sortOption === "price-desc") return priceB - priceA;
    if (sortOption === "rating") return 0; // Not applicable for DB yet
    return b.product_id - a.product_id; // newest
  });

  const parseImage = (imageString: string | null) => {
    if (!imageString) return null;
    try {
      const parsed = JSON.parse(imageString);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : imageString;
    } catch {
      return imageString;
    }
  };

  function handleAdd(p: Product) {
    if (p.stock <= 0) return; // guard: prevent adding out-of-stock
    const priceNum = Number(p.price);
    addItem({
      id:       p.product_id,
      name:     p.product_name,
      desc:     p.description || "",
      price:    priceNum,
      imageUrl: parseImage(p.image) || null,
    });
    setAddedId(p.product_id);
    setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <div className="bg-[#f6f8f6] min-h-screen text-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">

        {/* ── Top bar: breadcrumb + cart icon ── */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex text-sm text-slate-500 gap-2 items-center">
            <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
              Trang chủ
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 font-medium">Cửa hàng</span>
          </nav>

          {/* Cart button */}
          <Link
            href="/shop/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: "#2D6A4F", color: "#fff" }}
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            <span className="hidden sm:inline">Giỏ hàng</span>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-red-500 text-white">
                {totalCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 h-fit lg:sticky lg:top-24">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#2a3433]">Danh mục</h3>
              <div className="space-y-1">
                {CATEGORIES.map(({ icon, name }, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategoryIdx(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-left text-sm transition-colors ${
                      activeCategoryIdx === i
                      ? "bg-[#2D6A4F]/10 text-[#2D6A4F] font-bold"
                      : "hover:bg-slate-100 text-slate-700"
                      }`}
                  >
                    <span className={`material-symbols-outlined ${activeCategoryIdx === i ? "fill-1" : ""}`}>
                      {icon}
                    </span>
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold mb-4 text-[#2a3433]">Khoảng giá: <span className="text-[#006b62]">0đ - {maxPrice.toLocaleString("vi-VN")}đ</span></h3>
              <div className="px-2">
                <style>{`
                  .custom-range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #2D6A4F;
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 0 0 2px #2D6A4F, 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    transition: transform 0.1s;
                  }
                  .custom-range::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                  }
                  .custom-range::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #2D6A4F;
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 0 0 2px #2D6A4F, 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    transition: transform 0.1s;
                  }
                  .custom-range::-moz-range-thumb:hover {
                    transform: scale(1.1);
                  }
                `}</style>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2.5 rounded-full appearance-none cursor-pointer outline-none custom-range"
                  style={{
                    background: `linear-gradient(to right, #2D6A4F 0%, #2D6A4F ${(maxPrice / 2000000) * 100}%, #e2e8f0 ${(maxPrice / 2000000) * 100}%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-3 font-medium">
                  <span>0đ</span><span>2.000.000đ</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Product grid ── */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[#2a3433]">{CATEGORIES[activeCategoryIdx].name}</h1>
                <p className="text-slate-500 text-sm">{filtered.length} sản phẩm</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    search
                  </span>
                  <input
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-full focus:ring-2 focus:ring-[#2D6A4F]/30 outline-none"
                    placeholder="Tìm sản phẩm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select
                  className="bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 outline-none font-medium text-slate-700"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá thấp → cao</option>
                  <option value="price-desc">Giá cao → thấp</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#2D6A4F]">
                <span className="material-symbols-outlined animate-spin text-4xl mb-4">progress_activity</span>
                <p className="font-medium">Đang tải sản phẩm...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
                <p className="font-medium">Không tìm thấy sản phẩm phù hợp trong mục này.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => {
                  const imageUrl = parseImage(p.image);
                  return (
                    <div
                      key={p.product_id}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                      <div className="relative aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-4">
                        <Link href={`/shop/${p.product_id}`} className="w-full h-full block relative flex items-center justify-center">
                          {imageUrl ? (
                            <Image src={imageUrl} alt={p.product_name} fill className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <span className="material-symbols-outlined text-6xl text-slate-300 group-hover:scale-110 transition-transform duration-300">inventory_2</span>
                          )}
                        </Link>
                        {p.stock === 0 ? (
                          <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase bg-gray-500 text-white shadow-sm">
                            Hết hàng
                          </span>
                        ) : p.stock < 10 ? (
                          <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase bg-red-500 text-white shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Sắp hết hàng
                          </span>
                        ) : null}
                        <button className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur shadow-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-all">
                          <span className="material-symbols-outlined text-[18px]">favorite</span>
                        </button>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <Link href={`/shop/${p.product_id}`}>
                          <h3 className="font-bold text-slate-900 truncate hover:text-[#2D6A4F] transition-colors mb-1">{p.product_name}</h3>
                        </Link>
                        <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">{p.description || "Chưa có mô tả ngắn"}</p>
                        <div className="flex items-end justify-between gap-2 mt-auto">
                          <div>
                            <span className="text-[19px] font-extrabold text-[#2a3433]">
                              {Number(p.price).toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                          <button
                            onClick={() => handleAdd(p)}
                            disabled={p.stock === 0}
                            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                              p.stock === 0
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : addedId === p.product_id
                                ? "bg-green-500 text-white scale-95"
                                : "bg-[#2D6A4F] text-white hover:bg-[#1f4a37] hover:shadow-lg hover:shadow-[#2D6A4F]/20"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {p.stock === 0 ? "remove_shopping_cart" : addedId === p.product_id ? "check" : "add_shopping_cart"}
                            </span>
                            <span className="hidden sm:inline">
                              {p.stock === 0 ? "Hết hàng" : addedId === p.product_id ? "Đã thêm" : "Thêm"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

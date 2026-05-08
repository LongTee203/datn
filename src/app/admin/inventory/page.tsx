"use client";
import React, { useState, useEffect, useCallback } from "react";

interface Product {
  product_id: number;
  product_name: string;
  category_id: number;
  category_name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  created_at: string;
}

interface Category {
  category_id: number;
  category_name: string;
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " VNĐ";
}

export default function InventoryPage() {
  const [products, setProducts]         = useState<Product[]>([]);
  const [categories, setCategories]     = useState<Category[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [search, setSearch]             = useState("");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen]   = useState(false);
  const [editingProduct, setEditingProduct]   = useState<Product | null>(null);

  // Add/Edit form
  const [form, setForm] = useState({
    product_name: "", category_id: "", price: "", stock: "", description: "", image: ""
  });
  const [saving, setSaving] = useState(false);

  /* ── Fetch ── */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set("category", filterCategory);
      if (search)         params.set("search",   search);
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Không tải được dữ liệu sản phẩm");
      setProducts(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filterCategory, search]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) setCategories(await res.json());
    } catch { /* ignore – categories table may not have an endpoint yet */ }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => {
    const t = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(t);
  }, [fetchProducts]);

  /* ── Actions ── */
  const deleteProduct = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    setProducts(prev => prev.filter(p => p.product_id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch { fetchProducts(); }
  };

  const openAdd = () => {
    setForm({ product_name: "", category_id: "", price: "", stock: "", description: "", image: "" });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      product_name: p.product_name,
      category_id: String(p.category_id ?? ""),
      price: String(p.price),
      stock: String(p.stock),
      description: p.description ?? "",
      image: p.image ?? "",
    });
    setEditingProduct(p);
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      product_name: form.product_name,
      category_id:  form.category_id ? Number(form.category_id) : null,
      price:        Number(form.price),
      stock:        Number(form.stock),
      description:  form.description,
      image:        form.image,
    };

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.product_id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Cập nhật thất bại");
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Tạo sản phẩm thất bại");
      }
      setIsAddModalOpen(false);
      fetchProducts();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const lowStockCount = products.filter(p => p.stock < 5).length;
  const totalValue    = products.reduce((s, p) => s + Number(p.price) * Number(p.stock), 0);

  /* ── Render ── */
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-1">Quản lý kho hàng</h2>
          <p className="text-[#56615f] font-medium">Cập nhật và theo dõi vật dụng thú cưng tại cửa hàng.</p>
        </div>
        <button onClick={openAdd}
          className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-8 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined">add_circle</span>
          Thêm sản phẩm
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { icon: "inventory_2", color: "bg-[#82f6e7]/30 text-[#006b62]", label: "Tổng sản phẩm", value: products.length },
          { icon: "category",   color: "bg-[#c6eae3]/30 text-[#446560]", label: "Danh mục",      value: new Set(products.map(p => p.category_name)).size },
          { icon: "warning",    color: "bg-[#fa746f]/30 text-[#a83836]", label: "Sắp hết hàng",  value: lowStockCount, red: true },
          { icon: "payments",   color: "bg-[#b6e7fe]/30 text-[#346578]", label: "Giá trị kho",   value: formatCurrency(totalValue) },
        ].map((s, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm flex flex-col gap-2 ${s.red && s.value > 0 ? "border-2 border-[#a83836]/20" : ""}`}>
            <div className="flex justify-between items-start">
              <span className={`p-3 ${s.color} rounded-full material-symbols-outlined`}>{s.icon}</span>
            </div>
            <p className="text-sm font-medium text-[#56615f]">{s.label}</p>
            <h3 className={`text-2xl font-extrabold ${s.red && s.value > 0 ? "text-[#a83836]" : "text-[#2a3433]"}`}>{s.value}</h3>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStockCount > 0 && (
        <div className="mb-8 bg-[#fa746f]/10 p-6 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#a83836]" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
            <div>
              <h4 className="text-base font-extrabold text-[#6e0a12]">Cảnh báo tồn kho thấp</h4>
              <p className="text-sm text-[#6e0a12]/80">{lowStockCount} sản phẩm dưới 5 đơn vị — cần nhập thêm.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-[#eef5f3] p-4 rounded-xl">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a9b4b1] text-sm">search</span>
          <input type="text" placeholder="Tìm sản phẩm..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#006b62]/20" />
        </div>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
          className="bg-white px-4 py-2 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#006b62]/20">
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c.category_id} value={c.category_name}>{c.category_name}</option>)}
          {/* Fallback options nếu chưa có API categories */}
          {categories.length === 0 && ["Thức ăn","Phụ kiện","Thuốc & Vaccine","Chăm sóc lông"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={fetchProducts} className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-[#56615f] hover:bg-[#e1eae7] transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">refresh</span>Làm mới
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {error && (
          <div className="px-8 py-3 bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error} — <button onClick={fetchProducts} className="underline">Thử lại</button>
          </div>
        )}
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e1eae7]/30">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest">Sản phẩm</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Danh mục</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Giá bán</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Tồn kho</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#a9b4b1]/10">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-[#56615f]">
                    <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
                    Đang tải...
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#56615f]">Không tìm thấy sản phẩm nào.</td>
              </tr>
            ) : (
              products.map(p => {
                const isLow = Number(p.stock) < 5;
                return (
                  <tr key={p.product_id} className={`hover:bg-[#e7f0ed] transition-colors group ${isLow ? "bg-[#a83836]/5" : ""}`}>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        {p.image ? (
                          <img className="w-14 h-14 rounded-lg object-cover bg-[#e7f0ed] shadow-sm" src={p.image} alt={p.product_name} />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-[#e7f0ed] flex items-center justify-center text-[#a9b4b1]">
                            <span className="material-symbols-outlined">inventory_2</span>
                          </div>
                        )}
                        <div>
                          <p className={`font-bold transition-colors ${isLow ? "group-hover:text-[#a83836]" : "group-hover:text-[#006b62]"} text-[#2a3433]`}>{p.product_name}</p>
                          <p className="text-xs text-[#56615f]">ID: {p.product_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 text-[11px] font-bold rounded-full uppercase bg-[#c6eae3]/50 text-[#375853]">
                        {p.category_name ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-[#2a3433]">{formatCurrency(p.price)}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className={`font-extrabold ${isLow ? "text-[#a83836]" : "text-[#2a3433]"}`}>{p.stock}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a83836]">
                          <span className="w-2 h-2 rounded-full bg-[#a83836] animate-pulse" />Sắp hết
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006b62]">
                          <span className="w-2 h-2 rounded-full bg-[#006b62]" />Còn hàng
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)}
                          className="p-2 text-[#727d7a] hover:text-[#006b62] hover:bg-[#006b62]/10 rounded-full transition-colors" title="Chỉnh sửa">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => deleteProduct(p.product_id)}
                          className="p-2 text-[#727d7a] hover:text-[#a83836] hover:bg-[#fa746f]/10 rounded-full transition-colors" title="Xóa">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="px-8 py-6 bg-[#eef5f3]/50 flex justify-between items-center">
          <p className="text-xs font-bold text-[#727d7a] uppercase tracking-wider">Hiển thị {products.length} sản phẩm</p>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            <button onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b62]">{editingProduct ? "edit" : "add_circle"}</span>
              {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên sản phẩm *</label>
                <input required type="text" placeholder="Nhập tên sản phẩm..."
                  value={form.product_name} onChange={e => setForm({...form, product_name: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Giá bán (VNĐ) *</label>
                  <input required type="number" min="0" placeholder="VD: 150000"
                    value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tồn kho</label>
                  <input type="number" min="0" placeholder="VD: 50"
                    value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Danh mục</label>
                <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20 cursor-pointer">
                  <option value="">Chọn danh mục...</option>
                  {categories.map(c => <option key={c.category_id} value={c.category_id}>{c.category_name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">URL Hình ảnh</label>
                <input type="text" placeholder="https://..."
                  value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mô tả</label>
                <textarea rows={3} placeholder="Mô tả sản phẩm..."
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20 resize-none" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#a9b4b1]/20">
                <button type="button" onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2]">
                  Hủy bỏ
                </button>
                <button type="submit" disabled={saving}
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] shadow-lg shadow-[#006b62]/20 disabled:opacity-60">
                  {saving ? "Đang lưu..." : (editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

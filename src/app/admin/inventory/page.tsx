"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

interface Product {
  product_id: number;
  product_name: string;
  category_id: number;
  category_name: string;
  price: number;
  stock: number;
  description: string;
  details: string;
  specifications: string;
  image: string; // JSON string array of URLs
  created_at: string;
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " VNĐ";
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filterCategory, setFilterCategory] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const fixedCategories = ["Thức ăn", "Đồ chơi", "Phụ kiện", "Chăm sóc lông"];
  const [form, setForm] = useState({
    product_name: "", category_name: "Thức ăn", price: "", stock: "", description: "", details: "", specifications: ""
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Fetch ── */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set("category", filterCategory);
      if (search) params.set("search", search);
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Không tải được dữ liệu sản phẩm");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filterCategory, search]);

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
      showSuccess("Đã xóa sản phẩm");
    } catch { fetchProducts(); }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(f => URL.createObjectURL(f));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const parseImage = (imageString: string | null) => {
    if (!imageString) return null;
    try {
      const parsed = JSON.parse(imageString);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : null;
    } catch {
      return imageString;
    }
  };

  const openAdd = () => {
    setForm({ product_name: "", category_name: "Thức ăn", price: "", stock: "", description: "", details: "", specifications: "" });
    setImageFiles([]);
    setImagePreviews([]);
    setEditingProduct(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsAddModalOpen(true);
  };

  const openEdit = (p: Product) => {
    let catName = fixedCategories.find(c => c.toLowerCase() === (p.category_name || "").toLowerCase()) || "Thức ăn";
    setForm({
      product_name: p.product_name,
      category_name: catName,
      price: String(p.price),
      stock: String(p.stock),
      description: p.description || "",
      details: p.details || "",
      specifications: p.specifications || ""
    });
    setImageFiles([]);
    
    // Attempt to load existing images into previews
    let existingPreviews: string[] = [];
    if (p.image) {
      try {
        const parsed = JSON.parse(p.image);
        if (Array.isArray(parsed)) existingPreviews = parsed;
        else existingPreviews = [p.image];
      } catch {
        existingPreviews = [p.image];
      }
    }
    setImagePreviews(existingPreviews);

    setEditingProduct(p);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("product_name", form.product_name);
      formData.append("category_name", form.category_name);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      formData.append("details", form.details);
      formData.append("specifications", form.specifications);
      
      imageFiles.forEach(file => formData.append("images", file));

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.product_id}`, {
          method: "PATCH",
          body: formData,
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Cập nhật sản phẩm thất bại");
        }
        showSuccess("Cập nhật thông tin sản phẩm thành công!");
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Tạo sản phẩm thất bại");
        }
        showSuccess("Thêm sản phẩm mới thành công!");
      }
      setIsAddModalOpen(false);
      fetchProducts();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const lowStockThreshold = 10;
  const lowStockCount = products.filter(p => p.stock < lowStockThreshold).length;

  // Apply Status Filter client-side
  const filteredProducts = products.filter(p => {
    if (statusFilter === "in_stock") return p.stock >= lowStockThreshold;
    if (statusFilter === "low_stock") return p.stock < lowStockThreshold;
    return true;
  });

  // Calculate total value based on filtered items to be accurate for current view
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0) * (Number(p.stock) || 0), 0);

  /* ── Render ── */
  return (
    <div className="min-h-screen relative pb-10">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2 font-medium">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#006b62]">Quản lý kho hàng</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-1">Quản lý kho hàng</h2>
          <p className="text-[#56615f] font-medium">Cập nhật và theo dõi vật dụng thú cưng tại cửa hàng.</p>
        </div>
        <button onClick={openAdd}
          className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-8 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined">add_circle</span>
          Thêm sản phẩm
        </button>
      </div>

      {successMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-white border-l-4 border-[#006b62] shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[#006b62] text-3xl">check_circle</span>
          <div>
            <h4 className="font-bold text-[#2a3433]">Thành công!</h4>
            <p className="text-sm text-[#56615f]">{successMsg}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { icon: "inventory_2", color: "bg-[#82f6e7]/30 text-[#006b62]", label: "Tổng sản phẩm", value: products.length },
          { icon: "category",   color: "bg-[#c6eae3]/30 text-[#446560]", label: "Danh mục",      value: new Set(products.map(p => p.category_name)).size },
          { icon: "warning",    color: "bg-[#fa746f]/30 text-[#a83836]", label: "Sắp hết hàng",  value: lowStockCount, red: true },
          { icon: "payments",   color: "bg-[#b6e7fe]/30 text-[#346578]", label: "Tổng Giá trị kho",   value: formatCurrency(totalValue) },
        ].map((s, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm flex flex-col gap-2 ${s.red && s.value > 0 ? "border-2 border-[#a83836]/20" : ""}`}>
            <span className={`p-3 ${s.color} rounded-full material-symbols-outlined self-start`}>{s.icon}</span>
            <p className="text-sm font-medium text-[#56615f]">{s.label}</p>
            <h3 className={`text-2xl font-extrabold ${s.red && s.value > 0 ? "text-[#a83836]" : "text-[#2a3433]"}`}>{s.value}</h3>
          </div>
        ))}
      </div>

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
          {fixedCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        
        {/* Lọc Trạng Thái */}
        <div className="flex bg-white rounded-xl overflow-hidden p-1 gap-1">
          <button onClick={() => setStatusFilter("all")} className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${statusFilter === "all" ? "bg-[#eef5f3] text-[#006b62]" : "text-[#56615f] hover:bg-gray-50"}`}>Tất cả</button>
          <button onClick={() => setStatusFilter("in_stock")} className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${statusFilter === "in_stock" ? "bg-[#eef5f3] text-[#006b62]" : "text-[#56615f] hover:bg-gray-50"}`}>Còn hàng</button>
          <button onClick={() => setStatusFilter("low_stock")} className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${statusFilter === "low_stock" ? "bg-red-50 text-red-600" : "text-[#56615f] hover:bg-gray-50"}`}>Sắp hết hàng</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e1eae7]/50">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e1eae7]/30 border-b border-[#e1eae7]">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest">Sản phẩm</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Danh mục</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Giá bán</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Tồn kho</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1eae7]/50">
            {loading ? (
              <tr><td colSpan={6} className="py-12 text-center text-[#56615f] font-medium"><span className="material-symbols-outlined animate-spin text-[#006b62] mr-2 align-middle">progress_activity</span>Đang tải...</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan={6} className="py-12 text-center text-[#56615f]">Không có sản phẩm nào.</td></tr>
            ) : (
              filteredProducts.map(p => {
                const isLow = Number(p.stock) < lowStockThreshold;
                const firstImage = parseImage(p.image);
                return (
                  <tr key={p.product_id} className={`hover:bg-[#f8faf9] transition-colors group ${isLow ? "bg-[#fff0f0] hover:bg-[#ffeaea]" : ""}`}>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        {firstImage ? (
                          <img className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm bg-white" src={firstImage} alt={p.product_name} />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-[#eef5f3] border border-gray-100 flex items-center justify-center text-[#a9b4b1]">
                            <span className="material-symbols-outlined text-2xl">inventory_2</span>
                          </div>
                        )}
                        <div>
                          <p className={`font-bold text-[15px] ${isLow ? "text-[#a83836]" : "text-[#2a3433]"} group-hover:text-[#006b62] transition-colors`}>{p.product_name}</p>
                          <p className="text-xs text-[#727d7a] font-medium mt-0.5">Mã SP: #{p.product_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3.5 py-1.5 text-[11px] font-extrabold rounded-md uppercase bg-[#eef5f3] text-[#006b62]">
                        {p.category_name || "Khác"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-[#2a3433] text-[15px]">{formatCurrency(p.price)}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className={`font-extrabold text-[15px] ${isLow ? "text-[#a83836]" : "text-[#2a3433]"}`}>{p.stock}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a83836] bg-[#fa746f]/10 px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a83836] animate-pulse" />Sắp hết
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006b62] bg-[#c6eae3]/30 px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006b62]" />Còn hàng
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)}
                          className="w-8 h-8 flex items-center justify-center text-[#a9b4b1] hover:text-[#006b62] hover:bg-[#006b62]/10 rounded-full transition-colors" title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => deleteProduct(p.product_id)}
                          className="w-8 h-8 flex items-center justify-center text-[#a9b4b1] hover:text-[#a83836] hover:bg-[#fa746f]/10 rounded-full transition-colors" title="Xóa">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <button onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-[#a9b4b1] hover:text-[#2a3433] bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-all z-10">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-[#006b62]">{editingProduct ? "edit" : "add_shopping_cart"}</span>
              {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h3>

            <form className="flex flex-col flex-1 overflow-hidden" onSubmit={handleSubmit}>
              
              <div className="overflow-y-auto pr-2 space-y-5 pb-2 custom-scrollbar">
                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Ảnh sản phẩm (Chọn ảnh mới sẽ thay thế ảnh cũ)</label>
                  <div 
                    className="w-full min-h-[120px] bg-[#f8faf9] border-2 border-dashed border-[#c6eae3] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#eef5f3] hover:border-[#006b62] transition-all"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-4xl text-[#a9b4b1] mb-2">add_photo_alternate</span>
                    <span className="text-sm font-medium text-[#56615f]">Click để chọn ảnh từ máy tính</span>
                    <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                  </div>
                  {/* Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                      {imagePreviews.map((src, idx) => (
                        <div key={idx} className="relative shrink-0 w-20 h-20 rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
                          <img src={src} className="w-full h-full object-cover" alt="Preview" />
                          <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white/90 w-6 h-6 rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                            <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên sản phẩm *</label>
                    <input required type="text" placeholder="Nhập tên sản phẩm..."
                      value={form.product_name} onChange={e => setForm({...form, product_name: e.target.value})}
                      className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl text-sm py-2.5 px-4 font-medium outline-none focus:ring-2 focus:ring-[#006b62] focus:border-transparent transition-all" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Danh mục *</label>
                    <select required value={form.category_name} onChange={e => setForm({...form, category_name: e.target.value})}
                      className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl text-sm py-2.5 px-4 font-medium outline-none focus:ring-2 focus:ring-[#006b62] focus:border-transparent cursor-pointer transition-all">
                      {fixedCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Giá bán (VNĐ) *</label>
                    <input required type="number" min="0" placeholder="VD: 150000"
                      value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                      className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl text-sm py-2.5 px-4 font-medium outline-none focus:ring-2 focus:ring-[#006b62] focus:border-transparent transition-all" />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tồn kho ban đầu *</label>
                    <input required type="number" min="0" placeholder="Số lượng nhập kho..."
                      value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}
                      className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl text-sm py-2.5 px-4 font-medium outline-none focus:ring-2 focus:ring-[#006b62] focus:border-transparent transition-all" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mô tả ngắn</label>
                    <textarea rows={2} placeholder="Đoạn văn ngắn giới thiệu sản phẩm..."
                      value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                      className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl text-sm py-2.5 px-4 font-medium outline-none focus:ring-2 focus:ring-[#006b62] focus:border-transparent resize-none transition-all" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Chi tiết sản phẩm</label>
                    <textarea rows={3} placeholder="Thông tin giới thiệu chi tiết, công dụng, đặc điểm nổi bật..."
                      value={form.details} onChange={e => setForm({...form, details: e.target.value})}
                      className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl text-sm py-2.5 px-4 font-medium outline-none focus:ring-2 focus:ring-[#006b62] focus:border-transparent resize-none transition-all" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Thông số sản phẩm</label>
                    <textarea rows={3} placeholder="Thành phần, khối lượng, thông số kỹ thuật, hướng dẫn sử dụng, bảo quản..."
                      value={form.specifications} onChange={e => setForm({...form, specifications: e.target.value})}
                      className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl text-sm py-2.5 px-4 font-medium outline-none focus:ring-2 focus:ring-[#006b62] focus:border-transparent resize-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-4 shrink-0 flex justify-end gap-3 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2.5 rounded-full font-bold text-[#56615f] bg-gray-100 hover:bg-gray-200 transition-colors">
                  Hủy bỏ
                </button>
                <button type="submit" disabled={saving}
                  className="px-8 py-2.5 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#00524b] shadow-lg shadow-[#006b62]/30 disabled:opacity-60 transition-all flex items-center gap-2">
                  {saving ? (
                    <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Đang lưu...</>
                  ) : (editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

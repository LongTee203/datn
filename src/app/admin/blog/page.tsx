"use client";
import React, { useState, useEffect, useRef } from 'react';

interface Article {
  article_id: number;
  title: string;
  category: string;
  description: string | null;
  content: string;
  image: string | null;
  status: string; // "draft", "published"
  created_at: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  const [addForm, setAddForm] = useState({ title: '', description: '', category: 'Sức khỏe', content: '', status: 'published' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openAdd = () => {
    setAddForm({ title: '', description: '', category: 'Sức khỏe', content: '', status: 'published' });
    setImageFile(null);
    setImagePreview(null);
    setEditingArticle(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsAddModalOpen(true);
  };

  const openEdit = (a: Article) => {
    setAddForm({
      title: a.title,
      description: a.description || "",
      category: a.category,
      content: a.content,
      status: a.status || "published"
    });
    setImageFile(null);
    setImagePreview(a.image);
    setEditingArticle(a);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", addForm.title);
      formData.append("category", addForm.category);
      formData.append("description", addForm.description);
      formData.append("content", addForm.content);
      formData.append("status", addForm.status);
      
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (imagePreview && !imagePreview.startsWith("blob:")) {
        // Keep existing image if no new file is uploaded
        formData.append("imageUrl", imagePreview);
      }

      const url = editingArticle ? `/api/articles/${editingArticle.article_id}` : "/api/articles";
      const method = editingArticle ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Lỗi khi lưu bài viết");
      }
      
      setIsAddModalOpen(false);
      fetchArticles();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchArticles();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteArticle = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) fetchArticles();
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString("vi-VN", { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const categoryColors: Record<string, string> = {
    "Sức khỏe": "bg-[#c6eae3]/40 text-[#375853]",
    "Huấn luyện": "bg-[#b6e7fe]/40 text-[#235669]",
    "Dinh dưỡng": "bg-[#a9b4b1]/20 text-[#56615f]",
  };

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === "published").length,
    draft: articles.filter(a => a.status === "draft").length,
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2">
            <span>Trang chủ</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#006b62] font-medium">Quản lý bài viết</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Thánh đường Kiến thức</h2>
          <p className="text-[#56615f] mt-1">Chia sẻ kinh nghiệm và bí quyết chăm sóc thú cưng cùng cộng đồng.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg shadow-[#006b62]/20 hover:scale-105 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          Viết bài mới
        </button>
      </div>

      {/* Quick Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#82f6e7]/30 flex items-center justify-center text-[#006b62]">
            <span className="material-symbols-outlined">article</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Tổng bài viết</p>
            <p className="text-xl font-bold text-[#2a3433]">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#c6eae3]/30 flex items-center justify-center text-[#446560]">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Đã xuất bản</p>
            <p className="text-xl font-bold text-[#2a3433]">{stats.published}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578]">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Bản nháp</p>
            <p className="text-xl font-bold text-[#2a3433]">{stats.draft}</p>
          </div>
        </div>
      </div>

      {/* Filters & Tools */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'all' ? 'bg-[#82f6e7] text-[#005c54] font-semibold' : 'hover:bg-[#e7f0ed] text-[#56615f] font-medium'}`}>Tất cả</button>
          <button onClick={() => setActiveFilter('published')} className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'published' ? 'bg-[#82f6e7] text-[#005c54] font-semibold' : 'hover:bg-[#e7f0ed] text-[#56615f] font-medium'}`}>Đã đăng</button>
          <button onClick={() => setActiveFilter('draft')} className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === 'draft' ? 'bg-[#82f6e7] text-[#005c54] font-semibold' : 'hover:bg-[#e7f0ed] text-[#56615f] font-medium'}`}>Bản nháp</button>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-20 text-center"><span className="material-symbols-outlined animate-spin text-4xl text-[#006b62]">progress_activity</span></div>
      ) : articles.length === 0 ? (
        <div className="py-20 text-center text-slate-400">Chưa có bài viết nào.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {articles.filter(a => activeFilter === 'all' || a.status === activeFilter).map(article => {
            const catColor = categoryColors[article.category] || "bg-gray-100 text-gray-600";
            return (
              <div key={article.article_id} className="group bg-white hover:bg-[#eef5f3] p-4 rounded-2xl transition-all flex items-center gap-6 shadow-sm hover:shadow-md border border-[#a9b4b1]/5">
                <div className={`w-48 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-500 ${article.status === 'draft' ? 'grayscale group-hover:grayscale-0' : ''} flex items-center justify-center`}>
                  {article.image ? (
                    <img alt={article.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={article.image} />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 ${catColor} text-[10px] font-bold rounded uppercase tracking-widest transition-colors`}>{article.category}</span>
                    <span className="text-xs text-[#56615f] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">{article.status === 'draft' ? 'history' : 'calendar_today'}</span> {formatDate(article.created_at)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors mb-1">{article.title}</h3>
                  <p className="text-sm text-[#56615f] line-clamp-1 opacity-80">{article.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all duration-300 ${article.status === 'published' ? 'bg-[#006b62]/10 text-[#006b62]' : 'bg-[#e7f0ed] text-[#56615f]'}`}>
                      {article.status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleStatus(article.article_id, article.status)}
                    className={`p-2 rounded-full transition-all duration-300 ${article.status === 'published' ? 'hover:bg-[#006b62]/10 text-[#006b62]' : 'hover:bg-[#d9e5e2] text-[#a9b4b1]'}`}
                    title={article.status === 'published' ? 'Chuyển sang Bản nháp' : 'Chuyển sang Đã đăng'}
                  >
                    <span className="material-symbols-outlined text-[28px] transition-all duration-300" style={{ fontVariationSettings: article.status === 'published' ? "'FILL' 1" : "'FILL' 0" }}>
                      {article.status === 'published' ? 'toggle_on' : 'toggle_off'}
                    </span>
                  </button>
                  <button onClick={() => openEdit(article)} className="p-2 hover:bg-[#006b62]/10 text-[#006b62] rounded-full transition-colors" title="Chỉnh sửa">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button onClick={() => deleteArticle(article.article_id)} className="p-2 hover:bg-[#a83836]/10 text-[#a83836] rounded-full transition-colors" title="Xóa">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Article Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b62]">{editingArticle ? 'edit_document' : 'post_add'}</span>
              {editingArticle ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
            </h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-5">
              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Ảnh đại diện (Tải lên từ thiết bị)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 bg-[#f8faf9] rounded-2xl border-2 border-dashed border-[#c6eae3] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-[#eef5f3] hover:border-[#006b62] transition-all"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-[#a9b4b1] mb-2">add_photo_alternate</span>
                      <span className="text-sm font-medium text-[#56615f]">Click để chọn ảnh từ máy tính (16:9)</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg">Đổi ảnh khác</span>
                  </div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Tiêu đề *</label>
                <input required value={addForm.title} onChange={e => setAddForm({ ...addForm, title: e.target.value })} className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#006b62] transition-all" placeholder="Nhập tiêu đề bài viết" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Mô tả ngắn *</label>
                  <textarea required value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none h-20 focus:ring-2 focus:ring-[#006b62] transition-all" placeholder="Tóm tắt nội dung bài viết..." />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Danh mục *</label>
                  <select value={addForm.category} onChange={e => setAddForm({ ...addForm, category: e.target.value })} className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#006b62] transition-all">
                    <option value="Sức khỏe">Sức khỏe</option>
                    <option value="Huấn luyện">Huấn luyện</option>
                    <option value="Dinh dưỡng">Dinh dưỡng</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Trạng thái *</label>
                  <select value={addForm.status} onChange={e => setAddForm({ ...addForm, status: e.target.value })} className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#006b62] transition-all">
                    <option value="published">Xuất bản ngay</option>
                    <option value="draft">Lưu nháp</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Nội dung bài viết *</label>
                <textarea required value={addForm.content} onChange={e => setAddForm({ ...addForm, content: e.target.value })} className="w-full bg-[#f8faf9] border border-gray-200 rounded-xl px-4 py-3 outline-none resize-y min-h-[200px] focus:ring-2 focus:ring-[#006b62] transition-all" placeholder="Nhập nội dung chi tiết..." />
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 rounded-full font-bold bg-gray-100 text-[#56615f] hover:bg-gray-200 transition-colors">Hủy</button>
                <button type="submit" disabled={saving} className="px-8 py-3 rounded-full font-bold bg-[#006b62] text-white shadow-lg hover:bg-[#00524b] transition-all disabled:opacity-50 flex items-center gap-2">
                  {saving ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : null}
                  {editingArticle ? 'Lưu thay đổi' : 'Tạo bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

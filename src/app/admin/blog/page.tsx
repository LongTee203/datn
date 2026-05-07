"use client";
import React, { useState } from 'react';

const initialArticles = [
  {
    id: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASqLumXTrWx6hdo6SGD-NSf0cPhlsqWPST2DlNy3fulKTw6FsBfiByifR9V9-M8WS201M5zxtWYPsKaovFnz323KkU-RpOq2gO73H1Fs7dwC2WAdV9qQxvjowFEtsdX9_gcin9OE6wvAcpFzJ_vYDWRzgc4u4v-WSdw6uhoUOONLrVN_tOvr5-5QiwaAI03ypZrZkC6TnSCiGEpLqFO0dvf5-lxgWZcawydB59YUMi-38C25c4E77m1zO-zRcpG7Ar4VMKbUGPeSg",
    category: "Sức khỏe",
    date: "14 Tháng 05, 2024",
    title: "Bí quyết giúp mèo cưng luôn có bộ lông mượt mà",
    description: "Việc chăm sóc lông không chỉ giúp mèo đẹp hơn mà còn phòng tránh được nhiều bệnh về da liễu...",
    status: "published",
    categoryColor: "bg-[#c6eae3]/40 text-[#375853]"
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxwbu-Aq5RShwSTkIGGS2WCt1O8_OTct-A1PJ7NRexA2iVXy3gvfT2eovuoQ2QoXSDw26x1Lc961G8V5n0T1qJ3IjDOli2zsxe5u0BQKMfMISBcLb45t_ZQWIjbfyc9ykf02x54ecuyk5beI1zgtr5ny12sAm5j-Ll8AiV8TfBDqGohrUKkfrbmOCNKeHeswfkNNbfUGfRsm3B7v81nQVB7qkwRkX80YwxdTorKYuvknfmDWg2lbb216tvPnf3O5WEQzGGcQdKxpw",
    category: "Huấn luyện",
    date: "12 Tháng 05, 2024",
    title: "5 bài tập cơ bản cho cún con tại nhà",
    description: "Bắt đầu huấn luyện từ sớm sẽ giúp cún con của bạn hình thành những thói quen tốt và kỷ luật...",
    status: "published",
    categoryColor: "bg-[#b6e7fe]/40 text-[#235669]"
  },
  {
    id: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoF4zjDEKB2qUYfJvr8rfg_ywbEUbjR_CLE5cDnNADXgM5ti3TEbZKt_jws8RA3bTsEKWbtxT5i29aEHJdXITXxNuDeTBwLdH1091le7JI3W6G4aYxsZu1qo78x6HRZ4sTwKV2yG1-xuz7_9U5oD-N7xY_SLvh1m-lFXDLxdtxy62t_yC-HzU-tQ84yfQD2o8P2O3r1gOje6YQc_sKkuCpTMl_63tryKmJ63f3-M8KGP5Z5zLxfqWkEflamlZqn59ftq8sf_xghmw",
    category: "Dinh dưỡng",
    date: "Cập nhật: 2 giờ trước",
    title: "[Bản thảo] Chế độ ăn Barf cho mèo: Lợi và hại",
    description: "Nội dung đang được biên soạn về các thành phần dinh dưỡng quan trọng trong chế độ ăn tươi...",
    status: "draft",
    categoryColor: "bg-[#a9b4b1]/20 text-[#56615f]",
    isDraftIcon: true
  },
  {
    id: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC30e1BL1Zz5WevvzGs5FR2lufBrFmEf8T2dXY789-9xeM-ucWtB5-MaFY67yzYnIyBBKtxWCP8fsTyJWP-B-fFxUzGB4UQyv2FiGV7TXAlvtS7kSER9pcf63Z5rBMxjvPKn4MIosZ2it_5q65iCLIZ745xEVJ66Xy7MYPFjLDaN_0V9wVhMmFIM61x-FzPsI4xApII6ynHB4viSGZRqlYUHF4yvkd9RXVuwyIHuLKNu0PcDpnfSOly4NGd_ZqOSQiw2KYQWXT6dnc",
    category: "Sức khỏe",
    date: "10 Tháng 05, 2024",
    title: "Lịch tiêm phòng định kỳ cho chó bạn cần nhớ",
    description: "Đảm bảo cún cưng của bạn được bảo vệ khỏi các loại virus nguy hiểm bằng lịch trình tiêm chủng...",
    status: "published",
    categoryColor: "bg-[#c6eae3]/40 text-[#375853]"
  }
];

export default function BlogPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({ image: '', title: '', description: '', category: 'Sức khỏe', content: '' });
  const [activeFilter, setActiveFilter] = useState('all');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate add
    setIsAddModalOpen(false);
    setAddForm({ image: '', title: '', description: '', category: 'Sức khỏe', content: '' });
  };

  return (
    <div className="min-h-screen">
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
          onClick={() => setIsAddModalOpen(true)}
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
            <p className="text-xl font-bold text-[#2a3433]">128</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#c6eae3]/30 flex items-center justify-center text-[#446560]">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Đã xuất bản</p>
            <p className="text-xl font-bold text-[#2a3433]">112</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578]">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Bản nháp</p>
            <p className="text-xl font-bold text-[#2a3433]">16</p>
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
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm text-[#56615f] hover:text-[#006b62] transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span> Lọc theo ngày
          </button>
          <button className="flex items-center gap-2 text-sm text-[#56615f] hover:text-[#006b62] transition-colors">
            <span className="material-symbols-outlined text-sm">sort</span> Sắp xếp
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-4">
        {articles.filter(a => activeFilter === 'all' || a.status === activeFilter).map(article => (
          <div key={article.id} className="group bg-white hover:bg-[#eef5f3] p-4 rounded-2xl transition-all flex items-center gap-6 shadow-sm hover:shadow-md border border-[#a9b4b1]/5">
            <div className={`w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-500 ${article.status === 'draft' ? 'grayscale group-hover:grayscale-0' : ''}`}>
              <img alt={article.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={article.image} />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 ${article.categoryColor} text-[10px] font-bold rounded uppercase tracking-widest transition-colors`}>{article.category}</span>
                <span className="text-xs text-[#56615f] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">{article.isDraftIcon ? 'history' : 'calendar_today'}</span> {article.date}
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
                onClick={() => setArticles(articles.map(a => a.id === article.id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } : a))}
                className={`p-2 rounded-full transition-all duration-300 ${article.status === 'published' ? 'hover:bg-[#006b62]/10 text-[#006b62]' : 'hover:bg-[#d9e5e2] text-[#a9b4b1]'}`}
                title={article.status === 'published' ? 'Chuyển sang Bản nháp' : 'Chuyển sang Đã đăng'}
              >
                <span className="material-symbols-outlined text-[28px] transition-all duration-300" style={{ fontVariationSettings: article.status === 'published' ? "'FILL' 1" : "'FILL' 0" }}>
                  {article.status === 'published' ? 'toggle_on' : 'toggle_off'}
                </span>
              </button>
              <button className="p-2 hover:bg-[#006b62]/10 text-[#006b62] rounded-full transition-colors" title="Chỉnh sửa">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button onClick={() => setArticles(articles.filter(a => a.id !== article.id))} className="p-2 hover:bg-[#a83836]/10 text-[#a83836] rounded-full transition-colors" title="Xóa">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-between border-t border-[#a9b4b1]/10 pt-6">
        <p className="text-sm text-[#56615f]">Hiển thị 1 - 4 trong tổng số 128 bài viết</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#a9b4b1]/20 hover:bg-[#e7f0ed] transition-colors disabled:opacity-30">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006b62] text-[#e2fff9] font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e7f0ed] transition-colors font-medium">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e7f0ed] transition-colors font-medium">3</button>
          <span className="px-2 text-[#56615f]">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e7f0ed] transition-colors font-medium">32</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#a9b4b1]/20 hover:bg-[#e7f0ed] transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Add Article Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-900"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-xl font-bold text-[#2a3433] mb-6">Thêm Bài Viết Mới</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Ảnh đại diện (URL)</label>
                <div className="w-full h-40 bg-[#eef5f3] rounded-xl border-2 border-dashed border-[#a9b4b1] flex flex-col items-center justify-center relative overflow-hidden group">
                  {addForm.image ? (
                    <img src={addForm.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-[#a9b4b1] mb-2">image</span>
                      <span className="text-xs text-[#a9b4b1]">Khung hình chữ nhật (16:9)</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <input
                      value={addForm.image}
                      onChange={e => setAddForm({ ...addForm, image: e.target.value })}
                      className="w-3/4 bg-white/90 rounded-lg px-3 py-2 text-sm outline-none"
                      placeholder="Nhập URL hình ảnh..."
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Tiêu đề</label>
                <input required value={addForm.title} onChange={e => setAddForm({ ...addForm, title: e.target.value })} className="w-full bg-[#eef5f3] rounded-xl px-4 py-3 outline-none" placeholder="Nhập tiêu đề bài viết" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Mô tả ngắn</label>
                  <textarea required value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} className="w-full bg-[#eef5f3] rounded-xl px-4 py-3 outline-none resize-none h-20" placeholder="Tóm tắt nội dung bài viết..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Danh mục</label>
                  <select value={addForm.category} onChange={e => setAddForm({ ...addForm, category: e.target.value })} className="w-full bg-[#eef5f3] rounded-xl px-4 py-3 outline-none">
                    <option>Sức khỏe</option>
                    <option>Huấn luyện</option>
                    <option>Dinh dưỡng</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#56615f] mb-2 uppercase">Nội dung bài viết</label>
                <textarea required value={addForm.content} onChange={e => setAddForm({ ...addForm, content: e.target.value })} className="w-full bg-[#eef5f3] rounded-xl px-4 py-3 outline-none resize-y min-h-[150px]" placeholder="Nhập nội dung chi tiết..." />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 rounded-full font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">Hủy</button>
                <button type="submit" className="px-6 py-2 rounded-full font-bold bg-[#006b62] text-white shadow-lg hover:scale-105 transition-transform">Lưu bài viết</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

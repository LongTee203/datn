"use client";

import React, { useState } from 'react';

const initialServices = [
  {
    id: 1,
    title: "Tắm & Vệ sinh toàn diện",
    category: "Vệ sinh & Spa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPy2gOc9Dw8I6VWPeNMvEiSkavr_sLa3rhhmHq73GXDQwx2_bGRvzt9DlsYr-So65NdXplDKDfI3oXmJiS-kNgKd5A_QCNhzJURMPhOT699KZLflc3hQFmsndKfPMTg_ayi9Bs9DPs-qIk8ky6PlS3bqNQau1nzDXqEKydISToTICY6HeWjzeavDAf6cJASGFwoYwIsnZR21QKepCCO4sEGPFu4CM_5XP6o81voLObUDZK-f5DstJZTSvBqqAzyPkO1TzOVyYy5qI",
    description: "Bao gồm tắm sạch, sấy khô, vệ sinh tai và cắt móng cơ bản cho thú cưng.",
    time: "45 - 60 phút",
    price: "150.000đ - 350.000đ",
    isActive: true
  },
  {
    id: 2,
    title: "Tỉa lông nghệ thuật",
    category: "Vệ sinh & Spa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgk3Xz3nZu4pd5SdMsNjMzKcy62uBnCa-N5wzrnzSAVIsxD9CjbbPNg3qIyQ5B-M7YLdyXQ7RpihwHK_6BldcbXDt1XtPY-2-FJBXWodDZk5P9JUFqi1Q36CgiG3aVsmSjluIuexxHxO_XP04ylOA57mLDgMIMuh6m8SHFANOnxR0S7_MymszA18_W1Qn440Vd-TMh9bbIZ2_CgcV-nd86n6sIuDLqAnkAuEqtKgqqONOrArQbEdB7UFuptO4CPiGMCdW_ZVFUtNo",
    description: "Tạo kiểu lông theo yêu cầu hoặc theo chuẩn giống loài, giúp thú cưng thêm xinh đẹp.",
    time: "90 - 120 phút",
    price: "300.000đ - 600.000đ",
    isActive: true
  },
  {
    id: 3,
    title: "Khám sức khỏe tổng quát",
    category: "Y tế & Khám bệnh",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwaO1-_RpwHuKQR8R4lUNngragepz6xXwRHM6BdDTU6Lkf5Y0mZDrh_UxaQ38HVwKBOmJbzcOwt6uEsO7XMfs3J7muTmDyDwVYEnD6HLlqfEC-QeO8rG88_VyHYuq3N2TUyhpx-_C6OeKnSVB17hOdX9T_UUwM1q1CMdV_9019VThB9l45ZH-tcK9PquzvkvM8Sanj_BQjLRs9h7vYOlUymCPzzoaLAqJ6w9zNIHsAN9RxLJUCDd8C01QKNJ94yezsJAiC14YyF1I",
    description: "Kiểm tra các chỉ số sức khỏe định kỳ, tư vấn dinh dưỡng và phòng bệnh.",
    time: "30 phút",
    price: "200.000đ - 500.000đ",
    isActive: false
  },
  {
    id: 4,
    title: "Lưu trú 5 sao (Hotel)",
    category: "Lưu trú (Hotel)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSFKGwwsw70Q8NtbIN93URt32qPmmVEg2TpPX0AammtWfyrCu07MtDBlZVivp8K1jndaveuXtmnQCxKgFfCvkNRL7444WWYaEwo4_4Jo-Q2NDYr6jwE_IbingOgG3rBAK6vJmE3PegnL4C7cruRKuokH8FDjFqQzcUXYmTKdgWu_Cp0-0h0H_SWw8OJO3DeTTsVL8-RvcJ34rM8_bstXctTopdJ-JSrb0lIN_mqPlKiOVzQ_PQ_7fOeygyCMNVaEjQZNxqRcbCRmw",
    description: "Dịch vụ trông giữ thú cưng qua đêm với không gian riêng biệt, điều hòa 24/7.",
    time: "24 giờ",
    price: "150.000đ - 350.000đ/ngày",
    isActive: true
  },
  {
    id: 5,
    title: "Cạo lông toàn thân",
    category: "Vệ sinh & Spa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdm7Le77Tslqhyd-5o1RpJv75J8EyDGhtq3sS78xhVH3hFzJXZUkuL6Two22hBXTvIzLwv9ZMopcIc3UUQH07U8SL7xhrDll4JZZFgo3UqmsWYcfajoY6LOF0YD5fXqoYI4qohkqSh4ntY7BbDyjH6IXpHMCMRpt2Fqz7_z29a7CuMXSD5OLNiZaP_Y44skyhJobw2EpXE9hcVEQOp9NBgcqdiYGkeO13b042utkCQRL7w0HmVMUBGOI2sk3bFgnphLoY9kwwAcjc",
    description: "Cạo sát toàn thân giúp thú cưng mát mẻ, dễ vệ sinh và điều trị các bệnh ngoài da.",
    time: "60 phút",
    price: "200.000đ - 400.000đ",
    isActive: true
  },
  {
    id: 6,
    title: "Gỡ rối lông chó",
    category: "Vệ sinh & Spa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASqLumXTrWx6hdo6SGD-NSf0cPhlsqWPST2DlNy3fulKTw6FsBfiByifR9V9-M8WS201M5zxtWYPsKaovFnz323KkU-RpOq2gO73H1Fs7dwC2WAdV9qQxvjowFEtsdX9_gcin9OE6wvAcpFzJ_vYDWRzgc4u4v-WSdw6uhoUOONLrVN_tOvr5-5QiwaAI03ypZrZkC6TnSCiGEpLqFO0dvf5-lxgWZcawydB59YUMi-38C25c4E77m1zO-zRcpG7Ar4VMKbUGPeSg",
    description: "Xử lý triệt để các cục lông rối, bết dính mà không gây đau đớn cho thú cưng.",
    time: "30 - 60 phút",
    price: "100.000đ - 250.000đ",
    isActive: true
  },
  {
    id: 7,
    title: "Nhuộm lông thời trang",
    category: "Vệ sinh & Spa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgk3Xz3nZu4pd5SdMsNjMzKcy62uBnCa-N5wzrnzSAVIsxD9CjbbPNg3qIyQ5B-M7YLdyXQ7RpihwHK_6BldcbXDt1XtPY-2-FJBXWodDZk5P9JUFqi1Q36CgiG3aVsmSjluIuexxHxO_XP04ylOA57mLDgMIMuh6m8SHFANOnxR0S7_MymszA18_W1Qn440Vd-TMh9bbIZ2_CgcV-nd86n6sIuDLqAnkAuEqtKgqqONOrArQbEdB7UFuptO4CPiGMCdW_ZVFUtNo",
    description: "Sử dụng thuốc nhuộm an toàn, chuyên dụng cho thú cưng để tạo điểm nhấn nổi bật.",
    time: "90 - 150 phút",
    price: "300.000đ - 800.000đ",
    isActive: true
  },
  {
    id: 8,
    title: "Dịch vụ lẻ vệ sinh",
    category: "Vệ sinh & Spa",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwaO1-_RpwHuKQR8R4lUNngragepz6xXwRHM6BdDTU6Lkf5Y0mZDrh_UxaQ38HVwKBOmJbzcOwt6uEsO7XMfs3J7muTmDyDwVYEnD6HLlqfEC-QeO8rG88_VyHYuq3N2TUyhpx-_C6OeKnSVB17hOdX9T_UUwM1q1CMdV_9019VThB9l45ZH-tcK9PquzvkvM8Sanj_BQjLRs9h7vYOlUymCPzzoaLAqJ6w9zNIHsAN9RxLJUCDd8C01QKNJ94yezsJAiC14YyF1I",
    description: "Cắt móng, vắt tuyến hôi, vệ sinh tai, cạo lông bàn chân, đánh răng.",
    time: "10 - 20 phút",
    price: "30.000đ - 80.000đ",
    isActive: true
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const toggleStatus = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const filteredServices = activeFilter === "Tất cả"
    ? services
    : services.filter(s => s.category === activeFilter);

  return (
    <div className="min-h-screen relative">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2 font-medium">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#006b62]">Quản lý dịch vụ</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Danh sách dịch vụ</h2>
          <p className="text-[#56615f] mt-1">Cấu hình và cập nhật thông tin các gói chăm sóc thú cưng của bạn.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#006b62] to-[#00897b] text-[#e2fff9] px-6 py-3 rounded-full font-bold shadow-lg shadow-[#006b62]/20 hover:shadow-[#006b62]/40 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>Thêm dịch vụ mới</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter("Tất cả")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeFilter === 'Tất cả' ? 'bg-[#82f6e7] text-[#005c54]' : 'bg-[#eef5f3] text-[#56615f] hover:bg-[#e7f0ed]'}`}
        >
          Tất cả ({services.length})
        </button>
        <button
          onClick={() => setActiveFilter("Vệ sinh & Spa")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${activeFilter === 'Vệ sinh & Spa' ? 'bg-[#82f6e7] text-[#005c54] font-bold' : 'bg-[#eef5f3] text-[#56615f] hover:bg-[#e7f0ed]'}`}
        >
          Vệ sinh & Spa
        </button>
        <button
          onClick={() => setActiveFilter("Y tế & Khám bệnh")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${activeFilter === 'Y tế & Khám bệnh' ? 'bg-[#82f6e7] text-[#005c54] font-bold' : 'bg-[#eef5f3] text-[#56615f] hover:bg-[#e7f0ed]'}`}
        >
          Y tế & Khám bệnh
        </button>
        <button
          onClick={() => setActiveFilter("Lưu trú (Hotel)")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${activeFilter === 'Lưu trú (Hotel)' ? 'bg-[#82f6e7] text-[#005c54] font-bold' : 'bg-[#eef5f3] text-[#56615f] hover:bg-[#e7f0ed]'}`}
        >
          Lưu trú (Hotel)
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServices.map(service => (
          <div key={service.id} className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img alt={service.title} className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${!service.isActive ? 'grayscale' : ''}`} src={service.image} />
              <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm ${service.isActive ? 'text-[#006b62]' : 'text-[#727d7a]'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${service.isActive ? 'bg-[#006b62]' : 'bg-[#727d7a]'}`}></span>
                {service.isActive ? 'HOẠT ĐỘNG' : 'TẠM NGỪNG'}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="text-[10px] font-bold text-[#375853] bg-[#c6eae3]/50 px-2 py-0.5 rounded-md uppercase">{service.category}</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#2a3433]">{service.title}</h3>
                <button
                  onClick={() => toggleStatus(service.id)}
                  title={service.isActive ? "Tạm ngừng dịch vụ" : "Kích hoạt dịch vụ"}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#56615f] hover:text-[#006b62] transition-colors" style={{ fontVariationSettings: service.isActive ? "'FILL' 1" : "'FILL' 0" }}>
                    {service.isActive ? 'toggle_on' : 'toggle_off'}
                  </span>
                </button>
              </div>
              <p className="text-sm text-[#56615f] line-clamp-2 mb-6">{service.description}</p>
              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1.5 text-[#56615f]">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span>{service.time}</span>
                  </div>
                  <div className="font-bold text-[#006b62] text-[15px]">{service.price}</div>
                </div>
                <button className="w-full py-3 rounded-2xl bg-[#e7f0ed] text-[#2a3433] font-bold text-sm group-hover:bg-[#006b62] group-hover:text-[#e2fff9] transition-all active:scale-95">
                  Chỉnh sửa chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Thêm dịch vụ mới</h3>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Ảnh mô tả (URL)</label>
                <div className="w-full h-32 bg-[#eef5f3] rounded-xl border-2 border-dashed border-[#a9b4b1] flex flex-col items-center justify-center relative overflow-hidden group">
                  <span className="material-symbols-outlined text-4xl text-[#a9b4b1] mb-2">image</span>
                  <span className="text-xs text-[#a9b4b1]">Click hoặc dán URL ảnh</span>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <input className="w-3/4 bg-white/90 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Nhập URL hình ảnh..." />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên dịch vụ</label>
                <input required type="text" placeholder="Nhập tên dịch vụ..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Danh mục</label>
                <select required className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all cursor-pointer">
                  <option value="">Chọn danh mục...</option>
                  <option value="Vệ sinh & Spa">Vệ sinh & Spa</option>
                  <option value="Y tế & Khám bệnh">Y tế & Khám bệnh</option>
                  <option value="Lưu trú (Hotel)">Lưu trú (Hotel)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mô tả dịch vụ</label>
                <textarea required placeholder="Nhập mô tả..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all resize-none h-20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Thời gian thực hiện</label>
                  <input required type="text" placeholder="VD: 30 - 60 phút" className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Giá tiền</label>
                  <input required type="text" placeholder="VD: 100.000đ - 400.000đ" className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20"
                >
                  Thêm dịch vụ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

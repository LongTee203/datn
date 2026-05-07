import React from 'react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2 font-medium">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
            <span className="text-[#006b62]">Quản lý dịch vụ</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Danh sách dịch vụ</h2>
          <p className="text-[#56615f] mt-1">Cấu hình và cập nhật thông tin các gói chăm sóc thú cưng của bạn.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#006b62] to-[#00897b] text-[#e2fff9] px-6 py-3 rounded-full font-bold shadow-lg shadow-[#006b62]/20 hover:shadow-[#006b62]/40 active:scale-95 transition-all">
          <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
          <span>Thêm dịch vụ mới</span>
        </button>
      </div>

      {/* Filter & Stats Bento Row */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-8 flex gap-4">
          <button className="px-5 py-2.5 bg-[#82f6e7] text-[#005c54] rounded-xl font-bold text-sm transition-all">Tất cả (12)</button>
          <button className="px-5 py-2.5 bg-[#eef5f3] text-[#56615f] rounded-xl font-medium text-sm hover:bg-[#e7f0ed] transition-all">Vệ sinh & Spa</button>
          <button className="px-5 py-2.5 bg-[#eef5f3] text-[#56615f] rounded-xl font-medium text-sm hover:bg-[#e7f0ed] transition-all">Y tế & Khám bệnh</button>
          <button className="px-5 py-2.5 bg-[#eef5f3] text-[#56615f] rounded-xl font-medium text-sm hover:bg-[#e7f0ed] transition-all">Lưu trú (Hotel)</button>
        </div>
        <div className="col-span-4 bg-[#c6eae3]/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center text-[#375853]">
              <span className="material-symbols-outlined" data-icon="trending_up">trending_up</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#375853]/70 uppercase">Nhu cầu cao nhất</p>
              <p className="font-bold text-[#375853]">Tỉa lông nghệ thuật</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#446560] px-2 py-1 bg-white/50 rounded-lg">+12% tuần này</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Service Card 1 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img alt="Tắm thú cưng" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPy2gOc9Dw8I6VWPeNMvEiSkavr_sLa3rhhmHq73GXDQwx2_bGRvzt9DlsYr-So65NdXplDKDfI3oXmJiS-kNgKd5A_QCNhzJURMPhOT699KZLflc3hQFmsndKfPMTg_ayi9Bs9DPs-qIk8ky6PlS3bqNQau1nzDXqEKydISToTICY6HeWjzeavDAf6cJASGFwoYwIsnZR21QKepCCO4sEGPFu4CM_5XP6o81voLObUDZK-f5DstJZTSvBqqAzyPkO1TzOVyYy5qI" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#006b62] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006b62]"></span>
              HOẠT ĐỘNG
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-[#2a3433]">Tắm & Vệ sinh toàn diện</h3>
              <span className="material-symbols-outlined text-[#56615f]/40 cursor-pointer hover:text-[#006b62] transition-colors" data-icon="more_vert">more_vert</span>
            </div>
            <p className="text-sm text-[#56615f] line-clamp-2 mb-6">Bao gồm tắm sạch, sấy khô, vệ sinh tai và cắt móng cơ bản cho thú cưng.</p>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-[#56615f]">
                  <span className="material-symbols-outlined text-base" data-icon="schedule">schedule</span>
                  <span>45 - 60 phút</span>
                </div>
                <div className="font-bold text-[#006b62] text-lg">250.000đ</div>
              </div>
              <button className="w-full py-3 rounded-2xl bg-[#e7f0ed] text-[#2a3433] font-bold text-sm group-hover:bg-[#006b62] group-hover:text-[#e2fff9] transition-all active:scale-95">
                Chỉnh sửa chi tiết
              </button>
            </div>
          </div>
        </div>

        {/* Service Card 2 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img alt="Tỉa lông" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgk3Xz3nZu4pd5SdMsNjMzKcy62uBnCa-N5wzrnzSAVIsxD9CjbbPNg3qIyQ5B-M7YLdyXQ7RpihwHK_6BldcbXDt1XtPY-2-FJBXWodDZk5P9JUFqi1Q36CgiG3aVsmSjluIuexxHxO_XP04ylOA57mLDgMIMuh6m8SHFANOnxR0S7_MymszA18_W1Qn440Vd-TMh9bbIZ2_CgcV-nd86n6sIuDLqAnkAuEqtKgqqONOrArQbEdB7UFuptO4CPiGMCdW_ZVFUtNo" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#006b62] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006b62]"></span>
              HOẠT ĐỘNG
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-[#2a3433]">Tỉa lông nghệ thuật</h3>
              <span className="material-symbols-outlined text-[#56615f]/40 cursor-pointer hover:text-[#006b62] transition-colors" data-icon="more_vert">more_vert</span>
            </div>
            <p className="text-sm text-[#56615f] line-clamp-2 mb-6">Tạo kiểu lông theo yêu cầu hoặc theo chuẩn giống loài, giúp thú cưng thêm xinh đẹp.</p>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-[#56615f]">
                  <span className="material-symbols-outlined text-base" data-icon="schedule">schedule</span>
                  <span>90 - 120 phút</span>
                </div>
                <div className="font-bold text-[#006b62] text-lg">450.000đ</div>
              </div>
              <button className="w-full py-3 rounded-2xl bg-[#e7f0ed] text-[#2a3433] font-bold text-sm group-hover:bg-[#006b62] group-hover:text-[#e2fff9] transition-all active:scale-95">
                Chỉnh sửa chi tiết
              </button>
            </div>
          </div>
        </div>

        {/* Service Card 3 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img alt="Khám sức khỏe" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwaO1-_RpwHuKQR8R4lUNngragepz6xXwRHM6BdDTU6Lkf5Y0mZDrh_UxaQ38HVwKBOmJbzcOwt6uEsO7XMfs3J7muTmDyDwVYEnD6HLlqfEC-QeO8rG88_VyHYuq3N2TUyhpx-_C6OeKnSVB17hOdX9T_UUwM1q1CMdV_9019VThB9l45ZH-tcK9PquzvkvM8Sanj_BQjLRs9h7vYOlUymCPzzoaLAqJ6w9zNIHsAN9RxLJUCDd8C01QKNJ94yezsJAiC14YyF1I" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#727d7a] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#727d7a]"></span>
              TẠM NGỪNG
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-[#2a3433]">Khám sức khỏe tổng quát</h3>
              <span className="material-symbols-outlined text-[#56615f]/40 cursor-pointer hover:text-[#006b62] transition-colors" data-icon="more_vert">more_vert</span>
            </div>
            <p className="text-sm text-[#56615f] line-clamp-2 mb-6">Kiểm tra các chỉ số sức khỏe định kỳ, tư vấn dinh dưỡng và phòng bệnh.</p>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-[#56615f]">
                  <span className="material-symbols-outlined text-base" data-icon="schedule">schedule</span>
                  <span>30 phút</span>
                </div>
                <div className="font-bold text-[#006b62] text-lg">300.000đ</div>
              </div>
              <button className="w-full py-3 rounded-2xl bg-[#e7f0ed] text-[#2a3433] font-bold text-sm group-hover:bg-[#006b62] group-hover:text-[#e2fff9] transition-all active:scale-95">
                Chỉnh sửa chi tiết
              </button>
            </div>
          </div>
        </div>

        {/* Service Card 4 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col border-2 border-dashed border-[#a9b4b1]/30 items-center justify-center min-h-[400px]">
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-[#e1eae7] flex items-center justify-center text-[#006b62] mx-auto mb-4 group-hover:bg-[#82f6e7] transition-colors">
              <span className="material-symbols-outlined text-3xl" data-icon="add">add</span>
            </div>
            <h4 className="font-bold text-[#2a3433] mb-2">Thêm dịch vụ mới</h4>
            <p className="text-xs text-[#56615f] max-w-[150px] mx-auto">Mở rộng danh mục kinh doanh của bạn ngay hôm nay.</p>
          </div>
        </div>

        {/* Service Card 5 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img alt="Hotel thú cưng" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSFKGwwsw70Q8NtbIN93URt32qPmmVEg2TpPX0AammtWfyrCu07MtDBlZVivp8K1jndaveuXtmnQCxKgFfCvkNRL7444WWYaEwo4_4Jo-Q2NDYr6jwE_IbingOgG3rBAK6vJmE3PegnL4C7cruRKuokH8FDjFqQzcUXYmTKdgWu_Cp0-0h0H_SWw8OJO3DeTTsVL8-RvcJ34rM8_bstXctTopdJ-JSrb0lIN_mqPlKiOVzQ_PQ_7fOeygyCMNVaEjQZNxqRcbCRmw" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#006b62] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006b62]"></span>
              HOẠT ĐỘNG
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-[#2a3433]">Lưu trú 5 sao (Hotel)</h3>
              <span className="material-symbols-outlined text-[#56615f]/40 cursor-pointer hover:text-[#006b62] transition-colors" data-icon="more_vert">more_vert</span>
            </div>
            <p className="text-sm text-[#56615f] line-clamp-2 mb-6">Dịch vụ trông giữ thú cưng qua đêm với không gian riêng biệt, điều hòa 24/7.</p>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-[#56615f]">
                  <span className="material-symbols-outlined text-base" data-icon="nightlight">nightlight</span>
                  <span>24 giờ</span>
                </div>
                <div className="font-bold text-[#006b62] text-lg">200.000đ/ngày</div>
              </div>
              <button className="w-full py-3 rounded-2xl bg-[#e7f0ed] text-[#2a3433] font-bold text-sm group-hover:bg-[#006b62] group-hover:text-[#e2fff9] transition-all active:scale-95">
                Chỉnh sửa chi tiết
              </button>
            </div>
          </div>
        </div>

        {/* Service Card 6 */}
        <div className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img alt="Huấn luyện" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdm7Le77Tslqhyd-5o1RpJv75J8EyDGhtq3sS78xhVH3hFzJXZUkuL6Two22hBXTvIzLwv9ZMopcIc3UUQH07U8SL7xhrDll4JZZFgo3UqmsWYcfajoY6LOF0YD5fXqoYI4qohkqSh4ntY7BbDyjH6IXpHMCMRpt2Fqz7_z29a7CuMXSD5OLNiZaP_Y44skyhJobw2EpXE9hcVEQOp9NBgcqdiYGkeO13b042utkCQRL7w0HmVMUBGOI2sk3bFgnphLoY9kwwAcjc" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#006b62] flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006b62]"></span>
              HOẠT ĐỘNG
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-[#2a3433]">Huấn luyện cơ bản</h3>
              <span className="material-symbols-outlined text-[#56615f]/40 cursor-pointer hover:text-[#006b62] transition-colors" data-icon="more_vert">more_vert</span>
            </div>
            <p className="text-sm text-[#56615f] line-clamp-2 mb-6">Đào tạo các lệnh cơ bản: ngồi, nằm, đứng, đi vệ sinh đúng chỗ cho cún cưng.</p>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-[#56615f]">
                  <span className="material-symbols-outlined text-base" data-icon="history_edu">history_edu</span>
                  <span>60 phút / buổi</span>
                </div>
                <div className="font-bold text-[#006b62] text-lg">500.000đ</div>
              </div>
              <button className="w-full py-3 rounded-2xl bg-[#e7f0ed] text-[#2a3433] font-bold text-sm group-hover:bg-[#006b62] group-hover:text-[#e2fff9] transition-all active:scale-95">
                Chỉnh sửa chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 p-6 bg-[#eef5f3] rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 border-none shadow-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#006b62] shadow-sm">
            <span className="material-symbols-outlined" data-icon="info">info</span>
          </div>
          <div>
            <h5 className="font-bold text-[#2a3433]">Cần trợ giúp thiết lập dịch vụ?</h5>
            <p className="text-xs text-[#56615f]">Xem hướng dẫn cấu hình bảng giá và thời lượng dịch vụ tối ưu.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-full border border-[#006b62] text-[#006b62] font-bold text-sm hover:bg-[#006b62]/5 transition-all">Tài liệu HD</button>
          <button className="px-6 py-2.5 rounded-full bg-[#006b62] text-[#e2fff9] font-bold text-sm hover:opacity-90 transition-all">Liên hệ hỗ trợ</button>
        </div>
      </div>
    </div>
  );
}

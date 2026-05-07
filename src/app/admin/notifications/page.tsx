import React from 'react';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Thông báo hệ thống</h2>
          <p className="text-[#56615f] mt-1 text-sm">Cập nhật các hoạt động mới nhất từ cửa hàng và kho hàng của bạn.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-full bg-[#c6eae3] text-[#375853] font-semibold text-sm flex items-center gap-2 hover:bg-[#b8dcd5] transition-all">
            <span className="material-symbols-outlined text-lg">done_all</span>
            Đánh dấu đã đọc hết
          </button>
          <button className="px-5 py-2.5 rounded-full bg-[#006b62] text-[#e2fff9] font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Lọc thông báo
          </button>
        </div>
      </div>

      {/* Bento Grid Notifications Layout */}
      <div className="grid grid-cols-12 gap-6 relative">
        {/* Summary Stats (Side Column) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#a9b4b1]/5">
            <h3 className="text-lg font-bold mb-6 text-[#2a3433]">Tóm tắt hôm nay</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#82f6e7]/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#82f6e7] flex items-center justify-center text-[#006b62]">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2a3433]">Lịch hẹn mới</span>
                </div>
                <span className="text-xl font-bold text-[#006b62]">12</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#b6e7fe]/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#b6e7fe] flex items-center justify-center text-[#346578]">
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2a3433]">Đơn hàng mới</span>
                </div>
                <span className="text-xl font-bold text-[#346578]">08</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#fa746f]/10 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fa746f]/20 flex items-center justify-center text-[#a83836]">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <span className="text-sm font-semibold text-[#2a3433]">Cảnh báo kho</span>
                </div>
                <span className="text-xl font-bold text-[#a83836]">03</span>
              </div>
            </div>
          </div>

        </div>

        {/* Main Notification List (Main Column) */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Notification Item: New Booking (Unread) */}
          <div className="group bg-white p-5 rounded-[1.5rem] flex gap-4 border-l-4 border-[#006b62] shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-[#82f6e7]/40 flex flex-shrink-0 items-center justify-center text-[#006b62]">
              <span className="material-symbols-outlined text-3xl">event_available</span>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Lịch đặt mới: Chăm sóc Spa cao cấp</h4>
                <span className="text-[11px] font-semibold text-[#006b62] bg-[#82f6e7] px-2 py-0.5 rounded-full">MỚI</span>
              </div>
              <p className="text-sm text-[#56615f] mt-1 leading-snug">Khách hàng <span className="font-semibold text-[#2a3433]">Nguyễn Thu Thủy</span> vừa đặt lịch tắm rửa &amp; cắt tỉa cho Poodle "Bắp" vào lúc 15:00 ngày mai.</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[11px] text-[#727d7a] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  2 phút trước
                </span>
                <button className="text-xs font-bold text-[#006b62] hover:underline">Xem chi tiết</button>
              </div>
            </div>
          </div>

          {/* Notification Item: Low Stock (Unread) */}
          <div className="group bg-white p-5 rounded-[1.5rem] flex gap-4 border-l-4 border-[#a83836] shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-[#fa746f]/10 flex flex-shrink-0 items-center justify-center text-[#a83836]">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>inventory</span>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[#2a3433] group-hover:text-[#a83836] transition-colors">Cảnh báo kho hàng: Hết hàng sắp tới</h4>
                <span className="text-[11px] font-semibold text-[#a83836] bg-[#fa746f]/20 px-2 py-0.5 rounded-full uppercase tracking-tighter">Khẩn cấp</span>
              </div>
              <p className="text-sm text-[#56615f] mt-1">Sản phẩm <span className="font-semibold text-[#2a3433]">"Thức ăn hạt Royal Canin"</span> hiện chỉ còn 2 gói trong kho. Cần nhập thêm hàng ngay.</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[11px] text-[#727d7a] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  15 phút trước
                </span>
                <button className="text-xs font-bold text-[#a83836] hover:underline">Nhập hàng</button>
              </div>
            </div>
          </div>

          {/* Notification Item: New Order (Read) */}
          <div className="group bg-[#eef5f3]/50 p-5 rounded-[1.5rem] flex gap-4 opacity-70 hover:opacity-100 transition-all cursor-pointer border border-transparent hover:border-[#a9b4b1]/20">
            <div className="w-14 h-14 rounded-2xl bg-[#c6eae3]/50 flex flex-shrink-0 items-center justify-center text-[#446560]">
              <span className="material-symbols-outlined text-3xl">shopping_cart</span>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[#2a3433]">Đơn hàng mới #PET-2049</h4>
                <span className="text-[11px] font-medium text-[#727d7a]">Đã đọc</span>
              </div>
              <p className="text-sm text-[#56615f] mt-1">Đơn hàng trực tuyến gồm 03 món phụ kiện vừa được thanh toán thành công qua MoMo.</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[11px] text-[#727d7a] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  2 giờ trước
                </span>
                <button className="text-xs font-bold text-[#446560] hover:underline">Hóa đơn</button>
              </div>
            </div>
          </div>


          {/* Notification Item: New Booking (Read) */}
          <div className="group bg-[#eef5f3]/50 p-5 rounded-[1.5rem] flex gap-4 opacity-70 hover:opacity-100 transition-all cursor-pointer border border-transparent hover:border-[#a9b4b1]/20">
            <div className="w-14 h-14 rounded-2xl bg-[#82f6e7]/30 flex flex-shrink-0 items-center justify-center text-[#006b62]">
              <span className="material-symbols-outlined text-3xl">event_available</span>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-[#2a3433]">Lịch đặt mới: Khám sức khỏe định kỳ</h4>
                <span className="text-[11px] font-medium text-[#727d7a]">Đã đọc</span>
              </div>
              <p className="text-sm text-[#56615f] mt-1">Khách hàng <span className="font-semibold text-[#2a3433]">Trần Anh Tuấn</span> đặt lịch cho Mèo Anh Lông Ngắn "Mimi" lúc 09:00.</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[11px] text-[#727d7a] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Hôm qua, 18:45
                </span>
              </div>
            </div>
          </div>

          {/* Load More Action */}
          <div className="pt-4 flex justify-center">
            <button className="group flex items-center gap-2 text-[#006b62] font-bold text-sm hover:gap-3 transition-all">
              Xem các thông báo cũ hơn
              <span className="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#006b62] text-[#e2fff9] rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <span className="material-symbols-outlined text-2xl">delete_sweep</span>
        <span className="absolute right-full mr-4 bg-[#2a3433] text-[#f6faf8] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">Xóa thông báo cũ</span>
      </button>
    </div>
  );
}

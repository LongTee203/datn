"use client";

import React, { useState } from 'react';

export default function BookingsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-2">Quản lý đặt lịch</h2>
          <p className="text-[#56615f] max-w-md">Theo dõi và điều phối các lịch hẹn chăm sóc thú cưng một cách hiệu quả.</p>
        </div>
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="bg-[#006b62] hover:bg-[#005e56] text-[#e2fff9] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-[#006b62]/20 transition-all scale-100 active:scale-95"
        >
          <span className="material-symbols-outlined" data-icon="add">add</span>
          Thêm lịch đặt mới
        </button>
      </div>

      {/* Filter & Stats Bento Grid */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Filter Bar Card */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-3xl shadow-sm flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-2">Trạng thái</label>
            <select className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20">
              <option>Tất cả trạng thái</option>
              <option>Chờ xác nhận</option>
              <option>Đã xác nhận</option>
              <option>Hoàn thành</option>
              <option>Hủy</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-2">Thời gian</label>
            <div className="relative">
              <input className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20" type="date" />
            </div>
          </div>
          <div className="flex items-end h-full pt-5">
            <button className="bg-[#c6eae3] text-[#375853] px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-95 transition-all">
              Lọc kết quả
            </button>
          </div>
        </div>
        {/* Mini Summary Card */}
        <div className="col-span-6 lg:col-span-2 bg-[#82f6e7]/30 p-6 rounded-3xl border border-[#82f6e7]/50">
          <span className="material-symbols-outlined text-[#006b62] mb-2" data-icon="pending_actions">pending_actions</span>
          <p className="text-[10px] font-bold uppercase text-[#005c54] opacity-70">Đang chờ</p>
          <p className="text-2xl font-black text-[#005c54]">12</p>
        </div>
        <div className="col-span-6 lg:col-span-2 bg-[#b6e7fe]/30 p-6 rounded-3xl border border-[#b6e7fe]/50">
          <span className="material-symbols-outlined text-[#346578] mb-2" data-icon="check_circle">check_circle</span>
          <p className="text-[10px] font-bold uppercase text-[#235669] opacity-70">Hôm nay</p>
          <p className="text-2xl font-black text-[#235669]">28</p>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5f3]">
                <th className="px-8 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Thú cưng</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Chủ sở hữu</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Dịch vụ</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Thời gian</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Trạng thái</th>
                <th className="px-8 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/5">
              {/* Row 1 */}
              <tr className="hover:bg-[#eef5f3]/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center overflow-hidden">
                      <img alt="Pet Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXyAh2JPRDxcamYUJHgzNHvlJA2qPrQ3vzVILOBHpszeXaIwnUNNSX_RtlEah95vQcWq0dvEg4ewIPyG6h2v-kkN2TAn6aotBq2UlzyGN36j0QCJu6PJL_a7sMZTN-DAjN1Gq40Q9GgNI36jrwcAqYrM7g07o985dKfkQu3bXkjPyrJ85LJ4f6xCHLDnS8QCHtOTgNm6zYdCtdGzEHXye7KQVo2InhYLUblT4Nb-bVY1EKMZz_7CMXTTS1eBju9D-8NTCPeHxHISs" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2a3433]">Mochi</p>
                      <p className="text-xs text-[#56615f]">Poodle • 2 tuổi</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-[#2a3433]">Nguyễn Anh Thư</p>
                  <p className="text-xs text-[#56615f]">090 1234 567</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-[#e1eae7] rounded-full text-[11px] font-bold text-[#446560] uppercase tracking-tighter">Cắt tỉa lông</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">14:30</p>
                  <p className="text-xs text-[#56615f]">Hôm nay, 24 Th 5</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-[#006b62]">
                    <span className="w-2 h-2 rounded-full bg-[#006b62] animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-tight">Chờ xác nhận</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1.5 bg-[#006b62]/10 hover:bg-[#006b62] text-[#006b62] hover:text-[#e2fff9] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Xác nhận</button>
                    <button className="px-3 py-1.5 bg-[#a83836]/10 hover:bg-[#a83836] text-[#a83836] hover:text-[#fff7f6] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Hủy</button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-[#eef5f3]/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center overflow-hidden">
                      <img alt="Pet Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO1633MQB2wOQ7gFFT_UQxqRNcx5GKca2y1O5ZDbBea-Pu-hqfb3l5jWj7Gxm0RAqf7tfxN3wSE8Y7lkWO3Y1eOL38mHn0Z7KhPTm4K25Vw_-YQTb4sQFTjOcST82zK0gEi-dBh04NSPtdagZ29OAcwfecllk0tPAFNNe6BPpLKEMyCx8vfiPSXTbSU4qbgLp-LCfbgrmpUNul-s4Oq6AeUwIcBYgL_O_A14bRp9meIr8RV746lMvCqtsVp4thY2Akxdz7jISb8Wk" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2a3433]">LuLu</p>
                      <p className="text-xs text-[#56615f]">Mèo Anh • 1 tuổi</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-[#2a3433]">Trần Minh Tâm</p>
                  <p className="text-xs text-[#56615f]">091 8888 999</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-[#e1eae7] rounded-full text-[11px] font-bold text-[#446560] uppercase tracking-tighter">Tiêm chủng</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">09:00</p>
                  <p className="text-xs text-[#56615f]">Hôm nay, 24 Th 5</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-[#446560]">
                    <span className="w-2 h-2 rounded-full bg-[#446560]"></span>
                    <span className="text-xs font-bold uppercase tracking-tight">Đã xác nhận</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1.5 bg-[#006b62]/10 hover:bg-[#006b62] text-[#006b62] hover:text-[#e2fff9] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Xác nhận</button>
                    <button className="px-3 py-1.5 bg-[#a83836]/10 hover:bg-[#a83836] text-[#a83836] hover:text-[#fff7f6] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Hủy</button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-[#eef5f3]/50 transition-colors group opacity-60">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center overflow-hidden grayscale">
                      <img alt="Pet Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvfMac-PLNXgmX_Oz9FQh9ZT56z2EesqSiMaijTlJ6IOd1ozZucMHvy4qgJtE6IE6jW7CxhG1zJ_0IE8elVVgwstq_em_67Ny2pCRg65oHU1iQrinOob-znvTIs9OEIjNYKQyGdGluIUev5kMYQc65xbE0MeXMUm3rtoyhFt0cb7aF-OcpNF3X91E75o6kOwoh_16wpIUWbsrRhqMgpIgtv3FX-O5bSPW1VhA42Z3kUgOjJHWXlrfo5AizaZ4qr4a-G02gA9Z27fg" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2a3433] line-through">Bắp</p>
                      <p className="text-xs text-[#56615f]">Corgi • 3 tuổi</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-[#2a3433]">Lê Hoàng Nam</p>
                  <p className="text-xs text-[#56615f]">097 5555 444</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-[#e1eae7] rounded-full text-[11px] font-bold text-[#446560] uppercase tracking-tighter">Spa trọn gói</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">16:00</p>
                  <p className="text-xs text-[#56615f]">Hôm qua, 23 Th 5</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-[#a83836]">
                    <span className="w-2 h-2 rounded-full bg-[#a83836]"></span>
                    <span className="text-xs font-bold uppercase tracking-tight">Hủy</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1.5 bg-[#006b62]/10 hover:bg-[#006b62] text-[#006b62] hover:text-[#e2fff9] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Xác nhận</button>
                    <button className="px-3 py-1.5 bg-[#a83836]/10 hover:bg-[#a83836] text-[#a83836] hover:text-[#fff7f6] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Hủy</button>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-[#eef5f3]/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center overflow-hidden">
                      <img alt="Pet Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYTh77HFiuI9mRxBfrW-qcLbrpZnZgu7YIzGcSR1ZGs2MjwnsIFkZicmxhfoIsgjhKJ09Ac5cC6b4oCNc_k-SmH4d9dkns2ivg_yVNIgK0wHIKoXwyqmYea2Q5eJLCLnPS0z4ATeGiY1ZvJ8TtsVUQ6SPGvh09Hkh-k8mPWIZcJzJYITYt_H_DOgjST8MSePqKqlGdOtg68UWdTTObNt_C0xUI15hfNymiPk_VmOhV25iSzZ1tO-FEVXLeAYRNmg-rEfzMkMEAX-k" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2a3433]">Kem</p>
                      <p className="text-xs text-[#56615f]">Mèo Ta • 6 tháng</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-[#2a3433]">Phạm Ngọc Ánh</p>
                  <p className="text-xs text-[#56615f]">093 2222 111</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-[#e1eae7] rounded-full text-[11px] font-bold text-[#446560] uppercase tracking-tighter">Khám tổng quát</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">10:30</p>
                  <p className="text-xs text-[#56615f]">Hôm qua, 23 Th 5</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-[#727d7a]">
                    <span className="w-2 h-2 rounded-full bg-[#727d7a]"></span>
                    <span className="text-xs font-bold uppercase tracking-tight">Hoàn thành</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1.5 bg-[#006b62]/10 hover:bg-[#006b62] text-[#006b62] hover:text-[#e2fff9] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Xác nhận</button>
                    <button className="px-3 py-1.5 bg-[#a83836]/10 hover:bg-[#a83836] text-[#a83836] hover:text-[#fff7f6] rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap">Hủy</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Table Footer / Pagination */}
        <div className="bg-[#eef5f3] px-8 py-4 flex justify-between items-center">
          <p className="text-xs font-medium text-[#56615f]">Hiển thị 1 - 4 trong tổng số 128 lịch đặt</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#d9e5e2] transition-colors">
              <span className="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#006b62] text-[#e2fff9] text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#d9e5e2] transition-colors text-xs font-bold text-[#56615f]">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#d9e5e2] transition-colors text-xs font-bold text-[#56615f]">3</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#d9e5e2] transition-colors">
              <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Thêm lịch đặt mới</h3>
            
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsPopupOpen(false); }}>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên thú cưng</label>
                  <input required type="text" placeholder="Nhập tên thú cưng..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên chủ nhân</label>
                  <input required type="text" placeholder="Nhập tên chủ nhân..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Số điện thoại</label>
                <input required type="tel" placeholder="Nhập số điện thoại..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Dịch vụ đặt</label>
                <select required className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all cursor-pointer">
                  <option value="">Chọn dịch vụ...</option>
                  <option value="grooming">Cắt tỉa lông</option>
                  <option value="spa">Spa trọn gói</option>
                  <option value="vaccine">Tiêm chủng</option>
                  <option value="hotel">Khách sạn thú cưng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Ngày giờ sử dụng dịch vụ</label>
                <input required type="datetime-local" className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20"
                >
                  Xác nhận đặt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

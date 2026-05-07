"use client";

import React, { useState } from 'react';

const initialBookings = [
  {
    id: 1,
    petName: "Mochi",
    species: "Poodle",
    weight: "5 kg",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXyAh2JPRDxcamYUJHgzNHvlJA2qPrQ3vzVILOBHpszeXaIwnUNNSX_RtlEah95vQcWq0dvEg4ewIPyG6h2v-kkN2TAn6aotBq2UlzyGN36j0QCJu6PJL_a7sMZTN-DAjN1Gq40Q9GgNI36jrwcAqYrM7g07o985dKfkQu3bXkjPyrJ85LJ4f6xCHLDnS8QCHtOTgNm6zYdCtdGzEHXye7KQVo2InhYLUblT4Nb-bVY1EKMZz_7CMXTTS1eBju9D-8NTCPeHxHISs",
    ownerName: "Nguyễn Anh Thư",
    phone: "090 1234 567",
    service: "Cắt tỉa lông",
    time: "14:30",
    date: "Hôm nay, 24 Th 5",
    realDate: "2024-05-24",
    status: "Chờ xác nhận"
  },
  {
    id: 2,
    petName: "LuLu",
    species: "Mèo Anh",
    weight: "3.5 kg",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO1633MQB2wOQ7gFFT_UQxqRNcx5GKca2y1O5ZDbBea-Pu-hqfb3l5jWj7Gxm0RAqf7tfxN3wSE8Y7lkWO3Y1eOL38mHn0Z7KhPTm4K25Vw_-YQTb4sQFTjOcST82zK0gEi-dBh04NSPtdagZ29OAcwfecllk0tPAFNNe6BPpLKEMyCx8vfiPSXTbSU4qbgLp-LCfbgrmpUNul-s4Oq6AeUwIcBYgL_O_A14bRp9meIr8RV746lMvCqtsVp4thY2Akxdz7jISb8Wk",
    ownerName: "Trần Minh Tâm",
    phone: "091 8888 999",
    service: "Tiêm chủng",
    time: "09:00",
    date: "Hôm nay, 24 Th 5",
    realDate: "2024-05-24",
    status: "Đã xác nhận"
  },
  {
    id: 3,
    petName: "Bắp",
    species: "Corgi",
    weight: "8 kg",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvfMac-PLNXgmX_Oz9FQh9ZT56z2EesqSiMaijTlJ6IOd1ozZucMHvy4qgJtE6IE6jW7CxhG1zJ_0IE8elVVgwstq_em_67Ny2pCRg65oHU1iQrinOob-znvTIs9OEIjNYKQyGdGluIUev5kMYQc65xbE0MeXMUm3rtoyhFt0cb7aF-OcpNF3X91E75o6kOwoh_16wpIUWbsrRhqMgpIgtv3FX-O5bSPW1VhA42Z3kUgOjJHWXlrfo5AizaZ4qr4a-G02gA9Z27fg",
    ownerName: "Lê Hoàng Nam",
    phone: "097 5555 444",
    service: "Spa trọn gói",
    time: "16:00",
    date: "Hôm qua, 23 Th 5",
    realDate: "2024-05-23",
    status: "Hủy"
  },
  {
    id: 4,
    petName: "Kem",
    species: "Mèo Ta",
    weight: "2.2 kg",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYTh77HFiuI9mRxBfrW-qcLbrpZnZgu7YIzGcSR1ZGs2MjwnsIFkZicmxhfoIsgjhKJ09Ac5cC6b4oCNc_k-SmH4d9dkns2ivg_yVNIgK0wHIKoXwyqmYea2Q5eJLCLnPS0z4ATeGiY1ZvJ8TtsVUQ6SPGvh09Hkh-k8mPWIZcJzJYITYt_H_DOgjST8MSePqKqlGdOtg68UWdTTObNt_C0xUI15hfNymiPk_VmOhV25iSzZ1tO-FEVXLeAYRNmg-rEfzMkMEAX-k",
    ownerName: "Phạm Ngọc Ánh",
    phone: "093 2222 111",
    service: "Khám tổng quát",
    time: "10:30",
    date: "Hôm qua, 23 Th 5",
    realDate: "2024-05-23",
    status: "Hoàn thành"
  }
];

export default function BookingsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bookings, setBookings] = useState(initialBookings);
  const [filterStatus, setFilterStatus] = useState("Tất cả trạng thái");
  const [filterDate, setFilterDate] = useState("");

  const updateStatus = (id: number, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const filteredBookings = bookings.filter(b => {
    const matchStatus = filterStatus === "Tất cả trạng thái" || b.status === filterStatus;
    const matchDate = !filterDate || b.realDate === filterDate;
    return matchStatus && matchDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xác nhận": return "text-[#006b62] bg-[#006b62]";
      case "Đã xác nhận": return "text-[#446560] bg-[#446560]";
      case "Hủy": return "text-[#a83836] bg-[#a83836]";
      case "Hoàn thành": return "text-[#727d7a] bg-[#727d7a]";
      default: return "text-gray-500 bg-gray-500";
    }
  };

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
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
            >
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
              <input 
                type="date" 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none" 
              />
            </div>
          </div>
          <div className="flex items-end h-full pt-5">
            <button 
              onClick={() => { setFilterStatus("Tất cả trạng thái"); setFilterDate(""); }}
              className="bg-[#c6eae3] text-[#375853] px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-95 transition-all"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
        {/* Mini Summary Card */}
        <div className="col-span-6 lg:col-span-2 bg-[#82f6e7]/30 p-6 rounded-3xl border border-[#82f6e7]/50">
          <span className="material-symbols-outlined text-[#006b62] mb-2" data-icon="pending_actions">pending_actions</span>
          <p className="text-[10px] font-bold uppercase text-[#005c54] opacity-70">Đang chờ</p>
          <p className="text-2xl font-black text-[#005c54]">{bookings.filter(b => b.status === "Chờ xác nhận").length}</p>
        </div>
        <div className="col-span-6 lg:col-span-2 bg-[#b6e7fe]/30 p-6 rounded-3xl border border-[#b6e7fe]/50">
          <span className="material-symbols-outlined text-[#346578] mb-2" data-icon="check_circle">check_circle</span>
          <p className="text-[10px] font-bold uppercase text-[#235669] opacity-70">Hôm nay</p>
          <p className="text-2xl font-black text-[#235669]">{bookings.filter(b => b.realDate === "2024-05-24").length}</p>
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
              {filteredBookings.length > 0 ? filteredBookings.map(booking => (
                <tr key={booking.id} className={`hover:bg-[#eef5f3]/50 transition-colors group ${booking.status === 'Hủy' ? 'opacity-60' : ''}`}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center overflow-hidden ${booking.status === 'Hủy' ? 'grayscale' : ''}`}>
                        <img alt="Pet Avatar" className="w-full h-full object-cover" src={booking.avatar} />
                      </div>
                      <div>
                        <p className={`font-bold text-[#2a3433] ${booking.status === 'Hủy' ? 'line-through' : ''}`}>{booking.petName}</p>
                        <p className="text-xs text-[#56615f]">{booking.species} • {booking.weight}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-[#2a3433]">{booking.ownerName}</p>
                    <p className="text-xs text-[#56615f]">{booking.phone}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-[#e1eae7] rounded-full text-[11px] font-bold text-[#446560] uppercase tracking-tighter">{booking.service}</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-[#2a3433]">{booking.time}</p>
                    <p className="text-xs text-[#56615f]">{booking.date}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`flex items-center gap-1.5 ${getStatusColor(booking.status).split(' ')[0]}`}>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(booking.status).split(' ')[1]} ${booking.status === 'Chờ xác nhận' ? 'animate-pulse' : ''}`}></span>
                      <span className="text-xs font-bold uppercase tracking-tight">{booking.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="relative inline-block text-left group/menu">
                      <button className="p-2 hover:bg-[#eef5f3] rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[#56615f]">more_vert</span>
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 flex flex-col overflow-hidden">
                        <button onClick={() => updateStatus(booking.id, 'Chờ xác nhận')} className="px-4 py-3 text-left text-xs font-bold text-[#2a3433] hover:bg-gray-50 transition-colors">Chờ xác nhận</button>
                        <button onClick={() => updateStatus(booking.id, 'Đã xác nhận')} className="px-4 py-3 text-left text-xs font-bold text-[#006b62] hover:bg-gray-50 border-t border-gray-50 transition-colors">Đã xác nhận</button>
                        <button onClick={() => updateStatus(booking.id, 'Hủy')} className="px-4 py-3 text-left text-xs font-bold text-[#a83836] hover:bg-gray-50 border-t border-gray-50 transition-colors">Hủy</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-[#56615f]">Không tìm thấy lịch đặt nào phù hợp.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Table Footer / Pagination */}
        <div className="bg-[#eef5f3] px-8 py-4 flex justify-between items-center">
          <p className="text-xs font-medium text-[#56615f]">Hiển thị 1 - {filteredBookings.length} trong tổng số {filteredBookings.length} lịch đặt</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#d9e5e2] transition-colors">
              <span className="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#006b62] text-[#e2fff9] text-xs font-bold">1</button>
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
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsPopupOpen(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên thú cưng</label>
                  <input required type="text" placeholder="Nhập tên..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên chủ nhân</label>
                  <input required type="text" placeholder="Nhập tên..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Giống loài</label>
                  <input required type="text" placeholder="VD: Poodle, Corgi..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Cân nặng (kg)</label>
                  <input required type="number" step="0.1" placeholder="Nhập cân nặng..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
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

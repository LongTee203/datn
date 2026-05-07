import React from 'react';

export default function PaymentsPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Quản lý Thanh toán</h1>
          <p className="text-[#56615f] font-medium mt-1">Theo dõi và quản lý các dòng tiền vào/ra của hệ thống</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-[#2a3433] font-semibold px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e1eae7] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">file_download</span> Xuất báo cáo
          </button>
          <button className="bg-[#006b62] text-[#e2fff9] font-semibold px-6 py-2.5 rounded-full shadow-md hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span> Tạo hóa đơn mới
          </button>
        </div>
      </div>

      {/* Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Highlight Card: Total Revenue Today */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#006b62] to-[#005e56] p-8 rounded-[2rem] text-[#e2fff9] shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[#82f6e7]/80 font-bold uppercase tracking-widest text-xs mb-2">Tổng thu trong ngày</p>
            <h2 className="text-5xl font-extrabold mb-4 tracking-tighter">24.500.000 <span className="text-2xl font-medium opacity-80">₫</span></h2>
            <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="text-sm font-semibold">+12% so với hôm qua</span>
            </div>
          </div>
          {/* Abstract Background Shape */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#82f6e7]/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#c6eae3]/30 flex items-center justify-center text-[#446560] mb-4">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <p className="text-[#56615f] font-semibold text-sm">Chuyển khoản</p>
          <h3 className="text-2xl font-bold text-[#2a3433] mt-1">18.200.000 ₫</h3>
          <p className="text-[10px] text-[#446560] font-bold mt-2">15 giao dịch</p>
        </div>
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578] mb-4">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <p className="text-[#56615f] font-semibold text-sm">Tiền mặt</p>
          <h3 className="text-2xl font-bold text-[#2a3433] mt-1">6.300.000 ₫</h3>
          <p className="text-[10px] text-[#346578] font-bold mt-2">8 giao dịch</p>
        </div>
      </div>

      {/* Transaction History Table Section */}
      <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0px_10px_40px_rgba(42,52,51,0.06)] mb-10">
        <div className="px-8 py-6 flex justify-between items-center bg-[#eef5f3]/50">
          <h3 className="text-xl font-bold text-[#2a3433]">Lịch sử giao dịch</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#727d7a]">Lọc theo:</span>
            <select className="text-sm border-none bg-transparent font-bold text-[#006b62] focus:ring-0 outline-none">
              <option>Tất cả trạng thái</option>
              <option>Thành công</option>
              <option>Đang xử lý</option>
              <option>Thất bại</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#e7f0ed]/30">
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Mã giao dịch</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Thời gian</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Nội dung</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Số tiền</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Hình thức</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Trạng thái</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/10">
              {/* Row 1 */}
              <tr className="hover:bg-[#e1eae7] transition-colors">
                <td className="px-8 py-5">
                  <span className="font-mono text-sm font-bold text-[#006b62]">#TXN-88291</span>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">Hôm nay, 14:20</p>
                  <p className="text-[10px] text-[#727d7a] font-medium">15/10/2023</p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c6eae3]/30 flex items-center justify-center text-[#446560]">
                      <span className="material-symbols-outlined text-sm">content_cut</span>
                    </div>
                    <span className="text-sm font-semibold text-[#2a3433]">Cắt tỉa lông - Cún Golden (Max)</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-extrabold text-[#2a3433]">450.000 ₫</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#727d7a]">account_balance</span>
                    <span className="text-xs font-semibold text-[#727d7a]">Chuyển khoản</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full bg-[#82f6e7] text-[#005c54] text-[10px] font-bold uppercase">Thành công</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-[#727d7a] hover:text-[#006b62] transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-[#e1eae7] transition-colors">
                <td className="px-8 py-5">
                  <span className="font-mono text-sm font-bold text-[#006b62]">#TXN-88290</span>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">Hôm nay, 13:45</p>
                  <p className="text-[10px] text-[#727d7a] font-medium">15/10/2023</p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#82f6e7]/30 flex items-center justify-center text-[#006b62]">
                      <span className="material-symbols-outlined text-sm">medication</span>
                    </div>
                    <span className="text-sm font-semibold text-[#2a3433]">Tiêm phòng dại - Mèo British (Luna)</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-extrabold text-[#2a3433]">250.000 ₫</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#727d7a]">payments</span>
                    <span className="text-xs font-semibold text-[#727d7a]">Tiền mặt</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full bg-[#82f6e7] text-[#005c54] text-[10px] font-bold uppercase">Thành công</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-[#727d7a] hover:text-[#006b62] transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-[#e1eae7] transition-colors">
                <td className="px-8 py-5">
                  <span className="font-mono text-sm font-bold text-[#006b62]">#TXN-88289</span>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">Hôm nay, 11:10</p>
                  <p className="text-[10px] text-[#727d7a] font-medium">15/10/2023</p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578]">
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    </div>
                    <span className="text-sm font-semibold text-[#2a3433]">Thức ăn hạt cao cấp (5kg)</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-extrabold text-[#2a3433]">1.200.000 ₫</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#727d7a]">account_balance</span>
                    <span className="text-xs font-semibold text-[#727d7a]">Chuyển khoản</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full bg-[#82f6e7] text-[#005c54] text-[10px] font-bold uppercase">Thành công</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-[#727d7a] hover:text-[#006b62] transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-[#e1eae7] transition-colors">
                <td className="px-8 py-5">
                  <span className="font-mono text-sm font-bold text-[#006b62]">#TXN-88288</span>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-bold text-[#2a3433]">Hôm nay, 09:30</p>
                  <p className="text-[10px] text-[#727d7a] font-medium">15/10/2023</p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c6eae3]/30 flex items-center justify-center text-[#446560]">
                      <span className="material-symbols-outlined text-sm">hotel</span>
                    </div>
                    <span className="text-sm font-semibold text-[#2a3433]">Dịch vụ lưu trú (3 đêm)</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-extrabold text-[#2a3433]">900.000 ₫</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#727d7a]">account_balance</span>
                    <span className="text-xs font-semibold text-[#727d7a]">Chuyển khoản</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full bg-[#82f6e7] text-[#005c54] text-[10px] font-bold uppercase">Thành công</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-[#727d7a] hover:text-[#006b62] transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 bg-[#eef5f3]/30 flex justify-between items-center">
          <p className="text-xs font-semibold text-[#727d7a]">Hiển thị 4 trong số 128 giao dịch</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#a9b4b1]/30 text-[#727d7a] hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#006b62] text-[#e2fff9] font-bold text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#a9b4b1]/30 text-[#727d7a] hover:bg-white transition-colors text-xs font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#a9b4b1]/30 text-[#727d7a] hover:bg-white transition-colors text-xs font-bold">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#a9b4b1]/30 text-[#727d7a] hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="grid grid-cols-1 gap-6">
        {/* Mini Chart Placeholder Area */}
        <div className="bg-[#eef5f3] p-8 rounded-[1.5rem] flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold text-[#2a3433]">Xu hướng doanh thu 7 ngày qua</h4>
              <p className="text-sm text-[#727d7a] font-medium">Tăng trưởng ổn định ở mảng dịch vụ chăm sóc</p>
            </div>
            <span className="text-[#006b62] font-bold text-sm bg-[#82f6e7]/40 px-3 py-1 rounded-full">+8.5%</span>
          </div>
          <div className="flex-1 flex items-end gap-3 pt-8 pb-4">
            <div className="flex-1 bg-[#006b62]/20 rounded-t-xl h-[40%] transition-all hover:bg-[#006b62]/40 relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">12tr</div>
            </div>
            <div className="flex-1 bg-[#006b62]/20 rounded-t-xl h-[65%] transition-all hover:bg-[#006b62]/40 relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">18tr</div>
            </div>
            <div className="flex-1 bg-[#006b62]/20 rounded-t-xl h-[55%] transition-all hover:bg-[#006b62]/40 relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">15tr</div>
            </div>
            <div className="flex-1 bg-[#006b62]/20 rounded-t-xl h-[80%] transition-all hover:bg-[#006b62]/40 relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">22tr</div>
            </div>
            <div className="flex-1 bg-[#006b62]/20 rounded-t-xl h-[45%] transition-all hover:bg-[#006b62]/40 relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">13tr</div>
            </div>
            <div className="flex-1 bg-[#006b62]/20 rounded-t-xl h-[70%] transition-all hover:bg-[#006b62]/40 relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">19tr</div>
            </div>
            <div className="flex-1 bg-[#006b62] rounded-t-xl h-[95%] relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">24.5tr</div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-[#727d7a] font-bold uppercase tracking-widest pt-2">
            <span>Thứ 2</span>
            <span>Thứ 3</span>
            <span>Thứ 4</span>
            <span>Thứ 5</span>
            <span>Thứ 6</span>
            <span>Thứ 7</span>
            <span>Chủ nhật</span>
          </div>
        </div>
      </div>
    </div>
  );
}

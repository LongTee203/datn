import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Welcome Header */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Chào buổi sáng, Admin 👋</h2>
          <p className="text-[#56615f] mt-1">Cập nhật mới nhất về thánh đường thú cưng của bạn.</p>
        </div>
      </div>

      {/* Bento Stats Grid (Summary Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Doanh thu tháng */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-2">Doanh thu NGÀY</p>
              <h3 className="text-2xl font-extrabold text-[#2a3433]">2.500.000đ</h3>
              <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +12% so với hôm qua
              </p>
            </div>
            <div className="w-12 h-12 bg-[#82f6e7] rounded-2xl flex items-center justify-center text-[#006b62] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#006b62]/5 rounded-full blur-2xl"></div>
        </div>

        {/* Đặt lịch mới */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-2">Đặt lịch mới</p>
              <h3 className="text-2xl font-extrabold text-[#2a3433]">42</h3>
              <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                8 lịch chờ xác nhận
              </p>
            </div>
            <div className="w-12 h-12 bg-[#c6eae3] rounded-2xl flex items-center justify-center text-[#446560] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#446560]/5 rounded-full blur-2xl"></div>
        </div>

        {/* Đơn hàng đang giao */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-2">Đơn hàng mới</p>
              <h3 className="text-2xl font-extrabold text-[#2a3433]">15</h3>
              <p className="text-[#a83836] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">priority_high</span>
                3 đơn cần xử lý gấp
              </p>
            </div>
            <div className="w-12 h-12 bg-[#b6e7fe] rounded-2xl flex items-center justify-center text-[#346578] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#346578]/5 rounded-full blur-2xl"></div>
        </div>

        {/* Khách hàng mới */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-2">Khách hàng mới</p>
              <h3 className="text-2xl font-extrabold text-[#2a3433]">24</h3>
              <p className="text-[#006b62] text-xs font-bold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">person_add</span>
                +5 khách hôm nay
              </p>
            </div>
            <div className="w-12 h-12 bg-[#d9e5e2] rounded-2xl flex items-center justify-center text-[#56615f] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#56615f]/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart & Sales Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-bold text-[#2a3433]">Biểu đồ doanh thu & doanh số</h4>
              <p className="text-sm text-[#56615f]">Thống kê 7 ngày gần nhất</p>
            </div>
          </div>

          {/* Enhanced Chart Visual with Labels */}
          <div className="relative h-[300px] w-full flex items-end justify-between gap-4 pt-10">
            <div className="flex-1 bg-[#82f6e7]/20 rounded-t-2xl relative group cursor-pointer hover:bg-[#82f6e7]/40 transition-colors h-[60%]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] py-1 px-2 rounded opacity-100 whitespace-nowrap">1.200.000đ</div>
            </div>
            <div className="flex-1 bg-[#82f6e7]/20 rounded-t-2xl relative group cursor-pointer hover:bg-[#82f6e7]/40 transition-colors h-[80%]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] py-1 px-2 rounded opacity-100 whitespace-nowrap">1.800.000đ</div>
            </div>
            <div className="flex-1 bg-[#82f6e7]/20 rounded-t-2xl relative group cursor-pointer hover:bg-[#82f6e7]/40 transition-colors h-[45%]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] py-1 px-2 rounded opacity-100 whitespace-nowrap">900.000đ</div>
            </div>
            <div className="flex-1 bg-[#006b62] rounded-t-2xl relative group cursor-pointer hover:brightness-110 transition-all h-[95%]">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#006b62] text-white text-[10px] py-1.5 px-3 rounded font-bold shadow-lg opacity-100 whitespace-nowrap">2.500.000đ</div>
            </div>
            <div className="flex-1 bg-[#82f6e7]/20 rounded-t-2xl relative group cursor-pointer hover:bg-[#82f6e7]/40 transition-colors h-[70%]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] py-1 px-2 rounded opacity-100 whitespace-nowrap">0đ</div>
            </div>
            <div className="flex-1 bg-[#82f6e7]/20 rounded-t-2xl relative group cursor-pointer hover:bg-[#82f6e7]/40 transition-colors h-[65%]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] py-1 px-2 rounded opacity-100 whitespace-nowrap">0đ</div>
            </div>
            <div className="flex-1 bg-[#82f6e7]/20 rounded-t-2xl relative group cursor-pointer hover:bg-[#82f6e7]/40 transition-colors h-[85%]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] py-1 px-2 rounded opacity-100 whitespace-nowrap">0đ</div>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-[#56615f]/60 uppercase tracking-widest px-1">
            <span>Thứ 2</span>
            <span>Thứ 3</span>
            <span>Thứ 4</span>
            <span>Thứ 5</span>
            <span>Thứ 6</span>
            <span>Thứ 7</span>
            <span>Chủ Nhật</span>
          </div>
        </div>

        {/* Upcoming Bookings (Glassmorphism inspired) */}
        <div className="bg-[#e7f0ed] p-6 rounded-[2rem] border-none shadow-[0px_10px_40px_rgba(42,52,51,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-[#2a3433]">Lịch sắp tới</h4>
            <Link className="text-[#006b62] text-xs font-bold hover:underline" href="/admin/bookings">Xem tất cả</Link>
          </div>
          <div className="space-y-4">
            {/* Booking Item 1 */}
            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer">
              <img alt="Beagle Dog" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sAYmoGlIGVlxt1gU-62TpsCQNmC2Lr_WWvsD6tWE129sTJ7LJx36wmmimgE_8D_E-U4IexFGpJf8ePE-bLbLqoCmlW8pmEnma1DW18YW5BCkthJ3stOaIhjLW8IGrvKV8VeekDWnelVNrhVbkfzrwS8bCF0CHEdiGEdSvRjdQVM04Ovb4wEEneOz7hLHj-eAP3pJASeuWJVfeEC3hMQLGrX2uiTu9g5Xv8VykkdegAV6gCtzacv0Yz0JaotjMEd5OVlDK0jGXU4" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2a3433] truncate">Milo (Cắt tỉa lông)</p>
                <p className="text-[10px] text-[#56615f]">Chủ: Nguyễn Anh Tuấn</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-[#006b62]">09:30</p>
                <p className="text-[10px] text-[#56615f]">Hôm nay</p>
              </div>
            </div>

            {/* Booking Item 2 */}
            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer">
              <img alt="Grey Cat" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGKR9WAXlpM6vg4Pg_Q-ro3qKBN_ih9-g_Ozx5Z5LgAfpBcmb1RuDeu_m8fVJReLBeKPbyTCazilNbpl8GrvDwGcWMRXQtZoQOkcEOpHdt_cEG2L6v3l3SPs-Y9GBJbM20UDFW26i--jT1VdJTfQ2Flt09crHZXAgd79WvtfuFdmZxFbBCxoTODt4Hl__U4XyxfbXewSe_4qpXBkey7YFPLb5GwCieVLlKi3mFNQ9XDF09e38cZ7it3vfdl9WeLNRzTbb21N2fhEQ" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2a3433] truncate">Luna (Tắm sấy)</p>
                <p className="text-[10px] text-[#56615f]">Chủ: Lê Minh Hương</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-[#006b62]">14:15</p>
                <p className="text-[10px] text-[#56615f]">Hôm nay</p>
              </div>
            </div>

            {/* Booking Item 3 */}
            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer">
              <img alt="Poodle" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAasOHukVX5-0CFh2rvYwg3P8TRs9Su5Tpj0NgfMmn9QaMZm-Pgpi3IYIpN2OBKnGumWZ5PTPHOwZS_EH9eGFWIm-LQjXI3I5GXIhXlxm-GrGUhsDmIuJFiOUggX8P0u4td0X_8JLsuMCCpipXM0yIOWP3PWoX9TN4PQ7RkCcK86mvTFsqSiaFYakrfkwfLTayEFxI_5n_r9NQ_X8EcXLJJkZQQH3U5cEZtsXN-hq4MqhGXoA-q72ssaXzSd_oOkLmd18lHfDxmYmY" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2a3433] truncate">Bông (Combo toàn diện)</p>
                <p className="text-[10px] text-[#56615f]">Chủ: Trần Văn Nam</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-[#006b62]">08:00</p>
                <p className="text-[10px] text-[#56615f]">Ngày mai</p>
              </div>
            </div>

            {/* Booking Item 4 */}
            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#c6eae3] flex items-center justify-center text-[#446560]">
                <span className="material-symbols-outlined">medical_services</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2a3433] truncate">Rex (Tiêm phòng)</p>
                <p className="text-[10px] text-[#56615f]">Chủ: Phạm Gia Bảo</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-[#006b62]">10:45</p>
                <p className="text-[10px] text-[#56615f]">Ngày mai</p>
              </div>
            </div>

            {/* Booking Item 5 */}
            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer">
              <img alt="Corgi" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsk726bWdijgJK0ak2x6UnHvIi_DbVm_UlKaBs-UwfBrYvGJ7EHruzSta2ncgS1lCEfSyRh2mKHPMF4m7DoOav88ceLSX7varZ8KaXkXkUnKM1XeFSC_OFgOU8CLde4APQFj9QlgZaFQuVBr5L08FhLgIzmqwwkToROve21WVsPmn7rG_OacTZ_AbbGP7q7QtNIZydAINnGxjF84Kd6kEj6fwFckZ0YDCZ7giI49vA2i9ugLjhPXdqoL01LNebgPG7ARqDviDf-rk" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2a3433] truncate">Bắp (Trông giữ ngày)</p>
                <p className="text-[10px] text-[#56615f]">Chủ: Hoàng Thùy Linh</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-[#006b62]">15:30</p>
                <p className="text-[10px] text-[#56615f]">25/10</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders (Table) */}
      <div className="mt-10 bg-white p-8 rounded-[2rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="text-xl font-bold text-[#2a3433]">Đơn hàng mới nhất</h4>
            <p className="text-sm text-[#56615f]">Cần được xử lý và vận chuyển</p>
          </div>
          <select className="bg-[#e1eae7] text-[#56615f] px-5 py-2 rounded-full text-xs font-bold hover:bg-[#d9e5e2] transition-colors outline-none cursor-pointer appearance-none">
            <option value="">Lọc theo trạng thái</option>
            <option value="cho-xac-nhan">Chờ xác nhận</option>
            <option value="dang-giao">Đang giao</option>
            <option value="hoan-tat">Hoàn tất</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#56615f]/60 border-b border-gray-100">
                <th className="pb-6 px-4">Mã đơn</th>
                <th className="pb-6 px-4">Khách hàng</th>
                <th className="pb-6 px-4">Sản phẩm</th>
                <th className="pb-6 px-4">Tổng tiền</th>
                <th className="pb-6 px-4">Trạng thái</th>
                <th className="pb-6 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Order 1 */}
              <tr className="group hover:bg-[#eef5f3] transition-colors">
                <td className="py-5 px-4 font-bold text-[#2a3433]">#ORD-9421</td>
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#82f6e7] text-[#006b62] flex items-center justify-center font-bold text-xs">NT</div>
                    <span className="font-medium">Nguyễn Thanh Tùng</span>
                  </div>
                </td>
                <td className="py-5 px-4 text-[#56615f]">Thức ăn Royal Canin 2kg, Xương gặm...</td>
                <td className="py-5 px-4 font-bold">1.250.000đ</td>
                <td className="py-5 px-4">
                  <span className="bg-[#fa746f]/20 text-[#6e0a12] px-3 py-1 rounded-full text-[10px] font-bold">Chờ xác nhận</span>
                </td>
                <td className="py-5 px-4 text-center">
                  <select defaultValue="cho-xac-nhan" className="text-[11px] font-bold bg-[#eef5f3] text-[#006b62] px-2 py-1.5 rounded-lg outline-none border border-[#c6eae3] cursor-pointer">
                    <option value="cho-xac-nhan">Chờ xác nhận</option>
                    <option value="dang-giao">Đang giao</option>
                    <option value="hoan-tat">Hoàn tất</option>
                  </select>
                </td>
              </tr>
              {/* Order 2 */}
              <tr className="group hover:bg-[#eef5f3] transition-colors">
                <td className="py-5 px-4 font-bold text-[#2a3433]">#ORD-9420</td>
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c6eae3] text-[#446560] flex items-center justify-center font-bold text-xs">MH</div>
                    <span className="font-medium">Mai Hoa</span>
                  </div>
                </td>
                <td className="py-5 px-4 text-[#56615f]">Chuồng mèo gỗ thông cao cấp</td>
                <td className="py-5 px-4 font-bold">4.800.000đ</td>
                <td className="py-5 px-4">
                  <span className="bg-[#b6e7fe]/20 text-[#074355] px-3 py-1 rounded-full text-[10px] font-bold">Đang giao</span>
                </td>
                <td className="py-5 px-4 text-center">
                  <select defaultValue="dang-giao" className="text-[11px] font-bold bg-[#eef5f3] text-[#006b62] px-2 py-1.5 rounded-lg outline-none border border-[#c6eae3] cursor-pointer">
                    <option value="cho-xac-nhan">Chờ xác nhận</option>
                    <option value="dang-giao">Đang giao</option>
                    <option value="hoan-tat">Hoàn tất</option>
                  </select>
                </td>
              </tr>
              {/* Order 3 */}
              <tr className="group hover:bg-[#eef5f3] transition-colors">
                <td className="py-5 px-4 font-bold text-[#2a3433]">#ORD-9419</td>
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#d9e5e2] text-[#56615f] flex items-center justify-center font-bold text-xs">KV</div>
                    <span className="font-medium">Khánh Vân</span>
                  </div>
                </td>
                <td className="py-5 px-4 text-[#56615f]">Sữa tắm Joyce & Dolls 500ml</td>
                <td className="py-5 px-4 font-bold">320.000đ</td>
                <td className="py-5 px-4">
                  <span className="bg-[#82f6e7]/30 text-[#005c54] px-3 py-1 rounded-full text-[10px] font-bold">Hoàn tất</span>
                </td>
                <td className="py-5 px-4 text-center">
                  <select defaultValue="hoan-tat" className="text-[11px] font-bold bg-[#eef5f3] text-[#006b62] px-2 py-1.5 rounded-lg outline-none border border-[#c6eae3] cursor-pointer">
                    <option value="cho-xac-nhan">Chờ xác nhận</option>
                    <option value="dang-giao">Đang giao</option>
                    <option value="hoan-tat">Hoàn tất</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAB for quick action */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-4">
        <button className="w-14 h-14 bg-[#2a3433] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined">support_agent</span>
        </button>
      </div>
    </div>
  );
}

import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Báo cáo & Thống kê</h2>
            <p className="text-[#56615f] mt-1">Tổng quan hoạt động kinh doanh và dữ liệu thú cưng tháng này.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-[#2a3433] px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-[#e7f0ed] transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              01/10/2023 - 31/10/2023
            </button>
            <button className="bg-gradient-to-r from-[#006b62] to-[#00897b] text-[#e2fff9] px-6 py-2.5 rounded-full text-sm font-semibold shadow-md active:scale-95 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">download</span>
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Combined Chart Card (Line + Bar Comparison) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold text-[#2a3433]">So sánh Doanh thu</h3>
                <p className="text-sm text-[#56615f]">Dịch vụ vs Bán hàng (Triệu VNĐ)</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#006b62]"></span>
                  <span className="text-xs font-medium">Dịch vụ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#346578]"></span>
                  <span className="text-xs font-medium">Bán hàng</span>
                </div>
              </div>
            </div>
            
            {/* Simulated Realistic Chart Visual */}
            <div className="relative h-64 px-4">
              {/* Grid Lines (Subtle) */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-5">
                <div className="border-t border-[#2a3433]"></div>
                <div className="border-t border-[#2a3433]"></div>
                <div className="border-t border-[#2a3433]"></div>
                <div className="border-t border-[#2a3433]"></div>
                <div className="border-t border-[#2a3433]"></div>
              </div>
              
              {/* Smooth Spline Chart Visual */}
              <div className="absolute inset-0 z-10 py-2">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 100">
                  <defs>
                    <linearGradient id="gradient-services" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#006b62" stopOpacity="0.15"></stop>
                      <stop offset="100%" stopColor="#006b62" stopOpacity="0"></stop>
                    </linearGradient>
                    <linearGradient id="gradient-sales" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#346578" stopOpacity="0.1"></stop>
                      <stop offset="100%" stopColor="#346578" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  {/* Straight Lines for Services (Primary) */}
                  <path d="M 50,60 L 150,40 L 250,25 L 350,55 L 450,20 L 550,5 L 650,15" fill="none" stroke="#006b62" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                  {/* Straight Lines for Sales (Tertiary) */}
                  <path d="M 50,75 L 150,65 L 250,80 L 350,50 L 450,70 L 550,35 L 650,25" fill="none" stroke="#346578" strokeDasharray="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                  {/* Refined Data Points */}
                  {/* Services Dots */}
                  <circle cx="50" cy="60" fill="#006b62" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="150" cy="40" fill="#006b62" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="250" cy="25" fill="#006b62" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="350" cy="55" fill="#006b62" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="450" cy="20" fill="#006b62" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="550" cy="5" fill="#006b62" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="650" cy="15" fill="#006b62" r="3" stroke="white" strokeWidth="1.5"></circle>
                  {/* Sales Dots */}
                  <circle cx="50" cy="75" fill="#346578" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="150" cy="65" fill="#346578" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="250" cy="80" fill="#346578" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="350" cy="50" fill="#346578" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="450" cy="70" fill="#346578" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="550" cy="35" fill="#346578" r="3" stroke="white" strokeWidth="1.5"></circle>
                  <circle cx="650" cy="25" fill="#346578" r="3" stroke="white" strokeWidth="1.5"></circle>
                </svg>
              </div>
              
              {/* Labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[7%] pb-2">
                <span className="text-[10px] font-bold text-[#56615f]">T2</span>
                <span className="text-[10px] font-bold text-[#56615f]">T3</span>
                <span className="text-[10px] font-bold text-[#56615f]">T4</span>
                <span className="text-[10px] font-bold text-[#56615f]">T5</span>
                <span className="text-[10px] font-bold text-[#56615f]">T6</span>
                <span className="text-[10px] font-bold text-[#56615f]">T7</span>
                <span className="text-[10px] font-bold text-[#56615f]">CN</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Card (Pet Types) */}
          <div className="bg-white p-8 rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
            <h3 className="text-xl font-bold text-[#2a3433] mb-2">Cơ cấu Thú cưng</h3>
            <p className="text-sm text-[#56615f] mb-8">Tỷ lệ theo chủng loại khách hàng</p>
            <div className="relative flex justify-center items-center mb-8">
              <svg className="w-48 h-48 transform -rotate-90">
                {/* Cat (50%) */}
                <circle cx="96" cy="96" fill="transparent" r="80" stroke="#006b62" strokeDasharray="251 502" strokeWidth="24"></circle>
                {/* Dog (30%) */}
                <circle cx="96" cy="96" fill="transparent" r="80" stroke="#446560" strokeDasharray="150 502" strokeDashoffset="-251" strokeWidth="24"></circle>
                {/* Others (20%) */}
                <circle cx="96" cy="96" fill="transparent" r="80" stroke="#82f6e7" strokeDasharray="101 502" strokeDashoffset="-401" strokeWidth="24"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#2a3433]">1,248</span>
                <span className="text-[10px] font-bold text-[#56615f] uppercase tracking-widest">Tổng thú cưng</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006b62]"></span>
                  <span className="font-medium">Mèo</span>
                </div>
                <span className="font-bold">50%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#446560]"></span>
                  <span className="font-medium">Chó</span>
                </div>
                <span className="font-bold">30%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#82f6e7]"></span>
                  <span className="font-medium">Khác (Chim, Thỏ...)</span>
                </div>
                <span className="font-bold">20%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Table & Secondary Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Top 5 Services Table */}
          <div className="xl:col-span-3 bg-white rounded-3xl overflow-hidden shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
            <div className="p-8 border-b border-[#a9b4b1]/10 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#2a3433]">Top 5 Dịch vụ hàng đầu</h3>
                <p className="text-sm text-[#56615f]">Dựa trên số lượng đặt lịch hoàn tất</p>
              </div>
              <button className="text-[#006b62] text-sm font-bold hover:underline">Xem tất cả</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#eef5f3]/50">
                  <tr>
                    <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Dịch vụ</th>
                    <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-center">Lượt đặt</th>
                    <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-center">Tăng trưởng</th>
                    <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-right">Doanh thu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#a9b4b1]/10">
                  <tr className="hover:bg-[#e1eae7] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#006b62]/10 flex items-center justify-center text-[#006b62]">
                          <span className="material-symbols-outlined">content_cut</span>
                        </div>
                        <span className="font-bold text-[#2a3433]">Cắt tỉa lông (Grooming)</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-semibold">452</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">trending_up</span> 12%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-bold">135.6M</td>
                  </tr>
                  <tr className="hover:bg-[#e1eae7] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#346578]/10 flex items-center justify-center text-[#346578]">
                          <span className="material-symbols-outlined">bathtub</span>
                        </div>
                        <span className="font-bold text-[#2a3433]">Tắm & Massage</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-semibold">328</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">trending_up</span> 8.5%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-bold">82.0M</td>
                  </tr>
                  <tr className="hover:bg-[#e1eae7] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#446560]/10 flex items-center justify-center text-[#446560]">
                          <span className="material-symbols-outlined">medical_services</span>
                        </div>
                        <span className="font-bold text-[#2a3433]">Khám sức khỏe tổng quát</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-semibold">185</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#a83836] bg-[#fa746f]/20 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">trending_down</span> 2%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-bold">92.5M</td>
                  </tr>
                  <tr className="hover:bg-[#e1eae7] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#82f6e7]/30 flex items-center justify-center text-[#006b62]">
                          <span className="material-symbols-outlined">hotel</span>
                        </div>
                        <span className="font-bold text-[#2a3433]">Khách sạn thú cưng</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-semibold">142</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">trending_up</span> 24%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-bold">156.2M</td>
                  </tr>
                  <tr className="hover:bg-[#e1eae7] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578]">
                          <span className="material-symbols-outlined">vaccines</span>
                        </div>
                        <span className="font-bold text-[#2a3433]">Tiêm phòng (Vaccination)</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-semibold">98</td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">trending_up</span> 5%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-bold">49.0M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Snapshot Summary */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#006b62] text-[#e2fff9] p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12">paid</span>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Tổng lợi nhuận</p>
              <h4 className="text-3xl font-extrabold mb-4">515.3M</h4>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm">north_east</span>
                +18% so với tháng trước
              </div>
            </div>

            <div className="bg-[#346578] text-[#f2faff] p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10 -rotate-12">volunteer_activism</span>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Khách hàng mới</p>
              <h4 className="text-3xl font-extrabold mb-4">+124</h4>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm">north_east</span>
                Tăng trưởng ổn định
              </div>
            </div>

            <div className="bg-[#e1eae7] text-[#2a3433] p-8 rounded-3xl shadow-sm border border-[#a9b4b1]/10">
              <h5 className="font-bold mb-4">Phân tích chuyên sâu</h5>
              <p className="text-xs text-[#56615f] leading-relaxed">Dữ liệu tháng này cho thấy sự tăng trưởng mạnh mẽ của dịch vụ Grooming vào cuối tuần. Hãy cân nhắc mở thêm khung giờ phục vụ.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

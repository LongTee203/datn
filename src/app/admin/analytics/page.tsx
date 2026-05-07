"use client";

import React, { useState } from 'react';

export default function AnalyticsPage() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('2023-10-01');
  const [endDate, setEndDate] = useState('2023-10-31');
  const [showAllServices, setShowAllServices] = useState(false);

  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const chartData = [
    { label: 'T2', service: 60, sales: 40 },
    { label: 'T3', service: 80, sales: 50 },
    { label: 'T4', service: 45, sales: 30 },
    { label: 'T5', service: 90, sales: 60 },
    { label: 'T6', service: 110, sales: 85 },
    { label: 'T7', service: 140, sales: 90 },
    { label: 'CN', service: 160, sales: 110 }
  ];

  const allServices = [
    { name: 'Cắt tỉa lông (Grooming)', bookings: 452, growth: 12, rev: '135.6M', icon: 'content_cut', iconColor: 'text-[#006b62]', iconBg: 'bg-[#006b62]/10', trend: 'up' },
    { name: 'Tắm & Massage', bookings: 328, growth: 8.5, rev: '82.0M', icon: 'bathtub', iconColor: 'text-[#346578]', iconBg: 'bg-[#346578]/10', trend: 'up' },
    { name: 'Khám sức khỏe tổng quát', bookings: 185, growth: -2, rev: '92.5M', icon: 'medical_services', iconColor: 'text-[#446560]', iconBg: 'bg-[#446560]/10', trend: 'down' },
    { name: 'Khách sạn thú cưng', bookings: 142, growth: 24, rev: '156.2M', icon: 'hotel', iconColor: 'text-[#006b62]', iconBg: 'bg-[#82f6e7]/30', trend: 'up' },
    { name: 'Tiêm phòng (Vaccination)', bookings: 98, growth: 5, rev: '49.0M', icon: 'vaccines', iconColor: 'text-[#346578]', iconBg: 'bg-[#b6e7fe]/30', trend: 'up' },
    { name: 'Nhuộm lông thời trang', bookings: 85, growth: 15, rev: '25.5M', icon: 'palette', iconColor: 'text-[#a83836]', iconBg: 'bg-[#fa746f]/20', trend: 'up' },
    { name: 'Gỡ rối lông chó', bookings: 76, growth: 3, rev: '15.2M', icon: 'brush', iconColor: 'text-[#006b62]', iconBg: 'bg-[#006b62]/10', trend: 'up' },
    { name: 'Vệ sinh tai', bookings: 120, growth: -5, rev: '12.0M', icon: 'hearing', iconColor: 'text-[#346578]', iconBg: 'bg-[#346578]/10', trend: 'down' },
    { name: 'Cắt móng', bookings: 150, growth: 8, rev: '7.5M', icon: 'content_cut', iconColor: 'text-[#446560]', iconBg: 'bg-[#446560]/10', trend: 'up' },
    { name: 'Vắt tuyến hôi', bookings: 65, growth: -1, rev: '6.5M', icon: 'water_drop', iconColor: 'text-[#006b62]', iconBg: 'bg-[#82f6e7]/30', trend: 'down' },
    { name: 'Vệ sinh răng miệng', bookings: 54, growth: 20, rev: '10.8M', icon: 'dentistry', iconColor: 'text-[#346578]', iconBg: 'bg-[#b6e7fe]/30', trend: 'up' },
  ];

  const top5Services = allServices.slice(0, 5);

  const ServiceRow = ({ service }: { service: typeof allServices[0] }) => (
    <tr className="hover:bg-[#e1eae7] transition-colors">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl ${service.iconBg} flex items-center justify-center ${service.iconColor}`}>
            <span className="material-symbols-outlined">{service.icon}</span>
          </div>
          <span className="font-bold text-[#2a3433]">{service.name}</span>
        </div>
      </td>
      <td className="px-8 py-6 text-center font-semibold">{service.bookings}</td>
      <td className="px-8 py-6 text-center">
        {service.trend === 'up' ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full whitespace-nowrap">
            <span className="material-symbols-outlined text-xs">trending_up</span> {service.growth}%
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#a83836] bg-[#fa746f]/20 px-2 py-1 rounded-full whitespace-nowrap">
            <span className="material-symbols-outlined text-xs">trending_down</span> {Math.abs(service.growth)}%
          </span>
        )}
      </td>
      <td className="px-8 py-6 text-right font-bold">{service.rev}</td>
    </tr>
  );

  return (
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex justify-between items-end relative z-30">
          <div>
            <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Báo cáo & Thống kê</h2>
            <p className="text-[#56615f] mt-1">Tổng quan hoạt động kinh doanh và dữ liệu thú cưng tháng này.</p>
          </div>
          <div className="flex gap-3">
            {/* Interactive Date Picker */}
            <div className="relative">
              <button 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="bg-white text-[#2a3433] px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-[#e7f0ed] transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                {formatDate(startDate)} - {formatDate(endDate)}
              </button>
              
              {showDatePicker && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl p-5 z-[60] flex flex-col sm:flex-row gap-5 border border-gray-100 min-w-[320px] sm:w-auto animate-in fade-in slide-in-from-top-2">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-[#56615f] uppercase tracking-wider">Từ ngày</label>
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#eef5f3] text-[#2a3433] rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#006b62]/50 transition-all"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-[#56615f] uppercase tracking-wider">Đến ngày</label>
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-[#eef5f3] text-[#2a3433] rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#006b62]/50 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            <button className="bg-gradient-to-r from-[#006b62] to-[#00897b] text-[#e2fff9] px-6 py-2.5 rounded-full text-sm font-semibold shadow-md active:scale-95 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">download</span>
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Top Row: Chart & High-level Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Professional Bar Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden flex flex-col z-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#2a3433]">So sánh Doanh thu</h3>
                <p className="text-sm text-[#56615f]">Dịch vụ vs Bán hàng (Triệu VNĐ)</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#006b62]"></span>
                  <span className="text-xs font-medium text-[#2a3433]">Dịch vụ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#346578]"></span>
                  <span className="text-xs font-medium text-[#2a3433]">Bán hàng</span>
                </div>
              </div>
            </div>
            
            <div className="relative flex-1 flex items-end pt-8">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-t border-[#2a3433] w-full"></div>
                ))}
              </div>

              {/* Bars */}
              <div className="w-full flex justify-between h-[200px] items-end px-2 z-10 gap-2 sm:gap-4">
                {chartData.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full group">
                    <div className="w-full h-full flex items-end justify-center gap-1 sm:gap-2 relative">
                      <div className="w-full max-w-[24px] bg-[#006b62] rounded-t-md hover:opacity-80 transition-opacity relative group/bar" style={{ height: `${(day.service / 160) * 100}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-20">
                          {day.service}M
                        </div>
                      </div>
                      <div className="w-full max-w-[24px] bg-[#346578] rounded-t-md hover:opacity-80 transition-opacity relative group/bar" style={{ height: `${(day.sales / 160) * 100}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2a3433] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-20">
                          {day.sales}M
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#56615f] mt-4">{day.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-6 z-10">
            <div className="bg-[#006b62] text-[#e2fff9] p-8 rounded-3xl shadow-lg relative overflow-hidden flex-1 flex flex-col justify-center group hover:scale-[1.02] transition-transform">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500">paid</span>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Tổng lợi nhuận</p>
              <h4 className="text-4xl font-extrabold mb-4">515.3M</h4>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm">north_east</span>
                +18% so với kỳ trước
              </div>
            </div>

            <div className="bg-[#346578] text-[#f2faff] p-8 rounded-3xl shadow-lg relative overflow-hidden flex-1 flex flex-col justify-center group hover:scale-[1.02] transition-transform">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10 -rotate-12 group-hover:scale-110 transition-transform duration-500">volunteer_activism</span>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Khách hàng mới</p>
              <h4 className="text-4xl font-extrabold mb-4">+124</h4>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm">north_east</span>
                Tăng trưởng ổn định
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Table & Pet Demographics */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 relative z-0">
          {/* Top 5 Services Table */}
          <div className="xl:col-span-3 bg-white rounded-3xl overflow-hidden shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
            <div className="p-8 border-b border-[#a9b4b1]/10 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#2a3433]">Top 5 Dịch vụ hàng đầu</h3>
                <p className="text-sm text-[#56615f]">Dựa trên số lượng đặt lịch hoàn tất</p>
              </div>
              <button 
                onClick={() => setShowAllServices(true)}
                className="text-[#006b62] text-sm font-bold hover:underline bg-[#eef5f3] px-4 py-2 rounded-full transition-colors hover:bg-[#d9e5e2]"
              >
                Xem tất cả
              </button>
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
                  {top5Services.map((service, idx) => (
                    <ServiceRow key={idx} service={service} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Donut Chart Card (Pet Types) */}
          <div className="bg-white p-8 rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col justify-center">
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
                <span className="text-[10px] font-bold text-[#56615f] uppercase tracking-widest">Tổng số</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#006b62]"></span>
                  <span className="font-medium text-[#2a3433]">Mèo</span>
                </div>
                <span className="font-bold text-[#006b62]">50%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#446560]"></span>
                  <span className="font-medium text-[#2a3433]">Chó</span>
                </div>
                <span className="font-bold text-[#446560]">30%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#82f6e7]"></span>
                  <span className="font-medium text-[#2a3433]">Khác (Chim, Thỏ...)</span>
                </div>
                <span className="font-bold text-[#82f6e7]">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal All Services */}
      {showAllServices && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[90vh] shadow-2xl flex flex-col relative">
            <div className="p-8 border-b border-[#a9b4b1]/10 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#2a3433] tracking-tight">Doanh thu tất cả dịch vụ</h3>
                <p className="text-sm text-[#56615f] mt-1">Dữ liệu chi tiết dựa trên số lượng đặt lịch hoàn tất</p>
              </div>
              <button 
                onClick={() => setShowAllServices(false)}
                className="w-10 h-10 rounded-full bg-[#eef5f3] text-[#56615f] hover:text-[#2a3433] hover:bg-[#d9e5e2] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 sm:p-8">
              <div className="bg-white rounded-2xl overflow-hidden border border-[#e1eae7]">
                <table className="w-full text-left">
                  <thead className="bg-[#eef5f3] sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Dịch vụ</th>
                      <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-center">Lượt đặt</th>
                      <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-center">Tăng trưởng</th>
                      <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-right">Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#a9b4b1]/10">
                    {allServices.map((service, idx) => (
                      <ServiceRow key={idx} service={service} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#a9b4b1]/10 bg-[#f8fbfb] rounded-b-[2rem] flex justify-end">
              <button 
                onClick={() => setShowAllServices(false)}
                className="px-8 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

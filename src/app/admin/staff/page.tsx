"use client";

import React, { useState } from 'react';

export default function StaffPage() {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  return (
    <div className="min-h-screen">
      {/* Page Header Area */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#2a3433] tracking-tight">Quản lý nhân viên</h2>
          <p className="text-[#56615f] text-sm mt-1">Theo dõi thông tin nhân sự và lịch làm việc hiệu quả.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-[#eef5f3] p-1 rounded-full border border-[#a9b4b1]/30 shadow-sm w-fit h-fit">
            <button
              onClick={() => setViewMode('day')}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${viewMode === 'day' ? 'bg-[#006b62] text-[#e2fff9] font-bold shadow-sm' : 'text-[#56615f] font-medium hover:text-[#2a3433]'}`}
            >
              Lịch ngày
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${viewMode === 'week' ? 'bg-[#006b62] text-[#e2fff9] font-bold shadow-sm' : 'text-[#56615f] font-medium hover:text-[#2a3433]'}`}
            >
              Lịch tuần
            </button>
          </div>
          <button className="bg-[#006b62] text-[#e2fff9] px-6 py-2.5 h-fit rounded-full font-bold text-sm shadow-lg shadow-[#006b62]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-base">add</span>
            Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Khu vực 1: Thống kê (Bento/Card Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(42,52,51,0.04)] group hover:shadow-[0px_8px_30px_rgba(0,107,98,0.08)] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#82f6e7]/30 rounded-2xl flex items-center justify-center text-[#006b62]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>groups</span>
            </div>
            <span className="text-[10px] font-bold text-[#006b62] bg-[#006b62]/5 px-2 py-1 rounded-full">+2% tháng này</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Tổng nhân viên</p>
          <h3 className="text-3xl font-extrabold text-[#2a3433] mt-1">12</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(42,52,51,0.04)] group hover:shadow-[0px_8px_30px_rgba(0,107,98,0.08)] transition-all border-l-4 border-emerald-400">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#c6eae3]/30 rounded-2xl flex items-center justify-center text-[#446560]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>work</span>
            </div>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Đang làm hôm nay</p>
          <h3 className="text-3xl font-extrabold text-[#2a3433] mt-1">08</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(42,52,51,0.04)] group hover:shadow-[0px_8px_30px_rgba(0,107,98,0.08)] transition-all border-l-4 border-[#346578]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#b6e7fe]/30 rounded-2xl flex items-center justify-center text-[#346578]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>event_note</span>
            </div>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Có lịch hôm nay</p>
          <h3 className="text-3xl font-extrabold text-[#2a3433] mt-1">06</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-[0px_4px_20px_rgba(42,52,51,0.04)] group hover:shadow-[0px_8px_30px_rgba(0,107,98,0.08)] transition-all border-l-4 border-[#a83836]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#fa746f]/10 rounded-2xl flex items-center justify-center text-[#a83836]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>person_off</span>
            </div>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Nghỉ ca</p>
          <h3 className="text-3xl font-extrabold text-[#2a3433] mt-1">04</h3>
        </div>
      </div>

      {viewMode === 'day' ? (
        <>
          {/* Khu vực 2: Thanh công cụ */}
          <div className="flex flex-wrap items-center gap-4 bg-[#eef5f3] p-4 rounded-2xl mb-8">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#727d7a] text-lg">search</span>
                <input className="w-full bg-white border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#006b62]/20 outline-none" placeholder="Tìm theo tên hoặc SĐT..." type="text" />
              </div>
            </div>
            <select className="bg-white border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/20 min-w-[140px] outline-none">
              <option>Chức vụ: Tất cả</option>
              <option>Bác sĩ</option>
              <option>Chăm sóc</option>
              <option>Bán hàng</option>
            </select>
            <select className="bg-white border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/20 min-w-[140px] outline-none">
              <option>Trạng thái: Tất cả</option>
              <option>Đang làm</option>
              <option>Nghỉ</option>
              <option>Nghỉ phép</option>
            </select>
            <button className="bg-white text-[#2a3433] border-none rounded-xl py-2 px-4 text-sm font-semibold flex items-center gap-2 hover:bg-[#e1eae7] transition-all">
              <span className="material-symbols-outlined text-lg">sort</span>
              Sắp xếp
            </button>
          </div>

          {/* Khu vực 3: Bảng danh sách */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#e7f0ed] text-[#a9b4b1]">
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#56615f]">Ảnh đại diện</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#56615f]">Họ tên</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#56615f]">Chức vụ</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#56615f]">SĐT</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#56615f]">Trạng thái</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#56615f]">Ca hôm nay</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-[#56615f] text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef5f3]">
                <tr className="hover:bg-[#e1eae7]/30 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcT3QhWCAgbV5CV4IaZu-4PM3LcqDDTwwa_wOf1Agk0IUaX8jFoqnHZEgMCNZKhCwXGyN5qyFWAuvEw5-VwGo_SuttfMcDNoY1PtfVI6ImJOTLfkrPAr0f9ttxJkCB8k0xi0t_cQp4U8QblUUeHliA-gDU18lgjmxSGPn4g0KpRYsMjFURfIw8GoXJ1tV1cZYjEOW_OSuY8_AqQwXKDFfgl4x44psneBxtcWMsDlYEXWcj5qkvd0DBbStQub9uLXjOh9WXB2f-X1w" alt="Staff" />
                  </td>
                  <td className="px-6 py-4 font-bold text-[#2a3433]">Trần Thị Minh</td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">Bác sĩ thú y</td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">0901 234 567</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Đang làm</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">08:00 - 17:00</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-[#006b62]/10 rounded-lg text-[#006b62] transition-all"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="p-1.5 hover:bg-[#446560]/10 rounded-lg text-[#446560] transition-all"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-1.5 hover:bg-[#a83836]/10 rounded-lg text-[#a83836] transition-all"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#e1eae7]/30 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeVVCKJdpWQiPQd9NgN1x8sncD4-Dr3LtZUhvbQCFBg87keLKxgLUKhTQJDj_xfpHt_Pmsa6xwvSJ6_BUagwB1njXzLCAUyMP2rrW58VnfmAQ9j1mW6HMgKOZsB_7hwNBnPt12IqAgSB_g-V7GGkXepx740UqdHWlQbtxEW8lxEdVPKgDhPlOt8EhLwztRIV_cskheflYv4fjf6f3mA03srLuealA2axl3xcmmhWVzYn_vt3ABICyQdE4JKin_bUodUJUtRs02weQ" alt="Staff" />
                  </td>
                  <td className="px-6 py-4 font-bold text-[#2a3433]">Nguyễn Văn An</td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">Grooming Spa</td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">0908 765 432</td>
                  <td className="px-6 py-4">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Nghỉ phép</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">Nghỉ</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-[#006b62]/10 rounded-lg text-[#006b62] transition-all"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="p-1.5 hover:bg-[#446560]/10 rounded-lg text-[#446560] transition-all"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-1.5 hover:bg-[#a83836]/10 rounded-lg text-[#a83836] transition-all"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#e1eae7]/30 transition-all cursor-pointer">
                  <td className="px-6 py-4">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEJQ2AvMyhZIZgImgLNQLzgZfjiDunJlQDdJl3Rc7uRv8i8Wa0JkcfKhQCVGWi5snAmcjJnwA4tWKGmGEOdaTvG19wzZO_CdOina5XlSdv6rDo-XBW8aMTUDqx3Zh6G6l6WsDdHqovLZeRWF1K6kEbNr2QzdbQ_ONrWUVRrSz3fUaqae3mvh-OeL9Du1chwg2fHNYE4_ZflBczKEsxslsWFBmWnRGmWIyxEg5eoQsljG_Gi71n9g88i_ExITLKDTT3a0kUK1dYwFw" alt="Staff" />
                  </td>
                  <td className="px-6 py-4 font-bold text-[#2a3433]">Lê Mỹ Linh</td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">Tư vấn viên</td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">0977 888 999</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Nghỉ</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#56615f]">Nghỉ</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-[#006b62]/10 rounded-lg text-[#006b62] transition-all"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="p-1.5 hover:bg-[#446560]/10 rounded-lg text-[#446560] transition-all"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-1.5 hover:bg-[#a83836]/10 rounded-lg text-[#a83836] transition-all"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Khu vực 4: Lịch làm việc */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-lg font-bold text-[#2a3433]">Lịch trình làm việc</h4>
                <p className="text-xs text-[#56615f]">Theo dõi chi tiết công việc trong ngày</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Time Header */}
                <div className="grid grid-cols-[150px_1fr] border-b border-[#e7f0ed] pb-4">
                  <div className="text-xs font-bold text-[#a9b4b1]">Nhân viên</div>
                  <div className="grid grid-cols-10 text-center text-[10px] font-bold text-[#a9b4b1]">
                    <div>08h</div><div>09h</div><div>10h</div><div>11h</div><div>12h</div>
                    <div>13h</div><div>14h</div><div>15h</div><div>16h</div><div>17h</div>
                  </div>
                </div>
                {/* Employee 1 Timeline */}
                <div className="grid grid-cols-[150px_1fr] py-4 items-center border-b border-[#e7f0ed]/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800">TM</div>
                    <span className="text-xs font-semibold">Minh Trần</span>
                  </div>
                  <div className="grid grid-cols-10 h-8 gap-1">
                    <div className="col-span-2 bg-emerald-500/20 border-l-4 border-emerald-500 rounded-lg flex items-center px-2 text-[8px] font-bold text-emerald-800">KHÁM BỆNH</div>
                    <div className="col-span-1"></div>
                    <div className="col-span-3 bg-[#82f6e7]/40 border-l-4 border-[#006b62] rounded-lg flex items-center px-2 text-[8px] font-bold text-[#005c54]">PHẪU THUẬT</div>
                    <div className="col-span-1 bg-[#e7f0ed] rounded-lg"></div>
                    <div className="col-span-3 bg-emerald-500/20 border-l-4 border-emerald-500 rounded-lg flex items-center px-2 text-[8px] font-bold text-emerald-800">KHÁM BỆNH</div>
                  </div>
                </div>
                {/* Employee 2 Timeline */}
                <div className="grid grid-cols-[150px_1fr] py-4 items-center border-b border-[#e7f0ed]/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-800">VA</div>
                    <span className="text-xs font-semibold">Văn An</span>
                  </div>
                  <div className="grid grid-cols-10 h-8 gap-1">
                    <div className="col-span-3 bg-[#b6e7fe]/40 border-l-4 border-[#346578] rounded-lg flex items-center px-2 text-[8px] font-bold text-[#235669]">CẮT TỈA SPA</div>
                    <div className="col-span-2 bg-[#e7f0ed] rounded-lg"></div>
                    <div className="col-span-4 bg-[#b6e7fe]/40 border-l-4 border-[#346578] rounded-lg flex items-center px-2 text-[8px] font-bold text-[#235669]">SPA FULL COMBO</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
                {/* Employee 3 Timeline */}
                <div className="grid grid-cols-[150px_1fr] py-4 items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-800">ML</div>
                    <span className="text-xs font-semibold">Mỹ Linh</span>
                  </div>
                  <div className="grid grid-cols-10 h-8 gap-1">
                    <div className="col-span-1"></div>
                    <div className="col-span-4 bg-purple-200/50 border-l-4 border-purple-600 rounded-lg flex items-center px-2 text-[8px] font-bold text-purple-900">TƯ VẤN KH</div>
                    <div className="col-span-1 bg-[#e7f0ed] rounded-lg"></div>
                    <div className="col-span-2 bg-purple-200/50 border-l-4 border-purple-600 rounded-lg flex items-center px-2 text-[8px] font-bold text-purple-900">TƯ VẤN KH</div>
                    <div className="col-span-2"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Timeline Legend */}
            <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-[#e7f0ed]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-emerald-500/20 border-l-2 border-emerald-500"></div>
                <span className="text-[10px] font-bold text-[#56615f] uppercase">Tắm / Khám</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#b6e7fe]/40 border-l-2 border-[#346578]"></div>
                <span className="text-[10px] font-bold text-[#56615f] uppercase">Cắt tỉa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-purple-200/50 border-l-2 border-purple-600"></div>
                <span className="text-[10px] font-bold text-[#56615f] uppercase">Spa / Tư vấn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#e7f0ed]"></div>
                <span className="text-[10px] font-bold text-[#56615f] uppercase">Trống</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Weekly Calendar (Full Width) */
        <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(42,52,51,0.04)] flex flex-col overflow-hidden h-[800px]">
          {/* Calendar Header / Controls */}
          <div className="p-6 border-b border-[#e7f0ed] flex justify-between items-center bg-white z-10">
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-[#e7f0ed] hover:bg-[#e1eae7] flex items-center justify-center text-[#2a3433] transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h3 className="text-[1.125rem] font-bold text-[#2a3433]">16 - 22 Tháng 10, 2023</h3>
              <button className="w-10 h-10 rounded-full bg-[#e7f0ed] hover:bg-[#e1eae7] flex items-center justify-center text-[#2a3433] transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          {/* Calendar Grid Container */}
          <div className="flex-1 overflow-auto bg-[#eef5f3]/20">
            <div className="min-w-[1200px] h-full flex flex-col">
              {/* Days Header Row */}
              <div className="grid grid-cols-7 border-b border-[#e7f0ed] sticky top-0 bg-white z-20 shadow-sm">
                <div className="p-4 text-center border-r border-[#e7f0ed]">
                  <p className="text-[0.75rem] font-bold text-[#56615f] uppercase tracking-wider mb-1">Thứ 2</p>
                  <p className="text-[1.5rem] font-light text-[#2a3433]">16</p>
                </div>
                <div className="p-4 text-center border-r border-[#e7f0ed]">
                  <p className="text-[0.75rem] font-bold text-[#56615f] uppercase tracking-wider mb-1">Thứ 3</p>
                  <p className="text-[1.5rem] font-light text-[#2a3433]">17</p>
                </div>
                <div className="p-4 text-center border-r border-[#e7f0ed] bg-[#82f6e7]/10">
                  <p className="text-[0.75rem] font-bold text-[#006b62] uppercase tracking-wider mb-1">Thứ 4</p>
                  <div className="w-8 h-8 rounded-full bg-[#006b62] text-[#e2fff9] flex items-center justify-center mx-auto text-[1.125rem] font-bold shadow-sm">18</div>
                </div>
                <div className="p-4 text-center border-r border-[#e7f0ed]">
                  <p className="text-[0.75rem] font-bold text-[#56615f] uppercase tracking-wider mb-1">Thứ 5</p>
                  <p className="text-[1.5rem] font-light text-[#2a3433]">19</p>
                </div>
                <div className="p-4 text-center border-r border-[#e7f0ed]">
                  <p className="text-[0.75rem] font-bold text-[#56615f] uppercase tracking-wider mb-1">Thứ 6</p>
                  <p className="text-[1.5rem] font-light text-[#2a3433]">20</p>
                </div>
                <div className="p-4 text-center border-r border-[#e7f0ed]">
                  <p className="text-[0.75rem] font-bold text-[#56615f] uppercase tracking-wider mb-1">Thứ 7</p>
                  <p className="text-[1.5rem] font-light text-[#2a3433]">21</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-[0.75rem] font-bold text-[#56615f] uppercase tracking-wider mb-1">Chủ Nhật</p>
                  <p className="text-[1.5rem] font-light text-[#56615f]/70">22</p>
                </div>
              </div>
              {/* Time Slots Grid */}
              <div className="grid grid-cols-7 flex-1 relative bg-white">
                {/* Col 1: Monday */}
                <div className="border-r border-[#e7f0ed] p-2 flex flex-col gap-2 relative">
                  <div className="bg-[#e8f5e9] border border-[#a5d6a7] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative">
                    <div className="w-1 absolute left-0 top-3 bottom-3 bg-[#4caf50] rounded-r-full"></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[0.75rem] font-bold text-[#2e7d32]">Tắm &amp; Sấy</p>
                      <span className="text-[0.65rem] text-[#2e7d32]/70 font-medium bg-[#c8e6c9] px-1.5 py-0.5 rounded">08:00 - 10:00</span>
                    </div>
                    <p className="text-[0.875rem] font-medium text-[#2a3433] mb-1">Nguyễn Văn A</p>
                    <div className="flex items-center gap-1 text-[0.75rem] text-[#56615f]">
                      <span className="material-symbols-outlined text-[1rem]">pets</span>
                      <span>Poodle (Milo)</span>
                    </div>
                  </div>
                  <div className="bg-[#e3f2fd] border border-[#90caf9] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative mt-4">
                    <div className="w-1 absolute left-0 top-3 bottom-3 bg-[#2196f3] rounded-r-full"></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[0.75rem] font-bold text-[#1565c0]">Cắt tỉa lông</p>
                      <span className="text-[0.65rem] text-[#1565c0]/70 font-medium bg-[#bbdefb] px-1.5 py-0.5 rounded">13:00 - 15:30</span>
                    </div>
                    <p className="text-[0.875rem] font-medium text-[#2a3433] mb-1">Trần Thị B</p>
                    <div className="flex items-center gap-1 text-[0.75rem] text-[#56615f]">
                      <span className="material-symbols-outlined text-[1rem]">content_cut</span>
                      <span>Corgi (Bella)</span>
                    </div>
                  </div>
                </div>
                {/* Col 2: Tuesday */}
                <div className="border-r border-[#e7f0ed] p-2 flex flex-col gap-2 relative">
                  <div className="bg-[#ffebee] border border-[#ef9a9a] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative mt-10">
                    <div className="w-1 absolute left-0 top-3 bottom-3 bg-[#f44336] rounded-r-full"></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[0.75rem] font-bold text-[#c62828]">Khám bệnh</p>
                      <span className="text-[0.65rem] text-[#c62828]/70 font-medium bg-[#ffcdd2] px-1.5 py-0.5 rounded">10:00 - 11:00</span>
                    </div>
                    <p className="text-[0.875rem] font-medium text-[#2a3433] mb-1">Bs. Lê C</p>
                    <div className="flex items-center gap-1 text-[0.75rem] text-[#56615f]">
                      <span className="material-symbols-outlined text-[1rem]">medical_services</span>
                      <span>Mèo Anh (Tom)</span>
                    </div>
                  </div>
                </div>
                {/* Col 3: Wednesday (Today) */}
                <div className="border-r border-[#e7f0ed] p-2 flex flex-col gap-2 relative bg-[#82f6e7]/5">
                  <div className="absolute w-full h-[2px] bg-[#006b62] left-0 top-[45%] z-10">
                    <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-[#006b62]"></div>
                  </div>
                  <div className="bg-[#f3e5f5] border border-[#ce93d8] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative z-0">
                    <div className="w-1 absolute left-0 top-3 bottom-3 bg-[#9c27b0] rounded-r-full"></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[0.75rem] font-bold text-[#6a1b9a]">Spa trọn gói</p>
                      <span className="text-[0.65rem] text-[#6a1b9a]/70 font-medium bg-[#e1bee7] px-1.5 py-0.5 rounded">09:00 - 12:00</span>
                    </div>
                    <p className="text-[0.875rem] font-medium text-[#2a3433] mb-1">Nguyễn Văn A</p>
                    <div className="flex items-center gap-1 text-[0.75rem] text-[#56615f]">
                      <span className="material-symbols-outlined text-[1rem]">spa</span>
                      <span>Husky (Max)</span>
                    </div>
                  </div>
                  <div className="bg-[#e8f5e9] border border-[#a5d6a7] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative mt-16 z-0 opacity-60">
                    <div className="w-1 absolute left-0 top-3 bottom-3 bg-[#4caf50] rounded-r-full"></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[0.75rem] font-bold text-[#2e7d32]">Tắm &amp; Sấy</p>
                      <span className="text-[0.65rem] text-[#2e7d32]/70 font-medium bg-[#c8e6c9] px-1.5 py-0.5 rounded">14:00 - 15:00</span>
                    </div>
                    <p className="text-[0.875rem] font-medium text-[#2a3433] mb-1">Trần Thị B</p>
                  </div>
                </div>
                {/* Col 4: Thursday */}
                <div className="border-r border-[#e7f0ed] p-2 flex flex-col gap-2 relative">
                  <div className="bg-[#e3f2fd] border border-[#90caf9] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative mt-8">
                    <div className="w-1 absolute left-0 top-3 bottom-3 bg-[#2196f3] rounded-r-full"></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[0.75rem] font-bold text-[#1565c0]">Cắt tỉa lông</p>
                      <span className="text-[0.65rem] text-[#1565c0]/70 font-medium bg-[#bbdefb] px-1.5 py-0.5 rounded">09:30 - 11:30</span>
                    </div>
                    <p className="text-[0.875rem] font-medium text-[#2a3433] mb-1">Phạm D</p>
                  </div>
                </div>
                {/* Col 5: Friday */}
                <div className="border-r border-[#e7f0ed] p-2 flex flex-col gap-2 relative">
                  <div className="bg-[#ffebee] border border-[#ef9a9a] rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative mt-20">
                    <div className="w-1 absolute left-0 top-3 bottom-3 bg-[#f44336] rounded-r-full"></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[0.75rem] font-bold text-[#c62828]">Khám định kỳ</p>
                      <span className="text-[0.65rem] text-[#c62828]/70 font-medium bg-[#ffcdd2] px-1.5 py-0.5 rounded">13:00 - 14:00</span>
                    </div>
                    <p className="text-[0.875rem] font-medium text-[#2a3433] mb-1">Bs. Lê C</p>
                  </div>
                </div>
                {/* Col 6: Saturday */}
                <div className="border-r border-[#e7f0ed] p-2 flex flex-col gap-2 relative bg-[#eef5f3]/30">
                  <div className="text-center mt-10 text-[0.875rem] text-[#56615f] font-medium">
                    Trống lịch
                  </div>
                </div>
                {/* Col 7: Sunday */}
                <div className="p-2 flex flex-col gap-2 relative bg-[#eef5f3]/30">
                  <div className="flex items-center justify-center h-full opacity-50">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-[2rem] text-[#56615f] mb-2 block">event_busy</span>
                      <p className="text-[0.875rem] text-[#56615f]">Nghỉ cuối tuần</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Legend / Spacer */}
          <div className="mt-6 flex flex-wrap gap-6 items-center justify-center md:justify-start px-8 pb-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4caf50]"></div>
              <span className="text-[0.75rem] text-[#56615f] font-medium">Tắm &amp; Sấy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2196f3]"></div>
              <span className="text-[0.75rem] text-[#56615f] font-medium">Cắt tỉa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#9c27b0]"></div>
              <span className="text-[0.75rem] text-[#56615f] font-medium">Spa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f44336]"></div>
              <span className="text-[0.75rem] text-[#56615f] font-medium">Khám bệnh</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

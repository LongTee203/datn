import React from 'react';

export default function CustomersPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2">
              <span>Hệ thống</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#006b62] font-medium">Khách hàng</span>
            </nav>
            <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Quản lý khách hàng</h2>
            <p className="text-[#56615f] mt-1">Theo dõi thông tin và chi tiêu của cộng đồng Pet Sanctuary.</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#006b62] to-[#4BC3B5] text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-[#006b62]/20 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95">
            <span className="material-symbols-outlined">person_add</span>
            <span>Thêm khách hàng mới</span>
          </button>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border-none">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#82f6e7]/30 rounded-full flex items-center justify-center text-[#006b62]">
                <span className="material-symbols-outlined">group</span>
              </div>
              <span className="text-[10px] font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-[#56615f] text-sm font-medium">Tổng khách hàng</p>
            <h3 className="text-2xl font-bold text-[#2a3433]">1,284</h3>
          </div>
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border-none">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#c6eae3]/30 rounded-full flex items-center justify-center text-[#446560]">
                <span className="material-symbols-outlined">pets</span>
              </div>
              <span className="text-[10px] font-bold text-[#446560] bg-[#c6eae3] px-2 py-1 rounded-full">+5%</span>
            </div>
            <p className="text-[#56615f] text-sm font-medium">Số lượng thú cưng</p>
            <h3 className="text-2xl font-bold text-[#2a3433]">2,510</h3>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-2xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] overflow-hidden">
          <div className="px-8 py-6 border-b border-[#a9b4b1]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-[#2a3433]">Danh sách khách hàng</h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#eef5f3] text-[#56615f] rounded-lg text-sm hover:bg-[#e1eae7] transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span>Bộ lọc</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#eef5f3] text-[#56615f] rounded-lg text-sm hover:bg-[#e1eae7] transition-colors">
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Xuất báo cáo</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eef5f3]">
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Khách hàng</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Số điện thoại</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-center">Thú cưng</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Tổng chi tiêu</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Trạng thái</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#a9b4b1]/10">
                {/* Row 1 */}
                <tr className="hover:bg-[#e1eae7]/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img alt="Avatar" className="w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3aEJbc64G8trXm9TyquQ4t5QbhbzYNNP6hCZCHMBiFdMLL7sf6q6DK_jO1MrKE8qCsIGn2jjeznJz9bCNdvJ6BlE9MqHooVg3UwLPEaTH4aLUOfzmhtDDVAoVXL9cuNdszxvPBqE17fDN8bVALYb7L4aitdPWc9O2ymCwJqX6zvlXNVdVeaz2Jj7AqIdGgQyu1fTg7BPLBLctiUdQYmIfw-1k_KHfEYwcon-9HCHoyY-f3sstr4EobKVkqi5G0kKQ2p--wGZ-JD0" />
                      <div>
                        <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Nguyễn Thu Hà</p>
                        <p className="text-xs text-[#56615f]">ha.nguyen@email.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-[#56615f]">0987 654 321</td>
                  <td className="px-8 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-[#c6eae3] text-[#375853] rounded-full text-xs font-bold">3</span>
                  </td>
                  <td className="px-8 py-5 font-semibold text-[#2a3433]">12,500,000 đ</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Thân thiết
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="w-8 h-8 rounded-full hover:bg-[#d9e5e2] flex items-center justify-center text-[#56615f] transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-[#e1eae7]/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img alt="Avatar" className="w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmWjzPe6xoY06JXEbHOrrmnebbZinDY9JmtWiZlBS5nRXWIz9q_j9lLCmU6g6NHZXjNTClI8T0cAM-mUwXQd-QlUWpxOr4WZk1HDxlBZCoXaPOeSUEPEuSNApHN3drzSPMrqjQ7tNGLX4YhKHINqy9cTmiznwkZWFN80IFTb5VHDwPWgvCfsHwyQ325Ujz7GhuoNHN9nDCgAqV8aS_foV76YEH44-BVOeQ0PEuv-6ynKYYq6oMUlY5P0Ba2nUkadTK2vDhF9nTvb4" />
                      <div>
                        <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Trần Minh Quân</p>
                        <p className="text-xs text-[#56615f]">quan.tm@email.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-[#56615f]">0912 345 678</td>
                  <td className="px-8 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-[#c6eae3] text-[#375853] rounded-full text-xs font-bold">1</span>
                  </td>
                  <td className="px-8 py-5 font-semibold text-[#2a3433]">4,200,000 đ</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Mới
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="w-8 h-8 rounded-full hover:bg-[#d9e5e2] flex items-center justify-center text-[#56615f] transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-[#e1eae7]/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img alt="Avatar" className="w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_4zW-wlI_-pUxIVjiZ6iO4XIIq5Q1krMS5-lwYhN9knMCwBNbqDb0WIPbncV1EgtbgVQL9GtPr-QDojhXoSeA390GNoZmm1u8Tx2INMCyR2Vq2gw_1j__ZRnUc-CmpkFhR5rlsW9xAjkfasSvxo2L8XBnpXwT8QTMNvCj4ziwYGsBtDzLaK7R6HzrdsD8GQyhwXQqxDUmSAvQWGsLD3IKuPU6OrvTPJD_9DilPmVltu77ssDtwX5QQw5hc8H9LAFP4-jzhISwzUQ" />
                      <div>
                        <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Lê Thị Mai</p>
                        <p className="text-xs text-[#56615f]">mai.le@email.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-[#56615f]">0933 111 222</td>
                  <td className="px-8 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-[#c6eae3] text-[#375853] rounded-full text-xs font-bold">2</span>
                  </td>
                  <td className="px-8 py-5 font-semibold text-[#2a3433]">28,900,000 đ</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#82f6e7]/40 text-[#005e56] rounded-full text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 bg-[#006b62] rounded-full"></span>
                      VIP
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="w-8 h-8 rounded-full hover:bg-[#d9e5e2] flex items-center justify-center text-[#56615f] transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="hover:bg-[#e1eae7]/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#b6e7fe] flex items-center justify-center text-[#27596c] font-bold text-sm">PV</div>
                      <div>
                        <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Phạm Văn Vinh</p>
                        <p className="text-xs text-[#56615f]">vinh.pham@email.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-[#56615f]">0909 999 000</td>
                  <td className="px-8 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-[#c6eae3] text-[#375853] rounded-full text-xs font-bold">1</span>
                  </td>
                  <td className="px-8 py-5 font-semibold text-[#2a3433]">1,850,000 đ</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Thân thiết
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="w-8 h-8 rounded-full hover:bg-[#d9e5e2] flex items-center justify-center text-[#56615f] transition-colors">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-8 py-6 bg-[#eef5f3] flex items-center justify-between">
            <p className="text-xs text-[#56615f] font-medium">Hiển thị 1 - 4 của 1,284 khách hàng</p>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-[#56615f] hover:bg-white transition-colors disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-9 h-9 rounded-lg bg-[#006b62] text-white flex items-center justify-center text-sm font-bold shadow-sm">1</button>
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-sm font-medium text-[#56615f] hover:bg-white transition-colors">2</button>
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-sm font-medium text-[#56615f] hover:bg-white transition-colors">3</button>
              <span className="px-2 text-[#56615f]">...</span>
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-sm font-medium text-[#56615f] hover:bg-white transition-colors">32</button>
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-[#56615f] hover:bg-white transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Decorative */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#56615f] opacity-50 uppercase tracking-widest font-bold">© 2024 Pet Sanctuary • Nền tảng chăm sóc thú cưng toàn diện</p>
        </div>
      </div>
    </div>
  );
}

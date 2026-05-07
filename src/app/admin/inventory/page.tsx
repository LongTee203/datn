import React from 'react';

export default function InventoryPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-1">Quản lý kho hàng</h2>
          <p className="text-[#56615f] font-medium">Cập nhật và theo dõi vật dụng thú cưng tại cửa hàng.</p>
        </div>
        <button className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-8 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg hover:shadow-[#006b62]/20 transition-all scale-100 hover:scale-105 active:scale-95">
          <span className="material-symbols-outlined">add_circle</span>
          Nhập kho
        </button>
      </div>

      {/* Inventory Summary Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#82f6e7]/30 text-[#006b62] rounded-full material-symbols-outlined">inventory_2</span>
            <span className="text-xs font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Tổng sản phẩm</p>
          <h3 className="text-2xl font-extrabold text-[#2a3433]">1,284</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#c6eae3]/30 text-[#446560] rounded-full material-symbols-outlined">category</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Danh mục</p>
          <h3 className="text-2xl font-extrabold text-[#2a3433]">24</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] border-2 border-[#a83836]/10 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#fa746f]/30 text-[#a83836] rounded-full material-symbols-outlined">warning</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Sắp hết hàng</p>
          <h3 className="text-2xl font-extrabold text-[#a83836]">08</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#b6e7fe]/30 text-[#346578] rounded-full material-symbols-outlined">payments</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Giá trị kho</p>
          <h3 className="text-2xl font-extrabold text-[#2a3433]">452M VNĐ</h3>
        </div>
      </div>

      {/* Low Stock Alert Floating Card */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-[#fa746f]/10 p-8 rounded-[2rem] relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#a83836]/5 rounded-full blur-3xl"></div>
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#a83836]" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
            <h4 className="text-xl font-extrabold text-[#6e0a12]">Cảnh báo tồn kho thấp</h4>
          </div>
          <p className="text-[#6e0a12]/80 font-medium leading-relaxed max-w-xl">
            Hiện tại có <span className="font-bold text-[#a83836]">8 sản phẩm</span> đang ở mức cảnh báo (Số lượng &lt; 5). Vui lòng kiểm tra và lên kế hoạch nhập hàng để không làm gián đoạn trải nghiệm của khách hàng.
          </p>
        </div>
        <div className="flex justify-end">
          <button className="bg-[#a83836] text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-[#a83836]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">local_shipping</span>
            Tạo đơn nhập gấp
          </button>
        </div>
      </div>

      {/* Table Filters */}
      <div className="flex items-center justify-between mb-6 bg-[#eef5f3] p-4 rounded-xl">
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-[#006b62] font-bold rounded-full text-sm shadow-sm">Tất cả</button>
          <button className="px-6 py-2 text-[#56615f] hover:text-[#006b62] font-medium text-sm transition-colors">Thức ăn</button>
          <button className="px-6 py-2 text-[#56615f] hover:text-[#006b62] font-medium text-sm transition-colors">Đồ chơi</button>
          <button className="px-6 py-2 text-[#56615f] hover:text-[#006b62] font-medium text-sm transition-colors">Phụ kiện</button>
          <button className="px-6 py-2 text-[#56615f] hover:text-[#006b62] font-medium text-sm transition-colors">Y tế</button>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-[#56615f] hover:text-[#2a3433] transition-colors">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          Bộ lọc nâng cao
        </button>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-2xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e1eae7]/30">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest">Sản phẩm</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Danh mục</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Giá bán</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Tồn kho</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#a9b4b1]/10">
            {/* Row 1: Healthy Stock */}
            <tr className="hover:bg-[#e7f0ed] transition-colors group">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <img className="w-14 h-14 rounded-lg object-cover bg-[#e7f0ed] shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAALX97FAv123kDgqZaLX4dw7le1sgwaKooLK8N6ojyJa33-HRNVWsR3iwLwZU6Gj5oiDJFbn1JOCUmLuu736SLR46EmUYTUDjOQgGJMbUThlIwXn9Nn0g8KJaU2VFvaEdld5cxq3Frmq2A2676RaR6ZKIkQ2jcd_YJW3sVsLuC0KRjhGBsq-Xp1KcdUKZP3bnZ412R3PIbwsWmnUDEb_ur3ZYKHUKF4yjDFk_lPQ3_5VrOnXN4I7WI1iIgMKPeUXBerGV7bMLNXA8" alt="Product" />
                  <div>
                    <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Thức ăn mèo Salmon Delight</p>
                    <p className="text-xs text-[#56615f]">ID: CAT-F-001</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-[#c6eae3]/50 text-[#375853] text-[11px] font-bold rounded-full uppercase">Thức ăn</span>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="font-bold text-[#2a3433]">320.000 VNĐ</p>
              </td>
              <td className="px-6 py-4 text-center">
                <p className="font-extrabold text-[#2a3433]">45</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006b62]">
                  <span className="w-2 h-2 rounded-full bg-[#006b62]"></span>
                  Còn hàng
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="p-2 text-[#727d7a] hover:text-[#006b62] transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </td>
            </tr>
            {/* Row 2: Low Stock (Warning) */}
            <tr className="hover:bg-[#e7f0ed] transition-colors group bg-[#a83836]/5">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <img className="w-14 h-14 rounded-lg object-cover bg-[#e7f0ed] shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3OaoJ1uwD94mII_lDqJIu8xRGr31R51CaNZK6g9UM99GV5dO61dmEsqL7sSgBpnpG8_WCyTqOJRIzR9MpcgroG6-p6OaIvni3hBWS20zguAsFO9lqXriL5KzepHWAtXoRqt9KB7GVoFPgg7FBs99nxEBQ7SOGozHRJ93Y_fWfJDWNl4DtLSKfQtZqvj2ZlrX549euqtPtGJXrLuRErXhvCh49SKvT2NwJAbGBHB_ChuqqukSSLPj1E1z1wL0vApGHzwzmkC7aU9E" alt="Product" />
                  <div>
                    <p className="font-bold text-[#2a3433] group-hover:text-[#a83836] transition-colors">Đệm ngủ Orthopedic XL</p>
                    <p className="text-xs text-[#56615f]">ID: DOG-A-042</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-[#b6e7fe]/50 text-[#235669] text-[11px] font-bold rounded-full uppercase">Phụ kiện</span>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="font-bold text-[#2a3433]">1.250.000 VNĐ</p>
              </td>
              <td className="px-6 py-4 text-center">
                <p className="font-extrabold text-[#a83836]">3</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a83836]">
                  <span className="w-2 h-2 rounded-full bg-[#a83836] animate-pulse"></span>
                  Sắp hết hàng
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="p-2 text-[#727d7a] hover:text-[#a83836] transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </td>
            </tr>
            {/* Row 3: Healthy Stock */}
            <tr className="hover:bg-[#e7f0ed] transition-colors group">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <img className="w-14 h-14 rounded-lg object-cover bg-[#e7f0ed] shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9bLfWrho1bvAMpE4FCC6ijLeXSWBDbItRBmAEaDiFrqob9YafbVXb-aoM2St4mPr8_UZbSgy9j-2JN3i3VJ7z0yN7mPtm8WfFkuJiAfG8WhU5r3skVJYHyuU7glGNy5JMFSyACYswfiSfr6BhK9qkKYnOaw9zmVSdtZRb78zG9IWLoR7nyG8HCAfcvdcT1Zx-JtrZVu1NazFaud5abc8dCIr_NDSQDjHD0WdQeA_uH_wbcJzI1z9wPwwzX5c2bLEFFASXbSXUOe4" alt="Product" />
                  <div>
                    <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Đồ chơi dây thừng bền bỉ</p>
                    <p className="text-xs text-[#56615f]">ID: DOG-T-015</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-[#c6eae3]/50 text-[#375853] text-[11px] font-bold rounded-full uppercase">Đồ chơi</span>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="font-bold text-[#2a3433]">85.000 VNĐ</p>
              </td>
              <td className="px-6 py-4 text-center">
                <p className="font-extrabold text-[#2a3433]">112</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006b62]">
                  <span className="w-2 h-2 rounded-full bg-[#006b62]"></span>
                  Còn hàng
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="p-2 text-[#727d7a] hover:text-[#006b62] transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </td>
            </tr>
            {/* Row 4: Low Stock (Warning) */}
            <tr className="hover:bg-[#e7f0ed] transition-colors group bg-[#a83836]/5">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <img className="w-14 h-14 rounded-lg object-cover bg-[#e7f0ed] shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9075mwPibNxSizH6MJoPgMSMd3iTEiwulAGa79GgW1NFDEh_cs3-lKVdT2bXMsMIYkpoOeMWUQieT_o0j_n8OdxSLElnV71XlyaVH8PFO5Qafq_OSUUSBzxbeJ0EUolDKpuUL3EmqsT52ZoxdcB6UAeNe_njzGFyOdsvd0THRSRwixVpOkrsIMEw0O53y_QdDUOPTxpxws4QcGcWgyaVucfqOWG9qxxXk7etfVO6w8DoVqkV7STkj22rvleeqGBzSn4U8jqKwFak" alt="Product" />
                  <div>
                    <p className="font-bold text-[#2a3433] group-hover:text-[#a83836] transition-colors">Bộ tỉa lông chuyên nghiệp</p>
                    <p className="text-xs text-[#56615f]">ID: TOOL-G-009</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-[#b6e7fe]/50 text-[#235669] text-[11px] font-bold rounded-full uppercase">Y tế</span>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="font-bold text-[#2a3433]">750.000 VNĐ</p>
              </td>
              <td className="px-6 py-4 text-center">
                <p className="font-extrabold text-[#a83836]">2</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a83836]">
                  <span className="w-2 h-2 rounded-full bg-[#a83836] animate-pulse"></span>
                  Sắp hết hàng
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="p-2 text-[#727d7a] hover:text-[#a83836] transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </td>
            </tr>
            {/* Row 5: Healthy Stock */}
            <tr className="hover:bg-[#e7f0ed] transition-colors group">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <img className="w-14 h-14 rounded-lg object-cover bg-[#e7f0ed] shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyVRWqG8Cl58HynlVZZJEHLCXYaD9fWbo9X-x6IHMvWfpJbr98S1RJfSTsUPBqi-dZY4vGy-XAljfGp0X12fDG_l15iC2cei97hdgYhm3FQOGt2kW5mvDL9735agZIgUJ3qgT5e29jlr9WE67A15opqKjeNeYY3WEgp_pterNzLCOuT6EEj5ouCKa9gcYMxy6PPq8KsCGmINcGv6iTXgBs4JnoVZ_zVyClngsn9dFlftHRpSjS9RBwXWkrX9HqMJJfpYOi9Zrz5UY" alt="Product" />
                  <div>
                    <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">Máy lọc nước thông minh</p>
                    <p className="text-xs text-[#56615f]">ID: ACC-W-088</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-[#b6e7fe]/50 text-[#235669] text-[11px] font-bold rounded-full uppercase">Phụ kiện</span>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="font-bold text-[#2a3433]">540.000 VNĐ</p>
              </td>
              <td className="px-6 py-4 text-center">
                <p className="font-extrabold text-[#2a3433]">18</p>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006b62]">
                  <span className="w-2 h-2 rounded-full bg-[#006b62]"></span>
                  Còn hàng
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="p-2 text-[#727d7a] hover:text-[#006b62] transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Pagination Content */}
        <div className="px-8 py-6 bg-[#eef5f3]/50 flex justify-between items-center">
          <p className="text-xs font-bold text-[#727d7a] uppercase tracking-wider">Hiển thị 5 / 1,284 sản phẩm</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#56615f] hover:bg-[#006b62] hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006b62] text-white font-bold shadow-md">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#56615f] hover:bg-[#82f6e7] transition-all">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#56615f] hover:bg-[#82f6e7] transition-all">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#56615f] hover:bg-[#006b62] hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

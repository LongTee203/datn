import React from 'react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-2">Cài đặt hệ thống</h1>
          <p className="text-[#56615f] text-sm md:text-base">Quản lý thông tin cửa hàng và tùy chỉnh các chức năng vận hành hệ thống.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Primary Settings (Spans 8 cols) */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {/* Section 1: Thông tin cửa hàng */}
            <section className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
              {/* Subtle decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006b62] to-[#82f6e7] opacity-50"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c6eae3]/50 flex items-center justify-center text-[#375853]">
                  <span className="material-symbols-outlined icon-fill">storefront</span>
                </div>
                <h3 className="text-xl font-bold text-[#2a3433]">Thông tin cửa hàng</h3>
              </div>
              <form className="space-y-5">
                {/* Logo Upload */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-[#eef5f3] border border-dashed border-[#a9b4b1] flex items-center justify-center overflow-hidden relative group cursor-pointer">
                    <img alt="Store logo placeholder" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYMcuSWIti2zG9syOCtbtdvgjSmPLtP81yL1vc28AaNRAGtSLrpMKkXiJuxhkB8_EW3WmjzpD3ecvpJQrcyhi1hkh8JVSKl0_Np-gZ1FuYvMY404l9L6oWa8RtVrJ96t-n26RYlwHFjGqY-B2z6wch3v4kYonC5Zlu0Vg7xx2Beq4MbNic8exJV2tt1N6OVEaoYqdcTN-O-J9lCZ7tadZ8FxTfd1RP2fJRWskp1rSfiLGF8u133JMX7RlpCtB3Rlc3Lw4JFLSSJ2I" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#2a3433] mb-1">Logo cửa hàng</h4>
                    <p className="text-xs text-[#56615f] mb-3">JPG, PNG hoặc GIF. Tối đa 2MB.</p>
                    <button className="px-4 py-2 bg-[#e1eae7] text-[#2a3433] text-xs font-semibold rounded-full hover:bg-[#d9e5e2] transition-colors" type="button">Đổi logo</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Tên cửa hàng</label>
                    <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="text" defaultValue="Pet Sanctuary Main" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Số điện thoại</label>
                    <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="tel" defaultValue="0987 654 321" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Email liên hệ</label>
                    <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="email" defaultValue="hello@petsanctuary.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Giờ mở cửa</label>
                    <div className="flex items-center gap-2">
                      <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="time" defaultValue="08:00" />
                      <span className="text-[#56615f]">-</span>
                      <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="time" defaultValue="20:00" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Địa chỉ chi tiết</label>
                  <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="text" defaultValue="123 Đường Thú Cưng, Quận 1, TP.HCM" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Link Facebook</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#56615f] text-sm font-bold">f</span>
                      <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="url" defaultValue="facebook.com/petsanctuary" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Số Zalo</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#56615f] text-sm font-bold">Z</span>
                      <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="tel" defaultValue="0987 654 321" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#006b62]/20 transition-all hover:-translate-y-0.5" type="button">Lưu thay đổi</button>
                </div>
              </form>
            </section>

            {/* Section 2: Cài đặt đặt lịch */}
            <section className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c6eae3]/50 flex items-center justify-center text-[#375853]">
                  <span className="material-symbols-outlined icon-fill">event_available</span>
                </div>
                <h3 className="text-xl font-bold text-[#2a3433]">Cài đặt đặt lịch</h3>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Thời lượng mặc định/Dịch vụ</label>
                    <div className="flex bg-[#eef5f3] p-1 rounded-xl">
                      <button className="flex-1 py-2 text-sm font-medium rounded-lg bg-white text-[#006b62] shadow-sm">30 Phút</button>
                      <button className="flex-1 py-2 text-sm font-medium rounded-lg text-[#56615f] hover:text-[#2a3433]">60 Phút</button>
                      <button className="flex-1 py-2 text-sm font-medium rounded-lg text-[#56615f] hover:text-[#2a3433]">90 Phút</button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Khách tối đa/Khung giờ</label>
                    <div className="relative">
                      <input className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433]" type="number" defaultValue="3" />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <span className="material-symbols-outlined text-xs cursor-pointer text-[#56615f] hover:text-[#006b62]">expand_less</span>
                        <span className="material-symbols-outlined text-xs cursor-pointer text-[#56615f] hover:text-[#006b62]">expand_more</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider">Số ngày đặt trước tối đa</label>
                    <select className="w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433] appearance-none" defaultValue="14 Ngày">
                      <option>7 Ngày</option>
                      <option>14 Ngày</option>
                      <option>30 Ngày</option>
                    </select>
                  </div>
                  <div className="flex-1 flex items-center justify-between bg-[#eef5f3] rounded-xl p-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[#2a3433]">Yêu cầu cọc trước</h4>
                      <p className="text-xs text-[#56615f]">Giảm tỷ lệ hủy lịch ảo</p>
                    </div>
                    {/* Toggle Switch */}
                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10" id="toggle-deposit" name="toggle" type="checkbox" />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-[#d9e5e2] cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle-deposit"></label>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Secondary Settings (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            {/* Section 5: Tài khoản quản trị */}
            <section className="bg-white rounded-[1.5rem] p-6 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden group">
              {/* Glassmorphism accent behind avatar */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#006b62]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#b6e7fe]/50 flex items-center justify-center text-[#235669]">
                  <span className="material-symbols-outlined icon-fill">admin_panel_settings</span>
                </div>
                <h3 className="text-xl font-bold text-[#2a3433]">Tài khoản</h3>
              </div>
              <div className="flex flex-col items-center text-center pb-6 border-b border-[#d9e5e2]/50">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 border-[#e7f0ed]">
                  <img alt="Admin Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP8W9n58GgYicgQtmhfeMrkyJHsT2j_jqKiMiv2sBF8iNAyk4sjCfIil_JW2uzijn39ICyN4Vy5iQTaL3KXSkfSzVglWufLaVqVuh6kMdIXBi3M9G52adjZecLYweiAQfIDGUKftldJOpFWea3uMNyhrWiIdgpXoNuXqd2Yq2q6T3nHf8Pi1gxUQSWMo2XTqTRJYkbQvwWlnNA0YDgvcFDBdYTxX85yQ9ihCNNCnPl8flLEaAjMT_e-tq8pPan9P0bt2KmpY7vtAE" />
                </div>
                <h4 className="text-base font-bold text-[#2a3433]">Nguyễn Trần Lan Anh</h4>
                <p className="text-xs text-[#56615f] mt-1">lananh.admin@sanctuary.com</p>
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#006b62]/10 text-[#006b62] uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
              <div className="pt-4 space-y-3">
                <a className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#eef5f3] transition-colors text-sm font-medium text-[#2a3433]" href="#">
                  <span className="material-symbols-outlined text-[#727d7a]">key</span>
                  Đổi mật khẩu
                </a>
                <a className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#a83836]/5 transition-colors text-sm font-medium text-[#a83836]" href="#">
                  <span className="material-symbols-outlined text-[#a83836]">logout</span>
                  Đăng xuất
                </a>
              </div>
            </section>

            {/* Section 3: Cài đặt thanh toán */}
            <section className="bg-white rounded-[1.5rem] p-6 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c6eae3]/50 flex items-center justify-center text-[#375853]">
                  <span className="material-symbols-outlined icon-fill">payments</span>
                </div>
                <h3 className="text-lg font-bold text-[#2a3433]">Thanh toán</h3>
              </div>
              <div className="space-y-4">
                {/* Payment Method 1 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#eef5f3]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#56615f]">local_shipping</span>
                    <div>
                      <p className="text-sm font-medium text-[#2a3433]">Thanh toán tiền mặt (COD)</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                    <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10" id="toggle-cod" name="toggle" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#d9e5e2] cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle-cod"></label>
                  </div>
                </div>
                {/* Payment Method 2 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#eef5f3]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#56615f]">account_balance</span>
                    <div>
                      <p className="text-sm font-medium text-[#2a3433]">Chuyển khoản Ngân hàng</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                    <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10" id="toggle-bank" name="toggle" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#d9e5e2] cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle-bank"></label>
                  </div>
                </div>
                {/* Payment Method 3 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#eef5f3]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#56615f]">qr_code_scanner</span>
                    <div>
                      <p className="text-sm font-medium text-[#2a3433]">Quét mã QR Pay</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                    <input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10" id="toggle-qr" name="toggle" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#d9e5e2] cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle-qr"></label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Full Width Span (12 cols) */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-2">
            {/* Section 4: Cài đặt thông báo */}
            <section className="bg-white rounded-[1.5rem] p-6 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-[#006b62]">notifications_active</span>
                <h3 className="text-lg font-bold text-[#2a3433]">Thông báo</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#d9e5e2]/50 pb-3">
                  <span className="text-sm text-[#2a3433]">Xác nhận qua Email</span>
                  <div className="relative inline-block w-8 align-middle select-none transition duration-200 ease-in">
                    <input defaultChecked className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] appearance-none cursor-pointer z-10" id="t-email" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-4 rounded-full bg-[#d9e5e2] cursor-pointer" htmlFor="t-email"></label>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-[#d9e5e2]/50 pb-3">
                  <span className="text-sm text-[#2a3433]">Nhắc lịch qua SMS</span>
                  <div className="relative inline-block w-8 align-middle select-none transition duration-200 ease-in">
                    <input defaultChecked className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] appearance-none cursor-pointer z-10" id="t-sms" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-4 rounded-full bg-[#d9e5e2] cursor-pointer" htmlFor="t-sms"></label>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-[#d9e5e2]/50 pb-3">
                  <span className="text-sm text-[#2a3433]">Cảnh báo đơn hàng mới</span>
                  <div className="relative inline-block w-8 align-middle select-none transition duration-200 ease-in">
                    <input defaultChecked className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] appearance-none cursor-pointer z-10" id="t-order" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-4 rounded-full bg-[#d9e5e2] cursor-pointer" htmlFor="t-order"></label>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#2a3433]">Cảnh báo sắp hết hàng</span>
                  <div className="relative inline-block w-8 align-middle select-none transition duration-200 ease-in">
                    <input className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-[3px] appearance-none cursor-pointer z-10" id="t-stock" type="checkbox" />
                    <label className="toggle-label block overflow-hidden h-4 rounded-full bg-[#d9e5e2] cursor-pointer" htmlFor="t-stock"></label>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Giao diện hệ thống */}
            <section className="bg-white rounded-[1.5rem] p-6 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-[#006b62]">palette</span>
                <h3 className="text-lg font-bold text-[#2a3433]">Giao diện</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-[#56615f] uppercase tracking-wider block mb-2">Chế độ hiển thị</label>
                  <div className="flex bg-[#eef5f3] p-1 rounded-xl">
                    <button className="flex-1 py-1.5 flex justify-center items-center gap-2 text-sm font-medium rounded-lg bg-white text-[#006b62] shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">light_mode</span> Sáng
                    </button>
                    <button className="flex-1 py-1.5 flex justify-center items-center gap-2 text-sm font-medium rounded-lg text-[#56615f] hover:text-[#2a3433]">
                      <span className="material-symbols-outlined text-[18px]">dark_mode</span> Tối
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

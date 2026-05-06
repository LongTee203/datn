import React from 'react';

export default function DogGroomingPricePage() {
  return (
    <main className="flex-grow pb-24 md:pb-12 pt-32">
      {/* Hero Section */}
      <section className="py-16 px-10 max-w-[1440px] mx-auto text-center">
        <h1 className="font-h1 text-h1 text-on-surface mb-4 font-extrabold text-5xl">Bảng Giá Dịch Vụ - Cắt Tỉa Lông Chó</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto text-lg">
          Bảng giá chi tiết các dịch vụ chăm sóc thú cưng tại PetCare Shop. Chúng tôi cam kết mang đến dịch vụ chất lượng với mức giá minh bạch, hợp lý nhất cho bé yêu của bạn.
        </p>
      </section>
      {/* Pricing Content */}
      <section className="max-w-[1440px] mx-auto px-10 py-12 space-y-12">
        {/* 1. BẢNG GIÁ SPA */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bathtub</span>
            </div>
            <h2 className="font-h2 text-3xl font-bold text-on-surface">BẢNG GIÁ SPA – CẮT TỈA LÔNG</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary-light text-on-surface-variant font-label-md text-base">
                  <th className="py-4 px-4 whitespace-nowrap">Cân nặng</th>
                  <th className="py-4 px-4 whitespace-nowrap">Spa tắm + vệ sinh</th>
                  <th className="py-4 px-4 whitespace-nowrap">Cắt tỉa lông tạo kiểu</th>
                  <th className="py-4 px-4 whitespace-nowrap">Cạo lông toàn thân</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-base text-on-surface">
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Dưới 3Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">170.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">200.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">150.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">3 - 5Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">200.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">200.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">5 - 7Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">300.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">7 - 10Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">300.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">350.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">300.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">10 - 15Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">350.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">450.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">400.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">15 - 20Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">400.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">550.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">500.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">20 - 25Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">450.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">650.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">600.000đ</td>
                </tr>
                <tr className="hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">25 - 30Kg</td>
                  <td className="py-4 px-4 text-primary font-bold">500.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">750.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">700.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-primary-light/50 rounded-xl p-5 border border-primary-light text-sm text-on-surface-variant flex gap-3 items-start">
            <span className="material-symbols-outlined text-primary text-xl shrink-0">info</span>
            <div>
              <p className="mb-1"><strong className="text-primary">Ghi chú:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Gói Spa tắm vệ sinh gồm: Tắm, sấy, chải lông, cắt móng, mài móng, vệ sinh tai, vắt tuyến hôi.</li>
                <li>Gói Cắt tỉa tạo kiểu <strong>chưa bao gồm</strong> dịch vụ spa tắm vệ sinh.</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Grid cho Dịch vụ lẻ & Gỡ rối lông */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 2. DỊCH VỤ LẺ */}
          <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
              </div>
              <h2 className="font-h2 text-2xl font-bold text-on-surface">BẢNG GIÁ DỊCH VỤ LẺ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary-light text-on-surface-variant font-label-md text-sm">
                    <th className="py-3 px-2">Dịch vụ \ Cân nặng</th>
                    <th className="py-3 px-2">&lt; 10Kg</th>
                    <th className="py-3 px-2">10 - 20Kg</th>
                    <th className="py-3 px-2">&gt; 20Kg</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-base text-on-surface">
                  <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">Cắt móng</td>
                    <td className="py-3 px-2 text-primary font-semibold">30.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">50.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">80.000đ</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">Vắt tuyến hôi</td>
                    <td className="py-3 px-2 text-primary font-semibold">30.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">50.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">80.000đ</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">Vệ sinh tai</td>
                    <td className="py-3 px-2 text-primary font-semibold">30.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">50.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">80.000đ</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">Cạo lông bàn</td>
                    <td className="py-3 px-2 text-primary font-semibold">40.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">60.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">100.000đ</td>
                  </tr>
                  <tr className="hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">Vệ sinh răng</td>
                    <td className="py-3 px-2 text-primary font-semibold">50.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">100.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">150.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* 3. BẢNG GIÁ GỠ RỐI LÔNG */}
          <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>brush</span>
              </div>
              <h2 className="font-h2 text-2xl font-bold text-on-surface">BẢNG GIÁ GỠ RỐI LÔNG CHÓ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary-light text-on-surface-variant font-label-md text-sm">
                    <th className="py-3 px-2">Cân nặng</th>
                    <th className="py-3 px-2">Rối 1 phần (1/4)</th>
                    <th className="py-3 px-2">Rối 1 phần (1/2)</th>
                    <th className="py-3 px-2">Rối toàn thân</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-base text-on-surface">
                  <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">Dưới 5Kg</td>
                    <td className="py-3 px-2 text-primary font-semibold">50.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">100.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">200.000đ</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">5 - 10Kg</td>
                    <td className="py-3 px-2 text-primary font-semibold">100.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">150.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">250.000đ</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">10 - 20Kg</td>
                    <td className="py-3 px-2 text-primary font-semibold">150.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">250.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">400.000đ</td>
                  </tr>
                  <tr className="hover:bg-[#e9f0ed] transition-colors">
                    <td className="py-3 px-2 font-medium">Trên 20Kg</td>
                    <td className="py-3 px-2 text-primary font-semibold">200.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">350.000đ</td>
                    <td className="py-3 px-2 text-primary font-semibold">600.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* 4. DỊCH VỤ NHUỘM LÔNG */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
            </div>
            <h2 className="font-h2 text-3xl font-bold text-on-surface">DỊCH VỤ NHUỘM LÔNG</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary-light text-on-surface-variant font-label-md text-base">
                  <th className="py-4 px-4">Vị trí nhuộm</th>
                  <th className="py-4 px-4">Nhuộm 1 màu</th>
                  <th className="py-4 px-4">Nhuộm 2 màu</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-base text-on-surface">
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Nhuộm 2 tai</td>
                  <td className="py-4 px-4 text-primary font-bold">150.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Nhuộm đuôi</td>
                  <td className="py-4 px-4 text-primary font-bold">150.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Nhuộm 04 chân</td>
                  <td className="py-4 px-4 text-primary font-bold">300.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">500.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Nhuộm vùng lông yêu cầu</td>
                  <td className="py-4 px-4 text-primary font-bold">Liên hệ</td>
                  <td className="py-4 px-4 text-primary font-bold">Liên hệ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Nhuộm Tai – Đuôi - Chân <span className="text-xs bg-accent/20 text-accent-dark px-2 py-1 rounded ml-2 font-bold">(Tiết Kiệm 15%)</span></td>
                  <td className="py-4 px-4 text-primary font-bold">500.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">850.000đ</td>
                </tr>
                <tr className="hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Phụ thu lông nhiều (Tùy tình trạng)</td>
                  <td className="py-4 px-4 text-primary font-bold">+ 50.000đ - 100.000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">+ 50.000đ - 100.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Contact Form Section */}
        <section className="max-w-3xl mx-auto px-10 py-12 mt-12 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="font-h2 text-3xl font-bold text-on-surface mb-2">Liên hệ tư vấn</h2>
            <p className="font-body-md text-on-surface-variant">Hãy để lại thông tin, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="name">Họ và tên</label>
                <input className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="name" name="name" placeholder="Nhập họ và tên" type="text" />
              </div>
              <div>
                <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="phone">Số điện thoại</label>
                <input className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="phone" name="phone" placeholder="Nhập số điện thoại" type="tel" />
              </div>
            </div>
            <div>
              <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="email">Email</label>
              <input className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="email" name="email" placeholder="Nhập địa chỉ email" type="email" />
            </div>
            <div>
              <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="message">Lời nhắn</label>
              <textarea className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="message" name="message" placeholder="Nhập nội dung cần tư vấn" rows={4}></textarea>
            </div>
            <div className="text-center">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-label-md text-base hover:bg-secondary transition-all w-full md:w-auto" type="submit">Gửi thông tin</button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

import React from 'react';

export default function VaccinePricePage() {
  return (
    <main className="flex-grow pb-24 md:pb-12 pt-32">
      {/* Hero Section */}
      <section className="py-16 px-10 max-w-[1440px] mx-auto text-center">
        <h1 className="font-h1 text-h1 text-on-surface mb-4 font-extrabold text-5xl">Bảng giá Tiêm phòng Vaccine</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto text-lg">
          Bảo vệ sức khỏe thú cưng của bạn với các gói tiêm phòng vaccine an toàn, chất lượng cao tại PetCare Shop.
        </p>
      </section>
      {/* Pricing Content */}
      <section className="max-w-[1440px] mx-auto px-10 py-12 space-y-12">
        {/* 1. BẢNG GIÁ VACCINE CHO CHÓ */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
            </div>
            <h2 className="font-h2 text-3xl font-bold text-on-surface">BẢNG GIÁ VACCINE CHO CHÓ</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary-light text-on-surface-variant font-label-md text-base">
                  <th className="py-4 px-4 whitespace-nowrap">Loại Vaccine</th>
                  <th className="py-4 px-4 whitespace-nowrap">Liệu trình cơ bản</th>
                  <th className="py-4 px-4 whitespace-nowrap">Mức giá (VNĐ / mũi)</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-base text-on-surface">
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">5 Bệnh</td>
                  <td className="py-4 px-4">3 mũi</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ - 350.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">7 Bệnh</td>
                  <td className="py-4 px-4">3 mũi</td>
                  <td className="py-4 px-4 text-primary font-bold">300.000đ - 450.000đ</td>
                </tr>
                <tr className="hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Dại</td>
                  <td className="py-4 px-4">1 mũi / năm</td>
                  <td className="py-4 px-4 text-primary font-bold">100.000đ - 150.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* 2. BẢNG GIÁ VACCINE CHO MÈO */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
            </div>
            <h2 className="font-h2 text-3xl font-bold text-on-surface">BẢNG GIÁ VACCINE CHO MÈO</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary-light text-on-surface-variant font-label-md text-base">
                  <th className="py-4 px-4 whitespace-nowrap">Loại Vaccine</th>
                  <th className="py-4 px-4 whitespace-nowrap">Liệu trình cơ bản</th>
                  <th className="py-4 px-4 whitespace-nowrap">Mức giá (VNĐ / mũi)</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-base text-on-surface">
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">3 Bệnh</td>
                  <td className="py-4 px-4">3 mũi</td>
                  <td className="py-4 px-4 text-primary font-bold">200.000đ - 300.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">4 Bệnh</td>
                  <td className="py-4 px-4">3 mũi</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ - 350.000đ</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Dại</td>
                  <td className="py-4 px-4">1 mũi / năm</td>
                  <td className="py-4 px-4 text-primary font-bold">100.000đ - 150.000đ</td>
                </tr>
                <tr className="hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Bạch Cầu</td>
                  <td className="py-4 px-4">Theo chỉ định</td>
                  <td className="py-4 px-4 text-primary font-bold">250.000đ - 350.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Contact Form Section */}
        <section className="max-w-3xl mx-auto px-10 py-12 mt-12 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="font-h2 text-3xl font-bold text-on-surface mb-2">Liên Hệ Tư Vấn Nhanh</h2>
            <p className="font-body-md text-on-surface-variant">Để lại thông tin, bác sĩ thú y của chúng tôi sẽ liên hệ lại ngay để tư vấn lịch tiêm phòng phù hợp nhất.</p>
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
              <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="pet_type">Thú cưng của bạn là</label>
              <select className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="pet_type" name="pet_type">
                <option value="">Chọn loại thú cưng</option>
                <option value="dog">Chó</option>
                <option value="cat">Mèo</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="message">Nội dung cần tư vấn</label>
              <textarea className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="message" name="message" placeholder="Ví dụ: Cún nhà mình được 2 tháng tuổi, cần tư vấn lịch tiêm..." rows={4}></textarea>
            </div>
            <div className="text-center">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-label-md text-base hover:bg-secondary transition-all w-full md:w-auto" type="submit">Gửi Yêu Cầu</button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

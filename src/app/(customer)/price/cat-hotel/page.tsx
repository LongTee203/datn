import React from 'react';

export default function CatHotelPricePage() {
  return (
    <main className="flex-grow pb-24 md:pb-12 pt-32">
      {/* Hero Section */}
      <section className="py-16 px-10 max-w-[1440px] mx-auto text-center">
        <h1 className="font-h1 text-h1 text-on-surface mb-4 font-extrabold text-5xl">Bảng Giá Khách Sạn 5 Sao Cho Mèo</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto text-lg">
          Trải nghiệm dịch vụ lưu trú đẳng cấp, an toàn và thoải mái nhất cho thú cưng của bạn.
        </p>
      </section>
      {/* Pricing Content */}
      <section className="max-w-[1440px] mx-auto px-10 py-12 space-y-12">
        {/* Pricing Table Section */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span>
            </div>
            <h2 className="font-h2 text-3xl font-bold text-on-surface">BẢNG GIÁ KHÁCH SẠN 5 SAO CHO MÈO</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-primary-light text-on-surface-variant font-label-md text-base">
                  <th className="py-4 px-4 whitespace-nowrap">Cân nặng</th>
                  <th className="py-4 px-4 whitespace-nowrap">Phòng cơ bản<br/><span className="text-sm font-normal">(Qua đêm)</span></th>
                  <th className="py-4 px-4 whitespace-nowrap">Phòng VIP<br/><span className="text-sm font-normal">(Qua đêm)</span></th>
                  <th className="py-4 px-4 whitespace-nowrap">Gửi trong ngày<br/><span className="text-sm font-normal">(Cơ bản)</span></th>
                  <th className="py-4 px-4 whitespace-nowrap">Gửi trong ngày<br/><span className="text-sm font-normal">(VIP)</span></th>
                </tr>
              </thead>
              <tbody className="font-body-md text-base text-on-surface">
                <tr className="border-b border-gray-100 hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Dưới 5kg</td>
                  <td className="py-4 px-4 text-primary font-bold">150,000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">230,000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">90,000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">150,000đ</td>
                </tr>
                <tr className="hover:bg-[#e9f0ed] transition-colors">
                  <td className="py-4 px-4 font-medium">Trên 5.1kg</td>
                  <td className="py-4 px-4 text-primary font-bold">170,000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">250,000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">110,000đ</td>
                  <td className="py-4 px-4 text-primary font-bold">170,000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-primary-light/50 rounded-xl p-5 border border-primary-light text-sm text-on-surface-variant flex gap-3 items-start">
            <span className="material-symbols-outlined text-primary text-xl shrink-0">info</span>
            <div>
              <p className="mb-1"><strong className="text-primary">Ghi chú:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Thời gian nhận và trả thú cưng: từ 8:00 đến 20:00 hàng ngày.</li>
                <li>Quá thời gian quy định sẽ tính thêm phụ phí theo giờ.</li>
                <li>Miễn phí đưa đón trong bán kính 3km đối với khách hàng gửi trên 1 ngày.</li>
                <li>Giá trên chưa bao gồm các dịch vụ phát sinh khác như tắm, cắt tỉa (nếu có yêu cầu thêm).</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Amenities Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Package */}
          <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-100">
            <div className="text-center mb-8 pb-8 border-b border-gray-100">
              <span className="inline-block bg-primary-light px-4 py-1 rounded-full text-primary font-label-md text-sm mb-4">Gói Tiêu Chuẩn</span>
              <h3 className="font-h2 text-2xl font-bold text-on-surface">Phòng Cơ Bản</h3>
            </div>
            <ul className="space-y-6 font-body-md text-base text-on-surface-variant">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Camera 24/24</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Dùng Bữa 2 Lần/Ngày</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Thay Nước Sạch 2 lần/ngày</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Hồ Sơ Điện Tử Theo Dõi Sức Khỏe</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Bác Sĩ Thú Y Theo Dõi Sức Khỏe</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Vệ Sinh Phòng Khung 8-9h</span>
              </li>
              <li className="flex items-start gap-4 opacity-50">
                <span className="material-symbols-outlined text-gray-400 mt-1">cancel</span>
                <span>Cho ra phòng lớn chơi</span>
              </li>
              <li className="flex items-start gap-4 opacity-50">
                <span className="material-symbols-outlined text-gray-400 mt-1">cancel</span>
                <span>Vệ Sinh Phòng Khung 15-16h</span>
              </li>
            </ul>
          </div>
          {/* VIP Package */}
          <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full font-label-md text-sm shadow-sm">
              Đề xuất
            </div>
            <div className="text-center mb-8 pb-8 border-b border-gray-100">
              <span className="inline-block bg-[#f8e1eb] text-[#ab1f6b] px-4 py-1 rounded-full font-label-md text-sm mb-4">Gói Cao Cấp</span>
              <h3 className="font-h2 text-2xl font-bold text-primary">Phòng VIP</h3>
            </div>
            <ul className="space-y-6 font-body-md text-base text-on-surface-variant">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Camera 24/24</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Dùng Bữa 2 Lần/Ngày</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Thay Nước Sạch 2 lần/ngày</span>
              </li>
              <li className="flex items-start gap-4 font-semibold text-on-surface">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Cho ra phòng lớn chơi (2h/ngày)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Hồ Sơ Điện Tử Theo Dõi Sức Khỏe</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Bác Sĩ Thú Y Theo Dõi Sức Khỏe</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Vệ Sinh Phòng Khung 8-9h</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Vệ Sinh Phòng Khung 15-16h</span>
              </li>
            </ul>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="room_type">Loại phòng quan tâm</label>
                <select className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="room_type" name="room_type">
                  <option>Phòng cơ bản (Dưới 5kg)</option>
                  <option>Phòng Vip (Dưới 5kg)</option>
                  <option>Phòng cơ bản (Trên 5.1kg)</option>
                  <option>Phòng Vip (Trên 5.1kg)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-label-md text-sm font-medium text-on-surface mb-1" htmlFor="message">Ghi chú thêm</label>
              <textarea className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary shadow-sm" id="message" name="message" placeholder="Thông tin thêm về bé mèo của bạn..." rows={4}></textarea>
            </div>
            <div className="text-center">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-label-md text-base hover:bg-secondary transition-all w-full md:w-auto" type="button">Gửi Yêu Cầu Tư Vấn</button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

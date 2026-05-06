import React from 'react';
import Link from 'next/link';

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  // Normally, you would fetch the article data based on params.id
  // Here we use static content based on the provided design.

  return (
    <main className="pt-28 pb-16 min-h-screen">
      {/* Banner */}
      <section className="relative w-full flex items-center justify-center overflow-hidden bg-primary-light rounded-b-[3rem] mx-4 lg:mx-8 max-w-[calc(100%-2rem)] lg:max-w-[calc(100%-4rem)] xl:max-w-[1440px] xl:mx-auto h-[250px] min-h-[200px] mb-12">
        <img 
          alt="Veterinarian examining dog" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX4HIa68tQ-JvLtTjaY19wzoWzze_5tRGNFaOydsaRSxNd797mWkjmIVh97cc6SR1Ht6MGWAM6KzQnGlCBqqLMKOG_A5bEQ1sz6tJP7Zm1zDC-2OlCU9mA0PxXI2zHehD0N18dyS9Am28Bj6yrz4ykcDGQ8KLmyPnwveXKhQ9cZ4QVb10GPycMKpm4gzdFxnmOc-SDgzVNkkk3rRK7YVByCre1fWoOQBFkB7vXL-MQA3X0vwbByVzyJwjJVUQYJF0UfTxELjfv-Qyt"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-light to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-h1 font-extrabold text-on-surface mb-4 tracking-tight">Khám Thú Y</h1>
          <div className="flex items-center justify-center gap-2 text-slate-600 font-medium font-label-md">
            <Link className="hover:text-primary transition-colors" href="/">Trang chủ</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link className="hover:text-primary transition-colors" href="/article">Kiến thức</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary">Khám Thú Y</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-[800px] mx-auto px-6 mb-24 prose prose-slate prose-lg">
        {/* Bệnh Viện Thú Y Cún Beauty */}
        <section className="mb-16">
          <h2 className="text-3xl font-h2 font-bold text-on-surface mb-6 leading-tight">
            Bệnh Viện Thú Y Cún Beauty: Nơi Yêu Thương và Chăm Sóc Thú Cưng An Tâm
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6 font-body-md">
            Chào mừng bạn đến với Bệnh Viện Thú Y Cún Beauty – nơi chăm sóc sức khỏe thú cưng không chỉ là nghề nghiệp mà còn là tình yêu thương chân thành. Chúng tôi cam kết mang lại một môi trường y tế hiện đại, an toàn và đầy sự quan tâm cho những người bạn bốn chân của bạn.
          </p>
          <div className="rounded-[2rem] overflow-hidden shadow-lg mb-8">
            <img 
              alt="Veterinarian with puppy" 
              className="w-full h-auto object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlomgvEbh-nU22ZhU-nHLZy58Y8HJuK1ZgukCZG-Ik79b7HvDuBKESf93PRDfB7hzME9Cc_oNUfFbhzy1As3JZ6hP9jBLhRIfqpBkuMTI5kkNgSH1xWUXfef8OeXr88ev5i2SLI2I9_UfXD6CVAnvairNzjQkswhoenBMn7kYbmDm2VBPUxZD7RfjZErObxUeSgPDXhvad3PtBs5XSaROeI9EODWHIRigxpQSOR4Cfh-6YCuT4gYnfd6MM8DbWbGDfy-qFF7vUP0FP"
            />
          </div>
          <p className="text-lg text-slate-600 leading-relaxed font-body-md">
            Với đội ngũ bác sĩ tận tâm và giàu kinh nghiệm, chúng tôi luôn đặt sức khỏe và hạnh phúc của thú cưng lên hàng đầu. Mỗi ca khám chữa bệnh đều được thực hiện với sự tỉ mỉ, kỹ lưỡng và tình yêu thương vô bờ bến.
          </p>
        </section>

        {/* 04 Điểm khác biệt */}
        <section className="mb-16">
          <h2 className="text-3xl font-h2 font-bold text-on-surface mb-8">04 Điểm Khác Biệt Tại Cún Beauty</h2>
          <p className="text-slate-600 font-body-md text-lg mb-8">Chúng tôi tự hào mang đến chất lượng dịch vụ y tế thú cưng hàng đầu với những tiêu chuẩn khắt khe nhất.</p>
          
          <div className="space-y-6">
            {/* Điểm 1 */}
            <div className="bg-primary-light p-8 rounded-[2rem]">
              <h3 className="text-xl font-h3 font-bold text-on-surface mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
                Không nhận ca bệnh truyền nhiễm
              </h3>
              <p className="text-slate-600 font-body-md mb-4">Môi trường an toàn, sạch sẽ tuyệt đối. Bảo vệ tối đa sức khỏe cho thú cưng khỏe mạnh khi đến khám định kỳ.</p>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-on-surface text-sm font-medium border border-gray-100">
                <span className="material-symbols-outlined text-sm text-primary">call</span>
                Hotline: 0901.450.689
              </div>
            </div>

            {/* Điểm 2 */}
            <div className="bg-primary-light p-8 rounded-[2rem]">
              <h3 className="text-xl font-h3 font-bold text-on-surface mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                Cơ sở vật chất hiện đại
              </h3>
              <p className="text-slate-600 font-body-md">Trang bị hệ thống máy móc, dụng cụ tiên tiến nhập khẩu. Phòng phẫu thuật đạt chuẩn y tế vô trùng, đảm bảo an toàn tối đa.</p>
            </div>

            {/* Điểm 3 */}
            <div className="bg-primary-light p-8 rounded-[2rem]">
              <h3 className="text-xl font-h3 font-bold text-on-surface mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                Đội ngũ bác sĩ chuyên nghiệp
              </h3>
              <p className="text-slate-600 font-body-md">100% bác sĩ tốt nghiệp Đại học Nông Lâm TP.HCM, có nhiều năm kinh nghiệm lâm sàng và liên tục được cập nhật kiến thức y khoa mới.</p>
            </div>

            {/* Điểm 4 */}
            <div className="bg-primary-light p-8 rounded-[2rem]">
              <h3 className="text-xl font-h3 font-bold text-on-surface mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_heart</span>
                Chăm sóc sau điều trị tận tình
              </h3>
              <p className="text-slate-600 font-body-md">Quản lý hồ sơ bằng hệ thống sổ sức khỏe điện tử thông minh. Đội ngũ CSKH luôn sẵn sàng hỗ trợ, tư vấn 24/7 sau khi thú cưng xuất viện.</p>
            </div>
          </div>
        </section>

        {/* Bảng giá dịch vụ */}
        <section className="mb-16">
          <h2 className="text-3xl font-h2 font-bold text-on-surface mb-6">Các dịch vụ tại Bệnh viện thú y Cún Beauty</h2>
          <p className="text-slate-600 font-body-md mb-8 text-lg">Mức giá tham khảo cho các dịch vụ phổ biến. Vui lòng liên hệ để được báo giá chi tiết theo tình trạng thú cưng.</p>
          
          <div className="bg-white border border-gray-100 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] overflow-hidden">
            <ul className="divide-y divide-gray-100">
              <li className="flex items-center justify-between p-6 hover:bg-primary-light/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-light w-12 h-12 rounded-xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">vaccines</span>
                  </div>
                  <span className="font-medium font-body-md text-on-surface text-lg">Tiêm ngừa vắc-xin</span>
                </div>
                <span className="font-bold text-primary font-h3 text-lg text-right">80.000 – 290.000đ</span>
              </li>
              <li className="flex items-center justify-between p-6 hover:bg-primary-light/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-light w-12 h-12 rounded-xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">content_cut</span>
                  </div>
                  <span className="font-medium font-body-md text-on-surface text-lg">Triệt sản</span>
                </div>
                <span className="font-bold text-primary font-h3 text-lg text-right">500.000 – 1.500.000đ</span>
              </li>
              <li className="flex items-center justify-between p-6 hover:bg-primary-light/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-light w-12 h-12 rounded-xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">healing</span>
                  </div>
                  <span className="font-medium font-body-md text-on-surface text-lg">Điều trị da, nấm, tai</span>
                </div>
                <span className="font-bold text-primary font-h3 text-lg text-right">50.000 – 300.000đ</span>
              </li>
              <li className="flex items-center justify-between p-6 hover:bg-primary-light/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-light w-12 h-12 rounded-xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">spa</span>
                  </div>
                  <span className="font-medium font-body-md text-on-surface text-lg">Spa grooming</span>
                </div>
                <span className="font-bold text-primary font-h3 text-lg text-right">150.000 – 300.000đ</span>
              </li>
              <li className="flex items-center justify-between p-6 hover:bg-primary-light/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-light w-12 h-12 rounded-xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">night_shelter</span>
                  </div>
                  <span className="font-medium font-body-md text-on-surface text-lg">Hotel (Lưu chuồng)</span>
                </div>
                <span className="font-bold text-primary font-h3 text-lg text-right">130.000 – 200.000đ</span>
              </li>
            </ul>
          </div>
        </section>
      </article>

      {/* Form liên hệ & Địa chỉ */}
      <section className="max-w-[1440px] mx-auto px-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-primary-light/30 p-8 lg:p-16 rounded-[3rem] border border-gray-100">
          {/* Form */}
          <div className="bg-white p-10 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)]">
            <h3 className="text-3xl font-h2 font-bold text-on-surface mb-8">Đặt lịch khám ngay</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 ml-4">Họ và tên</label>
                <input className="w-full bg-background border border-gray-100 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400" placeholder="Nhập tên của bạn" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 ml-4">Số điện thoại</label>
                <input className="w-full bg-background border border-gray-100 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400" placeholder="Nhập số điện thoại" type="tel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 ml-4">Nội dung / Triệu chứng</label>
                <textarea className="w-full bg-background border border-gray-100 rounded-xl px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 resize-none" placeholder="Mô tả tình trạng thú cưng của bạn..." rows={4}></textarea>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-secondary transition-all mt-4 uppercase tracking-wider" type="submit">
                Gửi yêu cầu đặt lịch
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center lg:pl-12">
            <h3 className="text-4xl font-h2 font-bold text-on-surface mb-12">Thông Tin Liên Hệ</h3>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="bg-white text-primary w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-50">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-2 uppercase tracking-wide">Địa chỉ phòng khám</p>
                  <p className="text-xl text-on-surface font-semibold leading-snug">146 Nơ Trang Long, P14,<br/> Bình Thạnh, TP.HCM</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white text-primary w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-50">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>phone_in_talk</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-2 uppercase tracking-wide">Hotline cấp cứu & Đặt lịch</p>
                  <p className="text-3xl text-primary font-h2 font-bold tracking-tight">090 145 0689</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white text-primary w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] border border-gray-50">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-2 uppercase tracking-wide">Giờ làm việc</p>
                  <p className="text-xl text-on-surface font-semibold">08:00 - 20:00<br/><span className="text-base text-slate-500 font-normal">(Tất cả các ngày trong tuần)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a3829] text-white pt-16 md:pt-20 pb-8 md:pb-10 px-4 md:px-10 mt-auto w-full z-10 relative">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">pets</span>
            </div>
            <div className="text-2xl font-black text-white tracking-tighter">
              PetCare<span className="text-primary-light font-light">Shop</span>
            </div>
          </div>
          <p className="text-primary-light text-sm leading-relaxed">Nơi cung cấp dịch vụ chăm sóc thú cưng toàn diện với tiêu chuẩn 5 sao. Chúng tôi yêu thương thú cưng của bạn như chính gia đình mình.</p>
        </div>
        <div className="space-y-4 md:space-y-6">
          <h4 className="font-bold text-lg mb-4 md:mb-6">Thông tin liên hệ</h4>
          <ul className="space-y-3 md:space-y-4 text-primary-light text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-xl">location_on</span>
              <span>123 Đường Thú Cưng, Quận 1, TP. HCM</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-xl">call</span>
              <span>Hotline: 1900 1234</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-xl">mail</span>
              <span>Email: contact@petcareshop.vn</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4 md:space-y-6">
          <h4 className="font-bold text-lg mb-4 md:mb-6">Liên kết hữu ích</h4>
          <ul className="space-y-3 md:space-y-4 text-primary-light text-sm">
            <li><Link className="hover:text-white transition-colors" href="/about">Về chúng tôi</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/services">Dịch vụ</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Bảng giá</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Chính sách bảo mật</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Điều khoản sử dụng</Link></li>
          </ul>
        </div>
        <div className="space-y-4 md:space-y-6">
          <h4 className="font-bold text-lg mb-4 md:mb-6">Giờ mở cửa</h4>
          <ul className="space-y-3 md:space-y-4 text-primary-light text-sm">
            <li className="flex justify-between border-b border-[#29664c] pb-2">
              <span>Thứ 2 - Thứ 6</span>
              <span>08:00 - 20:00</span>
            </li>
            <li className="flex justify-between border-b border-[#29664c] pb-2">
              <span>Thứ 7 - Chủ Nhật</span>
              <span>09:00 - 18:00</span>
            </li>
            <li className="flex justify-between border-b border-[#29664c] pb-2 text-accent font-semibold">
              <span>Ngày lễ</span>
              <span>Nghỉ</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto border-t border-[#29664c] pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-primary-light text-sm text-center md:text-left">© 2024 PetCare Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

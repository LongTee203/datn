import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#06100c] border-t border-gray-100 dark:border-gray-800 pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* ── Brand Column ── */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary p-1.5 rounded-full">
              <span className="material-symbols-outlined text-white text-xl">
                pets
              </span>
            </div>
            <h2 className="text-[#111811] dark:text-white text-xl font-black font-headline">
              PetCare Plus
            </h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Cung cấp dịch vụ chăm sóc chất lượng cao và vật tư cao cấp cho
            thú cưng của bạn từ năm 2010. Hạnh phúc của thú cưng là ưu tiên
            hàng đầu của chúng tôi.
          </p>
          <div className="flex gap-4">
            {[
              { icon: "social_leaderboard", label: "Facebook" },
              { icon: "camera", label: "Instagram" },
              { icon: "alternate_email", label: "Email" },
            ].map(({ icon, label }) => (
              <a
                key={icon}
                href="#"
                aria-label={label}
                className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Services Column ── */}
        <div>
          <h4 className="font-bold mb-6 font-headline">Dịch vụ</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-500">
            {[
              ["Tiệm làm đẹp", "/services#grooming"],
              ["Lưu trú thú cưng", "/services#hotel"],
              ["Phòng khám thú y", "/services#vet"],
              ["Huấn luyện chó", "/services#training"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Support Column ── */}
        <div>
          <h4 className="font-bold mb-6 font-headline">Hỗ trợ</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-500">
            {[
              ["Câu hỏi thường gặp", "#"],
              ["Chính sách hoàn tiền", "#"],
              ["Trung tâm trợ giúp", "#"],
              ["Liên hệ chúng tôi", "/contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact Column ── */}
        <div>
          <h4 className="font-bold mb-6 font-headline">Liên hệ</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-lg">
                location_on
              </span>
              <span>
                123 Paw Avenue,
                <br />
                Pet Valley, CA 90210
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">
                call
              </span>
              <span>(555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">
                schedule
              </span>
              <span>Mở cửa: 8:00 - 20:00 hàng ngày</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="max-w-[1280px] mx-auto px-6 mt-20 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2024 PetCare Plus. Bảo lưu mọi quyền.</p>
        <div className="flex gap-8">
          {["Chính sách bảo mật", "Điều khoản dịch vụ", "Cookies"].map(
            (item) => (
              <Link key={item} href="#" className="hover:underline">
                {item}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}

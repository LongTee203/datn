import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Liên Hệ | PetCare Plus",
  description:
    "Chúng tôi luôn sẵn sàng hỗ trợ bạn và những người bạn bốn chân. Liên hệ ngay với PetCare Plus.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900 selection:bg-primary/10 selection:text-primary">
      <main className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        {/* ── Page Header ── */}
        <header className="mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900 font-headline">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn và những người bạn bốn chân.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* ── Contact Information ── */}
          <section className="space-y-12">
            <div className="grid gap-8">
              {/* Store info */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                  Thông tin cửa hàng
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">
                      location_on
                    </span>
                    <div>
                      <p className="font-semibold">Địa chỉ</p>
                      <p className="text-gray-600">
                        123 Lê Văn Hiến, Đông Ngạc, Từ Liêm, Hà Nội
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">
                      call
                    </span>
                    <div>
                      <p className="font-semibold">Điện thoại</p>
                      <p className="text-gray-600">0862623135</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">
                      mail
                    </span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">lel435564@gmail.com</p>
                    </div>
                  </li>
                </ul>
              </div>

              <hr className="border-gray-100" />

              {/* Bank transfer */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                  Thanh toán chuyển khoản
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">
                    Ngân hàng Quân Đội (MB Bank)
                  </p>
                  <p className="text-xl font-mono font-bold text-gray-900 mb-2">
                    0862623135
                  </p>
                  <p className="text-xs font-semibold text-gray-700 uppercase mb-4">
                    PetCare Shop
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    Nội dung: [SĐT] + [Tên thú cưng] + [Loại dịch vụ]
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Contact Form ── */}
          <ContactForm />
        </div>
      </main>
    </div>
  );
}

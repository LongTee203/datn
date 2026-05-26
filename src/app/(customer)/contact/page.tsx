import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Liên Hệ | PetCare Shop",
  description: "Chúng tôi luôn sẵn sàng hỗ trợ bạn và những người bạn bốn chân. Liên hệ ngay với PetCare Shop.",
};

async function getSettings(): Promise<Record<string, string>> {
  try {
    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const res = await fetch(`${protocol}://${host}/api/settings`, {
      next: { revalidate: 60 },
    });
    if (res.ok) return res.json();
  } catch {
    // fallback silently
  }
  return {};
}

export default async function ContactPage() {
  const s = await getSettings();

  const address     = s.address      || "123 Lê Văn Hiến, Đông Ngạc, Từ Liêm, Hà Nội";
  const phone       = s.phone        || "0862623135";
  const email       = s.email        || "lel435564@gmail.com";
  const bankName    = s.bank_name    || "Ngân hàng Quân Đội (MB Bank)";
  const bankNumber  = s.bank_number  || "0862623135";
  const bankAccount = s.bank_account || "PetCare Shop";

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
                  <li className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                      <div>
                        <p className="font-semibold">Địa chỉ</p>
                        <p className="text-gray-600">{address}</p>
                      </div>
                    </div>
                    <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8770917059155!2d105.79209257566758!3d20.997563388848583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad37ac71246f%3A0x21b282ff3f8a822a!2zQ2jhu6MgY2jEg20gc8OzYyB0aMO6IGPGsG5nIC0gUGV0Q2FyZTg0!5e0!3m2!1svi!2s!4v1779649689293!5m2!1svi!2s" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">call</span>
                    <div>
                      <p className="font-semibold">Điện thoại</p>
                      <p className="text-gray-600">{phone}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">mail</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">{email}</p>
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
                  <p className="text-sm text-gray-500 mb-1">{bankName}</p>
                  <p className="text-xl font-mono font-bold text-gray-900 mb-2">{bankNumber}</p>
                  <p className="text-xs font-semibold text-gray-700 uppercase mb-4">{bankAccount}</p>
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

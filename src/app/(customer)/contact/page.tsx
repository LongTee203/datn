import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LiÃªn Há»‡ | PetCareShop",
  description:
    "ChÃºng tÃ´i luÃ´n sáºµn sÃ ng há»— trá»£ báº¡n vÃ  nhá»¯ng ngÆ°á»i báº¡n bá»‘n chÃ¢n. LiÃªn há»‡ ngay vá»›i PetCareShop.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900 selection:bg-primary/10 selection:text-primary">
      <main className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        {/* â”€â”€ Page Header â”€â”€ */}
        <header className="mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900 font-headline">
            LiÃªn há»‡ vá»›i chÃºng tÃ´i
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            ChÃºng tÃ´i luÃ´n sáºµn sÃ ng há»— trá»£ báº¡n vÃ  nhá»¯ng ngÆ°á»i báº¡n bá»‘n chÃ¢n.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* â”€â”€ Contact Information â”€â”€ */}
          <section className="space-y-12">
            <div className="grid gap-8">
              {/* Store info */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                  ThÃ´ng tin cá»­a hÃ ng
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">
                      location_on
                    </span>
                    <div>
                      <p className="font-semibold">Äá»‹a chá»‰</p>
                      <p className="text-gray-600">
                        123 ÄÆ°á»ng Tháº£o Má»™c, Quáº­n Xanh, TP. HCM
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">
                      call
                    </span>
                    <div>
                      <p className="font-semibold">Äiá»‡n thoáº¡i</p>
                      <p className="text-gray-600">+84 900 123 456</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">
                      mail
                    </span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">hello@organicsanctuary.vn</p>
                    </div>
                  </li>
                </ul>
              </div>

              <hr className="border-gray-100" />

              {/* Bank transfer */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                  Thanh toÃ¡n chuyá»ƒn khoáº£n
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">
                    NgÃ¢n hÃ ng QuÃ¢n Äá»™i (MB Bank)
                  </p>
                  <p className="text-xl font-mono font-bold text-gray-900 mb-2">
                    1234 5678 9999
                  </p>
                  <p className="text-xs font-semibold text-gray-700 uppercase mb-4">
                    THE ORGANIC SANCTUARY LTD
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    Ná»™i dung: [SÄT] + [TÃªn thÃº cÆ°ng]
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* â”€â”€ Contact Form â”€â”€ */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              Gá»­i tin nháº¯n
            </h2>
            <form className="space-y-5" action="#" method="post">
              <div className="space-y-1">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Há» vÃ  tÃªn
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Nguyá»…n VÄƒn A"
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="email@example.com"
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-gray-700"
                >
                  Ná»™i dung
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Lá»i nháº¯n cá»§a báº¡n..."
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Gá»­i tin nháº¯n
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}


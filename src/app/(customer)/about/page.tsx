import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vá» ChÃºng TÃ´i | PetCareShop",
  description:
    "ChÃºng tÃ´i lÃ  nÆ¡i há»™i tá»¥ cá»§a tÃ¬nh yÃªu thÆ°Æ¡ng vÃ  sá»± tá»­ táº¿, mang Ä‘áº¿n khÃ´ng gian chÄƒm sÃ³c thÃº cÆ°ng chuáº©n há»¯u cÆ¡ Ä‘áº§u tiÃªn táº¡i Viá»‡t Nam.",
};

const missions = [
  {
    title: "ChÄƒm sÃ³c toÃ n diá»‡n:",
    body: "Káº¿t há»£p khoa há»c hiá»‡n Ä‘áº¡i vÃ  liá»‡u phÃ¡p tá»± nhiÃªn Ä‘á»ƒ tá»‘i Æ°u hÃ³a sá»©c khá»e thÃº cÆ°ng.",
  },
  {
    title: "Cam káº¿t Organic:",
    body: "Sá»­ dá»¥ng 100% sáº£n pháº©m nguá»“n gá»‘c thiÃªn nhiÃªn, khÃ´ng hÃ³a cháº¥t Ä‘á»™c háº¡i.",
  },
  {
    title: "Bá»n vá»¯ng:",
    body: "HÃ nh Ä‘á»™ng cÃ³ trÃ¡ch nhiá»‡m vá»›i mÃ´i trÆ°á»ng thÃ´ng qua viá»‡c giáº£m thiá»ƒu rÃ¡c tháº£i nhá»±a.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#00362a] selection:bg-primary/10">
      <main className="pt-32 pb-20">
        {/* â”€â”€ Brief Introduction â”€â”€ */}
        <section className="px-6 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#00362a] mb-6 tracking-tight font-headline">
              Vá»{" "}
              <span className="text-primary italic">The Organic Sanctuary</span>
            </h1>
            <p className="text-lg text-[#2f6555] leading-relaxed">
              ChÃºng tÃ´i lÃ  nÆ¡i há»™i tá»¥ cá»§a tÃ¬nh yÃªu thÆ°Æ¡ng vÃ  sá»± tá»­ táº¿, mang
              Ä‘áº¿n khÃ´ng gian chÄƒm sÃ³c thÃº cÆ°ng chuáº©n há»¯u cÆ¡ Ä‘áº§u tiÃªn táº¡i Viá»‡t
              Nam. Táº¡i Ä‘Ã¢y, má»i ngÆ°á»i báº¡n bá»‘n chÃ¢n Ä‘á»u Ä‘Æ°á»£c nÃ¢ng niu trong má»™t
              mÃ´i trÆ°á»ng thuáº§n khiáº¿t nháº¥t.
            </p>
          </div>
        </section>

        {/* â”€â”€ Our Mission â”€â”€ */}
        <section className="px-6 py-16 bg-[#f8fdfa] border-y border-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-primary font-headline">
              Sá»© Má»‡nh Cá»§a ChÃºng TÃ´i
            </h2>
            <ul className="space-y-6">
              {missions.map(({ title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    check_circle
                  </span>
                  <p className="text-[#2f6555]">
                    <strong className="text-[#00362a]">{title}</strong> {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* â”€â”€ Brand Story â”€â”€ */}
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-primary font-headline">
              CÃ¢u Chuyá»‡n ThÆ°Æ¡ng Hiá»‡u
            </h2>
            <div className="text-[#2f6555] leading-relaxed space-y-4">
              <p>
                The Organic Sanctuary ra Ä‘á»i tá»« Ã½ tÆ°á»Ÿng vá» má»™t &ldquo;NhÃ  KÃ­nh
                Ká»¹ Thuáº­t Sá»‘&rdquo; (Digital Greenhouse) â€” nÆ¡i cÃ´ng nghá»‡ hiá»‡n
                Ä‘áº¡i phá»¥c vá»¥ cho báº£n nÄƒng tá»± nhiÃªn cá»§a thÃº cÆ°ng. ChÃºng tÃ´i tin
                ráº±ng, trong tháº¿ giá»›i ngÃ y cÃ ng báº­n rá»™n, cÃ¡c bÃ© yÃªu xá»©ng Ä‘Ã¡ng
                cÃ³ má»™t chá»‘n dá»«ng chÃ¢n tÄ©nh láº·ng vÃ  an toÃ n.
              </p>
              <p>
                Khá»Ÿi nguá»“n tá»« má»™t phÃ²ng khÃ¡m nhá», chÃºng tÃ´i Ä‘Ã£ phÃ¡t triá»ƒn
                thÃ nh má»™t há»‡ sinh thÃ¡i chÄƒm sÃ³c thÃº cÆ°ng toÃ n diá»‡n, nÆ¡i má»—i
                nhÃ¢n viÃªn khÃ´ng chá»‰ lÃ  má»™t chuyÃªn gia mÃ  cÃ²n lÃ  má»™t ngÆ°á»i báº¡n
                Ä‘á»“ng hÃ nh táº­n tÃ¢m. ChÃºng tÃ´i khÃ´ng chá»‰ cung cáº¥p dá»‹ch vá»¥, chÃºng
                tÃ´i xÃ¢y dá»±ng má»™t cá»™ng Ä‘á»“ng trÃ¢n trá»ng sá»± sá»‘ng vÃ  mÃ´i trÆ°á»ng.
              </p>
            </div>
          </div>
        </section>

        {/* â”€â”€ Minimal CTA â”€â”€ */}
        <section className="px-6 py-10 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#2f6555] mb-6">
              Báº¡n muá»‘n tÃ¬m hiá»ƒu thÃªm vá» cÃ¡c dá»‹ch vá»¥ cá»§a chÃºng tÃ´i?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="border border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary/5 transition-colors"
              >
                LiÃªn há»‡ tÆ° váº¥n
              </Link>
              <Link
                href="/services"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:bg-primary-dim transition-colors"
              >
                Xem báº£ng giÃ¡
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


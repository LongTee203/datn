import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dá»‹ch Vá»¥ ChÄƒm SÃ³c ThÃº CÆ°ng | PetCareShop",
  description:
    "Tráº£i nghiá»‡m dá»‹ch vá»¥ cao cáº¥p, mang láº¡i sá»©c khá»e vÃ  niá»m vui trá»n váº¹n cho ngÆ°á»i báº¡n nhá» cá»§a báº¡n táº¡i khÃ´ng gian xanh mÃ¡t cá»§a chÃºng tÃ´i.",
};

const services = [
  {
    id: "grooming",
    title: "Táº¯m sáº¥y",
    description:
      "LÃ m sáº¡ch sÃ¢u, khá»­ mÃ¹i vÃ  sáº¥y khÃ´ an toÃ n vá»›i cÃ¡c sáº£n pháº©m há»¯u cÆ¡ lÃ nh tÃ­nh.",
    price: "Tá»« 150.000Ä‘",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBU6djqbHdzcaTUQxe1GuPi5tRBXe01FTl0hYsT-gmr7mcMaX2Uy4rQ0Vgr8lT_vjMOZeSplhRekRI07A0avs1s5NGznreRdod-vSxv0hMYql_9RY1MEaVdMn1_6MeU5GkIXvfUdgjed5ZmZBqpml2HtSfboDAFRYDeJywaNh5NbTUULPboNz8L5jk_5fvaUkZWcmvibVrAQxoYMjuz1KTpJD9EVcPzG9cvpOQUZbTk74KzaIvdbipeuyeQVV6CsDEiHjEsmnhsIoyg",
    imageAlt: "A small fluffy dog being washed gently in a bright modern pet spa",
  },
  {
    id: "styling",
    title: "Cáº¯t tá»‰a táº¡o kiá»ƒu",
    description:
      "Táº¡o kiá»ƒu thá»i trang, cáº¯t tá»‰a gá»n gÃ ng theo yÃªu cáº§u bá»Ÿi cÃ¡c chuyÃªn gia dÃ y dáº·n kinh nghiá»‡m.",
    price: "Tá»« 200.000Ä‘",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFu1dnWDXKx-G-hh1UzN3ZZSpACeQOLCPSLcRa6EjmL-63Qns_1Uyb7BKf3gflmYGYZjkHnMd7waw2Orv6chnecnrtgGCkX8Ep_3NPOaMtpUtXZuc0lwwThMlYxPezIMe4JRhDOXJVxPe6bgIJU-SEThJgDjlqRFgSs31tK7O3TbYTRXQabeaSD3IulWfrJTpMK3suokFQiFHtJodNzP-E0-CxM3eX3baTWIpKxpvvJmnyydE4ohBWbEAqu8WZ4bgtrXdkpdNMFFBX",
    imageAlt: "Professional pet groomer carefully trimming the fur of a calm dog",
  },
  {
    id: "spa",
    title: "Spa & Massage",
    description:
      "ThÆ° giÃ£n tá»‘i Ä‘a vá»›i liá»‡u trÃ¬nh tháº£o má»™c tá»± nhiÃªn, giÃºp giáº£m cÄƒng tháº³ng vÃ  tÄƒng cÆ°á»ng tuáº§n hoÃ n.",
    price: "Tá»« 350.000Ä‘",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwGqZP3rhNeBmNwVP1B4Hr5OYLJ8tB4iB5y1SynRuPGZVHgoAIDE5aCxpKGopPi_gnVmXj-ncq1xeWyBkiT937GXbIWIcLb6ETPxjYNIFaCk3UDMXWExlwDvHlk0V8LxpMHe2ubEGE2JTQtEN2ujzeRGn0E5ca9yGnQvN3ZkpLcdYVBCGE5NDNVuGoRkwDuNWNrIYQzXpSCIxe60vV3pCif9EldK4F1940zm9ZD4gqYILzjo3Ep_rp7LkHlfI69SeNYwxrXecIsUyZ",
    imageAlt: "A relaxed dog getting a gentle massage with natural herbs",
  },
  {
    id: "vaccination",
    title: "TiÃªm phÃ²ng",
    description:
      "Báº£o vá»‡ sá»©c khá»e thÃº cÆ°ng vá»›i lá»™ trÃ¬nh vaccine chuáº©n xÃ¡c vÃ  an toÃ n tuyá»‡t Ä‘á»‘i.",
    price: "Tá»« 250.000Ä‘",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJEek82zJrImqRbBMA9wWgVopdBm9hnDHxSgXKjDc_G6o11LNXkETGrXu2LoZuE7MxzyMpkeMd3gnBgGZcGdOpiIgCB8RWFRXBCoggcbSop4iWodHgu2M-srvLEXT-2hOMm7_Y48NLE7OdubHYgxkDoOzwtIvKygwkkciB1FGYh8ZJSgvcXQRhgefwjdPVW7JzzVtlGobZaoJGIRcPm3enmEe5qmb4HfdYIykDwaKpInvgYFhw5NlPgZ8OsPghIejsYLPPl7yK8P3E",
    imageAlt: "Veterinarian gently examining a puppy for vaccination",
  },
  {
    id: "hotel",
    title: "KhÃ¡ch sáº¡n thÃº cÆ°ng",
    description:
      "NÆ¡i lÆ°u trÃº tiá»‡n nghi, sáº¡ch sáº½ vÃ  an toÃ n nhÆ° chÃ­nh ngÃ´i nhÃ  thá»© hai cá»§a thÃº cÆ°ng.",
    price: "Tá»« 180.000Ä‘/ngÃ y",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEr543JZ64FD0VobBxgCTGgE1aI3BZC25I4cvbAtrqSIoFoK3IEwV3BLuNmq9msh3xXrc227mhNX22o4h2ZmMTx7059z32s1ssvScEZcJwET5TBQtmulBAladD45LYKjbveGI2_uhE_ICuAVg7stD5SuEhuiRmEWmVu4XAtODqerenYPo4sMBtQLyjpCr6IIuEzNz2cecmUzaHCITY1T_yVaWQCrMPUSe4WieQMQx2hOzieY7Wh-PvnPxTuB6wCIdm-w9fKL_Ezj0J",
    imageAlt: "Cozy modern pet hotel room with a comfortable bed and toys",
  },
  {
    id: "checkup",
    title: "KhÃ¡m sá»©c khá»e",
    description:
      "Kiá»ƒm tra tá»•ng quÃ¡t vÃ  tÆ° váº¥n dinh dÆ°á»¡ng chuyÃªn sÃ¢u Ä‘á»ƒ thÃº cÆ°ng luÃ´n khá»e máº¡nh.",
    price: "Tá»« 300.000Ä‘",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC387GdqTTB5KAMaxFYzzpPEqYQRKHbOkGg2K8TATCibSh8pEXve_yGgRKalSZrPjYHT2RkuZFA5BawuzbgKPHpJXyWKw4YFZ_N-LRcEwWS6EKgiM6BX0oAxvO6UXl0kLvQa-Bm3WlLRFceCjMmAOXqD0EsWbHSrevDrwD0LVxXXTDlAWeoOnw6vhV-i4o4bnUhjW31H8McgRYEAqae4r61CeBo2_rC1NXvP2fS_0FlpquCM1NdrQZB-fclCyml38irtVnJ_3QTFGpi",
    imageAlt: "Caring vet doctor checking a cat's heartbeat with a stethoscope",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white font-body text-[#0c361d] antialiased">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        {/* â”€â”€ Hero Banner â”€â”€ */}
        <section className="relative rounded-xl overflow-hidden min-h-[400px] flex items-center bg-[#cafdd4]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwGqZP3rhNeBmNwVP1B4Hr5OYLJ8tB4iB5y1SynRuPGZVHgoAIDE5aCxpKGopPi_gnVmXj-ncq1xeWyBkiT937GXbIWIcLb6ETPxjYNIFaCk3UDMXWExlwDvHlk0V8LxpMHe2ubEGE2JTQtEN2ujzeRGn0E5ca9yGnQvN3ZkpLcdYVBCGE5NDNVuGoRkwDuNWNrIYQzXpSCIxe60vV3pCif9EldK4F1940zm9ZD4gqYILzjo3Ep_rp7LkHlfI69SeNYwxrXecIsUyZ"
              alt="Professional pet spa environment"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#deffe2] to-transparent" />
          </div>
          <div className="relative z-10 p-12 max-w-2xl">
            <h1 className="font-headline text-[3.5rem] font-extrabold leading-tight tracking-tight text-[#0c361d] mb-6">
              Dá»‹ch Vá»¥ ChÄƒm SÃ³c ThÃº CÆ°ng
            </h1>
            <p className="text-lg text-[#3b6447] mb-8">
              Tráº£i nghiá»‡m dá»‹ch vá»¥ cao cáº¥p, mang láº¡i sá»©c khá»e vÃ  niá»m vui trá»n
              váº¹n cho ngÆ°á»i báº¡n nhá» cá»§a báº¡n táº¡i khÃ´ng gian xanh mÃ¡t cá»§a chÃºng
              tÃ´i.
            </p>
            <Link
              href="/booking"
              className="bg-[#5a5c5c] text-[#f2f3f3] font-medium py-4 px-8 rounded-full hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Äáº·t lá»‹ch tá»•ng quÃ¡t
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* â”€â”€ Services Grid â”€â”€ */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ id, title, description, price, imageUrl, imageAlt }) => (
              <div
                key={id}
                id={id}
                className="bg-white rounded-xl overflow-hidden group hover:bg-[#cafdd4] transition-colors duration-300 flex flex-col h-full border border-gray-100"
              >
                <div className="h-56 overflow-hidden relative">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="font-headline text-2xl font-bold text-[#0c361d] mb-3">
                    {title}
                  </h3>
                  <p className="text-[#3b6447] mb-6 flex-grow">{description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[#006a38] text-lg">{price}</span>
                    <Link
                      href="/booking"
                      className="bg-[#87faab] text-[#005f31] font-medium py-2 px-6 rounded-full hover:bg-[#005c30] hover:text-white transition-colors"
                    >
                      Äáº·t lá»‹ch ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


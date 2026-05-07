import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | PetCare Plus",
  description:
    "Chúng tôi là nơi hội tụ của tình yêu thương và sự tử tế, mang đến không gian chăm sóc thú cưng chuẩn hữu cơ đầu tiên tại Việt Nam.",
};

const missions = [
  {
    title: "Chăm sóc toàn diện:",
    body: "Kết hợp khoa học hiện đại và liệu pháp tự nhiên để tối ưu hóa sức khỏe thú cưng.",
  },
  {
    title: "Cam kết Organic:",
    body: "Sử dụng 100% sản phẩm nguồn gốc thiên nhiên, không hóa chất độc hại.",
  },
  {
    title: "Bền vững:",
    body: "Hành động có trách nhiệm với môi trường thông qua việc giảm thiểu rác thải nhựa.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#00362a] selection:bg-primary/10">
      <main className="pt-32 pb-20">
        {/* ── Brief Introduction ── */}
        <section className="px-6 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#00362a] mb-6 tracking-tight font-headline">
              Về{" "}
              <span className="text-primary italic">The Organic Sanctuary</span>
            </h1>
            <p className="text-lg text-[#2f6555] leading-relaxed">
              Chúng tôi là nơi hội tụ của tình yêu thương và sự tử tế, mang
              đến không gian chăm sóc thú cưng chuẩn hữu cơ đầu tiên tại Việt
              Nam. Tại đây, mọi người bạn bốn chân đều được nâng niu trong một
              môi trường thuần khiết nhất.
            </p>
          </div>
        </section>

        {/* ── Our Mission ── */}
        <section className="px-6 py-16 bg-[#f8fdfa] border-y border-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-primary font-headline">
              Sứ Mệnh Của Chúng Tôi
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

        {/* ── Brand Story ── */}
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-primary font-headline">
              Câu Chuyện Thương Hiệu
            </h2>
            <div className="text-[#2f6555] leading-relaxed space-y-4">
              <p>
                The Organic Sanctuary ra đời từ ý tưởng về một &ldquo;Nhà Kính
                Kỹ Thuật Số&rdquo; (Digital Greenhouse) — nơi công nghệ hiện
                đại phục vụ cho bản năng tự nhiên của thú cưng. Chúng tôi tin
                rằng, trong thế giới ngày càng bận rộn, các bé yêu xứng đáng
                có một chốn dừng chân tĩnh lặng và an toàn.
              </p>
              <p>
                Khởi nguồn từ một phòng khám nhỏ, chúng tôi đã phát triển
                thành một hệ sinh thái chăm sóc thú cưng toàn diện, nơi mỗi
                nhân viên không chỉ là một chuyên gia mà còn là một người bạn
                đồng hành tận tâm. Chúng tôi không chỉ cung cấp dịch vụ, chúng
                tôi xây dựng một cộng đồng trân trọng sự sống và môi trường.
              </p>
            </div>
          </div>
        </section>

        {/* ── Minimal CTA ── */}
        <section className="px-6 py-10 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#2f6555] mb-6">
              Bạn muốn tìm hiểu thêm về các dịch vụ của chúng tôi?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="border border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary/5 transition-colors"
              >
                Liên hệ tư vấn
              </Link>
              <Link
                href="/services"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:bg-primary-dim transition-colors"
              >
                Xem bảng giá
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

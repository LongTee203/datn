import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dịch Vụ Chăm Sóc Thú Cưng | PetCare Plus",
  description:
    "Trải nghiệm dịch vụ cao cấp, mang lại sức khỏe và niềm vui trọn vẹn cho người bạn nhỏ của bạn tại không gian xanh mát của chúng tôi.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const categoryParam = resolvedParams.category;
  const activeCategory = typeof categoryParam === "string" ? categoryParam : "Tất cả";

  const categories = ["Tất cả", "Tắm & Sấy", "Cắt tỉa lông", "Vệ sinh & Spa", "Y tế & Khám bệnh", "Lưu trú (Hotel)", "Khác"];

  // Chỉ lấy những dịch vụ đang hoạt động và đúng danh mục
  const services = await prisma.services.findMany({
    where: {
      is_active: true,
      category: activeCategory !== "Tất cả" ? activeCategory : undefined
    },
    orderBy: { created_at: "desc" }
  });

  return (
    <div className="bg-white font-body text-[#0c361d] antialiased">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* ── Hero Banner ── */}
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
              Dịch Vụ Chăm Sóc Thú Cưng
            </h1>
            <p className="text-lg text-[#3b6447] mb-8">
              Trải nghiệm dịch vụ cao cấp, mang lại sức khỏe và niềm vui trọn
              vẹn cho người bạn nhỏ của bạn tại không gian xanh mát của chúng
              tôi.
            </p>
            <Link
              href="/booking"
              className="bg-[#5a5c5c] text-[#f2f3f3] font-medium py-4 px-8 rounded-full hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Đặt lịch ngay
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* ── Filter Row ── */}
        <section>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/services${cat !== "Tất cả" ? `?category=${encodeURIComponent(cat)}` : ""}`}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${activeCategory === cat
                    ? "bg-[#006a38] text-white shadow-md"
                    : "bg-gray-100 text-[#0c361d] hover:bg-[#cafdd4] hover:text-[#006a38]"
                  }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section>
          {services.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-4 block">pets</span>
              <p className="text-gray-500 text-lg">Không tìm thấy dịch vụ nào trong danh mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.service_id}
                  className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                >
                  <div className="h-56 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.service_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                    )}
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="mb-3">
                      <span className="text-[10px] font-bold text-[#006a38] bg-[#cafdd4] px-3 py-1 rounded-md uppercase tracking-wider">
                        {service.category || "Khác"}
                      </span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-[#0c361d] mb-3">
                      {service.service_name}
                    </h3>
                    <p className="text-[#3b6447] mb-6 flex-grow">{service.description || "Chưa có mô tả chi tiết."}</p>

                    <div className="flex items-center gap-2 mb-6 text-[#3b6447] text-sm font-medium">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      {service.duration || 30} phút
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="font-extrabold text-[#006a38] text-xl">
                        {Number(service.price).toLocaleString("vi-VN")}đ
                      </span>
                      <Link
                        href={`/booking?serviceId=${service.service_id}&serviceName=${encodeURIComponent(service.service_name)}&price=${service.price}`}
                        className="bg-[#87faab] text-[#005f31] font-bold py-2.5 px-6 rounded-full hover:bg-[#005c30] hover:text-white transition-colors"
                      >
                        Đặt lịch ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

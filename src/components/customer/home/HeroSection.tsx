import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col gap-10 md:flex-row items-center">
        {/* ── Text Content ── */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">
              verified_user
            </span>
            Được hơn 5.000 chủ nuôi tin tưởng
          </div>

          <h1 className="text-[#111811] dark:text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight font-headline">
            Chăm sóc thú cưng{" "}
            <span className="text-primary">như người thân.</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            Điểm đến lý tưởng cho dịch vụ làm đẹp chuyên nghiệp, lưu trú cao
            cấp và chăm sóc thú y tận tâm. Chúng tôi đảm bảo những người bạn
            bốn chân luôn hạnh phúc, khỏe mạnh và được yêu thương.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="flex min-w-[160px] items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-lg font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
            >
              Đặt lịch hẹn
            </Link>
            <Link
              href="/services"
              className="flex min-w-[160px] items-center justify-center rounded-full h-14 px-8 text-lg font-bold hover:opacity-80 transition-colors border-2"
              style={{
                backgroundColor: "rgba(255,159,67,0.10)",
                color: "#ff9f43",
                borderColor: "rgba(255,159,67,0.20)",
              }}
            >
              Ghé thăm cửa hàng
            </Link>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div className="flex-1 relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
          <div className="relative w-full aspect-[4/3] rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white dark:border-gray-800">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDnbWVn4bJIayggEqM6Z3D9I_iHCz2tK1DLhkH_8KHzzOKa3X75sK39EhjO54A8w2hzmBkPQCT2Qge7x-pVqgPy002YSF2o85PvBgzDiJHkfUSS_vNIY9hSbB1vnACn3OltUVsXBzvsX4QFDBp7pF2fTPQlnfM1i1BnsquilRo8nIQyIJPrkXar9vCjn-ICaYUCHifJ9qvkFIzr4AfQsREPAUFwpFSXbfoXJpwVZ6f5D7B55xV9Yuk4krloaqyqiv1rwzkpPOxmoSP"
              alt="Happy Golden Retriever dog and a fluffy cat sitting together"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Đặt lịch thành công | PetCare Shop",
};

// Random booking code for demo
const bookingCode = "#BK-" + Math.floor(100000 + Math.random() * 900000);

export default function BookingSuccessPage() {
  return (
    <div className="bg-[#deffe2] text-[#0c361d] font-body min-h-screen">
      <main className="pt-16 pb-20 px-4 max-w-5xl mx-auto">
        {/* Progress indicator — step 3 completed */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {[
            { label: "Thông tin", done: true },
            { label: "Thanh toán", done: true },
            { label: "Hoàn tất", done: true, active: true },
          ].map(({ label, done, active }, i) => (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && <div className={`h-px w-12 ${done ? "bg-[#006a38]" : "bg-gray-300"}`} />}
              <div className={`flex items-center gap-2 ${active ? "" : "opacity-40"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    active ? "w-12 h-12 bg-[#006a38] text-white shadow-xl" : "bg-[#006a38] text-white"
                  }`}
                >
                  {active ? (
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`hidden sm:block text-xs font-bold uppercase tracking-wider ${active ? "text-[#006a38]" : ""}`}>
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Success hero */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#006a38]/10 rounded-full blur-3xl -z-10" />
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#87faab] rounded-full mb-8 shadow-xl">
            <span
              className="material-symbols-outlined text-5xl text-[#006a38]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-[#0c361d] mb-6 tracking-tight">
            Đặt lịch thành công!
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#3b6447] leading-relaxed mb-8">
            Cảm ơn bạn đã tin tưởng dịch vụ của PetCare Shop. Lịch hẹn của bạn đã được ghi nhận và
            chúng tôi sẽ sớm liên hệ lại để xác nhận.
          </p>
          <div className="inline-block px-6 py-2 bg-[#b5f0c2] rounded-full font-semibold text-[#005c30] tracking-wide border border-[#8cb795]/30">
            Mã lịch hẹn: <span className="font-bold">{bookingCode}</span>
          </div>
        </div>

        {/* Summary bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Service */}
          <div className="bg-[#cafdd4] p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute -right-6 -top-6 opacity-10">
              <span className="material-symbols-outlined text-9xl">spa</span>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#3b6447] mb-4 opacity-70">
                Dịch vụ đã đặt
              </h3>
              <p className="text-2xl font-headline font-bold text-[#0c361d] mb-1">Tắm sấy & Spa VIP</p>
            </div>
            <div className="text-3xl font-headline font-black text-[#006a38]">500.000đ</div>
          </div>

          {/* Appointment */}
          <div className="bg-[#cafdd4] p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute -right-6 -top-6 opacity-10">
              <span className="material-symbols-outlined text-9xl">calendar_today</span>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#3b6447] mb-4 opacity-70">
                Thời gian hẹn
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#006a38]">event</span>
                  <span className="font-semibold">Ngày 25/10/2024</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#006a38]">schedule</span>
                  <span className="font-semibold">Giờ 14:30</span>
                </div>
              </div>
            </div>
            <p className="text-[#3b6447] text-sm font-medium">Vui lòng đến sớm 10 phút.</p>
          </div>

          {/* Pet */}
          <div className="bg-white p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm">
            <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 rounded-full overflow-hidden opacity-20 rotate-12">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0TQbj-WkNIeVwk_BLG-SpM3HUI7MyFCi3UCVQ1j4AeWOr7Dz8rKhQxhXFi3O3jUmiHksAGlMGpxG2FLtFa5h2Eer23lQbcds5JN_lVSy2xTL5Ckw_TABZOJaSrXgDcbQxUMEnL3ZrTHLvdgqQX684nyUU7kfA3selESiUFtWROMFL5vA3rBwoOgt9fyaYOqK9EcYfHmHSGDfpSs6itjOwMXPB7A1JLAnk5hkjj0XlGY-HlOePbJM3f7OguVpUFNjMWoJPF58_R8cR"
                alt="Mochi"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#3b6447] mb-4 opacity-70">
                Thông tin thú cưng
              </h3>
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-headline font-bold text-[#0c361d]">Mochi</p>
                <span className="px-3 py-1 bg-[#87faab]/30 text-[#006a38] font-bold text-xs rounded-full w-fit">
                  Corgi
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3b6447]">pets</span>
              <span className="text-sm font-medium text-[#3b6447] italic">Thú cưng sẵn sàng</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/home"
            className="w-full sm:w-auto px-10 py-5 bg-[#006a38] text-white font-bold rounded-full text-lg shadow-xl hover:bg-[#005c30] transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">home</span>
            Về trang chủ
          </Link>
          <Link
            href="/profile"
            className="w-full sm:w-auto px-10 py-5 bg-[#b5f0c2] text-[#0c361d] font-bold rounded-full text-lg hover:bg-[#87faab] transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">calendar_month</span>
            Xem lịch hẹn của tôi
          </Link>
        </div>
      </main>
    </div>
  );
}

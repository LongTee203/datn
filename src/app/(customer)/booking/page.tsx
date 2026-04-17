"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SERVICES = [
  { id: "grooming", label: "Tắm sấy & Spa VIP", price: "500.000đ" },
  { id: "styling", label: "Cắt tỉa tạo kiểu", price: "200.000đ" },
  { id: "spa", label: "Spa & Massage thảo mộc", price: "350.000đ" },
  { id: "vaccination", label: "Tiêm phòng", price: "250.000đ" },
  { id: "hotel", label: "Khách sạn thú cưng", price: "180.000đ/ngày" },
  { id: "checkup", label: "Khám sức khỏe tổng quát", price: "300.000đ" },
];

const TIME_SLOTS = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00", "17:30"];

export default function BookingPage() {
  const router = useRouter();
  const [step] = useState(2); // Already at step 2 (Confirmation)
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [petName, setPetName] = useState("Mochi");
  const [petBreed, setPetBreed] = useState("Corgi Pembroke");
  const [petWeight, setPetWeight] = useState("8.5");
  const [notes, setNotes] = useState("");

  const service = SERVICES.find((s) => s.id === selectedService)!;

  function handleConfirm() {
    router.push("/booking/success");
  }

  return (
    <div className="min-h-screen bg-white text-[#0c361d] flex flex-col items-center">
      {/* Centered brand header (transactional mode) */}
      <header className="w-full max-w-5xl px-8 py-8 flex justify-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#006a38] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            pets
          </span>
          <span className="text-2xl font-bold text-[#0c361d] font-headline tracking-tight">PetCare Shop</span>
        </div>
      </header>

      <main className="w-full max-w-4xl px-4 pb-20 flex flex-col items-center">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-full bg-[#87faab] flex items-center justify-center text-[#005f31] font-bold text-sm">1</div>
          <div className="w-12 h-0.5 bg-[#87faab]" />
          <div className="w-8 h-8 rounded-full bg-[#006a38] text-white flex items-center justify-center text-sm font-bold shadow-lg">2</div>
          <div className="w-12 h-0.5 bg-gray-200" />
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">3</div>
        </div>

        <div className="w-full text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#0c361d] tracking-tight mb-3 font-headline">
            Xác nhận đặt lịch
          </h1>
          <p className="text-[#3b6447] text-lg">Vui lòng kiểm tra lại thông tin trước khi xác nhận</p>
        </div>

        {/* Confirmation bento grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Service + Notes */}
          <div className="md:col-span-7 space-y-6">
            {/* Service selector */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[#006a38] font-bold uppercase tracking-widest text-xs mb-2 block">Dịch vụ đã chọn</span>
                  <h2 className="text-2xl font-bold text-[#0c361d] leading-tight">{service.label}</h2>
                </div>
                <div className="bg-[#87faab] text-[#005f31] px-4 py-2 rounded-full font-bold text-lg">
                  {service.price}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-semibold text-[#3b6447] uppercase tracking-wider block mb-2">Chọn dịch vụ</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full border border-[#81b8a6] rounded-xl px-4 py-3 text-[#0c361d] focus:outline-none focus:ring-2 focus:ring-[#006a38]/30"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label} — {s.price}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006a38]">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#3b6447] font-medium">Ngày hẹn</p>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="font-semibold text-[#0c361d] text-sm border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006a38]">schedule</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#3b6447] font-medium">Giờ hẹn</p>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="font-semibold text-[#0c361d] text-sm border-none outline-none bg-transparent"
                    >
                      {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
              <h3 className="text-sm font-bold text-[#006a38] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">description</span>
                Ghi chú đặc biệt
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="VD: Bé hơi sợ nước khi tắm phần đầu, nhờ chuyên viên nhẹ tay..."
                rows={4}
                className="w-full text-[#0c361d] placeholder:text-[#81b8a6] text-sm resize-none border border-[#81b8a6] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#006a38]/30"
              />
            </div>
          </div>

          {/* Right: Pet + Owner info */}
          <div className="md:col-span-5 space-y-6">
            {/* Pet profile card */}
            <div className="bg-white overflow-hidden rounded-2xl border border-slate-100 shadow-md">
              <div className="h-28 bg-[#006a38]/10 relative">
                <div className="absolute -bottom-6 left-8 w-20 h-20 rounded-full border-4 border-white bg-[#cafdd4] flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNPu09yudfnFPFlthb0pzu2J4xlcS7toE5SDdPGuzBDiHWSeAeL6UmVWD_08vOEXlvsq54O-tQzj87YHzqj3W26x1kgxehVi3VVvQb6ekugEGN3QIWCWtURw9Subia1oFkmaNeKQLWKvVeq4nYNZcfXLIOD9yM8hEmUyw1CP1RF8cBYWs14U-UZx1fOfze8RSO0m95rLhmP_kJKgE2CuaMCztyNhHt6Xa9g_NNS8hIP9z5WT2GBl7YpL6uiqvtoi0ouzi8jihd9d1A"
                    alt="Pet"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="pt-10 pb-8 px-8">
                <h3 className="text-sm font-bold text-[#006a38] uppercase tracking-wider mb-4">Thông tin thú cưng</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Tên:", value: petName, set: setPetName },
                    { label: "Giống loài:", value: petBreed, set: setPetBreed },
                    { label: "Cân nặng (kg):", value: petWeight, set: setPetWeight },
                  ].map(({ label, value, set }) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <span className="text-[#3b6447]">{label}</span>
                      <input
                        value={value}
                        onChange={(e) => set(e.target.value)}
                        className="font-bold text-[#0c361d] text-right border-b border-[#81b8a6] bg-transparent outline-none w-32"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Owner card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
              <h3 className="text-sm font-bold text-[#006a38] uppercase tracking-wider mb-4">Thông tin chủ nuôi</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#cafdd4] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#006a38]">person</span>
                </div>
                <div>
                  <p className="text-[#0c361d] font-bold text-lg">Nguyễn Văn An</p>
                  <p className="text-[#3b6447] text-sm">090xxxx123</p>
                  <p className="text-[#3b6447] text-xs mt-1">an.nguyen@email.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="w-full max-w-md mt-16 flex flex-col items-center gap-6">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#006a38] hover:bg-[#005c30] text-white py-5 rounded-full font-bold text-lg transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
          >
            Xác nhận & Thanh toán
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <Link
            href="/services"
            className="flex items-center gap-2 text-[#3b6447] hover:text-[#006a38] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            Quay lại chỉnh sửa
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-8 mt-auto bg-white border-t border-slate-100 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-lg font-bold text-slate-800 font-headline">PetCare Shop</span>
        <div className="flex flex-wrap justify-center gap-6 text-slate-400">
          {["Privacy Policy", "Terms of Service", "Contact Support"].map((t) => (
            <a key={t} href="#" className="hover:text-slate-700 transition-colors">{t}</a>
          ))}
        </div>
        <p className="text-slate-400">© 2024 PetCare Shop.</p>
      </footer>
    </div>
  );
}

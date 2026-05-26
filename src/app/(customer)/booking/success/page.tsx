"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const STEP_LABELS = ["Chọn dịch vụ", "Xác nhận", "Hoàn tất"];

/** Generate a stable booking code per render */
function generateCode() {
  return "#BK-" + Math.floor(100000 + Math.random() * 900000);
}

function SuccessContent() {
  const searchParams = useSearchParams();

  const serviceName = searchParams.get("serviceName") || "Dịch vụ chăm sóc thú cưng";
  const serviceId   = searchParams.get("serviceId") || "";
  const priceRaw    = searchParams.get("price") || "0";
  const price       = Number(priceRaw).toLocaleString("vi-VN") + "đ";
  const date        = searchParams.get("date") || "";
  const time        = searchParams.get("time") || "";
  const petName     = searchParams.get("petName") || "";
  const petBreed    = searchParams.get("petBreed") || "";
  const ownerName   = searchParams.get("ownerName") || "";
  const ownerPhone  = searchParams.get("ownerPhone") || "";
  const customerId  = searchParams.get("customerId") || "";
  const notes       = searchParams.get("notes") || "";

  const formattedDate = date
    ? new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "Chưa chọn ngày";

  // Stable booking code for this page session
  const bookingCode = useRef(generateCode());

  // Save appointment to DB exactly once
  const savedRef = useRef(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    async function saveAppointment() {
      // Build appointment datetime from date + time
      const appointmentDate = date && time ? `${date}T${time}:00` : null;
      if (!appointmentDate) { setSaved(true); return; }

      try {
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: customerId ? parseInt(customerId, 10) : null,
            service_id:  serviceId  ? parseInt(serviceId,  10) : null,
            pet_name:    petName || "Thú cưng",
            appointment_date: appointmentDate,
            status: "Pending",
            note: notes || null,
            payment_method: searchParams.get("paymentMethod") || null,
            receipt_image: searchParams.get("receiptUrl") || null,
          }),
        });
        if (!res.ok) throw new Error("save failed");
        setSaved(true);
      } catch {
        setSaveError(true);
        setSaved(true);
      }
    }

    saveAppointment();
  }, [customerId, date, petName, serviceId, time]);

  return (
    <div className="bg-[#deffe2] text-[#0c361d] font-body min-h-screen">
      <main className="pt-28 pb-20 px-4 max-w-5xl mx-auto">
        {/* Progress bar — đồng bộ với /booking */}
        <div className="flex items-center justify-center mb-12">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isLast  = stepNum === 3;
            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && <div className="w-12 h-0.5 bg-[#006a38]" />}
                <div className="flex flex-col items-center gap-1">
                  <div className={`rounded-full flex items-center justify-center font-bold transition-all ${
                    isLast
                      ? "w-12 h-12 bg-[#006a38] text-white shadow-xl scale-110"
                      : "w-8 h-8 bg-[#87faab] text-[#005f31]"
                  }`}>
                    {isLast ? (
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    ) : (
                      <span className="text-sm">{stepNum}</span>
                    )}
                  </div>
                  <span className={`hidden sm:block text-[10px] font-bold uppercase tracking-wider ${isLast ? "text-[#006a38]" : "text-[#3b6447]"}`}>
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success hero */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#006a38]/10 rounded-full blur-3xl -z-10" />

          {/* Spinner while saving */}
          {!saved ? (
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#cafdd4] rounded-full mb-8">
              <span className="material-symbols-outlined animate-spin text-4xl text-[#006a38]">progress_activity</span>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#87faab] rounded-full mb-8 shadow-xl">
              <span className="material-symbols-outlined text-5xl text-[#006a38]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-[#0c361d] mb-6 tracking-tight">
            Đặt lịch thành công!
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#3b6447] leading-relaxed mb-6">
            Cảm ơn bạn đã tin tưởng dịch vụ của PetCare Shop. Lịch hẹn đã được ghi nhận,
            đội ngũ sẽ sớm liên hệ xác nhận.
          </p>

          {saveError && (
            <p className="text-sm text-red-500 mb-4">⚠ Không thể lưu lịch hẹn. Vui lòng liên hệ trực tiếp cửa hàng.</p>
          )}

          <div className="inline-block px-6 py-2 bg-[#b5f0c2] rounded-full font-semibold text-[#005c30] tracking-wide border border-[#8cb795]/30">
            Mã lịch hẹn: <span className="font-bold">{bookingCode.current}</span>
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
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#3b6447] mb-4 opacity-70">Dịch vụ đã đặt</h3>
              <p className="text-2xl font-headline font-bold text-[#0c361d] mb-1">{serviceName}</p>
            </div>
            <div className="text-3xl font-headline font-black text-[#006a38]">{price}</div>
          </div>

          {/* Appointment time */}
          <div className="bg-[#cafdd4] p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="absolute -right-6 -top-6 opacity-10">
              <span className="material-symbols-outlined text-9xl">calendar_today</span>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#3b6447] mb-4 opacity-70">Thời gian hẹn</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#006a38]">event</span>
                  <span className="font-semibold">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#006a38]">schedule</span>
                  <span className="font-semibold">Giờ {time}</span>
                </div>
              </div>
            </div>
            <p className="text-[#3b6447] text-sm font-medium">Vui lòng đến sớm 10 phút.</p>
          </div>

          {/* Pet & Owner */}
          <div className="bg-white p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#3b6447] mb-4 opacity-70">Thú cưng & Chủ nuôi</h3>
              <div className="flex flex-col gap-3">
                {petName && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#006a38]">pets</span>
                    <div>
                      <p className="font-bold text-[#0c361d]">{petName}</p>
                      {petBreed && <p className="text-xs text-[#3b6447]">{petBreed}</p>}
                    </div>
                  </div>
                )}
                {ownerName && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#006a38]">person</span>
                    <div>
                      <p className="font-semibold text-[#0c361d]">{ownerName}</p>
                      {ownerPhone && <p className="text-xs text-[#3b6447]">{ownerPhone}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {notes && (
              <div className="bg-[#f0fdf4] rounded-lg p-3 mt-2">
                <p className="text-xs text-[#3b6447] italic">"{notes}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/"
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

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#deffe2] flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-5xl text-[#006a38]">progress_activity</span>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

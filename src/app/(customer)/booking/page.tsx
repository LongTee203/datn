"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Pet {
  pet_id: number;
  name: string;
  type: string;
  breed: string | null;
  weight: number | null;
}

interface CustomerProfile {
  customer_id: number;
  full_name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  pets?: Pet[];
}

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

const STEP_LABELS = ["Chọn dịch vụ", "Xác nhận", "Hoàn tất"];

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Service info from URL
  const serviceId = searchParams.get("serviceId") || "";
  const serviceName = searchParams.get("serviceName") || "Dịch vụ chăm sóc thú cưng";
  const priceRaw = searchParams.get("price") || "0";
  const priceFormatted = Number(priceRaw).toLocaleString("vi-VN") + "đ";

  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showPetPicker, setShowPetPicker] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      if (!user?.id) { setLoading(false); return; }
      try {
        const res = await fetch(`/api/customers/${user.id}`);
        if (res.ok) {
          const data: CustomerProfile = await res.json();
          setCustomer(data);
          if (data.pets && data.pets.length > 0) {
            setSelectedPet(data.pets[0]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, [user]);

  async function handleConfirm() {
    setIsSubmitting(true);
    let receiptUrl = "";
    if (paymentMethod === "Bank" && receiptFile) {
      const fd = new FormData();
      fd.append("file", receiptFile);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        receiptUrl = data.url;
      }
    }

    const params = new URLSearchParams({
      serviceName,
      serviceId,
      price: priceRaw,
      date: selectedDate,
      time: selectedTime,
      petName: selectedPet?.name || "",
      petBreed: selectedPet?.breed || "",
      petId: String(selectedPet?.pet_id || ""),
      ownerName: customer?.full_name || "",
      ownerPhone: customer?.phone || "",
      customerId: String(customer?.customer_id || ""),
      notes,
      paymentMethod,
      receiptUrl,
    });
    router.push(`/booking/success?${params.toString()}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-32">
        <span className="material-symbols-outlined animate-spin text-5xl text-[#006a38]">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0c361d] flex flex-col items-center">
      <main className="w-full max-w-4xl px-4 pb-20 pt-32 flex flex-col items-center">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isDone = stepNum < 2;
            const isActive = stepNum === 2;
            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && <div className={`w-12 h-0.5 ${isDone || isActive ? "bg-[#87faab]" : "bg-gray-200"}`} />}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isActive ? "bg-[#006a38] text-white shadow-lg scale-110" :
                    isDone ? "bg-[#87faab] text-[#005f31]" :
                    "bg-gray-200 text-gray-500"
                  }`}>{stepNum}</div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider hidden sm:block ${isActive ? "text-[#006a38]" : "text-gray-400"}`}>{label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#0c361d] tracking-tight mb-3 font-headline">
            Xác nhận đặt lịch
          </h1>
          <p className="text-[#3b6447] text-lg">Vui lòng kiểm tra lại thông tin trước khi xác nhận</p>
        </div>

        {/* Bento grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Service + Notes */}
          <div className="md:col-span-7 space-y-6">
            {/* Service card — no dropdown, just display */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[#006a38] font-bold uppercase tracking-widest text-xs mb-2 block">Dịch vụ đã chọn</span>
                  <h2 className="text-2xl font-bold text-[#0c361d] leading-tight">{serviceName}</h2>
                  {serviceId && (
                    <Link href="/services" className="text-xs text-[#3b6447] underline mt-1 inline-block hover:text-[#006a38]">
                      Đổi dịch vụ khác
                    </Link>
                  )}
                </div>
                <div className="bg-[#87faab] text-[#005f31] px-4 py-2 rounded-full font-bold text-lg whitespace-nowrap">
                  {priceFormatted}
                </div>
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
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#006a38] uppercase tracking-wider">Thú cưng sử dụng dịch vụ</h3>
                  {customer?.pets && customer.pets.length > 1 && (
                    <button
                      onClick={() => setShowPetPicker(true)}
                      className="text-xs font-bold text-[#006a38] bg-[#cafdd4] px-3 py-1.5 rounded-full hover:bg-[#87faab] transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
                      Đổi thú cưng
                    </button>
                  )}
                </div>
                {selectedPet ? (
                  <div className="space-y-2 text-sm">
                    <p className="text-xl font-bold text-[#0c361d]">{selectedPet.name}</p>
                    <p className="text-[#3b6447]">{selectedPet.type}{selectedPet.breed ? ` — ${selectedPet.breed}` : ""}</p>
                    {selectedPet.weight && <p className="text-[#3b6447] text-xs">{String(selectedPet.weight)} kg</p>}
                  </div>
                ) : (
                  <p className="text-sm text-[#81b8a6] italic">Chưa có thú cưng. <Link href="/profile" className="underline text-[#006a38]">Thêm tại đây</Link></p>
                )}
              </div>
            </div>

            {/* Owner card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
              <h3 className="text-sm font-bold text-[#006a38] uppercase tracking-wider mb-4">Thông tin chủ nuôi</h3>
              {customer ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#cafdd4] flex items-center justify-center font-bold text-[#006a38] text-lg shrink-0">
                    {customer.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[#0c361d] font-bold text-lg">{customer.full_name}</p>
                    <p className="text-[#3b6447] text-sm">{customer.phone || "Chưa cập nhật SĐT"}</p>
                    <p className="text-[#3b6447] text-xs mt-1">{customer.email || ""}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#81b8a6] italic">Vui lòng <Link href="/login" className="underline text-[#006a38]">đăng nhập</Link> để tiếp tục.</p>
              )}
            </div>
          </div>

          {/* Payment Method - Full Width */}
          <div className="md:col-span-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
              <h3 className="text-sm font-bold text-[#006a38] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">payments</span>
                Phương thức thanh toán
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-colors hover:bg-gray-50 border-gray-100">
                  <input type="radio" name="payment" value="COD" checked={paymentMethod==="COD"} onChange={e=>setPaymentMethod(e.target.value)} className="w-5 h-5 accent-[#006a38]" />
                  <div className="flex-grow">
                    <p className="font-bold text-[#0c361d]">Thanh toán tại cửa hàng</p>
                    <p className="text-xs text-[#3b6447]">Thanh toán bằng tiền mặt/quẹt thẻ khi đến cửa hàng</p>
                  </div>
                  <span className="material-symbols-outlined text-[#006a38]">storefront</span>
                </label>
                <label className="flex flex-col border rounded-2xl cursor-pointer transition-colors border-gray-100">
                  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl" onClick={() => setPaymentMethod("Bank")}>
                    <input type="radio" name="payment" value="Bank" checked={paymentMethod==="Bank"} onChange={e=>setPaymentMethod(e.target.value)} className="w-5 h-5 accent-[#006a38]" />
                    <div className="flex-grow">
                      <p className="font-bold text-[#0c361d]">Chuyển khoản ngân hàng</p>
                      <p className="text-xs text-[#3b6447]">Chuyển khoản qua số tài khoản ngân hàng</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">account_balance</span>
                  </div>
                  {paymentMethod === "Bank" && (
                    <div className="pl-14 pr-4 pb-4">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-sm font-bold text-[#0c361d] mb-2">Thông tin chuyển khoản:</p>
                        <p className="text-sm text-[#3b6447]">Ngân hàng: <strong>Vietcombank</strong></p>
                        <p className="text-sm text-[#3b6447]">Số tài khoản: <strong>1903123456789</strong></p>
                        <p className="text-sm text-[#3b6447]">Chủ tài khoản: <strong>PET CARE SHOP</strong></p>
                        <p className="text-sm text-[#3b6447] mb-4">Nội dung: <strong>Thanh toan lich hen {customer?.full_name || ""}</strong></p>
                        
                        <label className="block text-sm font-bold text-[#0c361d] mb-2">Tải lên ảnh chuyển khoản (Bắt buộc)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                               setReceiptFile(file);
                               setReceiptPreview(URL.createObjectURL(file));
                            }
                          }}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#cafdd4] file:text-[#006a38] hover:file:bg-[#87faab] cursor-pointer"
                        />
                        {receiptPreview && (
                          <div className="mt-4 relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                             <img src={receiptPreview} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="w-full max-w-md mt-16 flex flex-col items-center gap-6">
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedPet || isSubmitting || (paymentMethod === "Bank" && !receiptFile)}
            className="w-full bg-[#006a38] hover:bg-[#005c30] text-white py-5 rounded-full font-bold text-lg transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Đang xử lý...
              </>
            ) : (
              <>
                Xác nhận & Thanh toán
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
          {(!selectedDate || !selectedPet || (paymentMethod === "Bank" && !receiptFile)) && (
            <p className="text-xs text-[#81b8a6] text-center">
              {!selectedPet ? "Vui lòng thêm thú cưng vào hồ sơ." : !selectedDate ? "Vui lòng chọn ngày hẹn." : "Vui lòng tải lên ảnh chuyển khoản."}
            </p>
          )}
          <Link href="/services" className="flex items-center gap-2 text-[#3b6447] hover:text-[#006a38] font-medium transition-colors">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Quay lại danh sách dịch vụ
          </Link>
        </div>
      </main>

      {/* Pet Picker Modal */}
      {showPetPicker && customer?.pets && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-lg text-[#0c361d] mb-4">Chọn thú cưng</h3>
            <div className="space-y-3">
              {customer.pets.map((pet) => (
                <button
                  key={pet.pet_id}
                  onClick={() => { setSelectedPet(pet); setShowPetPicker(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${selectedPet?.pet_id === pet.pet_id ? "border-[#006a38] bg-[#cafdd4]/50" : "border-gray-100 hover:border-[#87faab]"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#cafdd4] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006a38]">pets</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#0c361d]">{pet.name}</p>
                    <p className="text-xs text-[#3b6447]">{pet.type}{pet.breed ? ` — ${pet.breed}` : ""}</p>
                  </div>
                  {selectedPet?.pet_id === pet.pet_id && (
                    <span className="material-symbols-outlined text-[#006a38] ml-auto" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  )}
                </button>
              ))}
            </div>
            <button onClick={() => setShowPetPicker(false)} className="mt-6 w-full py-3 rounded-full border border-gray-200 text-[#3b6447] font-medium hover:bg-gray-50">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-5xl text-[#006a38]">progress_activity</span>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}

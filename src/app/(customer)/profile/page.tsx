"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const serviceHistory = [
  { icon: "content_cut", title: "Grooming Toàn diện cho Mochi", date: "14/10/2024 • Pet Spa Quận 1", price: "450.000đ", status: "Hoàn tất", statusColor: "text-emerald-600" },
  { icon: "shopping_bag", title: "Thức ăn hạt hữu cơ (Royal Canin)", date: "05/10/2024 • Đơn hàng #DS99231", price: "820.000đ", status: "Đã giao", statusColor: "text-emerald-600" },
  { icon: "medical_services", title: "Tiêm vaccine phòng dại cho Bắp", date: "18/09/2024 • Phòng khám Thú y", price: "250.000đ", status: "Hoàn tất", statusColor: "text-emerald-600" },
];

const pets = [
  {
    name: "Mochi", breed: "Mèo Anh Lông Ngắn", status: "Khỏe mạnh",
    statusStyle: "bg-[#87faab] text-[#005f31]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHMGCpXTvjLouucEhjPx4T7xPlDgkwUdvR9vbyj3IGgWjUXYcStz2w_RR_pvGkN2IYpz-1aYJ4QNdglVVu_biS_UH2mSEZcKLJc-9xUcC8UtzsYfN-IZ9uvGVz58Cfu-Mh3YZ_Fp0A9395pA2P4DiGo1T73jseGCRfX5-Y-pFGTDU0eDFawXn3-Ij6OpLFRuJR5HdVRvhZLjXsaThqbwabThQTAHlUCmnXSf25fI0uB0IimOsXdwe2wG-nUT3JDh3AySKBWPbOha7m",
  },
  {
    name: "Bắp", breed: "Poodle", status: "Lịch tiêm nhắc",
    statusStyle: "bg-orange-100 text-orange-700",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-VNrp7G4vJyrJhWFcUAan-qTLibDumFQ0aRD7WT6FQvaB7jmz6Gyg9MDNo-rgGFSmH5c32Q3DLO0LH4ihXOsEZlTYWT-9fehhz_QhGUBisOf_QEh901qozZ7jJNVsH9ukMsFgsO3DRq1e3Zo0cjLkX94WdNMk8N4Zzg-HJLWdsG61XxJC62W-La7wjOHqarRboTx3Uaj2oAf9fL09OnDSqDIpD0SRpyCe8AwNsMUFbLTofWWyX91K5877OCSDsNsu9yCi0WR5uNTC",
  },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const displayName = user?.name ?? "Nguyễn Minh Quân";
  const displayEmail = user?.email ?? "quan.nguyen@example.com";
  const avatarLetter = user?.avatar ?? "N";

  return (
    <div className="bg-white text-[#00362a] min-h-screen">
      <main className="max-w-7xl mx-auto px-6 pb-6 md:px-12 md:pb-12 space-y-12 pt-32 md:pt-40">

        {/* ── Hero Bento: Personal Info + Spending Card ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: User info card */}
          <div className="md:col-span-2 bg-[#bffee8] rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
            {/* Avatar */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-xl border-4 border-white flex items-center justify-center text-5xl font-black text-white"
                style={{ backgroundColor: "#2D6A4F" }}
              >
                {avatarLetter}
              </div>
            </div>

            <div className="flex-1 space-y-4 z-10 text-center md:text-left">
              <div>
                <h1 className="text-4xl font-extrabold text-[#00362a] tracking-tight font-headline">
                  {displayName}
                </h1>
                <p className="text-emerald-700/70 font-medium">Hạng thành viên: Gold Leaf 🌿</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: "mail", text: displayEmail },
                  { icon: "call", text: "090 123 4567" },
                  { icon: "location_on", text: "24 Lê Lợi, Quận 1, TP. HCM", wide: true },
                ].map(({ icon, text, wide }) => (
                  <div key={icon} className={`flex items-center gap-3 text-[#2D6A4F] ${wide ? "sm:col-span-2" : ""}`}>
                    <span className="material-symbols-outlined text-[#2D6A4F]">{icon}</span>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <span className="material-symbols-outlined text-[12rem]">eco</span>
            </div>
          </div>

          {/* Right: Spending card */}
          <div className="bg-[#2D6A4F] text-white rounded-2xl p-8 flex flex-col justify-between shadow-lg">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest opacity-80">Số tiền đã chi tiêu</p>
              <h2 className="text-5xl font-black">2,450,000đ</h2>
              <p className="text-sm opacity-70 mt-2">+450.000đ tháng này</p>
            </div>
            <button className="bg-white text-[#2D6A4F] rounded-full py-3 font-bold hover:bg-emerald-50 transition-colors mt-6">
              Các mức hạng thành viên →
            </button>
          </div>
        </section>

        {/* ── Pets Section ── */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-[#00362a] font-headline">Thú cưng của tôi</h2>
            <a href="#" className="text-[#2D6A4F] font-bold hover:underline">Xem tất cả</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div key={pet.name} className="group relative bg-white rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 border border-emerald-50">
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src={pet.img}
                    alt={pet.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-lg text-[#00362a]">{pet.name}</h4>
                    <p className="text-sm text-[#3b6447]">{pet.breed}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${pet.statusStyle}`}>
                    {pet.status}
                  </span>
                </div>
              </div>
            ))}

            {/* Add pet card */}
            <div className="border-2 border-dashed border-[#81b8a6] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-emerald-50/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#bffee8] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2D6A4F]">add</span>
              </div>
              <p className="font-medium text-[#3b6447]">Thêm thú cưng mới</p>
            </div>
          </div>
        </section>

        {/* ── History + Settings ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          {/* Service History */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#00362a] font-headline">Lịch sử dịch vụ & Đơn hàng</h2>
            <div className="space-y-4">
              {serviceHistory.map((item) => (
                <div key={item.title} className="flex items-center bg-white p-5 rounded-2xl border border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                  <div className="w-16 h-16 bg-[#bffee8] rounded-xl flex items-center justify-center text-[#2D6A4F] flex-shrink-0">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <div className="ml-6 flex-1">
                    <h5 className="font-bold text-[#00362a]">{item.title}</h5>
                    <p className="text-sm text-[#3b6447]">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#2D6A4F]">{item.price}</p>
                    <span className={`text-[10px] font-bold uppercase ${item.statusColor}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-2xl border-2 border-[#2D6A4F]/20 text-[#2D6A4F] font-bold hover:bg-[#2D6A4F] hover:text-white transition-all">
              Xem tất cả lịch sử
            </button>
          </div>

          {/* Account Settings */}
          <div className="lg:col-span-4 bg-[#bffee8] rounded-2xl p-8 space-y-8 h-fit">
            <h2 className="text-xl font-bold text-[#00362a] font-headline">Cài đặt tài khoản</h2>
            <div className="space-y-6">
              {[
                { icon: "lock", label: "Đổi mật khẩu", sub: "Cập nhật mật khẩu bảo mật" },
                { icon: "notifications_active", label: "Thông báo", sub: "Ưu đãi, lịch hẹn & cập nhật" },
                { icon: "edit", label: "Chỉnh sửa hồ sơ", sub: "Tên, ảnh đại diện, địa chỉ" },
              ].map(({ icon, label, sub }) => (
                <div key={icon} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#3b6447] group-hover:text-[#2D6A4F] transition-colors">{icon}</span>
                    <div>
                      <p className="font-bold text-sm text-[#00362a]">{label}</p>
                      <p className="text-xs text-[#3b6447]">{sub}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#3b6447] text-sm">chevron_right</span>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-emerald-200">
              <button
                onClick={logout}
                className="text-red-500 font-bold text-sm flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <span className="material-symbols-outlined">logout</span>
                Đăng xuất khỏi tài khoản
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

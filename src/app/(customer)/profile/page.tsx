"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const serviceHistory = [
  { icon: "content_cut", title: "Grooming Toàn diện cho Mochi", date: "14/10/2024 • Pet Spa Quận 1", price: "450.000đ", status: "Hoàn tất", statusColor: "text-emerald-600" },
  { icon: "shopping_bag", title: "Thức ăn hạt hữu cơ (Royal Canin)", date: "05/10/2024 • Đơn hàng #DS99231", price: "820.000đ", status: "Đã giao", statusColor: "text-emerald-600" },
  { icon: "medical_services", title: "Tiêm vaccine phòng dại cho Bắp", date: "18/09/2024 • Phòng khám Thú y", price: "250.000đ", status: "Hoàn tất", statusColor: "text-emerald-600" },
  { icon: "night_shelter", title: "Hotel lưu chuồng 2 ngày cho Mochi", date: "01/09/2024 • Pet Hotel", price: "300.000đ", status: "Hoàn tất", statusColor: "text-emerald-600" },
  { icon: "shopping_bag", title: "Pate Whiskas Vị Cá Ngừ x12", date: "20/08/2024 • Đơn hàng #DS88102", price: "180.000đ", status: "Đã giao", statusColor: "text-emerald-600" },
  { icon: "content_cut", title: "Cắt tỉa lông cơ bản cho Bắp", date: "10/08/2024 • Pet Spa Quận 1", price: "200.000đ", status: "Hoàn tất", statusColor: "text-emerald-600" },
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

  const [showTierModal, setShowTierModal] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const handleChangePassword = () => {
    setShowPasswordModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const displayName = user?.name ?? "Nguyễn Minh Quân";
  const displayEmail = user?.email ?? "quan.nguyen@example.com";
  const avatarLetter = user?.avatar ?? "N";

  return (
    <div className="bg-white text-[#00362a] min-h-screen relative">
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
                <p className="text-emerald-700/70 font-medium">Hạng thành viên: Thân thiết 🌿</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: "mail", text: displayEmail },
                  { icon: "call", text: "090 123 4567" },
                  { icon: "location_on", text: "25 Cổ Nhuế, Từ Liêm, Hà Nội", wide: true },
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
            <button
              onClick={() => setShowTierModal(true)}
              className="bg-white text-[#2D6A4F] rounded-full py-3 font-bold hover:bg-emerald-50 transition-colors mt-6"
            >
              Các mức hạng thành viên →
            </button>
          </div>
        </section>

        {/* ── Pets Section ── */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-[#00362a] font-headline">Thú cưng của tôi</h2>
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
            <div
              onClick={() => setShowAddPetModal(true)}
              className="border-2 border-dashed border-[#81b8a6] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-emerald-50/50 transition-colors cursor-pointer"
            >
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
              {(showAllHistory ? serviceHistory : serviceHistory.slice(0, 3)).map((item) => (
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
            {!showAllHistory && (
              <button
                onClick={() => setShowAllHistory(true)}
                className="w-full py-4 rounded-2xl border-2 border-[#2D6A4F]/20 text-[#2D6A4F] font-bold hover:bg-[#2D6A4F] hover:text-white transition-all"
              >
                Xem tất cả lịch sử
              </button>
            )}
          </div>

          {/* Account Settings */}
          <div className="lg:col-span-4 bg-[#bffee8] rounded-2xl p-8 space-y-8 h-fit">
            <h2 className="text-xl font-bold text-[#00362a] font-headline">Cài đặt tài khoản</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => setShowPasswordModal(true)}>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#3b6447] group-hover:text-[#2D6A4F] transition-colors">lock</span>
                  <div>
                    <p className="font-bold text-sm text-[#00362a]">Đổi mật khẩu</p>
                    <p className="text-xs text-[#3b6447]">Cập nhật mật khẩu bảo mật</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#3b6447] text-sm">chevron_right</span>
              </div>

              <div className="flex items-center justify-between group cursor-pointer" onClick={() => setShowProfileModal(true)}>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#3b6447] group-hover:text-[#2D6A4F] transition-colors">edit</span>
                  <div>
                    <p className="font-bold text-sm text-[#00362a]">Chỉnh sửa hồ sơ</p>
                    <p className="text-xs text-[#3b6447]">Tên, ảnh đại diện, địa chỉ</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#3b6447] text-sm">chevron_right</span>
              </div>
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

      {/* --- Modals --- */}

      {/* Tier Modal */}
      {showTierModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setShowTierModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-bold text-[#00362a] font-headline mb-6">Các mức hạng thành viên</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-500">person</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700">Mới (New)</h4>
                  <p className="text-xs text-gray-500">Khách hàng mới đăng ký tài khoản</p>
                </div>
              </div>
              <div className="p-4 bg-[#f0fdf4] border border-[#bffee8] rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#bffee8] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#2D6A4F]">favorite</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#2D6A4F]">Thân thiết (Loyal)</h4>
                  <p className="text-xs text-[#3b6447]">Chi tiêu trên 1.000.000đ - Giảm 5% dịch vụ</p>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-center gap-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center shrink-0 relative z-10">
                  <span className="material-symbols-outlined text-yellow-700">stars</span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-yellow-700">VIP</h4>
                  <p className="text-xs text-yellow-600">Chi tiêu trên 5.000.000đ - Giảm 10% toàn bộ</p>
                </div>
                <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl text-yellow-100 rotate-12 z-0">stars</span>
              </div>
            </div>
            <button onClick={() => setShowTierModal(false)} className="w-full mt-8 py-3 rounded-xl bg-[#2D6A4F] text-white font-bold hover:opacity-90">
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Add Pet Modal */}
      {showAddPetModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowAddPetModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-bold text-[#00362a] font-headline mb-6">Thêm thú cưng mới</h3>
            <form className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-[#f0fdf4] border-2 border-dashed border-[#81b8a6] flex items-center justify-center text-[#2D6A4F] mb-2 relative cursor-pointer hover:bg-[#bffee8]/50 transition-colors">
                  <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                </div>
                <p className="text-sm font-medium text-[#3b6447]">Tải ảnh thú cưng lên</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Tên thú cưng</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" placeholder="VD: Bắp, Mochi..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Giống loài</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" placeholder="VD: Chó Poodle, Mèo Anh Lông Ngắn..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Cân nặng (kg)</label>
                <input type="number" step="0.1" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" placeholder="VD: 4.5" />
              </div>
              <button type="button" onClick={() => setShowAddPetModal(false)} className="w-full mt-4 py-4 rounded-xl bg-[#2D6A4F] text-white font-bold hover:opacity-90 shadow-lg shadow-emerald-200">
                Thêm thú cưng
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPasswordModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-bold text-[#00362a] font-headline mb-6">Đổi mật khẩu</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Mật khẩu hiện tại</label>
                <input type="password" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" placeholder="Nhập mật khẩu hiện tại" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Mật khẩu mới</label>
                <input type="password" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" placeholder="Nhập mật khẩu mới" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Xác nhận mật khẩu mới</label>
                <input type="password" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" placeholder="Nhập lại mật khẩu mới" />
              </div>
              <button type="button" onClick={handleChangePassword} className="w-full mt-4 py-4 rounded-xl bg-[#2D6A4F] text-white font-bold hover:opacity-90 shadow-lg shadow-emerald-200">
                Cập nhật mật khẩu
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowProfileModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-bold text-[#00362a] font-headline mb-6">Chỉnh sửa hồ sơ</h3>
            <form className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-3xl font-bold mb-3 relative group cursor-pointer">
                  {avatarLetter}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-[#2D6A4F] cursor-pointer hover:underline">Thay đổi ảnh đại diện</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Họ và tên</label>
                <input type="text" defaultValue={displayName} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Số điện thoại</label>
                <input type="tel" defaultValue="090 123 4567" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Địa chỉ</label>
                <input type="text" defaultValue="24 Lê Lợi, Quận 1, TP. HCM" className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Email (nếu có)</label>
                <input type="email" defaultValue={displayEmail} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <button type="button" onClick={() => setShowProfileModal(false)} className="w-full mt-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-bold hover:opacity-90 shadow-lg shadow-emerald-200">
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#2D6A4F] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-[bounce_0.5s_ease-out]">
          <span className="material-symbols-outlined">check_circle</span>
          <p className="font-bold">Đổi mật khẩu thành công!</p>
        </div>
      )}

    </div>
  );
}

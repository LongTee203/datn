"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

interface Pet {
  pet_id: number;
  name: string;
  type: string;
  breed: string | null;
  weight: number | null;
  age: number | null;
  note?: string | null;
}

interface CustomerProfile {
  customer_id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  pets?: Pet[];
}

interface HistoryItem {
  id: string;
  icon: string;
  title: string;
  date: string;
  price: number;
  status: string;
  statusColor: string;
  petNameRaw?: string | null;
  serviceName?: string;
  description?: string;
  category?: string;
  time?: string;
  realDate?: string;
}

const PET_TYPE_MAP: Record<string, string> = { Dog: "Chó", Cat: "Mèo", Bird: "Chim", Rabbit: "Thỏ", Other: "Khác" };

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [showTierModal, setShowTierModal] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [serviceHistory, setServiceHistory] = useState<HistoryItem[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<HistoryItem[]>([]);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllPurchases, setShowAllPurchases] = useState(false);
  
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Edit profile form
  const [editForm, setEditForm] = useState({ full_name: "", phone: "", email: "", address: "" });
  // Add pet form
  const [petForm, setPetForm] = useState({ name: "", type: "Dog", breed: "", age: "", weight: "", gender: "", color: "", note: "", isVaccinated: false });
  const [saving, setSaving] = useState(false);
  // Edit pet
  const [showEditPetModal, setShowEditPetModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [editPetForm, setEditPetForm] = useState({ name: "", type: "Dog", breed: "", age: "", weight: "", isVaccinated: false });
  const [editSaving, setEditSaving] = useState(false);
  // Delete pet
  const [showDeletePetModal, setShowDeletePetModal] = useState(false);
  const [deletingPet, setDeletingPet] = useState<Pet | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // Avatar upload
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Upload avatar immediately when user selects a file
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    // Show local preview instantly
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setAvatarUploading(true);

    try {
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await fetch(`/api/customers/${user.id}/avatar`, {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        const data = await res.json();
        // Update customer state so the hero card reflects the new avatar
        setCustomer(prev => prev ? { ...prev, avatar: data.avatar } : prev);
        setToastMessage("Ảnh đại diện đã được cập nhật!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        const err = await res.json();
        alert(err.error || "Upload thất bại");
        setAvatarPreview(null); // revert preview
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi tải ảnh lên");
      setAvatarPreview(null);
    } finally {
      setAvatarUploading(false);
    }
  };

  const loadCustomer = useCallback(async () => {
    if (!user?.id) return;
    try {
      const [res, historyRes] = await Promise.all([
        fetch(`/api/customers/${user.id}`),
        fetch(`/api/customers/${user.id}/history`)
      ]);

      if (res.ok) {
        const data = await res.json();
        setCustomer(data);
        setEditForm({
          full_name: data.full_name || "",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || ""
        });
      }

      if (historyRes.ok) {
        const { serviceHistory, purchaseHistory } = await historyRes.json();
        setServiceHistory(serviceHistory || []);
        setPurchaseHistory(purchaseHistory || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  useEffect(() => {
    window.addEventListener("booking-updated", loadCustomer);
    window.addEventListener("pet-updated", loadCustomer);
    return () => {
      window.removeEventListener("booking-updated", loadCustomer);
      window.removeEventListener("pet-updated", loadCustomer);
    };
  }, [loadCustomer]);

  const handleChangePassword = () => {
    setShowPasswordModal(false);
    setToastMessage("Đổi mật khẩu thành công!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/customers/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setCustomer(prev => prev ? { ...prev, ...updated.customer } : prev);
        setShowProfileModal(false);
        setToastMessage("Cập nhật hồ sơ thành công!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        alert("Có lỗi xảy ra khi cập nhật!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center pt-32">
        <span className="material-symbols-outlined animate-spin text-5xl text-[#006b62]">progress_activity</span>
      </div>
    );
  }

  const displayName = customer?.full_name || user.name || "Khách hàng";
  const displayEmail = customer?.email || user.email || "Chưa cập nhật";
  const displayPhone = customer?.phone || "Chưa cập nhật";
  const displayAddress = customer?.address || "Chưa cập nhật";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const realPets = customer?.pets || [];
  const categories = Array.from(new Set(serviceHistory.map(s => s.category).filter(Boolean))) as string[];

  const filteredServices = serviceHistory.filter(item => {
    if (selectedPet && item.petNameRaw !== selectedPet) return false;
    if (selectedCategory && selectedCategory !== "All" && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="bg-white text-[#00362a] min-h-screen relative">
      <main className="max-w-7xl mx-auto px-6 pb-6 md:px-12 md:pb-12 space-y-12 pt-32 md:pt-40">

        {/* ── Hero Bento: Personal Info + Spending Card ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: User info card */}
          <div className="md:col-span-2 bg-[#bffee8] rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
            {/* Avatar */}
            <div className="relative z-10 flex-shrink-0">
              {customer?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={customer.avatar}
                  alt={displayName}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-xl border-4 border-white object-cover"
                />
              ) : (
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-xl border-4 border-white flex items-center justify-center text-5xl font-black text-white"
                  style={{ backgroundColor: "#2D6A4F" }}
                >
                  {avatarLetter}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4 z-10 text-center md:text-left">
              <div>
                <h1 className="text-4xl font-extrabold text-[#00362a] tracking-tight font-headline">
                  {displayName}
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: "mail", text: displayEmail },
                  { icon: "call", text: displayPhone },
                  { icon: "location_on", text: displayAddress, wide: true },
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

          {/* Right: Account Settings */}
          <div className="bg-[#2D6A4F] text-white rounded-2xl p-8 flex flex-col justify-between shadow-lg">
            <h2 className="text-lg font-bold uppercase tracking-widest opacity-80 mb-6">Cài đặt tài khoản</h2>
            <div className="space-y-4 flex-1">
              <button onClick={() => setShowProfileModal(true)} className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left">
                <span className="material-symbols-outlined">edit</span>
                <div>
                  <p className="font-bold text-sm">Chỉnh sửa hồ sơ</p>
                  <p className="text-xs opacity-70">Tên, địa chỉ, số điện thoại</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-sm opacity-60">chevron_right</span>
              </button>
              <button onClick={() => setShowPasswordModal(true)} className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left">
                <span className="material-symbols-outlined">lock</span>
                <div>
                  <p className="font-bold text-sm">Đổi mật khẩu</p>
                  <p className="text-xs opacity-70">Cập nhật bảo mật tài khoản</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-sm opacity-60">chevron_right</span>
              </button>
            </div>
            <button onClick={logout} className="mt-6 flex items-center gap-2 text-red-300 hover:text-red-100 font-bold text-sm transition-colors">
              <span className="material-symbols-outlined">logout</span>
              Đăng xuất
            </button>
          </div>
        </section>

        {/* ── Pets Section ── */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-[#00362a] font-headline">Thú cưng của tôi</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {realPets.map((pet: Pet) => (
              <div 
                key={pet.pet_id} 
                onClick={() => setSelectedPet(selectedPet === pet.name ? null : pet.name)}
                className={`bg-[#f0fdf4] rounded-2xl p-5 border cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col gap-3 relative group ${selectedPet === pet.name ? "border-[#006b62] ring-2 ring-[#006b62]/20" : "border-emerald-100"}`}
              >
                {/* Action buttons – top right corner */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={e => { e.stopPropagation(); setEditingPet(pet); setEditPetForm({ name: pet.name, type: pet.type, breed: pet.breed || "", age: pet.age != null ? String(pet.age) : "", weight: pet.weight != null ? String(pet.weight) : "", isVaccinated: !!pet.note?.includes("Đã tiêm phòng dại") }); setShowEditPetModal(true); }}
                    className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-[#006b62] hover:bg-[#e0fdf4] transition-colors"
                    title="Chỉnh sửa"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setDeletingPet(pet); setShowDeletePetModal(true); }}
                    className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                    title="Xóa"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#bffee8] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#2D6A4F] text-2xl">pets</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#00362a] leading-tight">{pet.name}</h4>
                    <p className="text-xs text-[#3b6447]">{PET_TYPE_MAP[pet.type] || pet.type}{pet.breed ? ` — ${pet.breed}` : ""}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#3b6447]">
                  {pet.age != null && (
                    <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">cake</span>{pet.age} tuổi</div>
                  )}
                  {pet.weight != null && (
                    <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">monitor_weight</span>{String(pet.weight)} kg</div>
                  )}
                </div>
                {pet.note?.includes("Đã tiêm phòng dại") && (
                  <div className="mt-1 pt-2 border-t border-emerald-100 flex items-center gap-1 text-xs text-[#006b62] font-bold">
                    <span className="material-symbols-outlined text-[16px]">verified</span> Đã tiêm phòng dại
                  </div>
                )}
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

        {/* ── History ── */}
        <section className="flex flex-col gap-12 pt-8">
          {/* Service History */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-[#00362a] font-headline">
                Lịch sử dịch vụ {selectedPet && <span className="text-[#006b62]">của {selectedPet}</span>}
              </h2>
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedCategory("All")}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${selectedCategory === "All" || !selectedCategory ? "bg-[#006b62] text-white" : "bg-[#f0fdf4] text-[#3b6447] hover:bg-[#bffee8]"}`}
                  >
                    Tất cả
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${selectedCategory === cat ? "bg-[#006b62] text-white" : "bg-[#f0fdf4] text-[#3b6447] hover:bg-[#bffee8]"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {filteredServices.length === 0 ? (
              <p className="text-[#3b6447]">Không tìm thấy dịch vụ nào phù hợp.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {(showAllServices ? filteredServices : filteredServices.slice(0, 3)).map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between bg-white p-5 rounded-2xl border border-emerald-50 hover:bg-emerald-50/30 transition-colors shadow-sm gap-4">
                      {/* Left: Icon & Info */}
                      <div className="flex items-start md:items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-[#bffee8] rounded-xl flex items-center justify-center text-[#2D6A4F] flex-shrink-0">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-[#00362a] text-lg">{item.serviceName}</h5>
                            <span className="px-2 py-0.5 bg-[#f0fdf4] text-[#2D6A4F] text-[10px] font-bold rounded uppercase tracking-wider">{item.category}</span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-[#3b6447] line-clamp-1 mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Middle: Date/Time */}
                      <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:gap-1 shrink-0 min-w-[150px]">
                        <div className="flex items-center gap-4 text-sm text-[#56615f]">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            <span>{item.realDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Status */}
                      <div className="text-right shrink-0 min-w-[120px] flex flex-col items-end">
                        <p className="font-bold text-xl text-[#006b62]">{item.price.toLocaleString("vi-VN")}đ</p>
                        <span className={`text-[11px] font-bold uppercase ${item.statusColor} bg-emerald-50 px-2 py-1 rounded-md mt-1`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {!showAllServices && filteredServices.length > 3 && (
                  <button
                    onClick={() => setShowAllServices(true)}
                    className="w-full py-4 rounded-2xl border-2 border-[#2D6A4F]/20 text-[#2D6A4F] font-bold hover:bg-[#2D6A4F] hover:text-white transition-all"
                  >
                    Xem tất cả dịch vụ
                  </button>
                )}
              </>
            )}
          </div>

          {/* Purchase History */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#00362a] font-headline">Lịch sử mua hàng</h2>
            {purchaseHistory.length === 0 ? (
              <p className="text-[#3b6447]">Bạn chưa mua sản phẩm nào.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {(showAllPurchases ? purchaseHistory : purchaseHistory.slice(0, 3)).map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between bg-white p-5 rounded-2xl border border-emerald-50 hover:bg-emerald-50/30 transition-colors shadow-sm gap-4">
                      {/* Left: Icon & Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-[#bffee8] rounded-xl flex items-center justify-center text-[#2D6A4F] flex-shrink-0">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="font-bold text-[#00362a] text-lg line-clamp-1">{item.title}</h5>
                        </div>
                      </div>

                      {/* Middle: Date */}
                      <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:gap-1 shrink-0 min-w-[150px]">
                        <div className="flex items-center gap-4 text-sm text-[#56615f]">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Status */}
                      <div className="text-right shrink-0 min-w-[120px] flex flex-col items-end">
                        <p className="font-bold text-xl text-[#006b62]">{item.price.toLocaleString("vi-VN")}đ</p>
                        <span className={`text-[11px] font-bold uppercase ${item.statusColor} bg-emerald-50 px-2 py-1 rounded-md mt-1`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {!showAllPurchases && purchaseHistory.length > 3 && (
                  <button
                    onClick={() => setShowAllPurchases(true)}
                    className="w-full py-4 rounded-2xl border-2 border-[#2D6A4F]/20 text-[#2D6A4F] font-bold hover:bg-[#2D6A4F] hover:text-white transition-all"
                  >
                    Xem tất cả đơn hàng
                  </button>
                )}
              </>
            )}
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
          <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddPetModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-bold text-[#00362a] font-headline mb-6">Thêm thú cưng mới</h3>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              if (!user?.id) return;
              setSaving(true);
              try {
                const res = await fetch("/api/pets", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    customer_id: user.id,
                    name: petForm.name,
                    type: petForm.type,
                    breed: petForm.breed || null,
                    age: petForm.age ? parseInt(petForm.age) : null,
                    weight: petForm.weight ? parseFloat(petForm.weight) : null,
                    note: petForm.isVaccinated ? "Đã tiêm phòng dại" : null,
                  })
                });
                if (res.ok) {
                  const newPet = (await res.json()).pet;
                  setCustomer(prev => prev ? { ...prev, pets: [...(prev.pets || []), newPet] } : prev);
                  setShowAddPetModal(false);
                  setPetForm({ name: "", type: "Dog", breed: "", age: "", weight: "", gender: "", color: "", note: "", isVaccinated: false });
                  setToastMessage("Thêm thú cưng thành công!");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }
              } catch (err) {
                console.error(err);
              } finally {
                setSaving(false);
              }
            }}>
              {/* Tên */}
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Tên thú cưng *</label>
                <input required type="text" value={petForm.name} onChange={e => setPetForm({ ...petForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: Bắp, Mochi..." />
              </div>
              {/* Loài */}
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Loài *</label>
                <select required value={petForm.type} onChange={e => setPetForm({ ...petForm, type: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]">
                  <option value="Dog">Chó</option>
                  <option value="Cat">Mèo</option>
                  <option value="Bird">Chim</option>
                  <option value="Rabbit">Thỏ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              {/* Giống */}
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Giống loài</label>
                <input type="text" value={petForm.breed} onChange={e => setPetForm({ ...petForm, breed: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: Poodle, Anh Lông Ngắn..." />
              </div>
              {/* Tuổi + Cân nặng */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3b6447] mb-1">Tuổi (năm)</label>
                  <input type="number" min="0" max="30" value={petForm.age} onChange={e => setPetForm({ ...petForm, age: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: 2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3b6447] mb-1">Cân nặng (kg)</label>
                  <input type="number" min="0" step="0.1" value={petForm.weight} onChange={e => setPetForm({ ...petForm, weight: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: 4.5" />
                </div>
              </div>
              {/* Vaccine */}
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="isVaccinated" 
                  checked={petForm.isVaccinated} 
                  onChange={e => setPetForm({ ...petForm, isVaccinated: e.target.checked })}
                  className="w-5 h-5 text-[#006b62] bg-[#f0fdf4] border-gray-300 rounded focus:ring-[#006b62]"
                />
                <label htmlFor="isVaccinated" className="text-sm font-bold text-[#00362a] cursor-pointer">
                  Đã tiêm phòng dại
                </label>
              </div>
              <button type="submit" disabled={saving} className="w-full mt-4 py-4 rounded-xl bg-[#2D6A4F] text-white font-bold hover:opacity-90 shadow-lg shadow-emerald-200 disabled:opacity-50">
                {saving ? "Đang xử lý..." : "Thêm thú cưng"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Pet Modal */}
      {showEditPetModal && editingPet && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowEditPetModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#bffee8] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2D6A4F]">edit</span>
              </div>
              <h3 className="text-2xl font-bold text-[#00362a] font-headline">Chỉnh sửa thú cưng</h3>
            </div>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              if (!editingPet) return;
              setEditSaving(true);
              try {
                const res = await fetch(`/api/pets/${editingPet.pet_id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: editPetForm.name,
                    type: editPetForm.type,
                    breed: editPetForm.breed || null,
                    age: editPetForm.age ? parseInt(editPetForm.age) : null,
                    weight: editPetForm.weight ? parseFloat(editPetForm.weight) : null,
                    note: editPetForm.isVaccinated ? "Đã tiêm phòng dại" : null,
                  })
                });
                if (res.ok) {
                  const updated = (await res.json()).pet;
                  setCustomer(prev => prev ? {
                    ...prev,
                    pets: (prev.pets || []).map(p => p.pet_id === editingPet.pet_id ? updated : p)
                  } : prev);
                  setShowEditPetModal(false);
                  setEditingPet(null);
                  setToastMessage("Cập nhật thú cưng thành công!");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }
              } catch (err) {
                console.error(err);
              } finally {
                setEditSaving(false);
              }
            }}>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Tên thú cưng *</label>
                <input required type="text" value={editPetForm.name} onChange={e => setEditPetForm({ ...editPetForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: Bắp, Mochi..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Loài *</label>
                <select required value={editPetForm.type} onChange={e => setEditPetForm({ ...editPetForm, type: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]">
                  <option value="Dog">Chó</option>
                  <option value="Cat">Mèo</option>
                  <option value="Bird">Chim</option>
                  <option value="Rabbit">Thỏ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Giống loài</label>
                <input type="text" value={editPetForm.breed} onChange={e => setEditPetForm({ ...editPetForm, breed: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: Poodle, Anh Lông Ngắn..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3b6447] mb-1">Tuổi (năm)</label>
                  <input type="number" min="0" max="30" value={editPetForm.age} onChange={e => setEditPetForm({ ...editPetForm, age: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: 2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3b6447] mb-1">Cân nặng (kg)</label>
                  <input type="number" min="0" step="0.1" value={editPetForm.weight} onChange={e => setEditPetForm({ ...editPetForm, weight: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] outline-none text-[#00362a]" placeholder="VD: 4.5" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="editIsVaccinated"
                  checked={editPetForm.isVaccinated}
                  onChange={e => setEditPetForm({ ...editPetForm, isVaccinated: e.target.checked })}
                  className="w-5 h-5 text-[#006b62] bg-[#f0fdf4] border-gray-300 rounded focus:ring-[#006b62]"
                />
                <label htmlFor="editIsVaccinated" className="text-sm font-bold text-[#00362a] cursor-pointer">
                  Đã tiêm phòng dại
                </label>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setShowEditPetModal(false)} className="flex-1 py-3 rounded-xl bg-[#f0fdf4] text-[#3b6447] font-bold hover:bg-emerald-100 transition-colors">
                  Hủy
                </button>
                <button type="submit" disabled={editSaving} className="flex-1 py-3 rounded-xl bg-[#2D6A4F] text-white font-bold hover:opacity-90 shadow-lg shadow-emerald-200 disabled:opacity-50">
                  {editSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Pet Confirmation Modal */}
      {showDeletePetModal && deletingPet && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-red-500 text-3xl">delete</span>
            </div>
            <h3 className="text-xl font-bold text-[#00362a] mb-2">Xóa thú cưng?</h3>
            <p className="text-sm text-[#56615f] mb-6">
              Bạn có chắc muốn xóa <strong className="text-[#00362a]">{deletingPet.name}</strong> không? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeletePetModal(false); setDeletingPet(null); }}
                className="flex-1 py-3 rounded-xl bg-[#f0fdf4] text-[#3b6447] font-bold hover:bg-emerald-100 transition-colors"
              >
                Hủy
              </button>
              <button
                disabled={deleteLoading}
                onClick={async () => {
                  if (!deletingPet) return;
                  setDeleteLoading(true);
                  try {
                    const res = await fetch(`/api/pets/${deletingPet.pet_id}`, { method: "DELETE" });
                    if (res.ok) {
                      setCustomer(prev => prev ? {
                        ...prev,
                        pets: (prev.pets || []).filter(p => p.pet_id !== deletingPet.pet_id)
                      } : prev);
                      setShowDeletePetModal(false);
                      setDeletingPet(null);
                      setToastMessage("Đã xóa thú cưng thành công!");
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setDeleteLoading(false);
                  }
                }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleteLoading ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
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
            <form className="space-y-4" onSubmit={handleUpdateProfile}>
              <div className="flex flex-col items-center mb-6">
                <label htmlFor="avatar-upload" className="cursor-pointer group">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#bffee8] shadow-md">
                    {avatarPreview || customer?.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarPreview ?? customer?.avatar ?? ""}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#2D6A4F] flex items-center justify-center text-white text-3xl font-bold">
                        {avatarLetter}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <p className="text-xs font-medium text-[#2D6A4F] mt-2">
                  {avatarUploading
                    ? "Đang tải ảnh lên..."
                    : avatarPreview
                      ? "✓ Ảnh đã được cập nhật"
                      : "Nhấn vào ảnh để thay đổi"}
                </p>
                {avatarUploading && (
                  <span className="material-symbols-outlined animate-spin text-[#3b6447] text-sm mt-1">progress_activity</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Họ và tên</label>
                <input type="text" value={editForm.full_name} onChange={e => setEditForm({ ...editForm, full_name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Số điện thoại</label>
                <input type="tel" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Địa chỉ</label>
                <input type="text" value={editForm.address} onChange={e => setEditForm({ ...editForm, address: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3b6447] mb-1">Email (nếu có)</label>
                <input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#f0fdf4] border border-transparent focus:border-[#bffee8] focus:ring-0 outline-none text-[#00362a]" />
              </div>
              <button type="submit" disabled={saving} className="w-full mt-6 py-4 rounded-xl bg-[#2D6A4F] text-white font-bold hover:opacity-90 shadow-lg shadow-emerald-200 disabled:opacity-50">
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#2D6A4F] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-[bounce_0.5s_ease-out]">
          <span className="material-symbols-outlined">check_circle</span>
          <p className="font-bold">{toastMessage}</p>
        </div>
      )}

    </div>
  );
}

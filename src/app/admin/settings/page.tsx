"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Settings {
  phone: string;
  email: string;
  address: string;
  open_from: string;
  open_to: string;
  facebook: string;
  zalo: string;
  bank_name: string;
  bank_number: string;
  bank_account: string;
}

const EMPTY: Settings = {
  phone: "", email: "", address: "", open_from: "", open_to: "",
  facebook: "", zalo: "", bank_name: "", bank_number: "", bank_account: "",
};

// ─── Shared input style ───────────────────────────────────────────────────────
const inp = "w-full bg-[#eef5f3] border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#006b62]/50 focus:bg-white transition-all text-[#2a3433] outline-none";
const lbl = "text-xs font-semibold text-[#56615f] uppercase tracking-wider";

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ id, checked, onChange }: { id: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="relative inline-block w-10 align-middle select-none">
      <input checked={checked} onChange={onChange} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10" id={id} type="checkbox" />
      <label className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${checked ? "bg-[#006b62]" : "bg-[#d9e5e2]"}`} htmlFor={id} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState<Settings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [themeMode, setThemeMode] = useState("Sáng");
  const [payments, setPayments] = useState({ cod: true, bank: true });
  const [notifications, setNotifications] = useState({ order: true, stock: false });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Load settings
  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) setSettings(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const set = (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setSettings(prev => ({ ...prev, [key]: e.target.value }));

  // Save store info settings to DB
  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          open_from: settings.open_from,
          open_to: settings.open_to,
          facebook: settings.facebook,
          zalo: settings.zalo,
          bank_name: settings.bank_name,
          bank_number: settings.bank_number,
          bank_account: settings.bank_account,
        }),
      });
      if (res.ok) showToast("Đã lưu thay đổi thành công!");
      else showToast("Lỗi khi lưu. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (!user?.id) return;

    setPasswordSaving(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id: user.id, currentPassword, newPassword })
      });
      if (res.ok) {
        setIsPasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showToast("Đổi mật khẩu thành công!");
      } else {
        const data = await res.json();
        showToast(data.error || "Có lỗi xảy ra.");
      }
    } catch (err) {
      console.error(err);
      showToast("Lỗi máy chủ.");
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-[#006b62]/20 shadow-xl rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-5">
          <div className="w-8 h-8 bg-[#e2fff9] rounded-full flex items-center justify-center text-[#006b62]">
            <span className="material-symbols-outlined text-sm">check</span>
          </div>
          <p className="font-bold text-[#2a3433] text-sm">{toast}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-2">Cài đặt hệ thống</h1>
          <p className="text-[#56615f] text-sm">Quản lý thông tin cửa hàng và tùy chỉnh các chức năng vận hành hệ thống.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ── Left: Store Info ── */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            <section className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006b62] to-[#82f6e7] opacity-50" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#c6eae3]/50 flex items-center justify-center text-[#375853]">
                  <span className="material-symbols-outlined icon-fill">storefront</span>
                </div>
                <h3 className="text-xl font-bold text-[#2a3433]">Thông tin cửa hàng</h3>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-11 rounded-xl bg-[#eef5f3] animate-pulse" />)}
                </div>
              ) : (
                <form className="space-y-5">
                  {/* Shop name — fixed */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className={lbl}>Tên cửa hàng</label>
                      <div className="flex items-center gap-2 bg-[#f0f4f3] rounded-xl py-3 px-4">
                        <span className="text-sm font-bold text-[#2a3433]">PetCare Shop</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>Số điện thoại</label>
                      <input className={inp} type="tel" value={settings.phone} onChange={set("phone")} />
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>Email liên hệ</label>
                      <input className={inp} type="email" value={settings.email} onChange={set("email")} />
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>Giờ hoạt động</label>
                      <div className="flex items-center gap-2">
                        <input className={inp} type="time" value={settings.open_from} onChange={set("open_from")} />
                        <span className="text-[#56615f]">-</span>
                        <input className={inp} type="time" value={settings.open_to} onChange={set("open_to")} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={lbl}>Địa chỉ chi tiết</label>
                    <input className={inp} type="text" value={settings.address} onChange={set("address")} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className={lbl}>Link Facebook</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#56615f] text-sm font-bold">f</span>
                        <input className={`${inp} pl-10`} type="url" value={settings.facebook} onChange={set("facebook")} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>Link zalo</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#56615f] text-sm font-bold">Z</span>
                        <input className={`${inp} pl-10`} type="tel" value={settings.zalo} onChange={set("zalo")} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#006b62]/20 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                      type="button"
                    >
                      {saving && <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>}
                      {saving ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                  </div>
                </form>
              )}
            </section>
            {/* Removed Booking Settings */}
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            {/* Admin account */}
            <section className="bg-white rounded-[1.5rem] p-6 shadow-[0px_10px_40px_rgba(42,52,51,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#006b62]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#b6e7fe]/50 flex items-center justify-center text-[#235669]">
                  <span className="material-symbols-outlined icon-fill">admin_panel_settings</span>
                </div>
                <h3 className="text-xl font-bold text-[#2a3433]">Tài khoản</h3>
              </div>
              <div className="flex flex-col items-center text-center pb-6 border-b border-[#d9e5e2]/50">
                <div className="w-20 h-20 rounded-full bg-[#eef5f3] flex items-center justify-center mb-3 border-4 border-[#e7f0ed]">
                  <span className="material-symbols-outlined text-4xl text-[#006b62]">admin_panel_settings</span>
                </div>
                <h4 className="text-base font-bold text-[#2a3433]">Quản trị viên</h4>
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#006b62]/10 text-[#006b62] uppercase tracking-wider">Super Admin</span>
              </div>
              <div className="pt-4 space-y-3">
                <button onClick={() => setIsPasswordModalOpen(true)} type="button" className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#eef5f3] transition-colors text-sm font-medium text-[#2a3433]">
                  <span className="material-symbols-outlined text-[#727d7a]">key</span>
                  Đổi mật khẩu
                </button>
                <button type="button" onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#a83836]/5 transition-colors text-sm font-medium text-[#a83836]">
                  <span className="material-symbols-outlined text-[#a83836]">logout</span>
                  Đăng xuất
                </button>
              </div>
            </section>


          </div>


        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsPasswordModalOpen(false)} className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Đổi mật khẩu</h3>
            <form className="space-y-4" onSubmit={handleChangePassword}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mật khẩu hiện tại</label>
                <input required type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Nhập mật khẩu hiện tại..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mật khẩu mới</label>
                <input required type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nhập mật khẩu mới..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Xác nhận lại mật khẩu mới</label>
                <input required type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu mới..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors">Hủy</button>
                <button type="submit" disabled={passwordSaving} className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20 disabled:opacity-50 flex items-center gap-2">
                  {passwordSaving && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

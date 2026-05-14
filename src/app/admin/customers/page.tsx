"use client";
import React, { useState, useEffect, useCallback } from "react";
import ConfirmModal from "@/components/ConfirmModal";

interface Pet {
  pet_id?: number;
  name: string;
  type: string;
  breed?: string;
  gender?: string;
  age?: number;
  weight?: number;
}

interface Customer {
  customer_id: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  is_active?: boolean;
  created_at: string;
  pets?: Pet[];
}

function getInitials(name: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.slice(-2).map(p => p[0]).join("").toUpperCase();
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [search, setSearch]       = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [saving, setSaving]       = useState(false);

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmText?: string;
    isDanger: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Xác nhận",
    isDanger: false,
    onConfirm: () => {},
  });

  // Add form
  const [form, setForm] = useState({ 
    full_name: "", 
    phone: "", 
    email: "", 
    address: "",
    password: "", // Still kept in form to create password
    pets: [] as Pet[]
  });

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const res = await fetch(`/api/customers?${params}`);
      if (!res.ok) throw new Error("Không tải được dữ liệu");
      setCustomers(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => fetchCustomers(), 400);
    return () => clearTimeout(t);
  }, [fetchCustomers]);

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Tạo thất bại");
      }
      setIsAddModalOpen(false);
      setForm({ full_name: "", phone: "", email: "", address: "", password: "", pets: [] });
      fetchCustomers();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const addPet = () => {
    setForm({ ...form, pets: [...form.pets, { name: "", type: "Dog" }] });
  };

  const updatePet = (index: number, key: keyof Pet, value: any) => {
    const newPets = [...form.pets];
    newPets[index] = { ...newPets[index], [key]: value };
    setForm({ ...form, pets: newPets });
  };

  const removePet = (index: number) => {
    const newPets = [...form.pets];
    newPets.splice(index, 1);
    setForm({ ...form, pets: newPets });
  };

  const handleToggleActive = (customer: Customer) => {
    const actionText = customer.is_active ? "Tắt kích hoạt" : "Bật kích hoạt";
    
    setConfirmModal({
      isOpen: true,
      title: `${actionText} tài khoản`,
      message: (
        <span>
          Bạn có chắc chắn muốn <strong>{actionText.toLowerCase()}</strong> tài khoản của khách hàng <strong className="text-black">{customer.full_name}</strong> không?
        </span>
      ),
      confirmText: actionText,
      isDanger: !!customer.is_active, // Warning color when disabling
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/customers/${customer.customer_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_active: !customer.is_active })
          });
          if (!res.ok) throw new Error("Cập nhật thất bại");
          fetchCustomers();
          setSelectedCustomer({ ...customer, is_active: !customer.is_active });
        } catch (e) {
          alert((e as Error).message);
        } finally {
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  const handleDelete = (customerId: number) => {
    setConfirmModal({
      isOpen: true,
      title: "Xóa tài khoản khách hàng",
      message: "Hành động này không thể hoàn tác! Toàn bộ thông tin, lịch sử khám bệnh và thú cưng của khách hàng này sẽ bị xóa vĩnh viễn.",
      confirmText: "Xóa tài khoản",
      isDanger: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/customers/${customerId}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Xóa thất bại");
          setSelectedCustomer(null);
          fetchCustomers();
        } catch (e) {
          alert((e as Error).message);
        } finally {
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      }
    });
  };

  return (
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2">
              <span>Hệ thống</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#006b62] font-medium">Khách hàng</span>
            </nav>
            <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Quản lý khách hàng</h2>
            <p className="text-[#56615f] mt-1">Theo dõi thông tin khách hàng của PetCareShop.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#006b62] to-[#4BC3B5] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">person_add</span>
            Thêm khách hàng mới
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#82f6e7]/30 rounded-full flex items-center justify-center text-[#006b62]">
                <span className="material-symbols-outlined">group</span>
              </div>
            </div>
            <p className="text-[#56615f] text-sm font-medium">Tổng khách hàng trong DB</p>
            <h3 className="text-2xl font-bold text-[#2a3433]">{customers.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#c6eae3]/30 rounded-full flex items-center justify-center text-[#446560]">
                <span className="material-symbols-outlined">search</span>
              </div>
            </div>
            <p className="text-[#56615f] text-sm font-medium">Kết quả tìm kiếm</p>
            <h3 className="text-2xl font-bold text-[#2a3433]">{customers.length}</h3>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#a9b4b1]">search</span>
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#e1eae7] rounded-xl text-sm outline-none focus:border-[#006b62] transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {error && (
            <div className="px-8 py-3 bg-red-50 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error} — <button onClick={fetchCustomers} className="underline">Thử lại</button>
            </div>
          )}
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eef5f3]">
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Khách hàng</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Số điện thoại</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Email</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Địa chỉ</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Trạng thái</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#a9b4b1]/10">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="flex items-center justify-center gap-2 text-[#56615f]">
                        <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
                        Đang tải...
                      </div>
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#56615f]">Không tìm thấy khách hàng nào.</td>
                  </tr>
                ) : (
                  customers.map(c => (
                    <tr key={c.customer_id} className="hover:bg-[#e1eae7]/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-[#b6e7fe] flex items-center justify-center text-[#27596c] font-bold text-sm">
                            {getInitials(c.full_name)}
                          </div>
                          <p className="font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors">{c.full_name}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-[#56615f]">{c.phone ?? "—"}</td>
                      <td className="px-8 py-5 text-sm text-[#56615f]">{c.email ?? "—"}</td>
                      <td className="px-8 py-5 text-sm text-[#56615f] max-w-[180px] truncate">{c.address ?? "—"}</td>
                      <td className="px-8 py-5 text-sm">
                        {c.is_active ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Bị khóa
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => setSelectedCustomer(c)}
                          className="px-4 py-1.5 text-xs font-bold text-[#006b62] bg-[#eef5f3] hover:bg-[#c6eae3] rounded-full transition-colors"
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-6 bg-[#eef5f3] flex items-center justify-between">
            <p className="text-xs text-[#56615f] font-medium">Hiển thị {customers.length} khách hàng</p>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Thêm khách hàng mới</h3>

            <form className="space-y-6" onSubmit={handleAddCustomer}>
              
              {/* Customer Info Section */}
              <div className="space-y-4">
                <h4 className="font-bold text-[#006b62] border-b pb-2">Thông tin khách hàng</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Họ và tên *</label>
                    <input required type="text" placeholder="Nhập họ và tên..."
                      value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})}
                      className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Số điện thoại *</label>
                    <input required type="tel" placeholder="09xx xxx xxx"
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Email</label>
                    <input type="email" placeholder="example@email.com"
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mật khẩu</label>
                    <input type="text" placeholder="Nhập mật khẩu cho tài khoản..."
                      value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                      className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Địa chỉ</label>
                    <input type="text" placeholder="Địa chỉ..."
                      value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                      className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                  </div>
                </div>
              </div>

              {/* Pets Info Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-[#006b62]">Thông tin thú cưng</h4>
                  <button type="button" onClick={addPet} className="text-xs font-bold text-[#006b62] bg-[#eef5f3] px-3 py-1.5 rounded-full hover:bg-[#c6eae3] transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">add</span> Thêm thú cưng
                  </button>
                </div>
                
                {form.pets.map((pet, index) => (
                  <div key={index} className="bg-[#f8fdfa] p-4 rounded-xl border border-[#e1eae7] relative">
                    <button type="button" onClick={() => removePet(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pr-8">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Tên thú cưng *</label>
                        <input required type="text" value={pet.name} onChange={e => updatePet(index, "name", e.target.value)}
                          className="w-full bg-white border border-[#e1eae7] rounded-lg text-sm py-2 px-3 outline-none focus:border-[#006b62]" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Loài *</label>
                        <select value={pet.type} onChange={e => updatePet(index, "type", e.target.value)}
                          className="w-full bg-white border border-[#e1eae7] rounded-lg text-sm py-2 px-3 outline-none focus:border-[#006b62]">
                          <option value="Dog">Chó (Dog)</option>
                          <option value="Cat">Mèo (Cat)</option>
                          <option value="Bird">Chim (Bird)</option>
                          <option value="Other">Khác</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Giới tính</label>
                        <select value={pet.gender ?? ""} onChange={e => updatePet(index, "gender", e.target.value)}
                          className="w-full bg-white border border-[#e1eae7] rounded-lg text-sm py-2 px-3 outline-none focus:border-[#006b62]">
                          <option value="">Không rõ</option>
                          <option value="male">Đực</option>
                          <option value="female">Cái</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Giống</label>
                        <input type="text" value={pet.breed ?? ""} onChange={e => updatePet(index, "breed", e.target.value)}
                          className="w-full bg-white border border-[#e1eae7] rounded-lg text-sm py-2 px-3 outline-none focus:border-[#006b62]" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Tuổi</label>
                        <input type="number" value={pet.age ?? ""} onChange={e => updatePet(index, "age", e.target.value)}
                          className="w-full bg-white border border-[#e1eae7] rounded-lg text-sm py-2 px-3 outline-none focus:border-[#006b62]" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Cân nặng (kg)</label>
                        <input type="number" step="0.1" value={pet.weight ?? ""} onChange={e => updatePet(index, "weight", e.target.value)}
                          className="w-full bg-white border border-[#e1eae7] rounded-lg text-sm py-2 px-3 outline-none focus:border-[#006b62]" />
                      </div>
                    </div>
                  </div>
                ))}
                {form.pets.length === 0 && (
                  <p className="text-sm text-[#a9b4b1] italic text-center py-2">Chưa có thú cưng nào được thêm.</p>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#a9b4b1]/20">
                <button type="button" onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2]">
                  Hủy bỏ
                </button>
                <button type="submit" disabled={saving}
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] shadow-lg shadow-[#006b62]/20 disabled:opacity-60">
                  {saving ? "Đang lưu..." : "Lưu khách hàng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            <button onClick={() => setSelectedCustomer(null)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#b6e7fe] flex items-center justify-center text-[#27596c] font-bold text-2xl shadow-md ring-4 ring-[#eef5f3] shrink-0">
                {getInitials(selectedCustomer.full_name)}
              </div>
              <div className="pt-2 w-full">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-extrabold text-[#2a3433]">{selectedCustomer.full_name}</h3>
                  {selectedCustomer.is_active ? (
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Hoạt động</span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Đã khóa</span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mt-4 bg-[#f8fdfa] p-4 rounded-xl border border-[#e1eae7]">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#56615f]">Số điện thoại</span>
                    <span className="font-semibold text-[#2a3433] flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm text-[#006b62]">call</span>
                      {selectedCustomer.phone || "—"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#56615f]">Email</span>
                    <span className="font-semibold text-[#2a3433] flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm text-[#006b62]">mail</span>
                      {selectedCustomer.email || "—"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#56615f]">Địa chỉ</span>
                    <span className="font-semibold text-[#2a3433] flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm text-[#006b62]">location_on</span>
                      {selectedCustomer.address || "—"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#56615f]">Ngày đăng ký</span>
                    <span className="font-semibold text-[#2a3433] flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm text-[#006b62]">calendar_today</span>
                      {selectedCustomer.created_at ? new Date(selectedCustomer.created_at).toLocaleDateString("vi-VN") : "—"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#e1eae7]">
                  <button
                    onClick={() => handleToggleActive(selectedCustomer)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                      selectedCustomer.is_active 
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200" 
                        : "bg-[#eef5f3] text-[#006b62] hover:bg-[#c6eae3]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {selectedCustomer.is_active ? "block" : "check_circle"}
                    </span>
                    {selectedCustomer.is_active ? "Tắt kích hoạt" : "Bật kích hoạt"}
                  </button>

                  <button
                    onClick={() => handleDelete(selectedCustomer.customer_id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-600 hover:bg-red-200 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            </div>

            {/* Pets Display */}
            <div className="mt-6">
              <h4 className="font-bold text-[#2a3433] border-b pb-2 mb-4">Danh sách thú cưng</h4>
              {selectedCustomer.pets && selectedCustomer.pets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCustomer.pets.map(pet => (
                    <div key={pet.pet_id} className="bg-white border border-[#e1eae7] p-4 rounded-xl shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#eef5f3] flex items-center justify-center text-[#006b62] shrink-0">
                        <span className="material-symbols-outlined">pets</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-[#2a3433]">{pet.name}</h5>
                        <p className="text-xs text-[#56615f] mt-1">
                          {pet.type} {pet.breed ? `• ${pet.breed}` : ""} {pet.gender ? `• ${pet.gender === 'male' ? 'Đực' : 'Cái'}` : ""}
                        </p>
                        <p className="text-xs text-[#56615f] mt-1">
                          {pet.age ? `${pet.age} tuổi` : ""} {pet.age && pet.weight ? " • " : ""} {pet.weight ? `${pet.weight} kg` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#f8fdfa] border border-[#e1eae7] border-dashed p-6 text-center rounded-xl">
                  <span className="material-symbols-outlined text-[#a9b4b1] text-3xl mb-2">pets</span>
                  <p className="text-sm text-[#56615f]">Khách hàng này chưa có thông tin thú cưng.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}

      {/* Global Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDanger={confirmModal.isDanger}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

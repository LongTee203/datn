"use client";
import React, { useState, useEffect, useCallback } from "react";

interface Customer {
  customer_id: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  created_at: string;
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

  // Add form
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", address: "" });

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
      setForm({ full_name: "", phone: "", email: "", address: "" });
      fetchCustomers();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
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
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Ngày đăng ký</th>
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
                      <td className="px-8 py-5 text-sm text-[#56615f]">
                        {c.created_at ? new Date(c.created_at).toLocaleDateString("vi-VN") : "—"}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Thêm khách hàng mới</h3>

            <form className="space-y-4" onSubmit={handleAddCustomer}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Họ và tên *</label>
                <input required type="text" placeholder="Nhập họ và tên..."
                  value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Số điện thoại *</label>
                  <input required type="tel" placeholder="09xx xxx xxx"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Email</label>
                  <input type="email" placeholder="example@email.com"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Địa chỉ</label>
                <input type="text" placeholder="Địa chỉ..."
                  value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm py-3 px-4 outline-none focus:ring-2 focus:ring-[#006b62]/20" />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedCustomer(null)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#b6e7fe] flex items-center justify-center text-[#27596c] font-bold text-2xl shadow-md ring-4 ring-[#eef5f3]">
                {getInitials(selectedCustomer.full_name)}
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-extrabold text-[#2a3433]">{selectedCustomer.full_name}</h3>
                <div className="flex flex-col gap-1 mt-2 text-[#56615f] text-sm">
                  {selectedCustomer.phone && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">call</span>{selectedCustomer.phone}</span>}
                  {selectedCustomer.email && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span>{selectedCustomer.email}</span>}
                  {selectedCustomer.address && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span>{selectedCustomer.address}</span>}
                </div>
              </div>
            </div>
            <div className="bg-[#f8fdfa] p-4 rounded-xl border border-[#e1eae7]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#56615f] mb-1">Ngày đăng ký</p>
              <p className="font-bold text-[#2a3433]">
                {selectedCustomer.created_at ? new Date(selectedCustomer.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" }) : "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

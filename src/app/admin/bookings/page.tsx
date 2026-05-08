"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Booking {
  appointment_id: number;
  pet_name: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  appointment_date: string;
  status: string;
}

const STATUS_OPTIONS = [
  "Tất cả trạng thái",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const STATUS_LABEL: Record<string, string> = {
  Pending: "Chờ xác nhận",
  Confirmed: "Đã xác nhận",
  Completed: "Hoàn thành",
  Cancelled: "Hủy",
};

const STATUS_COLOR: Record<string, string> = {
  Pending: "text-[#006b62] bg-[#006b62]",
  Confirmed: "text-[#446560] bg-[#446560]",
  Cancelled: "text-[#a83836] bg-[#a83836]",
  Completed: "text-[#727d7a] bg-[#727d7a]",
};

function formatDateTime(dt: string) {
  if (!dt) return { time: "--:--", date: "---" };
  const d = new Date(dt);
  const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  const date = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "numeric" });
  return { time, date };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Tất cả trạng thái");
  const [filterDate, setFilterDate] = useState("");

  // Form state
  const [form, setForm] = useState({
    pet_name: "",
    customer_name: "",
    customer_phone: "",
    service_name: "",
    appointment_date: "",
    status: "Pending",
  });
  const [saving, setSaving] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "Tất cả trạng thái") params.set("status", filterStatus);
      if (filterDate) params.set("date", filterDate);

      const res = await fetch(`/api/appointments?${params.toString()}`);
      if (!res.ok) throw new Error("Không tải được dữ liệu");
      const data = await res.json();
      setBookings(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterDate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: number, newStatus: string) => {
    // Optimistic update
    setBookings((prev) =>
      prev.map((b) => (b.appointment_id === id ? { ...b, status: newStatus } : b))
    );
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      fetchBookings(); // revert on failure
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pet_name: form.pet_name,
          appointment_date: form.appointment_date,
          status: form.status,
        }),
      });
      if (!res.ok) throw new Error("Tạo lịch thất bại");
      setIsPopupOpen(false);
      setForm({ pet_name: "", customer_name: "", customer_phone: "", service_name: "", appointment_date: "", status: "Pending" });
      fetchBookings();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const todayCount = bookings.filter(
    (b) => b.appointment_date?.startsWith(today)
  ).length;

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-2">
            Quản lý đặt lịch
          </h2>
          <p className="text-[#56615f] max-w-md">
            Theo dõi và điều phối các lịch hẹn chăm sóc thú cưng một cách hiệu quả.
          </p>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-[#006b62] hover:bg-[#005e56] text-[#e2fff9] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-[#006b62]/20 transition-all scale-100 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          Thêm lịch đặt mới
        </button>
      </div>

      {/* Filter & Stats Bento Grid */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-3xl shadow-sm flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-2">
              Trạng thái
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-2">
              Thời gian
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
            />
          </div>
          <div className="flex items-end h-full pt-5">
            <button
              onClick={() => { setFilterStatus("Tất cả trạng thái"); setFilterDate(""); }}
              className="bg-[#c6eae3] text-[#375853] px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-95 transition-all"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        <div className="col-span-6 lg:col-span-2 bg-[#82f6e7]/30 p-6 rounded-3xl border border-[#82f6e7]/50">
          <span className="material-symbols-outlined text-[#006b62] mb-2">pending_actions</span>
          <p className="text-[10px] font-bold uppercase text-[#005c54] opacity-70">Đang chờ</p>
          <p className="text-2xl font-black text-[#005c54]">{pendingCount}</p>
        </div>
        <div className="col-span-6 lg:col-span-2 bg-[#b6e7fe]/30 p-6 rounded-3xl border border-[#b6e7fe]/50">
          <span className="material-symbols-outlined text-[#346578] mb-2">check_circle</span>
          <p className="text-[10px] font-bold uppercase text-[#235669] opacity-70">Hôm nay</p>
          <p className="text-2xl font-black text-[#235669]">{todayCount}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm">
        {error && (
          <div className="px-8 py-4 bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error} —{" "}
            <button onClick={fetchBookings} className="underline">
              Thử lại
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5f3]">
                <th className="px-8 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Thú cưng</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Chủ sở hữu</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Dịch vụ</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Thời gian</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Trạng thái</th>
                <th className="px-8 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#56615f]">
                      <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
                      Đang tải dữ liệu...
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-[#56615f]">
                    Không tìm thấy lịch đặt nào phù hợp.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => {
                  const { time, date } = formatDateTime(booking.appointment_date);
                  const status = booking.status;
                  const colorClass = STATUS_COLOR[status] ?? "text-gray-500 bg-gray-500";
                  const [textColor, bgColor] = colorClass.split(" ");
                  const isCancelled = status === "Cancelled";

                  return (
                    <tr
                      key={booking.appointment_id}
                      className={`hover:bg-[#eef5f3]/50 transition-colors group ${isCancelled ? "opacity-60" : ""}`}
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center ${isCancelled ? "grayscale" : ""}`}>
                            <span className="material-symbols-outlined text-[#446560]">pets</span>
                          </div>
                          <div>
                            <p className={`font-bold text-[#2a3433] ${isCancelled ? "line-through" : ""}`}>
                              {booking.pet_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-[#2a3433]">{booking.customer_name ?? "—"}</p>
                        <p className="text-xs text-[#56615f]">{booking.customer_phone ?? "—"}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-[#e1eae7] rounded-full text-[11px] font-bold text-[#446560] uppercase tracking-tighter">
                          {booking.service_name ?? "—"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-[#2a3433]">{time}</p>
                        <p className="text-xs text-[#56615f]">{date}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`flex items-center gap-1.5 ${textColor}`}>
                          <span className={`w-2 h-2 rounded-full ${bgColor} ${status === "Pending" ? "animate-pulse" : ""}`} />
                          <span className="text-xs font-bold uppercase tracking-tight">
                            {STATUS_LABEL[status] ?? status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="relative inline-block text-left group/menu">
                          <button className="p-2 hover:bg-[#eef5f3] rounded-full transition-colors">
                            <span className="material-symbols-outlined text-[#56615f]">more_vert</span>
                          </button>
                          <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 flex flex-col overflow-hidden">
                            <button onClick={() => updateStatus(booking.appointment_id, "Pending")} className="px-4 py-3 text-left text-xs font-bold text-[#2a3433] hover:bg-gray-50">Chờ xác nhận</button>
                            <button onClick={() => updateStatus(booking.appointment_id, "Confirmed")} className="px-4 py-3 text-left text-xs font-bold text-[#006b62] hover:bg-gray-50 border-t border-gray-50">Đã xác nhận</button>
                            <button onClick={() => updateStatus(booking.appointment_id, "Completed")} className="px-4 py-3 text-left text-xs font-bold text-[#446560] hover:bg-gray-50 border-t border-gray-50">Hoàn thành</button>
                            <button onClick={() => updateStatus(booking.appointment_id, "Cancelled")} className="px-4 py-3 text-left text-xs font-bold text-[#a83836] hover:bg-gray-50 border-t border-gray-50">Hủy</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-[#eef5f3] px-8 py-4 flex justify-between items-center">
          <p className="text-xs font-medium text-[#56615f]">
            Hiển thị {bookings.length} lịch đặt
          </p>
        </div>
      </div>

      {/* Create Booking Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Thêm lịch đặt mới</h3>

            <form className="space-y-4" onSubmit={handleCreate}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên thú cưng *</label>
                <input
                  required
                  type="text"
                  placeholder="Nhập tên thú cưng..."
                  value={form.pet_name}
                  onChange={(e) => setForm({ ...form, pet_name: e.target.value })}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên chủ nhân</label>
                  <input
                    type="text"
                    placeholder="Nhập tên..."
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="Nhập số ĐT..."
                    value={form.customer_phone}
                    onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Dịch vụ</label>
                <select
                  value={form.service_name}
                  onChange={(e) => setForm({ ...form, service_name: e.target.value })}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none cursor-pointer"
                >
                  <option value="">Chọn dịch vụ...</option>
                  <option value="grooming">Cắt tỉa lông</option>
                  <option value="spa">Spa trọn gói</option>
                  <option value="vaccine">Tiêm chủng</option>
                  <option value="hotel">Khách sạn thú cưng</option>
                  <option value="vet">Khám thú y</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Ngày giờ sử dụng *</label>
                <input
                  required
                  type="datetime-local"
                  value={form.appointment_date}
                  onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20 disabled:opacity-60"
                >
                  {saving ? "Đang lưu..." : "Xác nhận đặt"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

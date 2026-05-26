"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Booking {
  appointment_id: number;
  pet_name: string;
  pet_type: string | null;
  pet_breed: string | null;
  pet_weight: number | null;
  customer_name: string | null;
  customer_phone: string | null;
  service_name: string | null;
  service_price: number | null;
  service_duration: number | null;
  appointment_date: string;
  status: string;
  note: string | null;
  payment_method: string | null;
  receipt_image: string | null;
  customer_id: number;
  service_id: number;
  assigned_staff?: {
    staff_id: number;
    full_name: string;
    avatar: string | null;
  } | null;
}

interface Customer {
  customer_id: number;
  full_name: string;
  phone: string | null;
  pets?: { pet_id: number; name: string; type: string; breed: string | null }[];
}

interface Service {
  service_id: number;
  service_name: string;
  price: number;
}

interface DropdownPos { top: number; left: number; }

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { value: "Tất cả", label: "Tất cả trạng thái" },
  { value: "Pending", label: "Chờ xác nhận" },
  { value: "Confirmed", label: "Đã xác nhận" },
  { value: "Completed", label: "Hoàn thành" },
  { value: "Cancelled", label: "Hủy" },
];

const STATUS_LABEL: Record<string, string> = {
  Pending: "Chờ xác nhận",
  Confirmed: "Đã xác nhận",
  Completed: "Hoàn thành",
  Cancelled: "Hủy",
};

const STATUS_COLOR: Record<string, { text: string; dot: string }> = {
  Pending: { text: "text-[#006b62]", dot: "bg-[#006b62]" },
  Confirmed: { text: "text-[#446560]", dot: "bg-[#446560]" },
  Completed: { text: "text-[#727d7a]", dot: "bg-[#727d7a]" },
  Cancelled: { text: "text-[#a83836]", dot: "bg-[#a83836]" },
};

const PET_TYPE_MAP: Record<string, string> = { Dog: "Chó", Cat: "Mèo", Bird: "Chim", Rabbit: "Thỏ", Other: "Khác" };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDateTime(dt: string) {
  if (!dt) return { time: "--:--", date: "---" };
  const d = new Date(dt);
  return {
    time: d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    date: d.toLocaleDateString("vi-VN", { day: "2-digit", month: "numeric", year: "numeric" }),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [filterDate, setFilterDate] = useState("");

  // Resources for create form
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  // Create/Edit form
  const [form, setForm] = useState({
    customer_id: "", pet_name: "", service_id: "",
    appointment_date: "", appointment_time: "09:00", status: "Pending",
  });
  const [saving, setSaving] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState<number | null>(null);

  // Note Modal
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<string | null>(null);

  // Dropdown (fixed-position portal to avoid overflow clipping)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<DropdownPos>({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Assign staff state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignAppointmentId, setAssignAppointmentId] = useState<number | null>(null);
  const [staffList, setStaffList] = useState<{ staff_id: number; full_name: string; position: string | null; staff_schedules?: any[] }[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const toggleMenu = (id: number, btn: HTMLButtonElement) => {
    if (openMenuId === id) { setOpenMenuId(null); return; }
    const rect = btn.getBoundingClientRect();
    const MENU_H = 176; // 4 items × 44px
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow < MENU_H ? rect.top - MENU_H - 4 : rect.bottom + 4;
    setMenuPos({ top, left: rect.right - 192 }); // w-48 = 192px
    setOpenMenuId(id);
  };

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "Tất cả") params.set("status", filterStatus);
      if (filterDate) params.set("date", filterDate);
      const res = await fetch(`/api/appointments?${params}`);
      if (!res.ok) throw new Error("Không tải được dữ liệu");
      setBookings(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterDate]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const loadResources = async () => {
    try {
      const [cRes, sRes] = await Promise.all([fetch("/api/customers"), fetch("/api/services")]);
      if (cRes.ok) setCustomers(await cRes.json());
      if (sRes.ok) setServices(await sRes.json());
    } catch (e) { console.error(e); }
  };

  const openModal = () => {
    setEditAppointmentId(null);
    setForm({ customer_id: "", pet_name: "", service_id: "", appointment_date: "", appointment_time: "09:00", status: "Pending" });
    loadResources();
    setIsModalOpen(true);
  };

  const openEditModal = (booking: Booking) => {
    setEditAppointmentId(booking.appointment_id);
    const d = new Date(booking.appointment_date);
    const dateStr = d.toISOString().split("T")[0];
    const timeStr = d.toTimeString().substring(0, 5);

    setForm({
      customer_id: String(booking.customer_id),
      pet_name: booking.pet_name,
      service_id: String(booking.service_id),
      appointment_date: dateStr,
      appointment_time: timeStr,
      status: booking.status,
    });
    loadResources();
    setIsModalOpen(true);
  };

  // ── Update status ──────────────────────────────────────────────────────────
  const updateStatus = async (id: number, newStatus: string) => {
    setBookings(prev => prev.map(b => b.appointment_id === id ? { ...b, status: newStatus } : b));
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      // Create payment transaction when appointment is confirmed or completed
      if (newStatus === "Confirmed" || newStatus === "Completed") {
        const booking = bookings.find(b => b.appointment_id === id);
        if (booking) {
          await fetch("/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source_type: "appointment",
              source_id: id,
              amount: booking.service_price || 0,
              payment_method: booking.payment_method === "Bank" ? "Chuyển khoản" : "Tiền mặt",
              receipt_image: booking.receipt_image || null,
              description: `Lịch hẹn #${id} - ${booking.customer_name || "Khách hàng"} (${booking.service_name || "Dịch vụ"}${booking.pet_name ? " - " + booking.pet_name : ""})`,
            }),
          });
        }
      }
    } catch { fetchBookings(); }
  };

  // ── Assign Staff ───────────────────────────────────────────────────────────
  const openAssignModal = async (id: number) => {
    setOpenMenuId(null);
    setAssignAppointmentId(id);
    setSelectedStaffId("");
    setIsAssignModalOpen(true);
    // Always fetch latest staff list to get up-to-date schedules for checking availability
    try {
      const res = await fetch("/api/staff?is_active=true");
      if (res.ok) setStaffList(await res.json());
    } catch (e) { console.error(e); }
  };

  const handleAssignStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignAppointmentId || !selectedStaffId) return;
    setAssigning(true);
    try {
      const res = await fetch(`/api/appointments/${assignAppointmentId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staff_id: parseInt(selectedStaffId, 10) })
      });
      if (res.ok) {
        setIsAssignModalOpen(false);
        setSuccessMsg("Đã phân công nhân viên thành công cho lịch đặt này!");
        fetchBookings(); // Cập nhật lại status nếu cần
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Có lỗi xảy ra khi phân công");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAssigning(false);
    }
  };

  // ── Create/Edit booking ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const appointmentDate = form.appointment_date && form.appointment_time
        ? `${form.appointment_date}T${form.appointment_time}:00`
        : form.appointment_date;
        
      const url = editAppointmentId 
        ? `/api/appointments/${editAppointmentId}`
        : "/api/appointments";
        
      const res = await fetch(url, {
        method: editAppointmentId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: form.customer_id || null,
          service_id: form.service_id || null,
          pet_name: form.pet_name,
          appointment_date: appointmentDate,
          status: form.status,
        }),
      });
      if (!res.ok) throw new Error(editAppointmentId ? "Cập nhật thất bại" : "Tạo lịch thất bại");
      setIsModalOpen(false);
      fetchBookings();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  // ── Derived stats ──────────────────────────────────────────────────────────
  const pendingCount = bookings.filter(b => b.status === "Pending").length;
  const completedCount = bookings.filter(b => b.status === "Completed").length;

  const selectedCustomer = customers.find(c => String(c.customer_id) === form.customer_id);
  const customerPets = selectedCustomer?.pets ?? [];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-2">Quản lý đặt lịch</h2>
          <p className="text-[#56615f] max-w-md">Theo dõi và điều phối các lịch hẹn chăm sóc thú cưng một cách hiệu quả.</p>
        </div>
        <button
          onClick={openModal}
          className="bg-[#006b62] hover:bg-[#005e56] text-[#e2fff9] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-[#006b62]/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          Thêm lịch đặt mới
        </button>
      </div>

      {/* Filters & Stats */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-3xl shadow-sm flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-1">Trạng thái</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
            >
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-1">Thời gian</label>
            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2.5 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
            />
          </div>
          <button
            onClick={() => { setFilterStatus("Tất cả"); setFilterDate(""); }}
            className="bg-[#c6eae3] text-[#375853] px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-95 transition-all whitespace-nowrap"
          >
            Xóa bộ lọc
          </button>
        </div>

        <div className="col-span-6 lg:col-span-2 bg-[#82f6e7]/30 p-6 rounded-3xl border border-[#82f6e7]/50">
          <span className="material-symbols-outlined text-[#006b62] mb-2">pending_actions</span>
          <p className="text-[10px] font-bold uppercase text-[#005c54] opacity-70">Đang chờ</p>
          <p className="text-2xl font-black text-[#005c54]">{pendingCount}</p>
        </div>
        <div className="col-span-6 lg:col-span-2 bg-[#b6e7fe]/30 p-6 rounded-3xl border border-[#b6e7fe]/50">
          <span className="material-symbols-outlined text-[#346578] mb-2">task_alt</span>
          <p className="text-[10px] font-bold uppercase text-[#235669] opacity-70">Hoàn thành</p>
          <p className="text-2xl font-black text-[#235669]">{completedCount}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm">
        {error && (
          <div className="px-8 py-4 bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error} — <button onClick={fetchBookings} className="underline">Thử lại</button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5f3]">
                <th className="px-8 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Thú cưng</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Chủ sở hữu</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Dịch vụ</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Giá tiền</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Thời gian</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest">Trạng thái</th>
                <th className="px-6 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest text-center">Lưu ý</th>
                <th className="px-8 py-5 text-[11px] font-extrabold uppercase text-[#a9b4b1] tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#56615f]">
                      <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
                      Đang tải dữ liệu...
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-10 text-center text-[#56615f]">
                    Không tìm thấy lịch đặt nào phù hợp.
                  </td>
                </tr>
              ) : (
                bookings.map(booking => {
                  const { time, date } = formatDateTime(booking.appointment_date);
                  const color = STATUS_COLOR[booking.status] ?? { text: "text-gray-500", dot: "bg-gray-400" };
                  const isCancelled = booking.status === "Cancelled";

                  return (
                    <tr key={booking.appointment_id} className={`hover:bg-[#eef5f3]/50 transition-colors ${isCancelled ? "opacity-60" : ""}`}>
                      {/* Pet */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-[#c6eae3] flex items-center justify-center shrink-0 ${isCancelled ? "grayscale" : ""}`}>
                            <span className="material-symbols-outlined text-[#446560]">pets</span>
                          </div>
                          <div>
                            <p className={`font-bold text-[#2a3433] ${isCancelled ? "line-through" : ""}`}>{booking.pet_name}</p>
                            <p className="text-xs text-[#56615f]">
                              {[PET_TYPE_MAP[booking.pet_type || ""] || booking.pet_type, booking.pet_breed].filter(Boolean).join(" — ")}
                              {booking.pet_weight ? ` • ${booking.pet_weight}kg` : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-[#2a3433]">{booking.customer_name ?? "—"}</p>
                        <p className="text-xs text-[#56615f]">{booking.customer_phone ?? "—"}</p>
                      </td>

                      {/* Service */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-[#e1eae7] rounded-full text-[11px] font-bold text-[#446560] uppercase tracking-tighter">
                          {booking.service_name ?? "—"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-[#006b62]">
                          {booking.service_price != null
                            ? booking.service_price.toLocaleString("vi-VN") + "đ"
                            : "—"}
                        </span>
                      </td>

                      {/* Time */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-[#2a3433]">{time}</p>
                        <p className="text-xs text-[#56615f]">{date}</p>
                      </td>

                      {/* Status & Assigned Staff */}
                      <td className="px-6 py-5">
                        <div className={`flex items-center gap-1.5 ${color.text}`}>
                          <span className={`w-2 h-2 rounded-full ${color.dot} ${booking.status === "Pending" ? "animate-pulse" : ""}`} />
                          <span className="text-xs font-bold uppercase tracking-tight">{STATUS_LABEL[booking.status] ?? booking.status}</span>
                        </div>
                        {booking.assigned_staff && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#e7f0ed]/60 w-max">
                            {booking.assigned_staff.avatar ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={booking.assigned_staff.avatar} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-[#006b62] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                {booking.assigned_staff.full_name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="text-[11px] font-bold text-[#2a3433] leading-none pb-0.5">{booking.assigned_staff.full_name}</p>
                              <p className="text-[9px] text-[#56615f] uppercase tracking-wide">ID: {booking.assigned_staff.staff_id}</p>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Note */}
                      <td className="px-6 py-5 text-center">
                        {booking.note ? (
                          <button
                            onClick={() => {
                              setCurrentNote(booking.note);
                              setNoteModalOpen(true);
                            }}
                            className="w-8 h-8 rounded-full bg-[#eef5f3] hover:bg-[#e1eae7] flex items-center justify-center transition-colors mx-auto text-[#006b62]"
                            title="Xem lưu ý"
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </button>
                        ) : (
                          <span className="text-[#a9b4b1] text-xs">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(booking)}
                            className="p-2 hover:bg-[#eef5f3] rounded-full transition-colors text-[#006b62]"
                            title="Chỉnh sửa lịch hẹn"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={e => toggleMenu(booking.appointment_id, e.currentTarget)} className="p-2 hover:bg-[#eef5f3] rounded-full transition-colors text-[#56615f]">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-[#eef5f3] px-8 py-4">
          <p className="text-xs font-medium text-[#56615f]">Hiển thị {bookings.length} lịch đặt</p>
        </div>
      </div>

      {/* Fixed-position dropdown portal */}
      {openMenuId !== null && (
        <div ref={menuRef} style={{ position: "fixed", top: menuPos.top, left: menuPos.left, zIndex: 9999 }} className="w-48 bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          {Object.entries(STATUS_LABEL).map(([val, label]) => (
            <button key={val} onClick={() => { updateStatus(openMenuId, val); setOpenMenuId(null); }} className="px-4 py-3 text-left text-xs font-bold text-[#2a3433] hover:bg-[#eef5f3] border-t border-gray-100 first:border-t-0">
              {label}
            </button>
          ))}
          <button onClick={() => openAssignModal(openMenuId)} className="px-4 py-3 text-left text-xs font-bold text-[#006b62] bg-[#cafdd4]/30 hover:bg-[#cafdd4] border-t border-gray-100">
            Phân công nhân viên
          </button>
        </div>
      )}

      {/* Create/Edit Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#e7f0ed] flex justify-between items-center bg-[#f8fbfb]">
              <h3 className="text-xl font-extrabold text-[#2a3433]">{editAppointmentId ? "Chỉnh sửa lịch đặt" : "Tạo lịch đặt mới"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-[#e7f0ed] flex items-center justify-center text-[#56615f] transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Khách hàng</label>
                <select value={form.customer_id} onChange={e => setForm({ ...form, customer_id: e.target.value, pet_name: "" })} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none">
                  <option value="">-- Chọn khách hàng --</option>
                  {customers.map(c => <option key={c.customer_id} value={c.customer_id}>{c.full_name}{c.phone ? ` (${c.phone})` : ""}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2 mt-4">Thú cưng *</label>
                {customerPets.length > 0 ? (
                  <select required value={form.pet_name} onChange={e => setForm({ ...form, pet_name: e.target.value })} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none">
                    <option value="">-- Chọn thú cưng --</option>
                    {customerPets.map(p => <option key={p.pet_id} value={p.name}>{p.name}{p.breed ? ` — ${p.breed}` : ""} ({PET_TYPE_MAP[p.type] || p.type})</option>)}
                  </select>
                ) : (
                  <input required type="text" placeholder="Nhập tên thú cưng..." value={form.pet_name} onChange={e => setForm({ ...form, pet_name: e.target.value })} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Ngày hẹn *</label>
                  <input required type="date" value={form.appointment_date} min={new Date().toISOString().split("T")[0]} onChange={e => setForm({ ...form, appointment_date: e.target.value })} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Giờ hẹn *</label>
                  <select required value={form.appointment_time} onChange={e => setForm({ ...form, appointment_time: e.target.value })} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none">
                    {["08:00", "09:00", "09:30", "10:00", "11:00", "13:00", "14:00", "14:30", "15:00", "16:00", "17:00", "17:30"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Dịch vụ</label>
                  <select value={form.service_id} onChange={e => setForm({ ...form, service_id: e.target.value })} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none">
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map(s => <option key={s.service_id} value={s.service_id}>{s.service_name} — {Number(s.price).toLocaleString("vi-VN")}đ</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Trạng thái ban đầu</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none">
                    {STATUS_OPTIONS.filter(o => o.value !== "Tất cả").map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#a9b4b1]/20 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20 disabled:opacity-60 flex items-center gap-2"
                >
                  {saving && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                  {saving ? "Đang lưu..." : (editAppointmentId ? "Lưu thay đổi" : "Xác nhận đặt")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Assign Staff Modal */}
      {isAssignModalOpen && (() => {
        const currentBooking = bookings.find(b => b.appointment_id === assignAppointmentId);
        const availableStaff = staffList.filter(staff => {
          if (!currentBooking) return true;
          const bookingStart = new Date(currentBooking.appointment_date).getTime();
          const durationMins = currentBooking.service_duration || 60;
          const bookingEnd = bookingStart + durationMins * 60000;
          const hasOverlap = staff.staff_schedules?.some((sch: any) => {
            if (sch.appointment_id === currentBooking.appointment_id) return false;
            if (new Date(sch.work_date).toDateString() !== new Date(bookingStart).toDateString()) return false;
            
            const start = new Date(sch.start_time.replace('1970-01-01', '2024-01-01'));
            const end = new Date(sch.end_time.replace('1970-01-01', '2024-01-01'));
            const schStart = new Date(bookingStart);
            schStart.setHours(start.getHours(), start.getMinutes(), 0, 0);
            const schEnd = new Date(bookingStart);
            schEnd.setHours(end.getHours(), end.getMinutes(), 0, 0);
            
            return schStart.getTime() < bookingEnd && schEnd.getTime() > bookingStart;
          });
          return !hasOverlap;
        });

        return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setIsAssignModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-xl font-extrabold text-[#2a3433] mb-6">Phân công nhân viên</h3>
            
            <form onSubmit={handleAssignStaff}>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Chọn nhân viên</label>
                <select
                  required
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none"
                >
                  <option value="">-- Chọn nhân viên --</option>
                  {availableStaff.map(s => (
                    <option key={s.staff_id} value={s.staff_id}>
                      {s.full_name} {s.position ? `(${s.position})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-5 py-2.5 rounded-full font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="px-5 py-2.5 rounded-full font-bold bg-[#006b62] text-white hover:bg-[#005e56] disabled:opacity-50 transition-colors"
                >
                  {assigning ? "Đang lưu..." : "Phân công"}
                </button>
              </div>
            </form>
          </div>
        </div>
        );
      })()}

      {/* Success Modal */}
      {successMsg && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#cafdd4]/50 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-[#006b62]">check_circle</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#2a3433] mb-2">Thành công!</h3>
            <p className="text-[#56615f] text-sm mb-8">{successMsg}</p>
            <button
              onClick={() => setSuccessMsg(null)}
              className="w-full py-3 rounded-full font-bold bg-[#006b62] text-white hover:bg-[#005e56] transition-colors"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {noteModalOpen && currentNote && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-start animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#eef5f3] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-[#006b62]">description</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#2a3433]">Lưu ý từ khách hàng</h3>
            </div>
            <div className="bg-[#f8fbfb] w-full p-4 rounded-2xl border border-[#e7f0ed] mb-8 max-h-[40vh] overflow-y-auto custom-scrollbar">
              <p className="text-[#56615f] text-sm whitespace-pre-wrap">{currentNote}</p>
            </div>
            <button
              onClick={() => setNoteModalOpen(false)}
              className="w-full py-3 rounded-full font-bold bg-[#eef5f3] text-[#56615f] hover:bg-[#d9e5e2] transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

interface StaffMember {
  staff_id: number;
  full_name: string;
  phone: string | null;
  email: string | null;
  position: string | null;
  salary?: number | null;
  avatar: string | null;
  is_active: boolean;
  created_at: string;
  staff_schedules?: {
    schedule_id: number;
    start_time: string;
    end_time: string;
    work_date: string;
    appointments?: {
      pet_name: string;
      services?: {
        category: string | null;
        service_name: string;
      }
    }
  }[];
}

const POSITIONS = ["Tất cả", "Grooming & Spa", "Bác sĩ thú y", "Huấn luyện viên", "Khác"];

const inputCls = "w-full bg-[#eef5f3] rounded-xl px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-[#006b62]/20 transition-all";
const labelCls = "block text-xs font-bold text-[#56615f] mb-1.5 uppercase tracking-wide";

function AvatarCircle({ src, name, size = 10 }: { src: string | null; name: string; size?: number }) {
  const letter = name?.trim()[0]?.toUpperCase() ?? "?";
  const sizeCls = `w-${size} h-${size}`;
  if (src) return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} className={`${sizeCls} rounded-full object-cover`} />
  );
  return (
    <div className={`${sizeCls} rounded-full bg-[#006b62] text-white flex items-center justify-center font-bold text-base flex-shrink-0`}>
      {letter}
    </div>
  );
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterPos, setFilterPos] = useState("Tất cả");
  const [filterActive, setFilterActive] = useState<"" | "true" | "false">("");

  // Schedule view
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [scheduleDate, setScheduleDate] = useState(() => {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
  });
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekRange = (offset: number) => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay() + (offset * 7);
    const start = new Date(curr.setDate(first));
    start.setHours(0, 0, 0, 0);
    const end = new Date(start.getTime());
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Add form
  const [addForm, setAddForm] = useState({ full_name: "", phone: "", email: "", position: "" });
  const [addAvatarFile, setAddAvatarFile] = useState<File | null>(null);
  const [addAvatarPreview, setAddAvatarPreview] = useState<string | null>(null);
  const addFileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const LEGEND = [
    { label: "Tắm & Sấy", color: "bg-[#e3f2fd]", border: "border-[#90caf9]", text: "text-[#1565c0]" },
    { label: "Cắt tỉa lông", color: "bg-[#fff3e0]", border: "border-[#ffcc80]", text: "text-[#e65100]" },
    { label: "Vệ sinh & Spa", color: "bg-[#f3e5f5]", border: "border-[#ce93d8]", text: "text-[#6a1b9a]" },
    { label: "Y tế & Khám bệnh", color: "bg-[#ffebee]", border: "border-[#ef9a9a]", text: "text-[#c62828]" },
    { label: "Khác", color: "bg-[#f5f5f5]", border: "border-[#e0e0e0]", text: "text-[#616161]" },
  ];

  const getCategoryColors = (cat?: string | null) => {
    return LEGEND.find(l => l.label === cat) || LEGEND[4];
  };

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const p = new URLSearchParams();
      if (search) p.set("search", search);
      if (filterPos !== "Tất cả") p.set("position", filterPos);
      if (filterActive !== "") p.set("is_active", filterActive);
      const res = await fetch(`/api/staff?${p}`);
      if (!res.ok) throw new Error("Không tải được danh sách nhân viên");
      setStaffList(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [search, filterPos, filterActive]);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalAll = staffList.length;
  const totalActive = staffList.filter(s => s.is_active).length;
  const totalInactive = staffList.filter(s => !s.is_active).length;

  // ── Add avatar handler ─────────────────────────────────────────────────────
  const handleAddAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddAvatarFile(file);
    setAddAvatarPreview(URL.createObjectURL(file));
  };

  // ── Add submit ─────────────────────────────────────────────────────────────
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.full_name.trim()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("full_name", addForm.full_name.trim());
      if (addForm.phone) fd.append("phone", addForm.phone);
      if (addForm.email) fd.append("email", addForm.email);
      if (addForm.position) fd.append("position", addForm.position);
      if (addAvatarFile) fd.append("avatar", addAvatarFile);

      const res = await fetch("/api/staff", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Thêm thất bại");
      }
      showToast("✓ Thêm nhân viên thành công!");
      setShowAdd(false);
      setAddForm({ full_name: "", phone: "", email: "", position: "" });
      setAddAvatarFile(null);
      setAddAvatarPreview(null);
      fetchStaff();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle is_active ───────────────────────────────────────────────────────
  const toggleActive = async (staff: StaffMember) => {
    const newVal = !staff.is_active;
    setStaffList(prev => prev.map(s => s.staff_id === staff.staff_id ? { ...s, is_active: newVal } : s));
    await fetch(`/api/staff/${staff.staff_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: newVal }),
    });
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const deleteStaff = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa nhân viên này?")) return;
    await fetch(`/api/staff/${id}`, { method: "DELETE" });
    setEditStaff(null);
    showToast("✓ Đã xóa nhân viên");
    fetchStaff();
  };

  const hasFilter = filterPos !== "Tất cả" || filterActive !== "" || search !== "";

  return (
    <div className="min-h-screen relative">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] bg-[#006b62] text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-sm animate-fade-in">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#2a3433]">Quản lý nhân viên</h2>
          <p className="text-[#56615f] text-sm mt-1">Tổng cộng {totalAll} nhân viên trong hệ thống</p>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={() => setShowAdd(true)}
            className="bg-[#006b62] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-base">person_add</span>
            Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Stats — 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#a9b4b1]/10">
          <div className="w-11 h-11 bg-[#82f6e7]/30 rounded-2xl flex items-center justify-center text-[#006b62] mb-4">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
          </div>
          <p className="text-xs font-bold text-[#56615f] uppercase tracking-wider mb-1">Tổng nhân viên</p>
          <h3 className="text-3xl font-extrabold text-[#2a3433]">{totalAll}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-emerald-400">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
          </div>
          <p className="text-xs font-bold text-[#56615f] uppercase tracking-wider mb-1">Đang hoạt động</p>
          <h3 className="text-3xl font-extrabold text-[#2a3433]">{totalActive}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-red-400">
          <div className="w-11 h-11 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-4">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_off</span>
          </div>
          <p className="text-xs font-bold text-[#56615f] uppercase tracking-wider mb-1">Chưa hoạt động</p>
          <h3 className="text-3xl font-extrabold text-[#2a3433]">{totalInactive}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-8 flex flex-wrap gap-3 items-end">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#a9b4b1] text-lg">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc SĐT..."
            className="w-full bg-[#eef5f3] rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#006b62]/20"
          />
        </div>

        {/* Position filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-1">Chức vụ</label>
          <select
            value={filterPos}
            onChange={e => setFilterPos(e.target.value)}
            className="bg-[#eef5f3] rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-[#006b62]/20 font-medium"
          >
            {POSITIONS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        {/* Status filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase text-[#a9b4b1] mb-1 ml-1">Trạng thái</label>
          <select
            value={filterActive}
            onChange={e => setFilterActive(e.target.value as "" | "true" | "false")}
            className="bg-[#eef5f3] rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-[#006b62]/20 font-medium"
          >
            <option value="">Tất cả</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Chưa hoạt động</option>
          </select>
        </div>

        {hasFilter && (
          <button
            onClick={() => { setSearch(""); setFilterPos("Tất cả"); setFilterActive(""); }}
            className="bg-[#c6eae3] text-[#375853] px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-95 transition-all"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-[#a9b4b1]/10">
        <div className="p-6 border-b border-[#a9b4b1]/10 flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#2a3433]">Danh sách nhân viên</h3>
          <button onClick={fetchStaff} className="p-2 hover:bg-[#eef5f3] rounded-lg transition-all text-[#56615f]">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>

        {error && (
          <div className="px-8 py-3 bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <div className="overflow-x-auto min-h-[260px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5f3]/60">
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Nhân viên</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Chức vụ</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">SĐT</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Email</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Trạng thái</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/5">
              {loading ? (
                <tr><td colSpan={6} className="py-16 text-center">
                  <div className="flex items-center justify-center gap-2 text-[#56615f]">
                    <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
                    Đang tải...
                  </div>
                </td></tr>
              ) : staffList.length === 0 ? (
                <tr><td colSpan={6} className="py-16 text-center text-[#56615f]">
                  <span className="material-symbols-outlined text-4xl block mb-2 opacity-30">person_search</span>
                  Không tìm thấy nhân viên nào.
                </td></tr>
              ) : staffList.map(s => (
                <tr key={s.staff_id} className={`hover:bg-[#eef5f3]/40 transition-colors ${!s.is_active ? "opacity-60" : ""}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <AvatarCircle src={s.avatar} name={s.full_name} size={10} />
                      <div>
                        <p className="font-semibold text-[#2a3433] text-sm">{s.full_name}</p>
                        <p className="text-xs text-[#a9b4b1]">#{String(s.staff_id).padStart(3, "0")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-[#56615f]">{s.position || "—"}</td>
                  <td className="py-4 px-6 text-sm text-[#56615f]">{s.phone || "—"}</td>
                  <td className="py-4 px-6 text-sm text-[#56615f]">{s.email || "—"}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleActive(s)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${s.is_active
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.is_active ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                      {s.is_active ? "Đang hoạt động" : "Chưa hoạt động"}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setEditStaff(s)}
                      className="p-2 hover:bg-[#eef5f3] rounded-lg transition-all text-[#006b62]"
                      title="Chỉnh sửa"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                      onClick={() => deleteStaff(s.staff_id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-all text-red-400 hover:text-red-600 ml-1"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 bg-[#eef5f3]/30 text-xs text-[#56615f] font-medium">
          Hiển thị {staffList.length} nhân viên
        </div>
      </div>

      {/* ── Schedule Section ──────────────────────────────────────────────── */}
      {viewMode === 'day' ? (
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-[#2a3433]">Lịch trình làm việc trong ngày</h4>
              <p className="text-xs text-[#56615f] mt-1">Nhấn vào nhân viên trong bảng để xem chi tiết lịch</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
                className="bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-2 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none cursor-pointer"
              />
              <button
                onClick={() => setScheduleDate(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0])}
                className="text-xs font-bold text-[#006b62] bg-[#cafdd4]/30 hover:bg-[#cafdd4] px-4 py-2.5 rounded-xl transition-colors"
              >
                Hôm nay
              </button>
              <div className="flex bg-[#eef5f3] p-1 rounded-full border border-[#a9b4b1]/30 ml-2">
                <button onClick={() => setViewMode('day')}
                  className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#006b62] text-white shadow-sm"
                >Lịch ngày</button>
                <button onClick={() => setViewMode('week')}
                  className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all text-[#56615f] hover:text-[#2a3433]"
                >Lịch tuần</button>
              </div>
            </div>
          </div>

          {/* Legend moved to top */}
          <div className="mb-6 pb-4 border-b border-[#e7f0ed] flex flex-wrap gap-4">
            {LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded-sm ${l.color} border border-l-2 ${l.border}`} />
                <span className="text-[10px] font-bold text-[#56615f] uppercase">{l.label}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div className="min-w-[1600px]">
              {/* Time Header */}
              <div className="grid grid-cols-[160px_1fr] border-b border-[#e7f0ed] pb-3 mb-2">
                <div className="text-xs font-bold text-[#a9b4b1] uppercase">Nhân viên</div>
                <div className="grid text-left text-[10px] font-bold text-[#a9b4b1]" style={{ gridTemplateColumns: 'repeat(30,minmax(0,1fr))' }}>
                  {['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h'].map(h => (
                    <div key={h} className="relative pl-1 border-l border-[#e7f0ed]/60" style={{ gridColumn: 'span 2' }}>
                      <span>{h}</span>
                      <span className="absolute left-1/2 top-1/2 -translate-y-1/2 text-[12px] opacity-40">•</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Rows */}
              {staffList.length === 0 ? (
                <div className="py-12 text-center text-[#a9b4b1] text-sm">Chưa có nhân viên nào để hiển thị lịch.</div>
              ) : staffList.map(s => {
                const isSelected = selectedId === s.staff_id;

                // Build target day's timeline slots (08:00 to 23:00)
                const targetDateStr = new Date(scheduleDate).toDateString();
                const todaySchedules = s.staff_schedules?.filter(sch => new Date(sch.work_date).toDateString() === targetDateStr) || [];

                // Map schedules to 30-minute slots (index 0 = 08:00, index 29 = 22:30)
                const slotsArray = Array.from({ length: 30 }, () => null as any);
                todaySchedules.forEach(sch => {
                  const safeStartStr = sch.start_time.replace('1970-01-01', '2024-01-01');
                  const safeEndStr = sch.end_time.replace('1970-01-01', '2024-01-01');
                  const start = new Date(safeStartStr);
                  const end = new Date(safeEndStr);
                  const hr = start.getHours();
                  const min = start.getMinutes();

                  if (hr >= 8 && hr <= 22) {
                    const startIdx = (hr - 8) * 2 + (min >= 30 ? 1 : 0);
                    const durationMins = (end.getTime() - start.getTime()) / 60000;
                    const span = Math.max(1, Math.ceil(durationMins / 30));

                    if (startIdx < 30) {
                      slotsArray[startIdx] = { ...sch, span };
                      for (let i = 1; i < span; i++) {
                        if (startIdx + i < 30) slotsArray[startIdx + i] = "taken";
                      }
                    }
                  }
                });

                return (
                  <div key={s.staff_id}
                    className={`grid grid-cols-[160px_1fr] py-3 items-center border-b border-[#e7f0ed]/50 cursor-pointer transition-colors ${isSelected ? 'bg-[#eef5f3]' : 'hover:bg-[#eef5f3]/30'
                      }`}
                    onClick={() => setSelectedId(isSelected ? null : s.staff_id)}
                  >
                    <div className="flex items-center gap-2 pr-3">
                      <AvatarCircle src={s.avatar} name={s.full_name} size={8} />
                      <span className="text-xs font-bold text-[#2a3433] truncate">{s.full_name.split(' ').slice(-2).join(' ')}</span>
                    </div>
                    <div className={`grid gap-1 transition-all duration-300 ${isSelected ? 'h-20' : 'h-8'}`}
                      style={{ gridTemplateColumns: 'repeat(30,minmax(0,1fr))' }}>
                      {slotsArray.map((sch, idx) => {
                        if (sch === "taken") return null;
                        if (!sch) return <div key={idx} className="bg-[#eef5f3]/40 rounded-md" />;

                        const cat = sch.appointments?.services?.category;
                        const colors = getCategoryColors(cat);
                        return (
                          <div key={idx}
                            onClick={(e) => { e.stopPropagation(); setSelectedSchedule(sch); }}
                            style={{ gridColumn: `span ${sch.span}` }}
                            className={`rounded-md overflow-hidden ${colors.color} border-l-4 ${colors.border} ${colors.text} cursor-pointer hover:shadow-md transition-shadow ${isSelected ? 'flex flex-col p-1.5 text-[9px] font-bold' : 'flex items-center justify-center text-[8px] font-bold'
                              }`}>
                            {isSelected && (
                              <span className="mb-0.5 opacity-90 text-[8px] font-medium tracking-wider">
                                {new Date(sch.start_time.replace('1970-01-01', '2024-01-01')).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(sch.end_time.replace('1970-01-01', '2024-01-01')).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                            <span className="truncate w-full">{sch.appointments?.services?.service_name || "Dịch vụ"}</span>
                            {isSelected && sch.appointments?.pet_name && (
                              <span className="flex items-center gap-0.5 mt-auto bg-white/50 px-1 py-0.5 rounded text-[8px] w-max max-w-full truncate">
                                <span className="material-symbols-outlined text-[10px] shrink-0">pets</span>
                                <span className="truncate">{sch.appointments.pet_name}</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ── Week Calendar ─────────────────────────────────────────────────── */
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-8" style={{ height: 800 }}>
          {/* Controls */}
          <div className="p-6 border-b border-[#e7f0ed] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={() => setWeekOffset(w => w - 1)} className="w-9 h-9 rounded-full bg-[#eef5f3] hover:bg-[#e1eae7] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <h3 className="text-base font-bold text-[#2a3433]">Lịch làm việc tuần</h3>
              <button onClick={() => setWeekOffset(w => w + 1)} className="w-9 h-9 rounded-full bg-[#eef5f3] hover:bg-[#e1eae7] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setWeekOffset(0)} className="text-xs font-bold text-[#006b62] bg-[#eef5f3] hover:bg-[#e1eae7] px-4 py-2 rounded-full transition-colors">
                Tuần hiện tại
              </button>
              <div className="flex bg-[#eef5f3] p-1 rounded-full border border-[#a9b4b1]/30 ml-2">
                <button onClick={() => setViewMode('day')}
                  className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all text-[#56615f] hover:text-[#2a3433]"
                >Lịch ngày</button>
                <button onClick={() => setViewMode('week')}
                  className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#006b62] text-white shadow-sm"
                >Lịch tuần</button>
              </div>
            </div>
          </div>

          {/* Legend moved to top */}
          <div className="px-6 py-4 flex flex-wrap gap-4 border-b border-[#e7f0ed]">
            {LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded-sm ${l.color} border border-l-2 ${l.border}`} />
                <span className="text-[10px] font-bold text-[#56615f] uppercase">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="overflow-auto h-[calc(100%-140px)]">
            <div className="min-w-[1100px] h-full flex flex-col">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-[#e7f0ed] bg-white sticky top-0 z-10">
                {['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map((day, i) => {
                  const { start } = getWeekRange(weekOffset);
                  const d = new Date(start.getTime());
                  d.setDate(d.getDate() + i);
                  const isToday = new Date().toDateString() === d.toDateString();
                  return (
                    <div key={i} className={`p-4 text-center border-r last:border-r-0 border-[#e7f0ed] ${isToday ? 'bg-[#82f6e7]/10' : ''}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isToday ? 'text-[#006b62]' : 'text-[#56615f]'}`}>{day}</p>
                      <p className={`text-2xl font-light ${isToday ? 'text-[#006b62] font-bold' : 'text-[#2a3433]'}`}>{d.getDate()}</p>
                    </div>
                  );
                })}
              </div>
              {/* Event columns */}
              <div className="grid grid-cols-7 flex-1 bg-white">
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const { start, end } = getWeekRange(weekOffset);
                  const daySchedules = staffList.flatMap(s => s.staff_schedules || [])
                    .filter(sch => {
                      const d = new Date(sch.work_date);
                      return d >= start && d <= end && d.getDay() === dayIdx;
                    });

                  const d = new Date(start.getTime());
                  d.setDate(d.getDate() + dayIdx);
                  const isToday = new Date().toDateString() === d.toDateString();

                  return (
                    <div key={dayIdx} className="border-r border-[#e7f0ed] p-2 flex flex-col gap-2 relative">
                      {isToday && (
                        <div className="absolute w-full h-0.5 bg-[#006b62] left-0 top-[42%] z-10">
                          <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full bg-[#006b62]" />
                        </div>
                      )}

                      {daySchedules.length === 0 ? (
                        <div className="text-center mt-12 text-sm text-[#56615f] opacity-40 font-medium">Trống lịch</div>
                      ) : daySchedules.map(sch => {
                        const cat = sch.appointments?.services?.category;
                        const colors = getCategoryColors(cat);
                        const safeStartStr = sch.start_time.replace('1970-01-01', '2024-01-01');
                        const safeEndStr = sch.end_time.replace('1970-01-01', '2024-01-01');
                        const start = new Date(safeStartStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                        const end = new Date(safeEndStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

                        return (
                          <div key={sch.schedule_id}
                            onClick={(e) => { e.stopPropagation(); setSelectedSchedule(sch); }}
                            className={`${colors.color} border ${colors.border} rounded-lg p-3 shadow-sm relative z-0 cursor-pointer hover:shadow-md transition-shadow`}>
                            <div className="flex justify-between items-start mb-1">
                              <p className={`text-[11px] font-bold ${colors.text}`}>{sch.appointments?.services?.service_name}</p>
                              <span className={`text-[9px] bg-white/50 ${colors.text} px-1.5 py-0.5 rounded`}>{start}-{end}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-[#56615f]">
                              <span className="material-symbols-outlined text-[12px]">pets</span>{sch.appointments?.pet_name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Modal ─────────────────────────────────────────────────────── */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative my-4">
            <button onClick={() => { setShowAdd(false); setAddAvatarPreview(null); setAddAvatarFile(null); }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-xl font-bold text-[#2a3433] mb-6">Thêm nhân viên mới</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Avatar upload */}
              <div className="flex flex-col items-center mb-2">
                <label htmlFor="add-avatar-input" className="cursor-pointer group">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#eef5f3] shadow-md">
                    {addAvatarPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={addAvatarPreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#006b62] flex items-center justify-center text-white text-3xl font-bold">
                        {addForm.full_name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                </label>
                <input id="add-avatar-input" ref={addFileRef} type="file" accept="image/jpeg,image/png,image/webp"
                  className="hidden" onChange={handleAddAvatarChange} />
                <p className="text-xs text-[#56615f] mt-2">
                  {addAvatarPreview ? "✓ Ảnh đã chọn" : "Nhấn vào ảnh để tải lên"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Họ và tên <span className="text-red-500">*</span></label>
                  <input required className={inputCls} placeholder="Nguyễn Văn An"
                    value={addForm.full_name} onChange={e => setAddForm(f => ({ ...f, full_name: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Chức vụ</label>
                  <select className={inputCls}
                    value={addForm.position} onChange={e => setAddForm(f => ({ ...f, position: e.target.value }))}>
                    <option value="">-- Chọn chức vụ --</option>
                    {POSITIONS.slice(1).map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Số điện thoại</label>
                  <input className={inputCls} placeholder="0901 234 567"
                    value={addForm.phone} onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" className={inputCls} placeholder="nv@petcare.vn"
                    value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdd(false)}
                  className="px-6 py-2.5 rounded-full font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                  Hủy
                </button>
                <button type="submit" disabled={saving}
                  className="px-6 py-2.5 rounded-full font-bold bg-[#006b62] text-white shadow-lg hover:bg-[#005e56] disabled:opacity-60 transition-all flex items-center gap-2">
                  {saving && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                  {saving ? "Đang lưu..." : "Thêm nhân viên"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Modal ────────────────────────────────────────────────────── */}
      {editStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setEditStaff(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-4 mb-6">
              <AvatarCircle src={editStaff.avatar} name={editStaff.full_name} size={16} />
              <div>
                <h3 className="text-xl font-bold text-[#2a3433]">{editStaff.full_name}</h3>
                <p className="text-sm text-[#56615f]">{editStaff.position || "Chưa có chức vụ"}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {editStaff.phone && <div className="flex gap-2 items-center text-[#56615f]">
                <span className="material-symbols-outlined text-[#006b62] text-base">phone</span>{editStaff.phone}
              </div>}
              {editStaff.email && <div className="flex gap-2 items-center text-[#56615f]">
                <span className="material-symbols-outlined text-[#006b62] text-base">mail</span>{editStaff.email}
              </div>}
            </div>
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
              <button onClick={() => deleteStaff(editStaff.staff_id)}
                className="px-5 py-2 rounded-full font-bold bg-red-50 text-red-600 hover:bg-red-100 text-sm transition-all">
                Xóa nhân viên
              </button>
              <button onClick={() => setEditStaff(null)}
                className="px-5 py-2 rounded-full font-bold bg-gray-100 text-gray-600 text-sm">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Details Modal */}
      {selectedSchedule && (() => {
        const sch = selectedSchedule;
        const appt = sch.appointments;
        const customer = appt?.customers;
        const pet = customer?.pets?.find((p: any) => p.name.toLowerCase() === appt?.pet_name?.toLowerCase());

        const safeStart = new Date(sch.start_time.replace('1970-01-01', '2024-01-01')).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const safeEnd = new Date(sch.end_time.replace('1970-01-01', '2024-01-01')).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const workDate = new Date(sch.work_date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

        return (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedSchedule(null)}
                className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="text-2xl font-extrabold text-[#2a3433] mb-2 border-b border-gray-100 pb-4">
                {appt?.services?.service_name || "Dịch vụ"}
              </h3>

              <div className="space-y-5 mt-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#006b62]">schedule</span>
                    <h4 className="text-sm font-bold text-[#2a3433]">Thời gian</h4>
                  </div>
                  <p className="text-sm text-[#56615f] pl-8">{workDate} | {safeStart} - {safeEnd}</p>
                </div>

                {customer && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#006b62]">person</span>
                      <h4 className="text-sm font-bold text-[#2a3433]">Khách hàng</h4>
                    </div>
                    <p className="text-sm text-[#56615f] pl-8">
                      <span className="font-semibold">{customer.full_name}</span>
                      {customer.phone && <span> - {customer.phone}</span>}
                    </p>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#006b62]">pets</span>
                    <h4 className="text-sm font-bold text-[#2a3433]">Thú cưng</h4>
                  </div>
                  <div className="text-sm text-[#56615f] pl-8 bg-gray-50 p-3 rounded-xl">
                    <p className="font-semibold text-[#006b62] text-base mb-1">{appt?.pet_name}</p>
                    {pet ? (
                      <div className="flex gap-4 text-xs">
                        <span><b className="font-medium">Loài:</b> {pet.type === 'dog' ? 'Chó' : (pet.type === 'cat' ? 'Mèo' : pet.type)}</span>
                        <span><b className="font-medium">Giống:</b> {pet.breed || 'Không rõ'}</span>
                        {pet.weight && <span><b className="font-medium">Cân nặng:</b> {Number(pet.weight)}kg</span>}
                      </div>
                    ) : (
                      <p className="text-xs italic text-gray-500">Chưa có thông tin chi tiết</p>
                    )}
                  </div>
                </div>

                {appt?.note && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#006b62]">description</span>
                      <h4 className="text-sm font-bold text-[#2a3433]">Lưu ý</h4>
                    </div>
                    <p className="text-sm text-[#56615f] pl-8 whitespace-pre-wrap italic">{appt.note}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedSchedule(null)}
                  className="px-6 py-2.5 rounded-full font-bold bg-[#eef5f3] text-[#56615f] hover:bg-[#d9e5e2] transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}

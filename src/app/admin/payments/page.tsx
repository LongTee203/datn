"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface Payment {
  payment_id: number;
  source_type: string;
  source_id: number;
  amount: number;
  payment_method: string | null;
  receipt_image: string | null;
  status: "processing" | "paid" | "cancelled";
  description: string | null;
  created_at: string;
  assigned_staff?: string | null;
}

const STATUS_LABEL: Record<string, string> = {
  processing: "Đang xử lý",
  paid:       "Thành công",
  cancelled:  "Đã hủy",
};

const STATUS_STYLE: Record<string, string> = {
  paid:       "bg-[#82f6e7] text-[#005c54]",
  processing: "bg-[#fef0c7] text-[#dc6803]",
  cancelled:  "bg-[#fee4e2] text-[#d92d20]",
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [activeTab, setActiveTab] = useState<"order" | "appointment">("order");
  const [receiptViewUrl, setReceiptViewUrl] = useState<string | null>(null);

  // Fixed-position dropdown portal
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMenu = (id: number, btn: HTMLButtonElement) => {
    if (openMenuId === id) { setOpenMenuId(null); return; }
    const rect = btn.getBoundingClientRect();
    const MENU_H = 132;
    const top = window.innerHeight - rect.bottom < MENU_H ? rect.top - MENU_H - 4 : rect.bottom + 4;
    setMenuPos({ top, left: rect.right - 176 });
    setOpenMenuId(id);
  };

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.set("status", filterStatus);
      if (filterDate) params.set("date", filterDate);
      
      const res = await fetch(`/api/payments?${params.toString()}`);
      if (res.ok) setPayments(await res.json());
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterDate]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const updateStatus = async (id: number, newStatus: string) => {
    setOpenMenuId(null);
    setPayments(prev => prev.map(p => p.payment_id === id ? { ...p, status: newStatus as "processing" | "paid" | "cancelled" } : p));
    await fetch(`/api/payments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  }

  function formatDateTime(dt: string) {
    if (!dt) return { time: "--:--", date: "---" };
    const d = new Date(dt);
    return {
      time: d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      date: d.toLocaleDateString("vi-VN", { day: "2-digit", month: "numeric", year: "numeric" }),
    };
  }

  const filtered = payments.filter(p => p.source_type === activeTab);
  const totalRevenue    = payments.filter(p => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0);
  const bankCount       = payments.filter(p => p.payment_method === "Chuyển khoản").length;
  const cashCount       = payments.filter(p => p.payment_method !== "Chuyển khoản").length;
  const processingCount = payments.filter(p => p.status === "processing").length;
  const orderCount      = payments.filter(p => p.source_type === "order").length;
  const apptCount       = payments.filter(p => p.source_type === "appointment").length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Quản lý Thanh toán</h1>
        <p className="text-[#56615f] font-medium mt-1">Theo dõi và quản lý các dòng tiền vào/ra của hệ thống</p>
      </div>

      {/* Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="md:col-span-2 bg-gradient-to-br from-[#006b62] to-[#005e56] p-8 rounded-[2rem] text-[#e2fff9] shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[#82f6e7]/80 font-bold uppercase tracking-widest text-xs mb-2">Tổng đã thanh toán</p>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tighter">
              {formatCurrency(totalRevenue)}
            </h2>
            <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-sm">pending_actions</span>
              <span className="text-sm font-semibold">{processingCount} giao dịch đang xử lý</span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#82f6e7]/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#c6eae3]/30 flex items-center justify-center text-[#446560] mb-4">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <p className="text-[#56615f] font-semibold text-sm">Chuyển khoản</p>
          <h3 className="text-2xl font-bold text-[#2a3433] mt-1">{bankCount} giao dịch</h3>
        </div>
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578] mb-4">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <p className="text-[#56615f] font-semibold text-sm">Tiền mặt / Tại chỗ</p>
          <h3 className="text-2xl font-bold text-[#2a3433] mt-1">{cashCount} giao dịch</h3>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-[1.5rem] overflow-visible shadow-[0px_10px_40px_rgba(42,52,51,0.06)] mb-10 pb-4">
        {/* Tab Header */}
        <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#eef5f3]/50 rounded-t-[1.5rem] border-b border-[#a9b4b1]/10">
          <div className="flex gap-1 bg-[#e1eae7] p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("order")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "order"
                  ? "bg-white text-[#006b62] shadow-sm"
                  : "text-[#56615f] hover:text-[#2a3433]"
              }`}
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              Đặt hàng
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === "order" ? "bg-[#82f6e7] text-[#005c54]" : "bg-[#c6eae3] text-[#446560]"}`}>
                {orderCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("appointment")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "appointment"
                  ? "bg-white text-[#006b62] shadow-sm"
                  : "text-[#56615f] hover:text-[#2a3433]"
              }`}
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              Dịch vụ
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === "appointment" ? "bg-[#82f6e7] text-[#005c54]" : "bg-[#c6eae3] text-[#446560]"}`}>
                {apptCount}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#727d7a]">Ngày:</span>
              <input
                type="date"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                className="text-sm border border-[#e1eae7] bg-white font-semibold text-[#006b62] rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#006b62]/20 outline-none cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#727d7a]">Lọc:</span>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="text-sm border border-[#e1eae7] bg-white font-semibold text-[#006b62] rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#006b62]/20 outline-none cursor-pointer"
              >
                <option value="all">Tất cả</option>
                <option value="paid">Thành công</option>
                <option value="processing">Đang xử lý</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            {(filterDate || filterStatus !== "all") && (
              <button
                onClick={() => { setFilterDate(""); setFilterStatus("all"); }}
                className="text-xs font-bold text-[#d92d20] hover:bg-[#fee4e2] px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                Xóa lọc
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#a9b4b1]/10">
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Mã GD</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Thời gian</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">{activeTab === "appointment" ? "Nhân viên" : "Nội dung"}</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Số tiền</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Hình thức</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Trạng thái</th>
                <th className="px-8 py-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#56615f]">
                      <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
                      Đang tải...
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-16 text-center text-[#a9b4b1]">
                    <span className="material-symbols-outlined text-4xl block mb-3 opacity-40">receipt_long</span>
                    Chưa có giao dịch nào.{" "}
                    {activeTab === "order"
                      ? "Cập nhật trạng thái đơn hàng sang \"Đang giao\" hoặc \"Đã giao\" để tạo giao dịch."
                      : "Cập nhật trạng thái lịch hẹn sang \"Đã xác nhận\" hoặc \"Hoàn thành\" để tạo giao dịch."}
                  </td>
                </tr>
              ) : filtered.map(p => {
                const { time, date } = formatDateTime(p.created_at);
                const isBank = p.payment_method === "Chuyển khoản";
                return (
                  <tr key={p.payment_id} className="hover:bg-[#eef5f3]/40 transition-colors">
                    <td className="px-8 py-4">
                      <span className="font-mono text-sm font-bold text-[#006b62]">
                        #{p.source_type === "order" ? "ORD" : "APT"}-{String(p.source_id).padStart(5, "0")}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-[#2a3433]">{time}</p>
                      <p className="text-[10px] text-[#727d7a] font-medium">{date}</p>
                    </td>
                    <td className="px-8 py-4 max-w-[240px]">
                      <span className={`text-sm font-semibold truncate block ${p.source_type === "appointment" && !p.assigned_staff ? "text-[#a9b4b1] italic" : "text-[#2a3433]"}`}>
                        {p.source_type === "appointment" 
                          ? (p.assigned_staff ? p.assigned_staff : "Chưa phân công")
                          : (p.description || `Đơn hàng #${p.source_id}`)}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-sm font-extrabold text-[#2a3433]">{formatCurrency(Number(p.amount))}</span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#727d7a]">{p.payment_method || "Tiền mặt"}</span>
                        {isBank && p.receipt_image && (
                          <button
                            onClick={() => setReceiptViewUrl(p.receipt_image)}
                            className="w-7 h-7 rounded-full bg-[#eef5f3] hover:bg-[#c6eae3] flex items-center justify-center text-[#006b62] transition-colors"
                            title="Xem ảnh chuyển khoản"
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${STATUS_STYLE[p.status] ?? "bg-gray-100 text-gray-500"}`}>
                        {STATUS_LABEL[p.status] ?? p.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={e => toggleMenu(p.payment_id, e.currentTarget as HTMLButtonElement)}
                        className="w-8 h-8 rounded-full hover:bg-[#e1eae7] flex items-center justify-center text-[#727d7a] hover:text-[#006b62] transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed dropdown portal */}
      {openMenuId !== null && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: menuPos.top, left: menuPos.left, zIndex: 9999 }}
          className="w-44 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-2 text-xs font-bold text-[#727d7a] uppercase tracking-wider bg-gray-50 border-b border-gray-100">
            Cập nhật trạng thái
          </div>
          <button onClick={() => updateStatus(openMenuId, "paid")}       className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef5f3] transition-colors">✓ Thành công</button>
          <button onClick={() => updateStatus(openMenuId, "processing")} className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#eef5f3] transition-colors">⏳ Đang xử lý</button>
          <button onClick={() => updateStatus(openMenuId, "cancelled")}  className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">✕ Hủy giao dịch</button>
        </div>
      )}

      {/* Receipt Image Viewer Modal */}
      {receiptViewUrl && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setReceiptViewUrl(null)}
        >
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-[#2a3433]">Ảnh chuyển khoản</h3>
              <button
                onClick={() => setReceiptViewUrl(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#56615f] transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={receiptViewUrl} alt="Ảnh chuyển khoản" className="w-full rounded-2xl object-contain max-h-[60vh]" />
          </div>
        </div>
      )}
    </div>
  );
}

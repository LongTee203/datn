"use client";

import React, { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TopItem { name: string; count: number; revenue: number; }

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalAppointments: number;
  orderRevenue: number;
  apptRevenue: number;
  top5Services: TopItem[];
  top5Products: TopItem[];
}

// ─── Donut chart helper ───────────────────────────────────────────────────────
function DonutChart({ orderRev, apptRev }: { orderRev: number; apptRev: number }) {
  const total = orderRev + apptRev || 1;
  const R = 80;
  const circumference = 2 * Math.PI * R;

  const orderPct = orderRev / total;
  const apptPct = apptRev / total;

  const orderDash = circumference * orderPct;
  const apptDash = circumference * apptPct;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* background ring */}
        <circle cx="100" cy="100" r={R} fill="none" stroke="#eef5f3" strokeWidth="24" />
        {/* Dịch vụ segment */}
        <circle
          cx="100" cy="100" r={R} fill="none"
          stroke="#006b62" strokeWidth="24"
          strokeDasharray={`${orderPct === 0 ? 0 : orderDash} ${circumference}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        {/* Đặt lịch segment */}
        <circle
          cx="100" cy="100" r={R} fill="none"
          stroke="#346578" strokeWidth="24"
          strokeDasharray={`${apptPct === 0 ? 0 : apptDash} ${circumference}`}
          strokeDashoffset={circumference * 0.25 - orderDash}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-[#56615f] uppercase tracking-widest">Doanh thu</span>
        <span className="text-xl font-extrabold text-[#2a3433] mt-0.5">
          {((orderRev + apptRev) / 1_000_000).toFixed(1)}M
        </span>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatCurrency(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M đ";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K đ";
  return n.toLocaleString("vi-VN") + "đ";
}

function formatDate(d: string) {
  if (!d) return "";
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

// ─── Top Table ────────────────────────────────────────────────────────────────
function TopTable({ title, subtitle, icon, items, emptyMsg }: {
  title: string; subtitle: string; icon: string;
  items: TopItem[]; emptyMsg: string;
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0px_10px_40px_rgba(42,52,51,0.06)]">
      <div className="px-8 py-6 border-b border-[#a9b4b1]/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#eef5f3] flex items-center justify-center text-[#006b62]">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#2a3433]">{title}</h3>
          <p className="text-xs text-[#56615f]">{subtitle}</p>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="py-14 text-center text-[#a9b4b1]">
          <span className="material-symbols-outlined text-3xl block mb-2 opacity-40">bar_chart</span>
          {emptyMsg}
        </div>
      ) : (
        <div className="divide-y divide-[#a9b4b1]/10">
          {items.map((item, i) => {
            const maxCount = items[0].count || 1;
            const barPct = Math.round((item.count / maxCount) * 100);
            return (
              <div key={i} className="px-8 py-4 hover:bg-[#f8fbfb] transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#eef5f3] text-[#006b62] text-xs font-extrabold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-[#2a3433] truncate max-w-[180px]">{item.name}</span>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-sm font-bold text-[#006b62]">{item.count.toLocaleString()}</span>
                    <span className="text-[10px] text-[#727d7a] ml-1">lượt</span>
                    <p className="text-xs text-[#56615f]">{formatCurrency(item.revenue)}</p>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-[#eef5f3] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#006b62] to-[#82f6e7] transition-all duration-500"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  // Date range — default to current month
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);
  const [showPicker, setShowPicker] = useState(false);

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ startDate, endDate });
      const res = await fetch(`/api/analytics?${params}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const apply = () => { setShowPicker(false); fetchData(); };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams({ startDate, endDate });
      const res = await fetch(`/api/analytics/export?${params}`);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bao_cao_${startDate}_${endDate}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Xuất dữ liệu thất bại. Vui lòng thử lại.");
    } finally {
      setExporting(false);
    }
  };

  const stats = [
    {
      label: "Tổng doanh thu",
      value: data ? formatCurrency(data.totalRevenue) : "—",
      icon: "paid",
      bg: "bg-[#006b62]",
      text: "text-[#e2fff9]",
    },
    {
      label: "Đơn hàng (đã thanh toán)",
      value: data ? data.totalOrders.toString() : "—",
      icon: "shopping_bag",
      bg: "bg-[#346578]",
      text: "text-[#f0faff]",
    },
    {
      label: "Lịch hẹn (đã thanh toán)",
      value: data ? data.totalAppointments.toString() : "—",
      icon: "calendar_month",
      bg: "bg-[#446560]",
      text: "text-[#e2fff9]",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8 flex flex-wrap justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Báo cáo &amp; Thống kê</h2>
            <p className="text-[#56615f] mt-1">
              Dữ liệu được tổng hợp từ các giao dịch đã xác nhận thanh toán.
            </p>
          </div>

          {/* Right: Export + Date picker */}
          <div className="flex items-center gap-3 relative z-30">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="bg-gradient-to-r from-[#006b62] to-[#00897b] text-[#e2fff9] px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {exporting
                ? <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                : <span className="material-symbols-outlined text-base">download</span>
              }
              {exporting ? "Đang xuất..." : "Xuất Excel"}
            </button>

            {/* Date picker */}
            <div className="relative">
              <button
                onClick={() => setShowPicker(p => !p)}
                className="bg-white text-[#2a3433] px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-[#e7f0ed] transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">calendar_today</span>
                {formatDate(startDate)} — {formatDate(endDate)}
                <span className="material-symbols-outlined text-base">{showPicker ? "expand_less" : "expand_more"}</span>
              </button>

              {showPicker && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl p-5 z-50 flex flex-col sm:flex-row gap-4 border border-gray-100 min-w-[320px] animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-bold text-[#56615f] uppercase tracking-wider">Từ ngày</label>
                    <input
                      type="date" value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full bg-[#eef5f3] text-[#2a3433] rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#006b62]/40"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-bold text-[#56615f] uppercase tracking-wider">Đến ngày</label>
                    <input
                      type="date" value={endDate} min={startDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full bg-[#eef5f3] text-[#2a3433] rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#006b62]/40"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={apply}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#006b62] text-white font-bold text-sm hover:bg-[#005e56] transition-colors"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}
            </div> {/* end inner relative div (date picker) */}
          </div> {/* end flex row (export + date picker) */}
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map(s => (
            <div key={s.label} className={`${s.bg} ${s.text} p-7 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-transform`}>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </span>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{s.label}</p>
              {loading
                ? <div className="h-10 w-28 rounded-xl bg-white/20 animate-pulse mt-1" />
                : <h4 className="text-4xl font-extrabold tracking-tight">{s.value}</h4>
              }
            </div>
          ))}
        </div>

        {/* ── Donut chart + legend ── */}
        <div className="bg-white rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-[#2a3433] mb-1">So sánh Doanh thu</h3>
              <p className="text-sm text-[#56615f] mb-6">Đặt hàng vs Dịch vụ</p>
              {loading
                ? <div className="w-[200px] h-[200px] rounded-full bg-[#eef5f3] animate-pulse" />
                : <DonutChart orderRev={data?.orderRevenue ?? 0} apptRev={data?.apptRevenue ?? 0} />
              }
            </div>
            <div className="flex-1 space-y-5 w-full">
              {[
                { label: "Đặt hàng", rev: data?.orderRevenue ?? 0, total: (data?.orderRevenue ?? 0) + (data?.apptRevenue ?? 0), color: "bg-[#006b62]", textColor: "text-[#006b62]" },
                { label: "Dịch vụ", rev: data?.apptRevenue ?? 0, total: (data?.orderRevenue ?? 0) + (data?.apptRevenue ?? 0), color: "bg-[#346578]", textColor: "text-[#346578]" },
              ].map(item => {
                const pct = item.total > 0 ? Math.round((item.rev / item.total) * 100) : 0;
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="font-semibold text-[#2a3433]">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${item.textColor}`}>{pct}%</span>
                        <span className="text-[#56615f] ml-2 text-xs">{formatCurrency(item.rev)}</span>
                      </div>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#eef5f3] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: loading ? "0%" : `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Top 5 tables ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopTable
            title="Top 5 Dịch vụ hàng đầu"
            subtitle="Theo số lịch hẹn đã thanh toán"
            icon="calendar_month"
            items={data?.top5Services ?? []}
            emptyMsg="Chưa có giao dịch dịch vụ nào được xác nhận."
          />
          <TopTable
            title="Top 5 Sản phẩm bán chạy"
            subtitle="Theo số lượng bán từ đơn hàng đã thanh toán"
            icon="shopping_bag"
            items={data?.top5Products ?? []}
            emptyMsg="Chưa có giao dịch đặt hàng nào được xác nhận."
          />
        </div>

      </div>
    </div>
  );
}

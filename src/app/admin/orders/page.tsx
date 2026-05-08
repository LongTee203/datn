"use client";
import React, { useState, useEffect, useCallback } from "react";

interface Order {
  order_id: number;
  customer_id: number;
  total_amount: number;
  order_status: string;
  payment_method: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
}

// Map DB status → Vietnamese label
const STATUS_LABEL: Record<string, string> = {
  Pending:    "Chờ xử lý",
  Processing: "Đang xử lý",
  Shipped:    "Đang giao",
  Completed:  "Đã giao",
  Cancelled:  "Đã hủy",
};

const STATUS_OPTIONS = ["Tất cả", "Pending", "Processing", "Shipped", "Completed", "Cancelled"];

const STATUS_STYLE: Record<string, { badge: string; dot: string }> = {
  Shipped:    { badge: "bg-[#82f6e7] text-[#005c54]",   dot: "bg-[#006b62] animate-pulse" },
  Processing: { badge: "bg-[#b6e7fe] text-[#235669]",   dot: "bg-[#346578]" },
  Pending:    { badge: "bg-[#b6e7fe] text-[#235669]",   dot: "bg-[#346578]" },
  Completed:  { badge: "bg-[#c6eae3] text-[#375853]",   dot: "bg-[#446560]" },
  Cancelled:  { badge: "bg-[#fa746f]/20 text-[#a83836]", dot: "bg-[#a83836]" },
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

function formatDate(dt: string) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("vi-VN", { day: "2-digit", month: "numeric", year: "numeric" });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("Tất cả");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filter !== "Tất cả") params.set("status", filter);
      const res = await fetch(`/api/orders?${params}`);
      if (!res.ok) throw new Error("Không tải được dữ liệu");
      setOrders(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (id: number, newStatus: string) => {
    setOrders(prev => prev.map(o => o.order_id === id ? { ...o, order_status: newStatus } : o));
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch { fetchOrders(); }
  };

  // Summary stats
  const pendingCount   = orders.filter(o => o.order_status === "Pending").length;
  const shippingCount  = orders.filter(o => o.order_status === "Shipped").length;
  const totalRevenue   = orders
    .filter(o => o.order_status === "Completed")
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#2a3433] mb-2">Quản lý đơn hàng</h2>
          <p className="text-[#56615f] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b62] text-base">shopping_bag</span>
            Tổng cộng {orders.length} đơn hàng
          </p>
        </div>
        <div className="flex gap-2 bg-[#eef5f3] p-1 rounded-xl flex-wrap">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${filter === s ? "font-semibold bg-white shadow-sm text-[#006b62]" : "font-medium text-[#56615f] hover:bg-[#e1eae7]"}`}
            >
              {s === "Tất cả" ? "Tất cả" : (STATUS_LABEL[s] ?? s)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#a9b4b1]/10">
            <div className="w-10 h-10 bg-[#82f6e7]/30 rounded-full flex items-center justify-center text-[#006b62] mb-4">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-1">Doanh thu (đã hoàn thành)</p>
            <h3 className="text-2xl font-extrabold text-[#2a3433]">{formatCurrency(totalRevenue)}</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#a9b4b1]/10">
            <div className="w-10 h-10 bg-[#b6e7fe]/30 rounded-full flex items-center justify-center text-[#346578] mb-4">
              <span className="material-symbols-outlined">inventory</span>
            </div>
            <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-1">Đơn chờ xử lý</p>
            <h3 className="text-2xl font-extrabold text-[#2a3433]">{pendingCount} đơn</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#a9b4b1]/10">
            <div className="w-10 h-10 bg-[#c6eae3]/30 rounded-full flex items-center justify-center text-[#446560] mb-4">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-1">Đang vận chuyển</p>
            <h3 className="text-2xl font-extrabold text-[#2a3433]">{shippingCount} đơn</h3>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-[#006b62] rounded-3xl p-6 text-[#e2fff9] relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h4 className="text-lg font-bold mb-1">Tổng đơn hàng</h4>
            <p className="text-[#e2fff9]/70 text-sm">Tất cả trạng thái</p>
          </div>
          <div className="relative z-10">
            <p className="text-4xl font-black">{orders.length}</p>
            <p className="text-[10px] uppercase font-bold opacity-70">Đơn hàng</p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-[#a9b4b1]/10">
        <div className="p-6 border-b border-[#a9b4b1]/10 flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#2a3433]">Danh sách đơn hàng</h3>
          <button onClick={fetchOrders} className="p-2 text-[#56615f] hover:bg-[#e1eae7] rounded-lg transition-all" title="Làm mới">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>

        {error && (
          <div className="px-8 py-3 bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error} — <button onClick={fetchOrders} className="underline">Thử lại</button>
          </div>
        )}

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5f3]/50">
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Mã đơn</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Khách hàng</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Ngày đặt</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Tổng tiền</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Thanh toán</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Trạng thái</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#56615f]">
                      <span className="material-symbols-outlined animate-spin text-[#006b62]">progress_activity</span>
                      Đang tải...
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#56615f]">Không có đơn hàng nào.</td>
                </tr>
              ) : (
                orders.map(order => {
                  const st = order.order_status;
                  const style = STATUS_STYLE[st] ?? { badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
                  const isCancelled = st === "Cancelled";
                  const initials = order.customer_name
                    ? order.customer_name.split(" ").map(w => w[0]).slice(-2).join("").toUpperCase()
                    : "?";

                  return (
                    <tr key={order.order_id} className="hover:bg-[#eef5f3]/50 transition-colors group">
                      <td className="py-5 px-6 font-bold text-[#006b62]">
                        #{String(order.order_id).padStart(4, "0")}
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#c6eae3] text-[#446560] flex items-center justify-center font-bold text-xs">
                            {initials}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${isCancelled ? "text-[#56615f] line-through" : "text-[#2a3433]"}`}>
                              {order.customer_name ?? "Khách vãng lai"}
                            </p>
                            <p className="text-xs text-[#56615f]">{order.customer_phone ?? ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-[#56615f]">{formatDate(order.created_at)}</td>
                      <td className="py-5 px-6">
                        <span className={`text-sm font-extrabold ${isCancelled ? "text-[#56615f] line-through" : "text-[#2a3433]"}`}>
                          {formatCurrency(order.total_amount)}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-[#56615f]">
                            {order.payment_method === "COD" ? "payments" : "account_balance"}
                          </span>
                          <span className="text-xs font-medium text-[#2a3433]">{order.payment_method}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center w-fit gap-1 ${style.badge}`}>
                          <span className={`w-1 h-1 rounded-full ${style.dot}`} />
                          {STATUS_LABEL[st] ?? st}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right relative">
                        <div className="relative inline-block text-left group/dropdown">
                          <button className="text-[#56615f] hover:text-[#006b62] p-1 rounded-full hover:bg-[#e1eae7]">
                            <span className="material-symbols-outlined text-lg">more_vert</span>
                          </button>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-8 w-44 bg-white rounded-xl shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-[100] overflow-hidden">
                            <div className="py-1">
                              <div className="px-3 py-2 text-[10px] font-bold text-[#56615f] uppercase tracking-wider border-b border-[#a9b4b1]/10 mb-1">Cập nhật</div>
                              {["Pending","Processing","Shipped","Completed","Cancelled"].map(s => (
                                <button key={s} onClick={() => updateStatus(order.order_id, s)}
                                  className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#2a3433] hover:bg-[#eef5f3] transition-colors">
                                  <span className={`w-2 h-2 rounded-full mr-3 ${STATUS_STYLE[s]?.dot ?? "bg-gray-400"}`} />
                                  {STATUS_LABEL[s] ?? s}
                                </button>
                              ))}
                            </div>
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
        <div className="p-6 bg-[#eef5f3]/30 flex items-center justify-between">
          <p className="text-xs text-[#56615f] font-medium">Hiển thị {orders.length} đơn hàng</p>
        </div>
      </div>
    </div>
  );
}

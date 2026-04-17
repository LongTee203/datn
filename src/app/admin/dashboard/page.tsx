import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | PetCare Admin",
};

const stats = [
  { label: "Tổng khách hàng", value: "1,248", icon: "people", color: "#2D6A4F" },
  { label: "Lịch hẹn hôm nay", value: "34", icon: "calendar_month", color: "#ff9f43" },
  { label: "Doanh thu tháng", value: "48.6M₫", icon: "payments", color: "#0fb9b1" },
  { label: "Dịch vụ đang chạy", value: "6", icon: "pets", color: "#9b59b6" },
];

const recentBookings = [
  { id: "BK001", customer: "Nguyễn Văn A", service: "Làm đẹp", pet: "Poodle", time: "09:00", status: "confirmed" },
  { id: "BK002", customer: "Trần Thị B", service: "Khám sức khỏe", pet: "Golden", time: "10:30", status: "pending" },
  { id: "BK003", customer: "Lê Văn C", service: "Spa & Massage", pet: "Husky", time: "13:00", status: "confirmed" },
  { id: "BK004", customer: "Phạm Thị D", service: "Khách sạn thú cưng", pet: "Persian Cat", time: "14:00", status: "cancelled" },
  { id: "BK005", customer: "Hoàng Văn E", service: "Tiêm phòng", pet: "Chihuahua", time: "15:30", status: "confirmed" },
];

const statusStyle: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-600",
};
const statusLabel: Record<string, string> = {
  confirmed: "Đã xác nhận",
  pending: "Chờ xử lý",
  cancelled: "Đã hủy",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* ── Welcome ── */}
      <div>
        <h2 className="text-2xl font-black text-[#111811]">
          Tổng quan hôm nay 👋
        </h2>
        <p className="text-gray-500 mt-1">
          Chào mừng trở lại, Admin. Đây là báo cáo tổng hợp của ngày hôm nay.
        </p>
      </div>

      {/* ── Stats cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}18` }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color, fontSize: "24px" }}
              >
                {icon}
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-[#111811]">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent bookings table ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#111811]">Lịch hẹn gần đây</h3>
          <Link
            href="/admin/bookings"
            className="text-sm font-semibold text-[#2D6A4F] hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                <th className="px-6 py-3 font-semibold">Mã lịch</th>
                <th className="px-6 py-3 font-semibold">Khách hàng</th>
                <th className="px-6 py-3 font-semibold">Dịch vụ</th>
                <th className="px-6 py-3 font-semibold">Thú cưng</th>
                <th className="px-6 py-3 font-semibold">Giờ</th>
                <th className="px-6 py-3 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-gray-400">{b.id}</td>
                  <td className="px-6 py-4 font-semibold text-[#111811]">
                    {b.customer}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{b.service}</td>
                  <td className="px-6 py-4 text-gray-600">{b.pet}</td>
                  <td className="px-6 py-4 text-gray-600">{b.time}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle[b.status]}`}
                    >
                      {statusLabel[b.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Quản lý khách hàng", icon: "people", href: "/admin/customers", color: "#2D6A4F" },
          { label: "Quản lý lịch hẹn", icon: "calendar_month", href: "/admin/bookings", color: "#ff9f43" },
          { label: "Xem thống kê", icon: "bar_chart", href: "/admin/analytics", color: "#0fb9b1" },
        ].map(({ label, icon, href, color }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}15` }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color, fontSize: "20px" }}
              >
                {icon}
              </span>
            </div>
            <span className="font-semibold text-[#111811] group-hover:text-[#2D6A4F] transition-colors">
              {label}
            </span>
            <span className="material-symbols-outlined text-gray-300 ml-auto group-hover:text-[#2D6A4F] transition-colors">
              arrow_forward
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function AdminBookingsPage() {
  const bookings = [
    { id: "BK001", customer: "Nguyễn Văn A", service: "Làm đẹp", pet: "Poodle", date: "17/04/2026", time: "09:00", status: "confirmed" },
    { id: "BK002", customer: "Trần Thị B", service: "Khám sức khỏe", pet: "Golden", date: "17/04/2026", time: "10:30", status: "pending" },
    { id: "BK003", customer: "Lê Văn C", service: "Spa & Massage", pet: "Husky", date: "17/04/2026", time: "13:00", status: "confirmed" },
    { id: "BK004", customer: "Phạm Thị D", service: "Khách sạn", pet: "Persian Cat", date: "18/04/2026", time: "14:00", status: "cancelled" },
    { id: "BK005", customer: "Hoàng Văn E", service: "Tiêm phòng", pet: "Chihuahua", date: "18/04/2026", time: "15:30", status: "confirmed" },
    { id: "BK006", customer: "Long", service: "Tắm sấy", pet: "Corgi", date: "19/04/2026", time: "08:30", status: "pending" },
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#111811]">Quản lý Lịch hẹn</h2>
          <p className="text-gray-500 mt-1">Tất cả lịch hẹn của khách hàng.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2D6A4F] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Thêm lịch hẹn
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                <th className="px-6 py-4 font-semibold">Mã lịch</th>
                <th className="px-6 py-4 font-semibold">Khách hàng</th>
                <th className="px-6 py-4 font-semibold">Dịch vụ</th>
                <th className="px-6 py-4 font-semibold">Thú cưng</th>
                <th className="px-6 py-4 font-semibold">Ngày</th>
                <th className="px-6 py-4 font-semibold">Giờ</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-400">{b.id}</td>
                  <td className="px-6 py-4 font-semibold text-[#111811]">{b.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{b.service}</td>
                  <td className="px-6 py-4 text-gray-600">{b.pet}</td>
                  <td className="px-6 py-4 text-gray-600">{b.date}</td>
                  <td className="px-6 py-4 text-gray-600">{b.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle[b.status]}`}>
                      {statusLabel[b.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

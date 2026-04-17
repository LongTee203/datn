export default function AdminAnalyticsPage() {
  const monthly = [
    { month: "T1", revenue: 32 }, { month: "T2", revenue: 28 },
    { month: "T3", revenue: 41 }, { month: "T4", revenue: 48 },
  ];
  const max = Math.max(...monthly.map((m) => m.revenue));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#111811]">Báo cáo & Thống kê</h2>
        <p className="text-gray-500 mt-1">Doanh thu và hiệu suất hoạt động theo tháng.</p>
      </div>

      {/* Revenue chart (CSS bar chart) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-[#111811] mb-6">Doanh thu theo tháng (triệu ₫)</h3>
        <div className="flex items-end gap-4 h-40">
          {monthly.map(({ month, revenue }) => (
            <div key={month} className="flex flex-col items-center gap-2 flex-1">
              <span className="text-xs font-bold text-[#2D6A4F]">{revenue}M</span>
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: `${(revenue / max) * 120}px`,
                  backgroundColor: "#2D6A4F",
                  opacity: 0.85,
                }}
              />
              <span className="text-xs text-gray-500 font-semibold">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Doanh thu tháng 4", value: "48.6M₫", trend: "+17%", up: true },
          { label: "Tổng lịch hẹn", value: "207", trend: "+8%", up: true },
          { label: "Tỉ lệ hủy", value: "4.2%", trend: "-1.3%", up: false },
        ].map(({ label, value, trend, up }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">{label}</p>
            <p className="text-2xl font-black text-[#111811]">{value}</p>
            <p className={`text-xs font-bold mt-1 ${up ? "text-green-600" : "text-red-500"}`}>
              {trend} so với tháng trước
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

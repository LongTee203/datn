export default function AdminServicesPage() {
  const services = [
    { name: "Tắm sấy", price: "150.000đ", bookings: 48, status: "active" },
    { name: "Cắt tỉa tạo kiểu", price: "200.000đ", bookings: 35, status: "active" },
    { name: "Spa & Massage", price: "350.000đ", bookings: 22, status: "active" },
    { name: "Tiêm phòng", price: "250.000đ", bookings: 61, status: "active" },
    { name: "Khách sạn thú cưng", price: "180.000đ/ngày", bookings: 17, status: "active" },
    { name: "Khám sức khỏe", price: "300.000đ", bookings: 29, status: "active" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#111811]">Quản lý Dịch vụ</h2>
          <p className="text-gray-500 mt-1">Danh sách các dịch vụ hiện có.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2D6A4F] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Thêm dịch vụ
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#111811]">{s.name}</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Hoạt động</span>
            </div>
            <p className="text-2xl font-black text-[#2D6A4F]">{s.price}</p>
            <p className="text-sm text-gray-500">{s.bookings} lượt đặt lịch</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-black text-[#111811]">Cài đặt hệ thống</h2>
        <p className="text-gray-500 mt-1">Quản lý thông tin và cấu hình cửa hàng.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
        <h3 className="font-bold text-[#111811]">Thông tin cửa hàng</h3>
        {[
          { label: "Tên cửa hàng", value: "PetCare Plus", type: "text" },
          { label: "Email liên hệ", value: "admin@gmail.com", type: "email" },
          { label: "Điện thoại", value: "(555) 123-4567", type: "tel" },
          { label: "Địa chỉ", value: "123 Paw Avenue, Pet Valley", type: "text" },
        ].map(({ label, value, type }) => (
          <div key={label} className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-600">{label}</label>
            <input
              type={type}
              defaultValue={value}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]/20 transition-all"
            />
          </div>
        ))}
        <button className="bg-[#2D6A4F] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}

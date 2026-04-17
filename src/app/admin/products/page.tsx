export default function AdminProductsPage() {
  const products = [
    { name: "Thức ăn Royal Canin", category: "Thức ăn", price: "450.000đ", stock: 24 },
    { name: "Đồ chơi kéo dây", category: "Đồ chơi", price: "85.000đ", stock: 52 },
    { name: "Lược chải lông", category: "Dụng cụ", price: "120.000đ", stock: 18 },
    { name: "Vaccine phòng dại", category: "Y tế", price: "250.000đ", stock: 9 },
    { name: "Dầu gội hữu cơ", category: "Làm đẹp", price: "180.000đ", stock: 33 },
    { name: "Vòng cổ GPS", category: "Phụ kiện", price: "890.000đ", stock: 7 },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#111811]">Quản lý Sản phẩm</h2>
          <p className="text-gray-500 mt-1">Kho hàng và danh sách sản phẩm.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2D6A4F] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Thêm sản phẩm
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
              <th className="px-6 py-4 font-semibold">Sản phẩm</th>
              <th className="px-6 py-4 font-semibold">Danh mục</th>
              <th className="px-6 py-4 font-semibold">Giá</th>
              <th className="px-6 py-4 font-semibold">Tồn kho</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p.name} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-[#111811]">{p.name}</td>
                <td className="px-6 py-4 text-gray-600">{p.category}</td>
                <td className="px-6 py-4 font-bold text-[#2D6A4F]">{p.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                    {p.stock} sản phẩm
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

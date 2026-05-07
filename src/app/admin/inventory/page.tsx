"use client";
import React, { useState } from 'react';

type Category = 'Tất cả' | 'Thức ăn' | 'Đồ chơi' | 'Phụ kiện' | 'Y tế';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  desc?: string;
  rating?: number;
  reviews?: number;
  details?: string;
  images?: string[];
}

const initialProducts: Product[] = [
  {
    id: 'p1',
    name: 'Thức ăn mèo Salmon Delight',
    sku: 'ID: CAT-F-001',
    category: 'Thức ăn',
    price: '320.000 VNĐ',
    stock: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAALX97FAv123kDgqZaLX4dw7le1sgwaKooLK8N6ojyJa33-HRNVWsR3iwLwZU6Gj5oiDJFbn1JOCUmLuu736SLR46EmUYTUDjOQgGJMbUThlIwXn9Nn0g8KJaU2VFvaEdld5cxq3Frmq2A2676RaR6ZKIkQ2jcd_YJW3sVsLuC0KRjhGBsq-Xp1KcdUKZP3bnZ412R3PIbwsWmnUDEb_ur3ZYKHUKF4yjDFk_lPQ3_5VrOnXN4I7WI1iIgMKPeUXBerGV7bMLNXA8'
  },
  {
    id: 'p2',
    name: 'Đệm ngủ Orthopedic XL',
    sku: 'ID: DOG-A-042',
    category: 'Phụ kiện',
    price: '1.250.000 VNĐ',
    stock: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3OaoJ1uwD94mII_lDqJIu8xRGr31R51CaNZK6g9UM99GV5dO61dmEsqL7sSgBpnpG8_WCyTqOJRIzR9MpcgroG6-p6OaIvni3hBWS20zguAsFO9lqXriL5KzepHWAtXoRqt9KB7GVoFPgg7FBs99nxEBQ7SOGozHRJ93Y_fWfJDWNl4DtLSKfQtZqvj2ZlrX549euqtPtGJXrLuRErXhvCh49SKvT2NwJAbGBHB_ChuqqukSSLPj1E1z1wL0vApGHzwzmkC7aU9E'
  },
  {
    id: 'p3',
    name: 'Đồ chơi dây thừng bền bỉ',
    sku: 'ID: DOG-T-015',
    category: 'Đồ chơi',
    price: '85.000 VNĐ',
    stock: 112,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9bLfWrho1bvAMpE4FCC6ijLeXSWBDbItRBmAEaDiFrqob9YafbVXb-aoM2St4mPr8_UZbSgy9j-2JN3i3VJ7z0yN7mPtm8WfFkuJiAfG8WhU5r3skVJYHyuU7glGNy5JMFSyACYswfiSfr6BhK9qkKYnOaw9zmVSdtZRb78zG9IWLoR7nyG8HCAfcvdcT1Zx-JtrZVu1NazFaud5abc8dCIr_NDSQDjHD0WdQeA_uH_wbcJzI1z9wPwwzX5c2bLEFFASXbSXUOe4'
  },
  {
    id: 'p4',
    name: 'Bộ tỉa lông chuyên nghiệp',
    sku: 'ID: TOOL-G-009',
    category: 'Y tế',
    price: '750.000 VNĐ',
    stock: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9075mwPibNxSizH6MJoPgMSMd3iTEiwulAGa79GgW1NFDEh_cs3-lKVdT2bXMsMIYkpoOeMWUQieT_o0j_n8OdxSLElnV71XlyaVH8PFO5Qafq_OSUUSBzxbeJ0EUolDKpuUL3EmqsT52ZoxdcB6UAeNe_njzGFyOdsvd0THRSRwixVpOkrsIMEw0O53y_QdDUOPTxpxws4QcGcWgyaVucfqOWG9qxxXk7etfVO6w8DoVqkV7STkj22rvleeqGBzSn4U8jqKwFak'
  },
  {
    id: 'p5',
    name: 'Máy lọc nước thông minh',
    sku: 'ID: ACC-W-088',
    category: 'Phụ kiện',
    price: '540.000 VNĐ',
    stock: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyVRWqG8Cl58HynlVZZJEHLCXYaD9fWbo9X-x6IHMvWfpJbr98S1RJfSTsUPBqi-dZY4vGy-XAljfGp0X12fDG_l15iC2cei97hdgYhm3FQOGt2kW5mvDL9735agZIgUJ3qgT5e29jlr9WE67A15opqKjeNeYY3WEgp_pterNzLCOuT6EEj5ouCKa9gcYMxy6PPq8KsCGmINcGv6iTXgBs4JnoVZ_zVyClngsn9dFlftHRpSjS9RBwXWkrX9HqMJJfpYOi9Zrz5UY'
  }
];

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filterCategory, setFilterCategory] = useState<Category>('Tất cả');
  
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importForm, setImportForm] = useState({
    name: '',
    category: 'Thức ăn',
    quantity: '',
    supplier: ''
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [detailForm, setDetailForm] = useState({
    desc: '',
    details: '',
    images: [] as string[],
    newImageUrl: ''
  });

  const categories: Category[] = ['Tất cả', 'Thức ăn', 'Đồ chơi', 'Phụ kiện', 'Y tế'];

  const filteredProducts = products.filter(p => filterCategory === 'Tất cả' || p.category === filterCategory);

  const lowStockCount = products.filter(p => p.stock < 5).length;

  const deleteProduct = (id: string) => {
    if(confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEmergencyOrder = () => {
    // Find the product with the lowest stock
    const lowestStockProduct = [...products].sort((a, b) => a.stock - b.stock)[0];
    if (lowestStockProduct) {
      setImportForm({
        name: lowestStockProduct.name,
        category: lowestStockProduct.category,
        quantity: '50', // Default emergency amount
        supplier: ''
      });
      setIsImportModalOpen(true);
    }
  };

  const handleEditDetails = (product: Product) => {
    setEditingProduct(product);
    setDetailForm({
      desc: product.desc || 'Dòng sản phẩm thượng hạng được chế biến từ cá hồi tươi đánh bắt bền vững, kết hợp cùng các loại rau củ hữu cơ.',
      details: product.details || 'Sản phẩm được nghiên cứu bởi các chuyên gia thú y hàng đầu, đảm bảo cung cấp tỉ lệ vàng giữa Protein và chất xơ.',
      images: product.images || [product.image],
      newImageUrl: ''
    });
    setIsDetailModalOpen(true);
  };

  const handleDetailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, desc: detailForm.desc, details: detailForm.details, images: detailForm.images }
          : p
      ));
    }
    setIsDetailModalOpen(false);
    setEditingProduct(null);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating stock if product exists, or adding new
    const existing = products.find(p => p.name === importForm.name);
    if (existing) {
      setProducts(products.map(p => 
        p.id === existing.id 
          ? { ...p, stock: p.stock + parseInt(importForm.quantity || '0') }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: `p${Date.now()}`,
        name: importForm.name,
        sku: `ID: NEW-${Math.floor(Math.random() * 1000)}`,
        category: importForm.category,
        price: 'Liên hệ',
        stock: parseInt(importForm.quantity || '0'),
        image: 'https://placehold.co/150x150/eef5f3/56615f?text=New'
      };
      setProducts([newProduct, ...products]);
    }
    setIsImportModalOpen(false);
    setImportForm({ name: '', category: 'Thức ăn', quantity: '', supplier: '' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight mb-1">Quản lý kho hàng</h2>
          <p className="text-[#56615f] font-medium">Cập nhật và theo dõi vật dụng thú cưng tại cửa hàng.</p>
        </div>
        <button 
          onClick={() => {
            setImportForm({ name: '', category: 'Thức ăn', quantity: '', supplier: '' });
            setIsImportModalOpen(true);
          }}
          className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-8 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg hover:shadow-[#006b62]/20 transition-all scale-100 hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Nhập kho
        </button>
      </div>

      {/* Inventory Summary Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#82f6e7]/30 text-[#006b62] rounded-full material-symbols-outlined">inventory_2</span>
            <span className="text-xs font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Tổng sản phẩm</p>
          <h3 className="text-2xl font-extrabold text-[#2a3433]">{products.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#c6eae3]/30 text-[#446560] rounded-full material-symbols-outlined">category</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Danh mục</p>
          <h3 className="text-2xl font-extrabold text-[#2a3433]">{new Set(products.map(p => p.category)).size}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] border-2 border-[#a83836]/10 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#fa746f]/30 text-[#a83836] rounded-full material-symbols-outlined">warning</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Sắp hết hàng</p>
          <h3 className="text-2xl font-extrabold text-[#a83836]">{lowStockCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0px_10px_40px_rgba(42,52,51,0.04)] flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#b6e7fe]/30 text-[#346578] rounded-full material-symbols-outlined">payments</span>
          </div>
          <p className="text-sm font-medium text-[#56615f]">Giá trị kho</p>
          <h3 className="text-2xl font-extrabold text-[#2a3433]">452M VNĐ</h3>
        </div>
      </div>

      {/* Low Stock Alert Floating Card */}
      {lowStockCount > 0 && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-[#fa746f]/10 p-8 rounded-[2rem] relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#a83836]/5 rounded-full blur-3xl"></div>
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#a83836]" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
              <h4 className="text-xl font-extrabold text-[#6e0a12]">Cảnh báo tồn kho thấp</h4>
            </div>
            <p className="text-[#6e0a12]/80 font-medium leading-relaxed max-w-xl">
              Hiện tại có <span className="font-bold text-[#a83836]">{lowStockCount} sản phẩm</span> đang ở mức cảnh báo (Số lượng &lt; 5). Vui lòng kiểm tra và lên kế hoạch nhập hàng để không làm gián đoạn trải nghiệm của khách hàng.
            </p>
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleEmergencyOrder}
              className="bg-[#a83836] text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-[#a83836]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">local_shipping</span>
              Tạo đơn nhập gấp
            </button>
          </div>
        </div>
      )}

      {/* Table Filters */}
      <div className="flex items-center justify-between mb-6 bg-[#eef5f3] p-4 rounded-xl">
        <div className="flex gap-4">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${filterCategory === cat ? 'bg-white text-[#006b62] font-bold shadow-sm' : 'text-[#56615f] hover:text-[#006b62] font-medium'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-[#56615f] hover:text-[#2a3433] transition-colors">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          Bộ lọc nâng cao
        </button>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-2xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e1eae7]/30">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest">Sản phẩm</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Danh mục</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Giá bán</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Tồn kho</th>
              <th className="px-6 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-8 py-5 text-xs font-bold text-[#727d7a] uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#a9b4b1]/10">
            {filteredProducts.map(product => {
              const isLowStock = product.stock < 5;
              
              return (
                <tr key={product.id} className={`hover:bg-[#e7f0ed] transition-colors group ${isLowStock ? 'bg-[#a83836]/5' : ''}`}>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <img className="w-14 h-14 rounded-lg object-cover bg-[#e7f0ed] shadow-sm" src={product.image} alt={product.name} />
                      <div>
                        <p className={`font-bold transition-colors ${isLowStock ? 'text-[#2a3433] group-hover:text-[#a83836]' : 'text-[#2a3433] group-hover:text-[#006b62]'}`}>{product.name}</p>
                        <p className="text-xs text-[#56615f]">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase ${
                      product.category === 'Thức ăn' ? 'bg-[#c6eae3]/50 text-[#375853]' :
                      product.category === 'Phụ kiện' ? 'bg-[#b6e7fe]/50 text-[#235669]' :
                      product.category === 'Y tế' ? 'bg-[#b6e7fe]/50 text-[#235669]' :
                      'bg-[#c6eae3]/50 text-[#375853]'
                    }`}>{product.category}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-bold text-[#2a3433]">{product.price}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className={`font-extrabold ${isLowStock ? 'text-[#a83836]' : 'text-[#2a3433]'}`}>{product.stock}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isLowStock ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a83836]">
                        <span className="w-2 h-2 rounded-full bg-[#a83836] animate-pulse"></span>
                        Sắp hết hàng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006b62]">
                        <span className="w-2 h-2 rounded-full bg-[#006b62]"></span>
                        Còn hàng
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditDetails(product)}
                        className="p-2 text-[#727d7a] hover:text-[#006b62] hover:bg-[#006b62]/10 rounded-full transition-colors"
                        title="Chi tiết sản phẩm"
                      >
                        <span className="material-symbols-outlined">edit_document</span>
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-[#727d7a] hover:text-[#a83836] hover:bg-[#fa746f]/10 rounded-full transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-10 text-center text-[#56615f]">
                  Không tìm thấy sản phẩm nào trong danh mục này.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination Content */}
        <div className="px-8 py-6 bg-[#eef5f3]/50 flex justify-between items-center">
          <p className="text-xs font-bold text-[#727d7a] uppercase tracking-wider">Hiển thị {filteredProducts.length} / {products.length} sản phẩm</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#56615f] hover:bg-[#006b62] hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006b62] text-white font-bold shadow-md">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#56615f] hover:bg-[#82f6e7] transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Import Stock Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsImportModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b62]">inventory</span>
              Phiếu nhập kho
            </h3>
            
            <form className="space-y-5" onSubmit={handleImportSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên sản phẩm</label>
                <input 
                  required 
                  type="text" 
                  value={importForm.name}
                  onChange={(e) => setImportForm({...importForm, name: e.target.value})}
                  placeholder="Nhập tên sản phẩm..." 
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" 
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Danh mục</label>
                  <select 
                    required 
                    value={importForm.category}
                    onChange={(e) => setImportForm({...importForm, category: e.target.value})}
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="Thức ăn">Thức ăn</option>
                    <option value="Đồ chơi">Đồ chơi</option>
                    <option value="Phụ kiện">Phụ kiện</option>
                    <option value="Y tế">Y tế</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Số lượng nhập</label>
                  <input 
                    required 
                    type="number" 
                    min="1"
                    value={importForm.quantity}
                    onChange={(e) => setImportForm({...importForm, quantity: e.target.value})}
                    placeholder="VD: 50" 
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Nhà cung cấp (Không bắt buộc)</label>
                <input 
                  type="text" 
                  value={importForm.supplier}
                  onChange={(e) => setImportForm({...importForm, supplier: e.target.value})}
                  placeholder="Tên nhà cung cấp..." 
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" 
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-[#a9b4b1]/20">
                <button 
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20"
                >
                  Xác nhận nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {isDetailModalOpen && editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-2 tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b62]">edit_document</span>
              Chỉnh sửa chi tiết
            </h3>
            <p className="text-[#56615f] font-medium mb-6">Mã SP: {editingProduct.sku} - {editingProduct.name}</p>
            
            <form className="space-y-5" onSubmit={handleDetailSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Thêm ảnh sản phẩm</label>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={detailForm.newImageUrl}
                    onChange={(e) => setDetailForm({...detailForm, newImageUrl: e.target.value})}
                    placeholder="Nhập đường dẫn hình ảnh (URL)..." 
                    className="flex-1 bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" 
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      if (detailForm.newImageUrl) {
                        setDetailForm({
                          ...detailForm, 
                          images: [...detailForm.images, detailForm.newImageUrl],
                          newImageUrl: ''
                        });
                      }
                    }}
                    className="bg-[#006b62] text-white px-4 rounded-xl font-bold hover:bg-[#005e56] transition-colors"
                  >
                    Thêm ảnh
                  </button>
                </div>
                {detailForm.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {detailForm.images.map((img, idx) => (
                      <div key={idx} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setDetailForm({
                            ...detailForm,
                            images: detailForm.images.filter((_, i) => i !== idx)
                          })}
                          className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mô tả sản phẩm</label>
                <textarea 
                  required 
                  rows={3}
                  value={detailForm.desc}
                  onChange={(e) => setDetailForm({...detailForm, desc: e.target.value})}
                  placeholder="Nhập mô tả sản phẩm (ví dụ: Dòng sản phẩm thượng hạng...)" 
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all resize-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Thông tin chi tiết sản phẩm</label>
                <textarea 
                  required 
                  rows={4}
                  value={detailForm.details}
                  onChange={(e) => setDetailForm({...detailForm, details: e.target.value})}
                  placeholder="Nhập thông tin chi tiết, công dụng, đặc điểm..." 
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all resize-none" 
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-[#a9b4b1]/20">
                <button 
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

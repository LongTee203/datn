"use client";
import React, { useState } from 'react';

type CustomerStatus = 'Mới' | 'Thân thiết' | 'VIP' | 'Bị khóa';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: number;
  petDetails: Pet[];
  spending: string;
  status: CustomerStatus;
  avatar: string | null;
  initials: string;
}

const initialCustomers: Customer[] = [
  {
    id: 'CUST-01',
    name: 'Nguyễn Thu Hà',
    email: 'ha.nguyen@email.com',
    phone: '0987 654 321',
    pets: 3,
    petDetails: [
      { id: 'p1', name: 'Mochi', species: 'Chó', breed: 'Poodle', age: '2 tuổi', weight: '4kg' },
      { id: 'p2', name: 'Milky', species: 'Mèo', breed: 'Anh lông ngắn', age: '1 tuổi', weight: '3.5kg' },
      { id: 'p3', name: 'Bông', species: 'Chó', breed: 'Phốc Sóc', age: '3 tuổi', weight: '2.5kg' }
    ],
    spending: '12,500,000 đ',
    status: 'Thân thiết',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3aEJbc64G8trXm9TyquQ4t5QbhbzYNNP6hCZCHMBiFdMLL7sf6q6DK_jO1MrKE8qCsIGn2jjeznJz9bCNdvJ6BlE9MqHooVg3UwLPEaTH4aLUOfzmhtDDVAoVXL9cuNdszxvPBqE17fDN8bVALYb7L4aitdPWc9O2ymCwJqX6zvlXNVdVeaz2Jj7AqIdGgQyu1fTg7BPLBLctiUdQYmIfw-1k_KHfEYwcon-9HCHoyY-f3sstr4EobKVkqi5G0kKQ2p--wGZ-JD0',
    initials: 'NH'
  },
  {
    id: 'CUST-02',
    name: 'Trần Minh Quân',
    email: 'quan.tm@email.com',
    phone: '0912 345 678',
    pets: 1,
    petDetails: [
      { id: 'p4', name: 'Leo', species: 'Mèo', breed: 'Mèo ta', age: '6 tháng', weight: '2kg' }
    ],
    spending: '4,200,000 đ',
    status: 'Mới',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmWjzPe6xoY06JXEbHOrrmnebbZinDY9JmtWiZlBS5nRXWIz9q_j9lLCmU6g6NHZXjNTClI8T0cAM-mUwXQd-QlUWpxOr4WZk1HDxlBZCoXaPOeSUEPEuSNApHN3drzSPMrqjQ7tNGLX4YhKHINqy9cTmiznwkZWFN80IFTb5VHDwPWgvCfsHwyQ325Ujz7GhuoNHN9nDCgAqV8aS_foV76YEH44-BVOeQ0PEuv-6ynKYYq6oMUlY5P0Ba2nUkadTK2vDhF9nTvb4',
    initials: 'TQ'
  },
  {
    id: 'CUST-03',
    name: 'Lê Thị Mai',
    email: 'mai.le@email.com',
    phone: '0933 111 222',
    pets: 2,
    petDetails: [
      { id: 'p5', name: 'Max', species: 'Chó', breed: 'Golden Retriever', age: '4 tuổi', weight: '28kg' },
      { id: 'p6', name: 'Bella', species: 'Chó', breed: 'Corgi', age: '2 tuổi', weight: '12kg' }
    ],
    spending: '28,900,000 đ',
    status: 'VIP',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_4zW-wlI_-pUxIVjiZ6iO4XIIq5Q1krMS5-lwYhN9knMCwBNbqDb0WIPbncV1EgtbgVQL9GtPr-QDojhXoSeA390GNoZmm1u8Tx2INMCyR2Vq2gw_1j__ZRnUc-CmpkFhR5rlsW9xAjkfasSvxo2L8XBnpXwT8QTMNvCj4ziwYGsBtDzLaK7R6HzrdsD8GQyhwXQqxDUmSAvQWGsLD3IKuPU6OrvTPJD_9DilPmVltu77ssDtwX5QQw5hc8H9LAFP4-jzhISwzUQ',
    initials: 'LM'
  },
  {
    id: 'CUST-04',
    name: 'Phạm Văn Vinh',
    email: 'vinh.pham@email.com',
    phone: '0909 999 000',
    pets: 1,
    petDetails: [
      { id: 'p7', name: 'LuLu', species: 'Chó', breed: 'Pug', age: '1 tuổi', weight: '6kg' }
    ],
    spending: '1,850,000 đ',
    status: 'Thân thiết',
    avatar: null,
    initials: 'PV'
  }
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Form state for adding pet dynamically in Add Customer Modal
  const [newCustomerPets, setNewCustomerPets] = useState<Partial<Pet>[]>([{}]);

  const updateCustomerStatus = (id: string, newStatus: CustomerStatus) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const getStatusStyles = (status: CustomerStatus) => {
    switch(status) {
      case 'Mới': return 'bg-blue-100 text-blue-700 marker-bg-blue-500';
      case 'Thân thiết': return 'bg-green-100 text-green-700 marker-bg-green-500';
      case 'VIP': return 'bg-[#82f6e7]/40 text-[#005e56] marker-bg-[#006b62]';
      case 'Bị khóa': return 'bg-red-100 text-red-700 marker-bg-red-500';
      default: return 'bg-gray-100 text-gray-700 marker-bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2">
              <span>Hệ thống</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#006b62] font-medium">Khách hàng</span>
            </nav>
            <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Quản lý khách hàng</h2>
            <p className="text-[#56615f] mt-1">Theo dõi thông tin và chi tiêu của cộng đồng PetCareShop.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#006b62] to-[#4BC3B5] text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-[#006b62]/20 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">person_add</span>
            <span>Thêm khách hàng mới</span>
          </button>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border-none">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#82f6e7]/30 rounded-full flex items-center justify-center text-[#006b62]">
                <span className="material-symbols-outlined">group</span>
              </div>
              <span className="text-[10px] font-bold text-[#006b62] bg-[#82f6e7] px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-[#56615f] text-sm font-medium">Tổng khách hàng</p>
            <h3 className="text-2xl font-bold text-[#2a3433]">1,284</h3>
          </div>
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border-none">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#c6eae3]/30 rounded-full flex items-center justify-center text-[#446560]">
                <span className="material-symbols-outlined">pets</span>
              </div>
              <span className="text-[10px] font-bold text-[#446560] bg-[#c6eae3] px-2 py-1 rounded-full">+5%</span>
            </div>
            <p className="text-[#56615f] text-sm font-medium">Số lượng thú cưng</p>
            <h3 className="text-2xl font-bold text-[#2a3433]">2,510</h3>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-2xl shadow-[0px_10px_40px_rgba(42,52,51,0.06)] overflow-hidden">
          <div className="px-8 py-6 border-b border-[#a9b4b1]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-[#2a3433]">Danh sách khách hàng</h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#eef5f3] text-[#56615f] rounded-lg text-sm hover:bg-[#e1eae7] transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span>Bộ lọc</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#eef5f3] text-[#56615f] rounded-lg text-sm hover:bg-[#e1eae7] transition-colors">
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Xuất báo cáo</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#eef5f3]">
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Khách hàng</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Số điện thoại</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-center">Thú cưng</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Tổng chi tiêu</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest">Trạng thái</th>
                  <th className="px-8 py-4 text-xs font-bold text-[#56615f] uppercase tracking-widest text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#a9b4b1]/10">
                {customers.map((customer) => {
                  const statusStyle = getStatusStyles(customer.status);
                  const isLocked = customer.status === 'Bị khóa';
                  
                  return (
                    <tr key={customer.id} className="hover:bg-[#e1eae7]/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div 
                          className="flex items-center gap-4 cursor-pointer" 
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          {customer.avatar ? (
                            <img alt="Avatar" className={`w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-white ${isLocked ? 'grayscale opacity-60' : ''}`} src={customer.avatar} />
                          ) : (
                            <div className={`w-11 h-11 rounded-full bg-[#b6e7fe] flex items-center justify-center text-[#27596c] font-bold text-sm ${isLocked ? 'grayscale opacity-60' : ''}`}>
                              {customer.initials}
                            </div>
                          )}
                          <div>
                            <p className={`font-bold transition-colors ${isLocked ? 'text-[#56615f] line-through' : 'text-[#2a3433] group-hover:text-[#006b62]'}`}>{customer.name}</p>
                            <p className="text-xs text-[#56615f]">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-[#56615f]">{customer.phone}</td>
                      <td className="px-8 py-5 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-[#c6eae3] text-[#375853] rounded-full text-xs font-bold">{customer.pets}</span>
                      </td>
                      <td className="px-8 py-5 font-semibold text-[#2a3433]">{customer.spending}</td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${statusStyle.split(' marker')[0]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.split('marker-bg-')[1]}`}></span>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right relative">
                        <div className="relative inline-block text-left group/dropdown">
                          <button className="w-8 h-8 rounded-full hover:bg-[#d9e5e2] flex items-center justify-center text-[#56615f] transition-colors">
                            <span className="material-symbols-outlined text-xl">more_vert</span>
                          </button>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-8 w-40 origin-right bg-white rounded-xl shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-50 overflow-hidden text-left">
                            <div className="py-1">
                              <div className="px-3 py-2 text-[10px] font-bold text-[#56615f] uppercase tracking-wider border-b border-[#a9b4b1]/10 mb-1">Cập nhật trạng thái</div>
                              <button onClick={() => updateCustomerStatus(customer.id, 'Mới')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#2a3433] hover:bg-blue-50 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>Mới
                              </button>
                              <button onClick={() => updateCustomerStatus(customer.id, 'Thân thiết')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#2a3433] hover:bg-green-50 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>Thân thiết
                              </button>
                              <button onClick={() => updateCustomerStatus(customer.id, 'VIP')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#2a3433] hover:bg-[#82f6e7]/30 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-[#006b62] mr-3"></span>VIP
                              </button>
                              <button onClick={() => updateCustomerStatus(customer.id, 'Bị khóa')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#a83836] hover:bg-red-50 transition-colors">
                                <span className="w-2 h-2 rounded-full bg-red-500 mr-3"></span>Khóa tài khoản
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-8 py-6 bg-[#eef5f3] flex items-center justify-between">
            <p className="text-xs text-[#56615f] font-medium">Hiển thị {customers.length} của 1,284 khách hàng</p>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-[#56615f] hover:bg-white transition-colors disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-9 h-9 rounded-lg bg-[#006b62] text-white flex items-center justify-center text-sm font-bold shadow-sm">1</button>
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-sm font-medium text-[#56615f] hover:bg-white transition-colors">2</button>
              <button className="w-9 h-9 rounded-lg border border-[#a9b4b1]/30 flex items-center justify-center text-[#56615f] hover:bg-white transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Decorative */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#56615f] opacity-50 uppercase tracking-widest font-bold">© 2024 PetCareShop • Nền tảng chăm sóc thú cưng toàn diện</p>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            <button 
              onClick={() => {
                setIsAddModalOpen(false);
                setNewCustomerPets([{}]);
              }}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Thêm khách hàng mới</h3>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); setNewCustomerPets([{}]); }}>
              {/* Customer Info Section */}
              <div>
                <h4 className="text-sm font-bold text-[#006b62] mb-4 border-b border-[#a9b4b1]/20 pb-2">Thông tin khách hàng</h4>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-[#eef5f3] flex flex-col items-center justify-center text-[#56615f] border-2 border-dashed border-[#c6eae3] cursor-pointer hover:bg-[#e1eae7] transition-colors">
                    <span className="material-symbols-outlined">add_a_photo</span>
                    <span className="text-[10px] mt-1 font-bold">Avatar</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Họ và tên</label>
                    <input required type="text" placeholder="Nhập họ và tên..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Email</label>
                    <input required type="email" placeholder="example@email.com" className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Số điện thoại</label>
                    <input required type="tel" placeholder="09xx xxx xxx" className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                  </div>
                </div>
              </div>

              {/* Pets Section */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#a9b4b1]/20 pb-2">
                  <h4 className="text-sm font-bold text-[#006b62]">Thêm thú cưng</h4>
                  <button 
                    type="button" 
                    onClick={() => setNewCustomerPets([...newCustomerPets, {}])}
                    className="text-xs font-bold text-[#006b62] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Thêm bé nữa
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                  {newCustomerPets.map((pet, index) => (
                    <div key={index} className="bg-[#f8fdfa] p-4 rounded-xl border border-[#e1eae7] relative">
                      {newCustomerPets.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => setNewCustomerPets(newCustomerPets.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      )}
                      <p className="text-[10px] font-bold text-[#56615f] uppercase tracking-wider mb-3">Thú cưng #{index + 1}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Tên thú cưng</label>
                          <input required type="text" placeholder="Tên..." className="w-full bg-white border border-[#e1eae7] rounded-lg text-xs font-medium py-2 px-3 outline-none focus:border-[#006b62]" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Loài (Chó/Mèo)</label>
                          <select required className="w-full bg-white border border-[#e1eae7] rounded-lg text-xs font-medium py-2 px-3 outline-none focus:border-[#006b62]">
                            <option value="Chó">Chó</option>
                            <option value="Mèo">Mèo</option>
                            <option value="Khác">Khác</option>
                          </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Giống</label>
                          <input type="text" placeholder="VD: Poodle, Mèo Anh..." className="w-full bg-white border border-[#e1eae7] rounded-lg text-xs font-medium py-2 px-3 outline-none focus:border-[#006b62]" />
                        </div>
                        <div className="col-span-1 sm:col-span-1 flex gap-2">
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Tuổi</label>
                            <input type="text" placeholder="VD: 1 tuổi" className="w-full bg-white border border-[#e1eae7] rounded-lg text-xs font-medium py-2 px-3 outline-none focus:border-[#006b62]" />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold uppercase text-[#56615f] mb-1">Cân nặng</label>
                            <input type="text" placeholder="VD: 5kg" className="w-full bg-white border border-[#e1eae7] rounded-lg text-xs font-medium py-2 px-3 outline-none focus:border-[#006b62]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-[#a9b4b1]/20">
                <button 
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setNewCustomerPets([{}]);
                  }}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20"
                >
                  Lưu khách hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="flex items-start gap-6 mb-8">
              {selectedCustomer.avatar ? (
                <img alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-md ring-4 ring-[#eef5f3]" src={selectedCustomer.avatar} />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#b6e7fe] flex items-center justify-center text-[#27596c] font-bold text-3xl shadow-md ring-4 ring-[#eef5f3]">
                  {selectedCustomer.initials}
                </div>
              )}
              <div className="pt-2">
                <h3 className="text-2xl font-extrabold text-[#2a3433] tracking-tight">{selectedCustomer.name}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[#56615f]">
                  <span className="flex items-center gap-1 text-sm"><span className="material-symbols-outlined text-sm">mail</span> {selectedCustomer.email}</span>
                  <span className="flex items-center gap-1 text-sm"><span className="material-symbols-outlined text-sm">call</span> {selectedCustomer.phone}</span>
                </div>
                <div className="mt-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${getStatusStyles(selectedCustomer.status).split(' marker')[0]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusStyles(selectedCustomer.status).split('marker-bg-')[1]}`}></span>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 bg-[#f8fdfa] p-5 rounded-2xl border border-[#e1eae7]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#56615f] mb-1">Tổng chi tiêu</p>
                <p className="text-xl font-extrabold text-[#006b62]">{selectedCustomer.spending}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#56615f] mb-1">Lượt đặt lịch</p>
                <p className="text-xl font-extrabold text-[#2a3433]">12 <span className="text-sm font-medium text-[#56615f] ml-1">lần</span></p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#2a3433] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b62]">pets</span> 
                Danh sách thú cưng ({selectedCustomer.pets})
              </h4>
              <div className="space-y-3">
                {selectedCustomer.petDetails.map(pet => (
                  <div key={pet.id} className="bg-white border border-[#e1eae7] p-4 rounded-xl flex items-center justify-between hover:border-[#006b62]/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#eef5f3] rounded-full flex items-center justify-center text-[#006b62]">
                        <span className="material-symbols-outlined">{pet.species === 'Mèo' ? 'cruelty_free' : 'pets'}</span>
                      </div>
                      <div>
                        <p className="font-bold text-[#2a3433]">{pet.name}</p>
                        <p className="text-xs text-[#56615f]">{pet.breed} • {pet.age} • {pet.weight}</p>
                      </div>
                    </div>
                    <button className="text-[#006b62] hover:bg-[#eef5f3] p-2 rounded-full transition-colors text-xs font-bold">
                      Chi tiết
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

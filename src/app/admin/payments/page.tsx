"use client";

import React, { useState } from 'react';

const initialTransactions = [
  {
    id: '#TXN-88291',
    date: '15/10/2023',
    time: '14:20',
    content: 'Cắt tỉa lông - Cún Golden (Max)',
    icon: 'content_cut',
    iconColor: 'text-[#446560]',
    iconBg: 'bg-[#c6eae3]/30',
    amount: '450.000',
    method: 'Chuyển khoản',
    status: 'Thành công',
  },
  {
    id: '#TXN-88290',
    date: '15/10/2023',
    time: '13:45',
    content: 'Tiêm phòng dại - Mèo British (Luna)',
    icon: 'medication',
    iconColor: 'text-[#006b62]',
    iconBg: 'bg-[#82f6e7]/30',
    amount: '250.000',
    method: 'Tiền mặt',
    status: 'Đang xử lý',
  },
  {
    id: '#TXN-88289',
    date: '15/10/2023',
    time: '11:10',
    content: 'Thức ăn hạt cao cấp (5kg)',
    icon: 'shopping_bag',
    iconColor: 'text-[#346578]',
    iconBg: 'bg-[#b6e7fe]/30',
    amount: '1.200.000',
    method: 'Chuyển khoản',
    status: 'Thành công',
  },
  {
    id: '#TXN-88288',
    date: '15/10/2023',
    time: '09:30',
    content: 'Dịch vụ lưu trú (3 đêm)',
    icon: 'hotel',
    iconColor: 'text-[#446560]',
    iconBg: 'bg-[#c6eae3]/30',
    amount: '900.000',
    method: 'Chuyển khoản',
    status: 'Hủy',
  }
];

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filterStatus, setFilterStatus] = useState('Tất cả trạng thái');
  const [showAddModal, setShowAddModal] = useState(false);

  // States for new invoice
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const newTxn = {
      id: `#TXN-${Math.floor(Math.random() * 90000) + 10000}`,
      date: newDate.split('-').reverse().join('/'),
      time: newTime,
      content: newContent,
      icon: 'receipt',
      iconColor: 'text-[#006b62]',
      iconBg: 'bg-[#82f6e7]/30',
      amount: newAmount,
      method: 'Tiền mặt',
      status: 'Đang xử lý',
    };
    setTransactions([newTxn, ...transactions]);
    setShowAddModal(false);
    setNewDate('');
    setNewTime('');
    setNewContent('');
    setNewAmount('');
  };

  const changeStatus = (id: string, newStatus: string) => {
    setTransactions(transactions.map(txn => txn.id === id ? { ...txn, status: newStatus } : txn));
  };

  const changeMethod = (id: string, newMethod: string) => {
    setTransactions(transactions.map(txn => txn.id === id ? { ...txn, method: newMethod } : txn));
  };

  const filteredTransactions = filterStatus === 'Tất cả trạng thái' 
    ? transactions 
    : transactions.filter(txn => txn.status === filterStatus);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Quản lý Thanh toán</h1>
          <p className="text-[#56615f] font-medium mt-1">Theo dõi và quản lý các dòng tiền vào/ra của hệ thống</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-[#2a3433] font-semibold px-5 py-2.5 rounded-full shadow-sm hover:bg-[#e1eae7] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">file_download</span> Xuất báo cáo
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#006b62] text-[#e2fff9] font-semibold px-6 py-2.5 rounded-full shadow-md hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span> Tạo hóa đơn mới
          </button>
        </div>
      </div>

      {/* Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Highlight Card: Total Revenue Today */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#006b62] to-[#005e56] p-8 rounded-[2rem] text-[#e2fff9] shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[#82f6e7]/80 font-bold uppercase tracking-widest text-xs mb-2">Tổng thu trong ngày</p>
            <h2 className="text-5xl font-extrabold mb-4 tracking-tighter">24.500.000 <span className="text-2xl font-medium opacity-80">₫</span></h2>
            <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="text-sm font-semibold">+12% so với hôm qua</span>
            </div>
          </div>
          {/* Abstract Background Shape */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#82f6e7]/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#c6eae3]/30 flex items-center justify-center text-[#446560] mb-4">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <p className="text-[#56615f] font-semibold text-sm">Chuyển khoản</p>
          <h3 className="text-2xl font-bold text-[#2a3433] mt-1">18.200.000 ₫</h3>
          <p className="text-[10px] text-[#446560] font-bold mt-2">15 giao dịch</p>
        </div>
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0px_10px_40px_rgba(42,52,51,0.06)] flex flex-col justify-center">
          <div className="w-12 h-12 rounded-2xl bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578] mb-4">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <p className="text-[#56615f] font-semibold text-sm">Tiền mặt</p>
          <h3 className="text-2xl font-bold text-[#2a3433] mt-1">6.300.000 ₫</h3>
          <p className="text-[10px] text-[#346578] font-bold mt-2">8 giao dịch</p>
        </div>
      </div>

      {/* Transaction History Table Section */}
      <div className="bg-white rounded-[1.5rem] overflow-visible shadow-[0px_10px_40px_rgba(42,52,51,0.06)] mb-10 pb-4">
        <div className="px-8 py-6 flex justify-between items-center bg-[#eef5f3]/50 rounded-t-[1.5rem]">
          <h3 className="text-xl font-bold text-[#2a3433]">Lịch sử giao dịch</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#727d7a]">Lọc theo:</span>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border-none bg-transparent font-bold text-[#006b62] focus:ring-0 outline-none cursor-pointer"
            >
              <option value="Tất cả trạng thái">Tất cả trạng thái</option>
              <option value="Thành công">Thành công</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Hủy">Hủy</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e7f0ed]/30 border-b border-[#a9b4b1]/10">
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Mã giao dịch</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Thời gian</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Nội dung</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Số tiền</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Hình thức</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider">Trạng thái</th>
                <th className="px-8 py-4 text-xs font-bold text-[#727d7a] uppercase tracking-wider w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/10">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#e1eae7]/50 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-mono text-sm font-bold text-[#006b62]">{txn.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-[#2a3433]">{txn.time}</p>
                    <p className="text-[10px] text-[#727d7a] font-medium">{txn.date}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${txn.iconBg} flex items-center justify-center ${txn.iconColor} shrink-0`}>
                        <span className="material-symbols-outlined text-sm">{txn.icon}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#2a3433] truncate max-w-[200px]">{txn.content}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-extrabold text-[#2a3433]">{txn.amount} ₫</span>
                  </td>
                  <td className="px-8 py-5 relative">
                    <select 
                      value={txn.method}
                      onChange={(e) => changeMethod(txn.id, e.target.value)}
                      className="text-xs font-semibold text-[#727d7a] border-none bg-transparent hover:bg-white rounded-md px-1 py-1 cursor-pointer focus:ring-0"
                    >
                      <option value="Chuyển khoản">Chuyển khoản</option>
                      <option value="Tiền mặt">Tiền mặt</option>
                    </select>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      txn.status === 'Thành công' ? 'bg-[#82f6e7] text-[#005c54]' :
                      txn.status === 'Đang xử lý' ? 'bg-[#fef0c7] text-[#dc6803]' :
                      'bg-[#fee4e2] text-[#d92d20]'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right relative">
                    <div className="relative inline-block text-left group/menu">
                      <button className="text-[#727d7a] hover:text-[#006b62] transition-colors p-2 rounded-full hover:bg-white">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover/menu:block z-50">
                        <div className="py-1">
                          <div className="px-4 py-2 text-xs font-bold text-[#727d7a] uppercase tracking-wider bg-gray-50 border-b border-gray-100">Thay đổi trạng thái</div>
                          <button onClick={() => changeStatus(txn.id, 'Thành công')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#eef5f3]">Thành công</button>
                          <button onClick={() => changeStatus(txn.id, 'Đang xử lý')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#eef5f3]">Đang xử lý</button>
                          <button onClick={() => changeStatus(txn.id, 'Hủy')} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Hủy</button>
                          <div className="border-t border-gray-100"></div>
                          <button className="block w-full text-left px-4 py-2 text-sm text-[#006b62] hover:bg-[#eef5f3] font-semibold flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">print</span> Xuất hóa đơn
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">Tạo hóa đơn mới</h3>
            
            <form className="space-y-4" onSubmit={handleAddInvoice}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Ngày</label>
                  <input required type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Giờ</label>
                  <input required type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Nội dung hóa đơn</label>
                <input required type="text" value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Nhập nội dung..." className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Số tiền (₫)</label>
                <input required type="text" value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="VD: 500.000" className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20"
                >
                  Tạo mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

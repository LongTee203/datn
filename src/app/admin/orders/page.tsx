"use client";
import React, { useState } from 'react';

type OrderStatus = 'Chờ xử lý' | 'Đang giao' | 'Đã giao' | 'Đã hủy';

interface Order {
  id: string;
  customerInitials: string;
  customerName: string;
  products: string;
  extraProducts: string;
  price: string;
  payment: string;
  status: OrderStatus;
  avatar: string | null;
  struckThrough: boolean;
}

const initialOrders: Order[] = [
  {
    id: '#ORD-8924',
    customerInitials: 'NT',
    customerName: 'Nguyễn Thảo',
    products: 'Hạt Royal Canin (2kg)...',
    extraProducts: '+ 2 sản phẩm khác',
    price: '850.000đ',
    payment: 'Chuyển khoản',
    status: 'Đang giao',
    avatar: null,
    struckThrough: false
  },
  {
    id: '#ORD-8925',
    customerInitials: '',
    customerName: 'Lê Anh Tuấn',
    products: 'Xương gặm canxi',
    extraProducts: 'Số lượng: 5',
    price: '125.000đ',
    payment: 'Tiền mặt',
    status: 'Chờ xử lý',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtNp7QT4Dtpk9fv_icX78Jy6pbkAW8b45z5Qct53-CaydZ0h0pDdJLAGsOBWlZ6HCkTnKHYdrZci8UBxNZUrXEeKO5_1_aQxayoycNKXTbejTzeyqQnc7uYux2Yv9V9yBKKCPDriiq1bq4jwdN6-nlMbFspUKV7eqSGNjaNbJExCKf_nlnaeIgSufxn0Yz8MTOe5fenz6Xd0LazS0iQ1H5Ux0gI-47xv8jrMUEi15o7lAkGQ1f2uU7iXyMgOXJ28_e3o7rU2IFfp4',
    struckThrough: false
  },
  {
    id: '#ORD-8926',
    customerInitials: 'HM',
    customerName: 'Hoàng Minh',
    products: 'Chuồng sắt tĩnh điện',
    extraProducts: 'Size L - Màu đen',
    price: '1.200.000đ',
    payment: 'Chuyển khoản',
    status: 'Đã giao',
    avatar: null,
    struckThrough: false
  },
  {
    id: '#ORD-8927',
    customerInitials: 'PT',
    customerName: 'Phạm Thu',
    products: 'Đồ chơi cần câu mèo',
    extraProducts: '',
    price: '45.000đ',
    payment: 'Tiền mặt',
    status: 'Đã hủy',
    avatar: null,
    struckThrough: true
  }
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'Tất cả'>('Tất cả');
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const filteredOrders = orders.filter(o => filter === 'Tất cả' || o.status === filter);

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus, struckThrough: newStatus === 'Đã hủy' } : o));
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#2a3433] mb-2">Quản lý đơn hàng</h2>
          <p className="text-[#56615f] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b62] text-base" data-icon="shopping_bag">shopping_bag</span>
            Tổng cộng 1,284 đơn hàng bán lẻ trong tháng này
          </p>
        </div>
        <div className="flex gap-2 bg-[#eef5f3] p-1 rounded-xl">
          {['Tất cả', 'Chờ xử lý', 'Đang giao', 'Đã giao', 'Đã hủy'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${filter === status ? 'font-semibold bg-white shadow-sm text-[#006b62]' : 'font-medium text-[#56615f] hover:bg-[#e1eae7]'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Stats Grid */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.03)] border border-[#a9b4b1]/10">
            <div className="w-10 h-10 bg-[#82f6e7]/30 rounded-full flex items-center justify-center text-[#006b62] mb-4">
              <span className="material-symbols-outlined" data-icon="trending_up">trending_up</span>
            </div>
            <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-1">Doanh thu ngày</p>
            <h3 className="text-2xl font-extrabold text-[#2a3433]">12.500.000đ</h3>
            <p className="text-[#006b62] text-[10px] mt-2 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs" data-icon="arrow_upward">arrow_upward</span> +15% so với hôm qua
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.03)] border border-[#a9b4b1]/10">
            <div className="w-10 h-10 bg-[#b6e7fe]/30 rounded-full flex items-center justify-center text-[#346578] mb-4">
              <span className="material-symbols-outlined" data-icon="inventory">inventory</span>
            </div>
            <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-1">Đơn chờ xử lý</p>
            <h3 className="text-2xl font-extrabold text-[#2a3433]">42 đơn</h3>
            <p className="text-[#346578] text-[10px] mt-2 font-bold flex items-center gap-1">
              Cần hoàn thành trước 17:00
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-[0px_10px_40px_rgba(42,52,51,0.03)] border border-[#a9b4b1]/10">
            <div className="w-10 h-10 bg-[#c6eae3]/30 rounded-full flex items-center justify-center text-[#446560] mb-4">
              <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            </div>
            <p className="text-[#56615f] text-xs font-bold uppercase tracking-wider mb-1">Đang vận chuyển</p>
            <h3 className="text-2xl font-extrabold text-[#2a3433]">18 đơn</h3>
            <p className="text-[#446560] text-[10px] mt-2 font-bold flex items-center gap-1">
              Đang trên đường tới khách
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-[#006b62] rounded-3xl p-6 text-[#e2fff9] relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h4 className="text-lg font-bold mb-1">Sản phẩm bán chạy nhất</h4>
            <p className="text-[#e2fff9]/70 text-sm">Cát vệ sinh đậu nành Tofu</p>
          </div>
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <p className="text-3xl font-black">245</p>
              <p className="text-[10px] uppercase font-bold opacity-70">Sản phẩm đã bán</p>
            </div>
          </div>
          {/* Abstract shape */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute right-4 top-4 w-20 h-20 border-4 border-white/5 rounded-full"></div>
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="bg-white rounded-[2rem] shadow-[0px_10px_40px_rgba(42,52,51,0.04)] overflow-hidden border border-[#a9b4b1]/10">
        <div className="p-6 border-b border-[#a9b4b1]/10 flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#2a3433]">Danh sách đơn hàng gần đây</h3>
          <div className="flex gap-2">
            <button className="p-2 text-[#56615f] hover:bg-[#e1eae7] rounded-lg transition-all">
              <span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
            </button>
            <button className="p-2 text-[#56615f] hover:bg-[#e1eae7] rounded-lg transition-all">
              <span className="material-symbols-outlined" data-icon="download">download</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef5f3]/50">
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Mã đơn</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Khách hàng</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Sản phẩm</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Tổng tiền</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Thanh toán</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f]">Trạng thái</th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[#56615f] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a9b4b1]/5">
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-[#56615f]">Không có đơn hàng nào phù hợp với bộ lọc.</td>
                </tr>
              )}
              {filteredOrders.map((order) => {
                const isCanceled = order.struckThrough;

                let statusClass = "";
                let statusDotClass = "";

                if (order.status === 'Đang giao') {
                  statusClass = "bg-[#82f6e7] text-[#005c54]";
                  statusDotClass = "bg-[#006b62] animate-pulse";
                } else if (order.status === 'Chờ xử lý') {
                  statusClass = "bg-[#b6e7fe] text-[#235669]";
                  statusDotClass = "bg-[#346578]";
                } else if (order.status === 'Đã giao') {
                  statusClass = "bg-[#c6eae3] text-[#375853]";
                  statusDotClass = "bg-[#446560]";
                } else if (order.status === 'Đã hủy') {
                  statusClass = "bg-[#fa746f]/20 text-[#a83836]";
                  statusDotClass = "bg-[#a83836]";
                }

                return (
                  <tr key={order.id} className="hover:bg-[#eef5f3]/50 transition-colors group">
                    <td className="py-5 px-6 font-bold text-[#006b62]">{order.id}</td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        {order.avatar ? (
                          <img alt="Customer" className={`w-8 h-8 rounded-full object-cover ${isCanceled ? 'opacity-50' : ''}`} src={order.avatar} />
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold 
                            ${order.id === '#ORD-8924' ? 'bg-[#c6eae3] text-[#446560]' :
                              order.id === '#ORD-8926' ? 'bg-[#82f6e7] text-[#006b62]' : 'bg-[#e7f0ed] text-[#56615f]'}`}>
                            {order.customerInitials}
                          </div>
                        )}
                        <span className={`text-sm font-semibold ${isCanceled ? 'text-[#56615f]' : 'text-[#2a3433]'}`}>{order.customerName}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <p className={`text-sm font-medium text-[#2a3433] ${isCanceled ? 'line-through opacity-50' : ''}`}>{order.products}</p>
                      {order.extraProducts && <p className="text-[10px] text-[#56615f]">{order.extraProducts}</p>}
                    </td>
                    <td className="py-5 px-6">
                      <span className={`text-sm font-extrabold text-[#2a3433] ${isCanceled ? 'opacity-50' : ''}`}>{order.price}</span>
                    </td>
                    <td className="py-5 px-6">
                      <div className={`flex items-center gap-1.5 ${isCanceled ? 'opacity-50 text-[#56615f]' : ''}`}>
                        <span className={`material-symbols-outlined text-sm ${isCanceled ? '' : 'text-[#56615f]'}`} data-icon={order.payment === 'Tiền mặt' ? 'payments' : 'account_balance'}>
                          {order.payment === 'Tiền mặt' ? 'payments' : 'account_balance'}
                        </span>
                        <span className="text-xs font-medium text-[#2a3433]">{order.payment}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center w-fit gap-1 ${statusClass}`}>
                        <span className={`w-1 h-1 rounded-full ${statusDotClass}`}></span> {order.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right relative">
                      <div className="relative inline-block text-left group/dropdown">
                        <button className="text-[#56615f] hover:text-[#006b62] transition-colors p-1 rounded-full hover:bg-[#e1eae7]">
                          <span className="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
                        </button>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-8 w-40 origin-right bg-white rounded-xl shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-[100] overflow-hidden">
                          <div className="py-1">
                            <div className="px-3 py-2 text-[10px] font-bold text-[#56615f] uppercase tracking-wider border-b border-[#a9b4b1]/10 mb-1">Cập nhật trạng thái</div>
                            <button onClick={() => updateOrderStatus(order.id, 'Đang giao')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#2a3433] hover:bg-[#82f6e7]/30 transition-colors">
                              <span className="w-2 h-2 rounded-full bg-[#006b62] mr-3"></span>Đang giao
                            </button>
                            <button onClick={() => updateOrderStatus(order.id, 'Đã giao')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#2a3433] hover:bg-[#c6eae3]/30 transition-colors">
                              <span className="w-2 h-2 rounded-full bg-[#446560] mr-3"></span>Đã giao
                            </button>
                            <button onClick={() => updateOrderStatus(order.id, 'Đã hủy')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#a83836] hover:bg-[#fa746f]/10 transition-colors">
                              <span className="w-2 h-2 rounded-full bg-[#a83836] mr-3"></span>Đã hủy
                            </button>
                            <button onClick={() => updateOrderStatus(order.id, 'Chờ xử lý')} className="flex items-center w-full px-4 py-2 text-xs font-semibold text-[#346578] hover:bg-[#b6e7fe]/30 transition-colors">
                              <span className="w-2 h-2 rounded-full bg-[#346578] mr-3"></span>Chờ xử lý
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
        <div className="p-6 bg-[#eef5f3]/30 flex items-center justify-between">
          <p className="text-xs text-[#56615f] font-medium">Hiển thị {filteredOrders.length} trên tổng đơn hàng</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e1eae7] transition-colors text-[#56615f]">
              <span className="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#006b62] text-[#e2fff9] text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e1eae7] transition-colors text-[#56615f]">
              <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

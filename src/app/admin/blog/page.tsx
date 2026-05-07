import React from 'react';

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2">
            <span>Trang chủ</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#006b62] font-medium">Quản lý bài viết</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Thánh đường Kiến thức</h2>
          <p className="text-[#56615f] mt-1">Chia sẻ kinh nghiệm và bí quyết chăm sóc thú cưng cùng cộng đồng.</p>
        </div>
        <button className="bg-gradient-to-r from-[#006b62] to-[#005e56] text-[#e2fff9] px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg shadow-[#006b62]/20 hover:scale-105 transition-transform active:scale-95">
          <span className="material-symbols-outlined">add</span>
          Viết bài mới
        </button>
      </div>

      {/* Quick Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#82f6e7]/30 flex items-center justify-center text-[#006b62]">
            <span className="material-symbols-outlined">article</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Tổng bài viết</p>
            <p className="text-xl font-bold text-[#2a3433]">128</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#c6eae3]/30 flex items-center justify-center text-[#446560]">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Đã xuất bản</p>
            <p className="text-xl font-bold text-[#2a3433]">112</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#b6e7fe]/30 flex items-center justify-center text-[#346578]">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Bản nháp</p>
            <p className="text-xl font-bold text-[#2a3433]">16</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#a9b4b1]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fa746f]/20 flex items-center justify-center text-[#a83836]">
            <span className="material-symbols-outlined">visibility</span>
          </div>
          <div>
            <p className="text-xs text-[#56615f]">Lượt xem tháng</p>
            <p className="text-xl font-bold text-[#2a3433]">45.2K</p>
          </div>
        </div>
      </div>

      {/* Filters & Tools */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-[#82f6e7] text-[#005c54] rounded-full text-sm font-semibold">Tất cả</button>
          <button className="px-4 py-2 hover:bg-[#e7f0ed] text-[#56615f] rounded-full text-sm font-medium transition-colors">Đã đăng</button>
          <button className="px-4 py-2 hover:bg-[#e7f0ed] text-[#56615f] rounded-full text-sm font-medium transition-colors">Bản nháp</button>
          <button className="px-4 py-2 hover:bg-[#e7f0ed] text-[#56615f] rounded-full text-sm font-medium transition-colors">Chờ duyệt</button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm text-[#56615f] hover:text-[#006b62] transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span> Lọc theo ngày
          </button>
          <button className="flex items-center gap-2 text-sm text-[#56615f] hover:text-[#006b62] transition-colors">
            <span className="material-symbols-outlined text-sm">sort</span> Sắp xếp
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Article Row 1 */}
        <div className="group bg-white hover:bg-[#eef5f3] p-4 rounded-2xl transition-all flex items-center gap-6 shadow-sm hover:shadow-md border border-[#a9b4b1]/5">
          <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
            <img alt="Cat Care" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASqLumXTrWx6hdo6SGD-NSf0cPhlsqWPST2DlNy3fulKTw6FsBfiByifR9V9-M8WS201M5zxtWYPsKaovFnz323KkU-RpOq2gO73H1Fs7dwC2WAdV9qQxvjowFEtsdX9_gcin9OE6wvAcpFzJ_vYDWRzgc4u4v-WSdw6uhoUOONLrVN_tOvr5-5QiwaAI03ypZrZkC6TnSCiGEpLqFO0dvf5-lxgWZcawydB59YUMi-38C25c4E77m1zO-zRcpG7Ar4VMKbUGPeSg" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-[#c6eae3]/40 text-[#375853] text-[10px] font-bold rounded uppercase tracking-widest">Sức khỏe</span>
              <span className="text-xs text-[#56615f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span> 14 Tháng 05, 2024
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors mb-1">Bí quyết giúp mèo cưng luôn có bộ lông mượt mà</h3>
            <p className="text-sm text-[#56615f] line-clamp-1 opacity-80">Việc chăm sóc lông không chỉ giúp mèo đẹp hơn mà còn phòng tránh được nhiều bệnh về da liễu...</p>
            <div className="flex items-center gap-3 mt-3">
              <img alt="Author" className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH_xFtRvVtkBvtjUi3h4UI6drrdEYiEXpXJnyV8C3VezF0Lvtez1WBqR4-e0e7y4_XtbeM8bqbINnu2oAA2EO9bfPbzAoBL-J8vdRS1Wy05IZYkeAt7tIKx7CK69YLjD_JnDSGEpZ3NzPqCYWPkSiEufnUHmH4nLVpydcs4BYmba-XafTtuOmwVEyU8JvAZJKvF6pPRYAuqkQlooQTz2-bW-ny-EakFH-kB51VA4OtVIaegGrMi6BnxysdNoWsjtwloVvc7JyF8Jk" />
              <span className="text-xs font-medium text-[#2a3433]">Minh Anh</span>
              <span className="text-xs text-[#a9b4b1]">•</span>
              <span className="px-3 py-1 bg-[#006b62]/10 text-[#006b62] text-[11px] font-bold rounded-full">Đã đăng</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-[#006b62]/10 text-[#006b62] rounded-full transition-colors" title="Chỉnh sửa">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="p-2 hover:bg-[#d9e5e2] text-[#56615f] rounded-full transition-colors" title="Xem trước">
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button className="p-2 hover:bg-[#a83836]/10 text-[#a83836] rounded-full transition-colors" title="Gỡ bỏ">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>

        {/* Article Row 2 */}
        <div className="group bg-white hover:bg-[#eef5f3] p-4 rounded-2xl transition-all flex items-center gap-6 shadow-sm hover:shadow-md border border-[#a9b4b1]/5">
          <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
            <img alt="Dog Training" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxwbu-Aq5RShwSTkIGGS2WCt1O8_OTct-A1PJ7NRexA2iVXy3gvfT2eovuoQ2QoXSDw26x1Lc961G8V5n0T1qJ3IjDOli2zsxe5u0BQKMfMISBcLb45t_ZQWIjbfyc9ykf02x54ecuyk5beI1zgtr5ny12sAm5j-Ll8AiV8TfBDqGohrUKkfrbmOCNKeHeswfkNNbfUGfRsm3B7v81nQVB7qkwRkX80YwxdTorKYuvknfmDWg2lbb216tvPnf3O5WEQzGGcQdKxpw" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-[#b6e7fe]/40 text-[#235669] text-[10px] font-bold rounded uppercase tracking-widest">Huấn luyện</span>
              <span className="text-xs text-[#56615f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span> 12 Tháng 05, 2024
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors mb-1">5 bài tập cơ bản cho cún con tại nhà</h3>
            <p className="text-sm text-[#56615f] line-clamp-1 opacity-80">Bắt đầu huấn luyện từ sớm sẽ giúp cún con của bạn hình thành những thói quen tốt và kỷ luật...</p>
            <div className="flex items-center gap-3 mt-3">
              <img alt="Author" className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTq6a8228hBSv2XWlKaWR-A10vzEQOKy7h8QN-lXcpmsIsMu49QuFnRjdxm-n5JWcwsKlGpcyjAE2i8988eBUkJNRoxM1nWhVX2d-aaYwS-wrWheCakkPCs5_i6QJN8gQGOMCnRO1swLHvbIEeaY_AfHW7HoTOo5IhkQEe2HlGihtUbdiBmvg79FWiphftuLn5H9_-or_DjAT2R2uifZUT586cMcoZk2y9VdTnbmliUNadpJvJCyebo3rL_LNGZHqkYoeWUU54Qjc" />
              <span className="text-xs font-medium text-[#2a3433]">Đức Toàn</span>
              <span className="text-xs text-[#a9b4b1]">•</span>
              <span className="px-3 py-1 bg-[#006b62]/10 text-[#006b62] text-[11px] font-bold rounded-full">Đã đăng</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-[#006b62]/10 text-[#006b62] rounded-full transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="p-2 hover:bg-[#d9e5e2] text-[#56615f] rounded-full transition-colors">
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button className="p-2 hover:bg-[#a83836]/10 text-[#a83836] rounded-full transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>

        {/* Article Row 3 (Draft) */}
        <div className="group bg-white hover:bg-[#eef5f3] p-4 rounded-2xl transition-all flex items-center gap-6 shadow-sm hover:shadow-md border border-[#a9b4b1]/5">
          <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
            <img alt="Nutrition" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoF4zjDEKB2qUYfJvr8rfg_ywbEUbjR_CLE5cDnNADXgM5ti3TEbZKt_jws8RA3bTsEKWbtxT5i29aEHJdXITXxNuDeTBwLdH1091le7JI3W6G4aYxsZu1qo78x6HRZ4sTwKV2yG1-xuz7_9U5oD-N7xY_SLvh1m-lFXDLxdtxy62t_yC-HzU-tQ84yfQD2o8P2O3r1gOje6YQc_sKkuCpTMl_63tryKmJ63f3-M8KGP5Z5zLxfqWkEflamlZqn59ftq8sf_xghmw" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-[#a9b4b1]/20 text-[#56615f] text-[10px] font-bold rounded uppercase tracking-widest">Dinh dưỡng</span>
              <span className="text-xs text-[#56615f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">history</span> Cập nhật: 2 giờ trước
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors mb-1">[Bản thảo] Chế độ ăn Barf cho mèo: Lợi và hại</h3>
            <p className="text-sm text-[#56615f] line-clamp-1 opacity-80">Nội dung đang được biên soạn về các thành phần dinh dưỡng quan trọng trong chế độ ăn tươi...</p>
            <div className="flex items-center gap-3 mt-3">
              <img alt="Author" className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi2_Fd7NXIGfrO3T9rYG7RDn3iU3f24OugDjq1FaWLa2dZnM1ugeP0ZhQXKd5dARpTmlQWsGzzwhqRqdUNCTf614jJ-dXhajkZga1zT5bs35bN_jGqyO0VRX2CRpRh4_Eb4LQEK2aqFCx6d667VQZr0cyKST9m_V-Oz5hk1JCpilbrQYVsOBhvudo3uS8KpnbUqYZYY-5QOh0yBhutZ_Uo8qFWJXPJ4Uec93fGpwPgqIJYS8BZYa7XDH0JKZXPbBnmNTYAAzfkxiw" />
              <span className="text-xs font-medium text-[#2a3433]">Minh Anh</span>
              <span className="text-xs text-[#a9b4b1]">•</span>
              <span className="px-3 py-1 bg-[#e7f0ed] text-[#56615f] text-[11px] font-bold rounded-full">Bản nháp</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-[#006b62]/10 text-[#006b62] rounded-full transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="p-2 hover:bg-[#d9e5e2] text-[#56615f] rounded-full transition-colors">
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button className="p-2 hover:bg-[#a83836]/10 text-[#a83836] rounded-full transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>

        {/* Article Row 4 */}
        <div className="group bg-white hover:bg-[#eef5f3] p-4 rounded-2xl transition-all flex items-center gap-6 shadow-sm hover:shadow-md border border-[#a9b4b1]/5">
          <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
            <img alt="Dog Health" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC30e1BL1Zz5WevvzGs5FR2lufBrFmEf8T2dXY789-9xeM-ucWtB5-MaFY67yzYnIyBBKtxWCP8fsTyJWP-B-fFxUzGB4UQyv2FiGV7TXAlvtS7kSER9pcf63Z5rBMxjvPKn4MIosZ2it_5q65iCLIZ745xEVJ66Xy7MYPFjLDaN_0V9wVhMmFIM61x-FzPsI4xApII6ynHB4viSGZRqlYUHF4yvkd9RXVuwyIHuLKNu0PcDpnfSOly4NGd_ZqOSQiw2KYQWXT6dnc" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-[#c6eae3]/40 text-[#375853] text-[10px] font-bold rounded uppercase tracking-widest">Sức khỏe</span>
              <span className="text-xs text-[#56615f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span> 10 Tháng 05, 2024
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#2a3433] group-hover:text-[#006b62] transition-colors mb-1">Lịch tiêm phòng định kỳ cho chó bạn cần nhớ</h3>
            <p className="text-sm text-[#56615f] line-clamp-1 opacity-80">Đảm bảo cún cưng của bạn được bảo vệ khỏi các loại virus nguy hiểm bằng lịch trình tiêm chủng...</p>
            <div className="flex items-center gap-3 mt-3">
              <img alt="Author" className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Nw4xwRFyArZqXtxNyPdYt7uS9gBHnmUN-I96lySqyBZExz6CG08pr6CemBhmR0w4kTkATcune6Ofs4EVhkGMmb-v6hEbxfyW_QwIDa9ni2ilferaCBsSYa2-JRfA9zPButSDJsKbHon5pmi3e9SCU5PSp-WWMlyI-0CAnxEXFgHCYDZ9xDV-sPLqura9mzjb3pyE7PS9hHCXngA2WdgM75-LNKOL05xSzsRX_9umhXIOYawqAi1CzKwfk6GNIMBAkbLp_ifh4TY" />
              <span className="text-xs font-medium text-[#2a3433]">BS. Hùng</span>
              <span className="text-xs text-[#a9b4b1]">•</span>
              <span className="px-3 py-1 bg-[#006b62]/10 text-[#006b62] text-[11px] font-bold rounded-full">Đã đăng</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-[#006b62]/10 text-[#006b62] rounded-full transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="p-2 hover:bg-[#d9e5e2] text-[#56615f] rounded-full transition-colors">
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button className="p-2 hover:bg-[#a83836]/10 text-[#a83836] rounded-full transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-between border-t border-[#a9b4b1]/10 pt-6">
        <p className="text-sm text-[#56615f]">Hiển thị 1 - 4 trong tổng số 128 bài viết</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#a9b4b1]/20 hover:bg-[#e7f0ed] transition-colors disabled:opacity-30">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#006b62] text-[#e2fff9] font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e7f0ed] transition-colors font-medium">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e7f0ed] transition-colors font-medium">3</button>
          <span className="px-2 text-[#56615f]">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e7f0ed] transition-colors font-medium">32</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#a9b4b1]/20 hover:bg-[#e7f0ed] transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}

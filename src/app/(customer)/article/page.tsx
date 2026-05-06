import React from 'react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: "Chó bị chảy nước mắt: Nguyên nhân và cách khắc phục hiệu quả",
    description: "Chảy nước mắt quá nhiều ở chó có thể là dấu hiệu của nhiều vấn đề sức khỏe khác nhau. Hãy cùng tìm hiểu các nguyên nhân phổ biến và cách chăm sóc đúng cách cho đôi mắt của thú cưng.",
    category: "Sức khỏe",
    categoryColor: "bg-secondary-container text-on-secondary-container",
    date: "15/05/2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9l6yyRFvzCFFRFX9TBJi4-pXYOKOBruM78EWdozlOUWUJ-7YKxwFj2xg7qqvaaFWxX1RTs9ez9K954Cv2MwAxuavRAJvlW_CGbvg7BtJikOBhmNG5_G3niVO8_rKDRpZyGSQKvAb3ZSEVqSKHA3FNtuKtDiMGCa53IjTHySbJmisfXYqzbHo6Iz_v6uHGonXHeH6-LIzvo--8K5EGgjNG77FdSDeET8MYL5jiEY6gr-oqHCIC1dVvrinxfbxc44SmFQJgLWeEki8r",
    alt: "Chó Beagle nhìn thẳng vào ống kính"
  },
  {
    id: 2,
    title: "Chó bị trúng gió liệt chân: Nhận biết dấu hiệu và sơ cứu khẩn cấp",
    description: "Tình trạng trúng gió gây liệt chân ở chó là một trường hợp cấp cứu cần được xử lý nhanh chóng. Bài viết hướng dẫn bạn cách nhận biết các triệu chứng và các bước sơ cứu ban đầu quan trọng.",
    category: "Cấp cứu",
    categoryColor: "bg-error-container text-on-error-container",
    date: "10/05/2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-dHoyWU2bjRWwGrlU43ig5BT_UQJIYfjzAiV2Vl4X9O7sp7hYV6FVIBUC4h-8oHo8NLWpOkKuPZfBB6PLmQEOtB0IAQne8bvxlr8Vo3B7ycGqYwdLbajmD35NQIrCXLfV09M7Z2MkeeSVksSZcIufsrqcQGKd2fHp2nJFoXXngbGLMUJOt7LjjHCOcVxLSZL9pav8pRa4yNpbrWW_biQr962Vs9V4RUim5s3PGpVDQ95vZTUTXxvIIyqctK5cQB2Z5t27f0Im5EL0",
    alt: "Chó cưng đang nằm nghỉ ngơi"
  },
  {
    id: 3,
    title: "Cách chữa chó sơ sinh bị tiêu chảy: Cẩm nang chăm sóc từ chuyên gia",
    description: "Chó sơ sinh có hệ tiêu hóa rất nhạy cảm. Tiêu chảy có thể đe dọa tính mạng nếu không được điều trị kịp thời. Dưới đây là những lưu ý quan trọng khi chăm sóc cún con bị bệnh.",
    category: "Chăm sóc",
    categoryColor: "bg-secondary-container text-on-secondary-container",
    date: "05/05/2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB648moSa-nQyj-_mij8SRck_4tvIPrEHJSLCGhfRXmIJ6QYEbrBipZ1C5WU6zuVENCeaQxgszfbyXJpibrRK3IuhiYMEmGR0AHf5gIzxpC8lhcDDRmhpNbZxY4Isp6pbyY8kQuKpyX2Kt7VgvQlDv_jzM96gAV5n8uaGnvLSSNUQzzfl-ZIMcHRSWetsmqtYcnPmqDG5QbeMcdojN77wHEjNjUUle-0YSzwdgNIG6T_2NTw_gx1Lpck3f-wsS_zdbvcOxl8N0qh9oR",
    alt: "Chó con sơ sinh đang ngủ"
  },
  {
    id: 4,
    title: "Dinh dưỡng cân bằng cho mèo cưng: Những sai lầm thường gặp",
    description: "Việc lựa chọn thức ăn phù hợp ảnh hưởng trực tiếp đến tuổi thọ và sức khỏe của mèo. Khám phá những lầm tưởng phổ biến về chế độ ăn của loài feline.",
    category: "Dinh dưỡng",
    categoryColor: "bg-tertiary-container text-on-tertiary-container",
    date: "28/04/2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN8X9fQ_Ki4HVmNntmpHY6iCRpjjf24YMeLiX-2PhAXt8V3rabbupvUvW70_eD-edvAcfrH-jkxFKYjJk3rmtTbbQMXFebmy3sjm37fAn42H0ppX26i64XPe6oq5Fd1uZ6oI0EEcirF-IqDMpMx7PnX_IJflyWEqHYH_ZS0v75KeOlGWPvuypfnH0QbHaYiaWBdiDmmRDbOZ7iJLMffbGwbitwon0MVv_DTz1rRBRpjcIcSFSkiVqBnUpXjsc6K_c31VSZWAadpszW",
    alt: "Mèo đang ăn thức ăn"
  }
];

export default function ArticleListPage() {
  return (
    <main className="flex-grow pt-32 pb-24 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="font-h1 text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-6">
          Kiến thức chăm sóc thú cưng
        </h1>
        <p className="font-body-lg text-lg text-on-surface-variant">
          Khám phá những bài viết hữu ích về sức khỏe, dinh dưỡng và cách chăm sóc người bạn nhỏ của bạn từ các chuyên gia của chúng tôi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group border border-gray-100"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                alt={article.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={article.image}
              />
              <div className={`absolute top-4 left-4 ${article.categoryColor} text-xs font-bold px-3 py-1 rounded-full font-label-md`}>
                {article.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <Link href={`/article/${article.id}`} className="group-hover:text-primary transition-colors">
                <h2 className="font-h2 text-xl font-bold text-on-surface mb-3">{article.title}</h2>
              </Link>
              <p className="font-body-md text-slate-500 text-sm mb-6 flex-grow line-clamp-3">
                {article.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="font-label-md text-xs font-medium text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> {article.date}
                </span>
                <Link 
                  href={`/article/${article.id}`} 
                  className="text-primary font-label-md text-sm font-semibold hover:text-secondary transition-colors flex items-center gap-1"
                >
                  Đọc tiếp <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button className="bg-white border border-primary text-primary font-label-md font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors">
          Xem thêm bài viết
        </button>
      </div>
    </main>
  );
}

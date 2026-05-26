"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  article_id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  created_at: string;
}

export default function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const categories = ["Tất cả", "Sức khỏe", "Huấn luyện", "Dinh dưỡng"];

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("/api/articles?status=published");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sức khỏe": return "bg-secondary-container text-on-secondary-container";
      case "Cấp cứu": return "bg-error-container text-on-error-container";
      case "Dinh dưỡng": return "bg-tertiary-container text-on-tertiary-container";
      case "Huấn luyện": return "bg-primary-container text-on-primary-container";
      default: return "bg-secondary-container text-on-secondary-container";
    }
  };

  const filteredArticles = activeCategory === "Tất cả" 
    ? articles 
    : articles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="flex-grow pt-32 pb-24 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="font-h1 text-4xl md:text-5xl font-extrabold text-[#2a3433] tracking-tight mb-6">
          Kiến thức chăm sóc thú cưng
        </h1>
        <p className="font-body-lg text-lg text-[#56615f] mb-8">
          Khám phá những bài viết hữu ích về sức khỏe, dinh dưỡng và cách chăm sóc người bạn nhỏ của bạn từ các chuyên gia của chúng tôi.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-label-md text-sm transition-all ${
                activeCategory === cat
                  ? "bg-[#006b62] text-white shadow-md scale-105"
                  : "bg-white text-[#56615f] border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="material-symbols-outlined animate-spin text-5xl text-[#006b62]">progress_activity</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 text-[#56615f] italic">
          Không tìm thấy bài viết nào trong danh mục này.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article 
              key={article.article_id} 
              className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group border border-gray-100"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
                {article.image ? (
                  <img 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={article.image}
                  />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                )}
                <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-xs font-bold px-3 py-1 rounded-full font-label-md`}>
                  {article.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/article/${article.article_id}`} className="group-hover:text-[#006b62] transition-colors">
                  <h2 className="font-h2 text-xl font-bold text-[#2a3433] mb-3">{article.title}</h2>
                </Link>
                <p className="font-body-md text-[#56615f] text-sm mb-6 flex-grow line-clamp-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="font-label-md text-xs font-medium text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> {formatDate(article.created_at)}
                  </span>
                  <Link 
                    href={`/article/${article.article_id}`} 
                    className="text-[#006b62] font-label-md text-sm font-semibold hover:text-[#005e56] transition-colors flex items-center gap-1"
                  >
                    Đọc tiếp <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {filteredArticles.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button className="bg-white border border-[#006b62] text-[#006b62] font-label-md font-semibold px-8 py-3 rounded-full hover:bg-[#eef5f3] transition-colors">
            Xem thêm bài viết
          </button>
        </div>
      )}
    </main>
  );
}

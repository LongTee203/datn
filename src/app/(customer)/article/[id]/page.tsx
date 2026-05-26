"use client";
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface Article {
  article_id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
  created_at: string;
}

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const data: Article[] = await res.json();
          const found = data.find(a => a.article_id.toString() === resolvedParams.id);
          setArticle(found || null);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [resolvedParams.id]);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString("vi-VN", { day: '2-digit', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <main className="flex-grow pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-5xl text-[#006b62]">progress_activity</span>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="flex-grow pt-32 pb-24 px-4 min-h-screen flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-[#a83836] text-6xl mb-4">error</span>
        <h2 className="text-2xl font-bold text-[#2a3433] mb-4">Bài viết không tồn tại</h2>
        <Link href="/article" className="px-6 py-3 bg-[#006b62] text-white rounded-full font-bold hover:bg-[#005e56]">
          Quay lại danh sách bài viết
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-24 px-4 md:px-10 max-w-4xl mx-auto w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 text-[#56615f] text-sm font-medium">
        <Link href="/" className="hover:text-[#006b62] transition-colors">Trang chủ</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/article" className="hover:text-[#006b62] transition-colors">Kiến thức</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#2a3433] font-semibold truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 text-center">
        <span className="inline-block px-3 py-1 bg-[#eef5f3] text-[#006b62] text-xs font-bold uppercase tracking-wider rounded-md mb-4">
          {article.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2a3433] tracking-tight mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-[#56615f] text-sm">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            {formatDate(article.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Lượt xem: 1.2k
          </span>
        </div>
      </header>

      {/* Feature Image */}
      {article.image && (
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-md">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <article className="prose prose-lg prose-slate max-w-none text-[#56615f] leading-relaxed whitespace-pre-wrap">
        <p className="text-xl font-medium text-[#2a3433] mb-8 border-l-4 border-[#006b62] pl-4 italic">
          {article.description}
        </p>
        
        {article.content}
      </article>

      {/* Footer / Sharing */}
      <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#2a3433]">Chia sẻ bài viết:</span>
          <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
        <Link href="/article" className="text-[#006b62] font-bold hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Quay lại danh sách
        </Link>
      </div>
    </main>
  );
}

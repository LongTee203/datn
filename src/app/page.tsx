'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/customer/layout/Header';
import Footer from '@/components/customer/layout/Footer';
import FloatingContact from '@/components/customer/layout/FloatingContact';
import Link from 'next/link';

interface Article {
  article_id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  created_at: string;
}


export default function RootPage() {
  const [showToast, setShowToast] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("/api/articles?status=published");
        if (res.ok) {
          const data = await res.json();
          setArticles(data.slice(0, 3));
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết", err);
      } finally {
        setLoadingArticles(false);
      }
    }
    loadArticles();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="text-on-surface bg-background font-sans min-h-screen flex flex-col relative">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 px-4 md:px-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary rounded-full font-label-md text-[10px] md:text-xs uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined text-sm">verified</span> Dịch vụ chăm sóc thú cưng cao cấp
          </div>
          <h1 className="font-h1 text-on-surface max-w-xl mx-auto lg:mx-0 leading-tight text-4xl md:text-5xl font-extrabold">
            Nơi gửi gắm yêu thương cho thú cưng của bạn
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-lg mx-auto lg:mx-0 text-base md:text-lg">
            PetCare mang đến tiêu chuẩn chăm sóc 5 sao từ Spa, Khách sạn đến Dịch vụ Y tế, đảm bảo người bạn nhỏ luôn khỏe mạnh và hạnh phúc.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link href="/services" className="bg-primary text-white px-8 py-4 rounded-full font-label-md text-base hover:bg-secondary transition-all shadow-lg shadow-green-100 font-bold w-full sm:w-auto text-center inline-block">
              Đặt lịch ngay
            </Link>

          </div>
        </div>
        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary-light rounded-full blur-3xl opacity-60"></div>
          <img
            alt="Happy golden retriever"
            className="w-full aspect-[4/3] object-cover rounded-[2rem] md:rounded-[2.5rem] shadow-2xl"
            src="/petcare/14.jfif"
          />
        </div>
      </section>

      {/* 5 Reasons / About Us */}
      <section className="py-16 md:py-20 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 shadow-sm border border-gray-100">
          <div className="w-full lg:w-1/2 relative lg:order-1">
            <img
              alt="Vet examining a dog"
              className="w-full rounded-3xl shadow-xl object-cover"
              src="/petcare/15.jpg"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 lg:order-2">
            <h2 className="font-h2 text-3xl md:text-4xl text-on-surface font-bold text-center lg:text-left">
              05 Lý Do Chọn <span className="text-primary">PetCare Shop</span>
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-base md:text-lg text-center lg:text-left">
              PetCare Shop được thành lập với sứ mệnh chăm sóc các bé pet toàn diện về thẩm mỹ & sức khỏe. Chúng tôi luôn cam kết mang đến chất lượng dịch vụ tốt nhất, yêu thương và chăm sóc các bé như chính người thân yêu của mình!
            </p>
            <div className="space-y-6 pt-4">
              {[
                "Trung tâm đầu tiên chuyên sâu về dịch vụ chăm sóc cho pet.",
                "Hệ thống hotel, lồng được thiết kế chuyên sâu dành để chăm sóc các bé pet, tránh tình trạng lây nhiễm chéo.",
                "Đội ngũ Groomer nhiều kinh nghiệm, yêu thương pet được lựa chọn kĩ càng.",
                "Luôn có đội ngũ Bác Sĩ Thú Y chuyên môn cao hỗ trợ tư vấn về sức khỏe.",
                "Tại PetCare Shop các bé được chăm sóc như người thân của chúng tôi."
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-4 md:gap-5">
                  <span className="text-3xl md:text-4xl font-black text-primary opacity-30 leading-none mt-1">{idx + 1}</span>
                  <p className="text-on-surface font-medium text-sm md:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-20 px-4 md:px-10 max-w-[1440px] mx-auto w-full">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-h2 text-3xl md:text-4xl mb-3 md:mb-4 font-bold">Dịch vụ nổi bật</h2>
          <p className="text-slate-500 font-body-md text-base md:text-lg">Trải nghiệm chăm sóc chuẩn 5 sao cho thú cưng</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Grooming cắt tỉa", slug: "grooming", icon: "content_cut", img: "AB6AXuA5yUhTWYz38OWJUpDyYt4LXSjZvAs7nYm5L0sfs0FxF5y7uZrsUu_lL2Smd1us3UZlQH7Q6iNsM_VYMO8xTVWYavI5MpvMZCF36_2cyMUmq0x4Q5E2ReSx0YTQYGi5CbrRMAw2dnYNqSPPoEkEYbPN0gjPQeCiZEUG51u8lndy5x7a79F2KWKTrAdlZcuBLP3sCfBhDNR0KhCaRpvBN-W_zNXP05JG_l4AvWyvoDNL3nduMl8jDDkkjNCCJP5afbk7Oak2tX8kcfQf", desc: "Cắt tỉa, tắm massage chuyên nghiệp giúp bé yêu luôn sạch sẽ, thơm tho và có diện mạo hoàn hảo nhất." },
            { title: "Thức ăn cho cún", slug: "food", icon: "set_meal", img: "AB6AXuAsLmnS0FQTVcKA7JZX-2Pmme2IdyJIDQBRGYaE9-MH7ED_teW6IckvMV1JVs9hJlS1fIilG7uTXgOEx1_9jvngCpFY1Scrj2zcyj3NG1nB7xc8qhlz1JCkxiSPaifVN5FnDrRfI_dJH-kfbiTmOWecE3wt2RV8C7MVf75iKOT4TNOexni88gEEmT9jHyosO7U7wdB3UhdejvO6k-5Lu7HjZOF21lKvHPGEt0C0CII_30qydfozhBr9rmC6vMMtu2M_Qk6_qthk_XF1", desc: "Cung cấp các dòng thức ăn dinh dưỡng cao cấp, chính hãng, phù hợp với mọi lứa tuổi và thể trạng của cún." },
            { title: "Khách sạn cho cún", slug: "hotel", icon: "hotel", img: "AB6AXuBl3Ll8iUXOfGJnuouv505O7nnVzLvud5VGE30mO2i5-e8AoDp5AlOE0XB1LF8NF5_X_n4grnZ-DofDv3dg8w96LNr0VLXiJHM2wdU-Pd4TloqOX4A4u3O6E2sFmKfnZB0BjgMyIM12geQhG7HfQY7CiyhnFF4n2FF2QW3C1Pjcb9HMR74zP4rIVgjXG4Dh9Z0x-0WaZ2fX6Vk2ia8xwgjDIq9NDz_BHqEUAShb4BCxoxF2sTP-r3lF2xZzir8i0-r0YWWA888TxyE5", desc: "Không gian lưu trú chuẩn 5 sao, rộng rãi, thoáng mát, vệ sinh sạch sẽ đảm bảo an toàn tuyệt đối cho bé." },
            { title: "Huấn luyện cún", slug: "training", icon: "sports_baseball", img: "AB6AXuBvZJb7pZs6XfJ3w5cnBdKA6ubCDvHAZiN9p1jOiV7ZItYiGyEyKAaYyvINFO4M2pGbPDaFBHd3CzcrCyBsnkOPEK27IijYEks4UxL_op16L_Ilqnam9_nolVssN6D_-zq0b0Z2-DoCSSa9P4x1V9WoobmOMmXCCAFr9HloJPSjmQGCr5ECaEZ0LEBs9JO4JjGczKJ_V2NtvMUMvyXAFE4mNDFwg6-pXpPkObtRqVyGvuYLAJbkzLnd3nPOp8qVphv-tyiQXH6ZT9NA", desc: "Các khóa huấn luyện vâng lời, đi vệ sinh đúng chỗ, sửa lỗi hành vi từ các chuyên gia huấn luyện giàu kinh nghiệm." },
            { title: "Tiêm phòng vắc xin", slug: "vaccine", icon: "vaccines", img: "AB6AXuAOqy46JBSODwOYSJDP0mnNDpz8xDbHAdViTbMQ1sefG2Jo-LTzi0zFHNsVX1ySflsxtXqNaS0CBUjMhGgxwaNvf11O90seTGhnswZcCT6K6Q-YZd8qqhMc-N90RR1xedjQlmwMntkJ3AR9QWbibBnLswj8U87RrIsOHHpzNdHneNS-jx4-aG824e1g_sXk1qzHXDzZiz8kAfosIpypdU-W4H_g5k0NFApV3LhIJ93Gx1VajmFwoe1utu_N7BtMpOHALOvwb95tYpgt", desc: "Bảo vệ sức khỏe bé yêu với lịch tiêm phòng đầy đủ, sử dụng các loại thuốc vắc xin đạt chuẩn chất lượng quốc tế." },
            { title: "Khám thú y", slug: "vet", icon: "medical_services", img: "AB6AXuBPF8YAalKVFXrQ-L3eIoQe4eiF8jCcluON8LoGogdZBiNhkW0qbsOtfIzEjvinVsnEun9eo2wQZ_UqRNeJJyojS3H0veLtE8q1_n5N-deSfyD0jmsMt8VE5OcCDUqa_vJBe0DHHjuVI0frmFyF8RhWqzViO7_HjvPk2X5VukPKpSlp8uu4iqYHcxXKdxWTsvLwBWNSshjB0zO-M7033Ym8pC73igijTMfDqcUgb437V8CSKngYietTR2QgSzcLuQQn2SflKPq2OU0b", desc: "Dịch vụ khám tổng quát, chẩn đoán và điều trị bệnh bằng hệ thống máy móc, thiết bị y khoa hiện đại." }
          ].map((srv, idx) => (
            <div key={idx} className="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_10px_40px_-10px_rgba(41,102,76,0.08)] flex flex-col justify-between h-full group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary border border-[#f1f5f3]">
              <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
                <img alt="background" className="w-full h-full object-cover" src={`https://lh3.googleusercontent.com/aida-public/${srv.img}`} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">{srv.icon}</span>
                  </div>
                  <h3 className="font-h3 text-lg md:text-xl font-bold text-on-surface group-hover:text-primary transition-colors">{srv.title}</h3>
                </div>
                <p className="text-slate-500 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">{srv.desc}</p>
              </div>
              <Link className="relative z-10 font-bold text-sm text-primary flex items-center gap-2 hover:text-secondary transition-colors uppercase tracking-wide w-fit" href={srv.slug === "food" ? "/shop" : "/services"}>
                {srv.slug === "food" ? "Xem cửa hàng" : "Đặt lịch ngay"} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-16 flex justify-center">
          <Link href="/services" className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-label-md text-base md:text-lg hover:bg-secondary transition-all shadow-lg shadow-green-100 font-bold uppercase tracking-wide w-full sm:w-auto text-center inline-block">
            Đặt lịch ngay
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 px-4 md:px-10 max-w-[1440px] mx-auto border-t border-gray-100 w-full">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-h2 text-2xl md:text-3xl mb-3 md:mb-4 font-bold">Quy trình chăm sóc chuyên nghiệp</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "1. Đặt lịch", icon: "event_available", desc: "Chọn thời gian và dịch vụ phù hợp qua website hoặc hotline." },
            { step: "2. Tiếp nhận", icon: "clinical_notes", desc: "Kiểm tra sơ bộ tình trạng sức khỏe của bé khi vừa đến shop." },
            { step: "3. Chăm sóc", icon: "soap", desc: "Bác sĩ và chuyên viên tiến hành quy trình chăm sóc chuyên sâu." },
            { step: "4. Hoàn tất", icon: "verified_user", desc: "Bé được bàn giao với diện mạo mới kèm tư vấn chăm sóc tại nhà." }
          ].map((item, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-2xl md:text-3xl">{item.icon}</span>
              </div>
              <h4 className="font-bold text-lg md:text-xl mb-2 md:mb-3">{item.step}</h4>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-primary-light/10 border-t border-gray-100 md:border-t-0 w-full flex-shrink-0">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          <h2 className="font-h2 text-2xl md:text-3xl text-center mb-10 md:mb-16 font-bold">Khách hàng nói về chúng tôi</h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 md:pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { name: "Chị Mai Anh", pet: "Chủ của bé Poodle Bông", review: `"Dịch vụ spa ở đây cực kỳ chuyên nghiệp. Bé nhà mình rất nhát nhưng đến đây lại rất ngoan và sạch sẽ."`, stars: 5 },
                { name: "Anh Tuấn", pet: "Chủ của bé Corgi Mập", review: `"Khách sạn thú cưng sạch thoáng, mình đi du lịch 1 tuần mà hoàn toàn yên tâm vì luôn nhận được ảnh cập nhật."`, stars: 5 },
                { name: "Chị Lan", pet: "Chủ của bé British Shorthair", review: `"Bác sĩ rất nhiệt tình tư vấn chế độ dinh dưỡng. Bé mèo nhà mình đã cải thiện cân nặng rõ rệt sau 1 tháng."`, stars: 4.5 },
                { name: "Bạn Minh", pet: "Chủ của bé Golden Retriever", review: `"Mấy bạn Groomer cắt tỉa cực kỳ có tâm và khéo léo. Cún nhà mình cắt xong nhìn cưng xỉu luôn."`, stars: 5 },
                { name: "Cô Hương", pet: "Chủ của bé Samoyed", review: `"Tiệm sạch sẽ, các bạn nhân viên tư vấn siêu nhiệt tình. Sẽ luôn ủng hộ PetCare lâu dài!"`, stars: 5 },
                { name: "Anh Khang", pet: "Chủ của bé Husky", review: `"Chương trình huấn luyện vâng lời ở đây quá tốt. Bé nhà mình bớt phá đồ đạc hơn hẳn."`, stars: 4.5 }
              ].map((testi, idx) => (
                <div key={idx} className="min-w-[300px] md:min-w-[450px] bg-white p-6 md:p-10 rounded-3xl snap-center border border-gray-100 shadow-sm">
                  <div className="flex text-accent mb-4 md:mb-6">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${s <= testi.stars ? 1 : 0}` }}>
                        {s <= testi.stars ? "star" : (s - 0.5 === testi.stars ? "star_half" : "star")}
                      </span>
                    ))}
                  </div>
                  <p className="font-body-lg italic text-slate-700 leading-relaxed text-base md:text-lg">{testi.review}</p>
                  <div className="flex items-center gap-4 pt-4 md:pt-6 mt-4 md:mt-6 border-t border-gray-100">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-light flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">person</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm md:text-base">{testi.name}</p>
                      <p className="text-xs md:text-sm text-slate-500">{testi.pet}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-2 md:mt-4">
              <button className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary transition-all"></button>
              <button className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/30 transition-all"></button>
              <button className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/30 transition-all"></button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-20 bg-primary-light/20 border-t border-gray-100 md:border-t-0 px-4 md:px-10 w-full flex-shrink-0">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
            <div>
              <h2 className="font-h2 text-2xl md:text-3xl mb-2 md:mb-3 font-bold">Kiến thức chăm sóc</h2>
              <p className="text-slate-500 font-body-md text-base md:text-lg">Cập nhật tin tức và kinh nghiệm nuôi thú cưng</p>
            </div>
            <Link href="/article" className="text-primary font-bold flex items-center gap-2 hover:underline text-sm md:text-base">
              Tất cả bài viết <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {loadingArticles ? (
              <div className="col-span-1 md:col-span-3 flex justify-center py-10">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
              </div>
            ) : articles.length > 0 ? (
              articles.map((blog) => (
                <Link key={blog.article_id} href={`/article/${blog.article_id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group block">
                  <div className="overflow-hidden bg-gray-50 aspect-[4/3] sm:aspect-auto sm:h-48 md:h-56">
                    {blog.image ? (
                      <img alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={blog.image} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 space-y-3 md:space-y-4">
                    <span className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded inline-block">{blog.category}</span>
                    <h4 className="font-bold text-lg md:text-xl leading-snug group-hover:text-primary transition-colors">{blog.title}</h4>
                    <p className="text-slate-500 text-sm md:text-base line-clamp-2">{blog.description}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center py-10 text-slate-500 italic">
                Chưa có bài viết nào.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 px-4 md:px-10 max-w-[1440px] mx-auto border-t border-gray-100 w-full">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-h2 text-2xl md:text-3xl mb-2 md:mb-4 font-bold">Đội ngũ chăm sóc</h2>
          <p className="text-slate-500 font-body-md text-base md:text-lg">Những chuyên gia tận tâm và giàu kinh nghiệm</p>
        </div>
        <div className="flex lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar gap-6 md:gap-8 pb-4 md:pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { name: "BS. Nguyễn Nam", role: "Bác sĩ Thú y", desc: "Hơn 10 năm kinh nghiệm trong chẩn đoán và điều trị bệnh lý thú nhỏ.", img: "AB6AXuBPF8YAalKVFXrQ-L3eIoQe4eiF8jCcluON8LoGogdZBiNhkW0qbsOtfIzEjvinVsnEun9eo2wQZ_UqRNeJJyojS3H0veLtE8q1_n5N-deSfyD0jmsMt8VE5OcCDUqa_vJBe0DHHjuVI0frmFyF8RhWqzViO7_HjvPk2X5VukPKpSlp8uu4iqYHcxXKdxWTsvLwBWNSshjB0zO-M7033Ym8pC73igijTMfDqcUgb437V8CSKngYietTR2QgSzcLuQQn2SflKPq2OU0b" },
            { name: "Trần Linh Trang", role: "Chuyên gia Grooming", desc: "Phù thủy cắt tỉa lông, giúp các bé luôn có diện mạo lộng lẫy nhất.", img: "AB6AXuA5yUhTWYz38OWJUpDyYt4LXSjZvAs7nYm5L0sfs0FxF5y7uZrsUu_lL2Smd1us3UZlQH7Q6iNsM_VYMO8xTVWYavI5MpvMZCF36_2cyMUmq0x4Q5E2ReSx0YTQYGi5CbrRMAw2dnYNqSPPoEkEYbPN0gjPQeCiZEUG51u8lndy5x7a79F2KWKTrAdlZcuBLP3sCfBhDNR0KhCaRpvBN-W_zNXP05JG_l4AvWyvoDNL3nduMl8jDDkkjNCCJP5afbk7Oak2tX8kcfQf" },
            { name: "Lê Văn Hùng", role: "Huấn luyện viên", desc: "Chuyên gia chỉnh sửa hành vi và huấn luyện vâng lời cho cún.", img: "AB6AXuBvZJb7pZs6XfJ3w5cnBdKA6ubCDvHAZiN9p1jOiV7ZItYiGyEyKAaYyvINFO4M2pGbPDaFBHd3CzcrCyBsnkOPEK27IijYEks4UxL_op16L_Ilqnam9_nolVssN6D_-zq0b0Z2-DoCSSa9P4x1V9WoobmOMmXCCAFr9HloJPSjmQGCr5ECaEZ0LEBs9JO4JjGczKJ_V2NtvMUMvyXAFE4mNDFwg6-pXpPkObtRqVyGvuYLAJbkzLnd3nPOp8qVphv-tyiQXH6ZT9NA" },
            { name: "Phạm Thanh Tú", role: "Chuyên viên Dinh dưỡng", desc: "Tư vấn chế độ ăn cá nhân hóa giúp thú cưng phát triển khỏe mạnh.", img: "AB6AXuAFSWrj7Pfy7eNpH3vx9jy3lgCT2LrIa5UlJEFNktdob8sMiCvsE6UPOUQO9n3FIG3UrmaAfdL6Np1SHyQJMs1RiD8mPOBhr3BWWBcyTflw_WpEpWrmYPtk0J_uJysQ16Wpt33BYWVWyiYBt8D2XQ6HZUJbqSmlYchv6T3zsHBRGE4aAu3lg6XRzz9S9KhFe2h762nvLQgzdsGlc0F3MXl56h1k3-ibZVtrf6K5hHM0mcHLURYZA7kM9_sZFApC7EBi2DXPAPXBUb7b" }
          ].map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 text-center group hover:border-primary transition-colors snap-center min-w-[280px] lg:min-w-0 lg:flex-1">
              <img alt={member.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary-light group-hover:border-primary transition-colors" src={`https://lh3.googleusercontent.com/aida-public/${member.img}`} />
              <h3 className="font-bold text-lg md:text-xl text-on-surface">{member.name}</h3>
              <p className="text-primary text-xs md:text-sm font-bold mb-2">{member.role}</p>
              <p className="text-slate-500 text-xs md:text-sm">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16 md:py-20 px-4 md:px-10 max-w-[1440px] mx-auto border-t border-gray-100 md:border-t-0 w-full mb-16">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-gray-100">
          <div className="p-8 md:p-12 lg:p-20 space-y-6 md:space-y-8">
            <h2 className="font-h2 text-3xl md:text-4xl font-bold">Đặt lịch hẹn nhanh</h2>
            <p className="text-slate-500 font-body-md text-base md:text-lg">Chỉ mất 30 giây để đặt chỗ chăm sóc cho bé yêu của bạn.</p>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input className="w-full bg-background border-gray-100 focus:border-primary focus:ring-0 rounded-xl p-3 md:p-4 text-sm md:text-base outline-none transition-colors" placeholder="Họ và tên" type="text" />
                <input className="w-full bg-background border-gray-100 focus:border-primary focus:ring-0 rounded-xl p-3 md:p-4 text-sm md:text-base outline-none transition-colors" placeholder="Số điện thoại" type="tel" />
              </div>
              <select className="w-full bg-background border-gray-100 focus:border-primary focus:ring-0 rounded-xl p-3 md:p-4 text-sm md:text-base appearance-none outline-none transition-colors">
                <option>Chọn dịch vụ</option>
                <option>Grooming cắt tỉa</option>
                <option>Thức ăn cho cún</option>
                <option>Khách sạn cho cún</option>
                <option>Huấn luyện cún</option>
                <option>Tiêm phòng vắc xin</option>
                <option>Khám thú y</option>
              </select>
              <textarea className="w-full bg-background border-gray-100 focus:border-primary focus:ring-0 rounded-xl p-3 md:p-4 text-sm md:text-base h-32 md:h-40 outline-none transition-colors resize-none" placeholder="Thông tin thú cưng (Giống, cân nặng, tình trạng...)"></textarea>
              <button className="w-full bg-primary text-white py-4 md:py-5 rounded-xl font-bold text-sm md:text-base hover:bg-secondary transition-all shadow-lg shadow-green-50 uppercase tracking-wider">
                GỬI YÊU CẦU ĐẶT LỊCH
              </button>
            </form>
          </div>
          <div className="hidden lg:block relative bg-primary-light overflow-hidden">
            <img alt="Pet care clinic" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl3Ll8iUXOfGJnuouv505O7nnVzLvud5VGE30mO2i5-e8AoDp5AlOE0XB1LF8NF5_X_n4grnZ-DofDv3dg8w96LNr0VLXiJHM2wdU-Pd4TloqOX4A4u3O6E2sFmKfnZB0BjgMyIM12geQhG7HfQY7CiyhnFF4n2FF2QW3C1Pjcb9HMR74zP4rIVgjXG4Dh9Z0x-0WaZ2fX6Vk2ia8xwgjDIq9NDz_BHqEUAShb4BCxoxF2sTP-r3lF2xZzir8i0-r0YWWA888TxyE5" />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#2D6A4F] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-[bounce_0.5s_ease-out]">
          <span className="material-symbols-outlined">check_circle</span>
          <p className="font-bold">Gửi yêu cầu đặt lịch thành công!</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up newsletter API
    setEmail("");
  };

  return (
    <section className="py-16">
      <div className="bg-primary rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
        {/* Decorative skewed background */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />

        {/* Text & Form */}
        <div className="max-w-md relative z-10">
          <h2 className="text-3xl font-black mb-4 font-headline">
            Sắm ngay những thứ tốt nhất!
          </h2>
          <p className="text-white/80 mb-8">
            Thực phẩm cao cấp, đồ chơi và vật tư y tế được giao tận cửa nhà
            bạn. Nhận ngay ưu đãi 20% cho đơn hàng đầu tiên.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className="flex-1 rounded-full px-6 py-4 text-[#111811] border-none outline-none"
            />
            <button
              type="submit"
              className="bg-[#111811] text-white px-8 py-4 rounded-full font-bold hover:brightness-125 transition-all"
            >
              Tham gia ngay
            </button>
          </form>
        </div>

        {/* Decorative illustration */}
        <div
          className="hidden lg:block w-72 h-72 bg-center bg-no-repeat bg-contain relative z-10"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSXx8tvQamVleWMKk72FFpgLYlcPDgm_Iem9p81V8s10vbwwFSbyHCp0XDgKlkNjg58f5LtBQJxgWZGMMD3aMjrcYnsJ7dNDKBgcfwDpKkv1cWKvLlSoycPeg0HfF0g2ePZ-apbbSzF4GFhg1YJgMmtet0pBQ_s11rdJZ0oY05Y8dEDJO59qfPioiD2EjT8djvkIfT7tAc5M_jiDcU2CSdUYuJk7OijM5FPy1l2hjPQ4pvxMs33klc25LlO6BTV9fuBQIQXfKXWG8i")`,
          }}
          role="img"
          aria-label="Pet supplies illustration"
        />
      </div>
    </section>
  );
}

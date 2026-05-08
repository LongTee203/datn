"use client";

import { useState } from "react";

export default function ContactForm() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
        Gửi tin nhắn
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-gray-700"
          >
            Họ và tên
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Nguyễn Văn A"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            required
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="email@example.com"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            required
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-gray-700"
          >
            Nội dung
          </label>
          <textarea
            id="contact-message"
            rows={4}
            placeholder="Lời nhắn của bạn..."
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Gửi tin nhắn
        </button>
      </form>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#2D6A4F] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-[bounce_0.5s_ease-out]">
          <span className="material-symbols-outlined">check_circle</span>
          <p className="font-bold">Gửi tin nhắn thành công!</p>
        </div>
      )}
    </section>
  );
}

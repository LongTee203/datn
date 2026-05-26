"use client";

import { useState } from "react";

interface FormState {
  full_name: string;
  email:     string;
  phone:     string;
  message:   string;
}

const INITIAL: FormState = { full_name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm]         = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]     = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contacts", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
        Gửi tin nhắn
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Full name */}
        <div className="space-y-1">
          <label htmlFor="contact-name" className="text-sm font-medium text-gray-700">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="full_name"
            type="text"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="contact-email" className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        {/* Phone (optional) */}
        <div className="space-y-1">
          <label htmlFor="contact-phone" className="text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="0900 000 000"
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label htmlFor="contact-message" className="text-sm font-medium text-gray-700">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Lời nhắn của bạn..."
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white py-3 rounded-md font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              Đang gửi...
            </>
          ) : (
            "Gửi tin nhắn"
          )}
        </button>
      </form>

      {/* Toast */}
      {status !== "idle" && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-[bounce_0.4s_ease-out] ${
            status === "success"
              ? "bg-[#2D6A4F] text-white"
              : "bg-[#a83836] text-white"
          }`}
        >
          <span className="material-symbols-outlined">
            {status === "success" ? "check_circle" : "error"}
          </span>
          <p className="font-bold">
            {status === "success"
              ? "Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm."
              : "Có lỗi xảy ra. Vui lòng thử lại."}
          </p>
        </div>
      )}
    </section>
  );
}

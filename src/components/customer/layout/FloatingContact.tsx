"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ChatbotWidget from "@/components/customer/ChatbotWidget";

export default function FloatingContact({ facebook, zalo }: { facebook?: string; zalo?: string }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [links, setLinks] = useState({ facebook, zalo });

  useEffect(() => {
    if (!facebook && !zalo) {
      fetch("/api/settings")
        .then(res => res.json())
        .then(data => setLinks({ facebook: data.facebook, zalo: data.zalo }))
        .catch(console.error);
    }
  }, [facebook, zalo]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 bg-[#2a3433] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all hover:bg-[#006b62] hover:shadow-[#006b62]/30 ${showTopBtn ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-10 pointer-events-none"
          }`}
        title="Cuộn lên đầu trang"
      >
        <span className="material-symbols-outlined font-bold text-xl">arrow_upward</span>
      </button>

      {/* Chatbot */}
      <ChatbotWidget />

      {/* Facebook */}
      {links.facebook && (
        <a
          href={links.facebook}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform hover:shadow-blue-600/30"
          title="Liên hệ qua Facebook"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
          </svg>
        </a>
      )}

      {/* Zalo */}
      {links.zalo && (
        <a
          href={links.zalo}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#0068ff] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform hover:shadow-[#0068ff]/30"
          title="Liên hệ qua Zalo"
        >
          <span className="font-bold text-xl font-sans tracking-tighter">Zalo</span>
        </a>
      )}
    </div>
  );
}

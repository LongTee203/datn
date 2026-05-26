"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// ─── Suggested Questions ──────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  "🛍️ Có những sản phẩm nào?",
  "✂️ Dịch vụ tắm giá bao nhiêu?",
  "📅 Làm sao đặt lịch hẹn?",
  "🏠 Cửa hàng ở đâu?",
  "🐶 Cách chăm sóc chó?",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

// ─── Markdown-lite renderer ───────────────────────────────────────────────────

function renderContent(text: string) {
  // Convert **bold**, *italic*, bullet points, line breaks
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (!line.trim()) {
      elements.push(<br key={i} />);
      return;
    }
    // Bullet
    if (/^[-•*]\s/.test(line.trim())) {
      const content = line.replace(/^[-•*]\s/, "");
      elements.push(
        <div key={i} className="flex gap-1.5 my-0.5">
          <span className="text-emerald-500 mt-0.5">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
        </div>
      );
    } else {
      elements.push(
        <p key={i} className="my-0.5" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  });

  return <>{elements}</>;
}

function formatInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-black/10 px-1 rounded text-xs">$1</code>');
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Xin chào! 🐾 Tôi là trợ lý AI của **Pet Care Shop**. Tôi có thể giúp bạn tìm hiểu về sản phẩm, dịch vụ, hoặc đặt lịch hẹn. Bạn cần hỗ trợ gì không?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasNew, setHasNew] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNew(false);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setShowSuggestions(false);
      const userMsg: Message = {
        id: genId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const history = messages
          .filter((m) => m.id !== "welcome")
          .slice(-6)
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data = await res.json();
        const reply = data.reply ?? data.error ?? "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!";

        const botMsg: Message = {
          id: genId(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);

        if (!open) setHasNew(true);

        // Dispatch custom events for real-time reactivity on the profile page
        if (data.actionExecuted === "booking_created") {
          window.dispatchEvent(new Event("booking-updated"));
        } else if (data.actionExecuted === "pet_created") {
          window.dispatchEvent(new Event("pet-updated"));
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: genId(),
            role: "assistant",
            content: "Xin lỗi, kết nối bị gián đoạn. Vui lòng thử lại sau! 🙏",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, open]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Xin chào! 🐾 Tôi là trợ lý AI của **Pet Care Shop**. Tôi có thể giúp bạn tìm hiểu về sản phẩm, dịch vụ, hoặc đặt lịch hẹn. Bạn cần hỗ trợ gì không?",
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        id="chatbot-toggle-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Mở chatbot hỗ trợ"
        className="relative group flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #16a34a 0%, #059669 50%, #0d9488 100%)",
        }}
      >
        {/* Ping animation when has new message */}
        {hasNew && (
          <span className="absolute top-0 right-0 w-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        )}

        {/* Icon */}
        <span className="text-xl transition-transform duration-300">
          {open ? "✕" : "🐾"}
        </span>

        {/* Tooltip */}
        <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {open ? "Đóng chat" : "Chat với AI"}
        </span>
      </button>

      {/* ── Chat Panel ── */}
      <div
        id="chatbot-panel"
        className={`fixed bottom-[110px] right-20 z-[100] transition-all duration-300 origin-bottom-right ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
        style={{ width: "clamp(320px, 90vw, 400px)" }}
      >
        <div
          className="flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            height: "clamp(480px, 70vh, 580px)",
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center gap-3 px-4 py-3 text-white flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #16a34a 0%, #059669 60%, #0d9488 100%)",
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                🐾
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-none">Pet AI Assistant</p>
              <p className="text-xs text-green-100 mt-0.5">Trợ lý thông minh • Luôn sẵn sàng</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title="Cuộc trò chuyện mới"
                aria-label="Xóa lịch sử chat"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Thu nhỏ chatbot"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ background: "#f8faf8" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-1">
                    🤖
                  </div>
                )}

                {/* Bubble */}
                <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "rounded-tr-sm text-white"
                        : "rounded-tl-sm text-gray-800 bg-white border border-gray-100"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, #16a34a, #059669)" }
                        : {}
                    }
                  >
                    {renderContent(msg.content)}
                  </div>
                  <span className="text-[10px] text-gray-400 px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs mt-1">
                  🤖
                </div>
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* ── Suggested Questions ── */}
          {showSuggestions && (
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0 border-t border-gray-100" style={{ background: "#f8faf8" }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  className="flex-shrink-0 text-xs bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400 px-2.5 py-1.5 rounded-full transition-all duration-200 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* ── Input ── */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white flex-shrink-0"
          >
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={loading}
              className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-emerald-400 focus:bg-white transition-all disabled:opacity-50 text-gray-800 placeholder-gray-400"
              onFocus={() => setShowSuggestions(false)}
            />
            <button
              type="submit"
              id="chatbot-send-btn"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}
              aria-label="Gửi tin nhắn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

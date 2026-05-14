"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { setSessionCookie, homeForRole } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/lib/users";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Email hoặc mật khẩu không đúng.");
        setLoading(false);
        return;
      }

      const session = {
        id: String(data.id),
        email: data.email,
        name: data.name,
        role: data.role as UserRole,
        avatar: data.avatar,
      };

      setSessionCookie(session);
      login(session);
      router.push(homeForRole(session.role));
    } catch {
      setError("Không thể kết nối máy chủ. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#ffffff", color: "#00362a" }}
    >
      {/* ── Minimal Auth Header ── */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">pets</span>
          </div>
          <div className="text-2xl font-black text-primary tracking-tighter">
            PetCare<span className="text-secondary font-light">Shop</span>
          </div>
        </div>
        <Link
          href="/"
          className="group flex items-center gap-2 font-medium text-sm transition-colors"
          style={{ color: "#2f6555" }}
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Quay lại trang chủ
        </Link>
      </header>

      {/* ── Main ── */}
      <main className="flex-grow flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Branding & Image ── */}
          <div className="hidden lg:block relative">
            <div
              className="absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-40"
              style={{ backgroundColor: "#b2f6df" }}
            />
            <div className="relative z-10 space-y-8">
              <h1
                className="text-5xl font-extrabold tracking-tight leading-tight font-headline"
                style={{ color: "#00362a" }}
              >
                Nơi tình yêu dành cho <br />
                <span style={{ color: "#29664c" }} className="italic">
                  thú cưng
                </span>{" "}
                nở rộ.
              </h1>
              <p className="text-lg max-w-md leading-relaxed" style={{ color: "#2f6555" }}>
                Chào mừng bạn quay lại với khu vườn chăm sóc sức khỏe toàn
                diện nhất cho người bạn bốn chân của mình.
              </p>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBURl7crUIAxQa-jEGTi9fVmay6jK55LZzfW3ArzQNZ2fPPhOEUJtle5ou6Pgv37hLGVktfbCudVItF-ah3yT8Z-w25_zuW3z_Lbs1kllth23oUy2vRO7DSA2W4PEIFHd-b5KWXdOpHrS1sTlkzDHagqe54Gj5174WS4aGn2Zha6DXAq2HwLlV5JdqbTxNZTWqu1KO_EYYRPbe2sL0m2W3zbL7fPosyWZJRLFdAi2VY_S1666qpSPEuIi1c0dffjQzc-fCORDBxA4nc"
                  alt="Happy golden retriever"
                  width={600}
                  height={450}
                  className="w-full h-[450px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#29664c]/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* ── Right: Login Form ── */}
          <div className="flex flex-col justify-center items-center lg:items-start">
            <div
              className="w-full max-w-md p-8 md:p-10 rounded-lg ghost-border backdrop-blur-sm"
              style={{ backgroundColor: "rgba(191,254,232,0.30)" }}
            >
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-2 font-headline" style={{ color: "#00362a" }}>
                  Đăng nhập
                </h2>
                <p style={{ color: "#2f6555" }}>
                  Tiếp tục hành trình chăm sóc thú cưng của bạn
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="login-email" className="block text-sm font-semibold px-1" style={{ color: "#2f6555" }}>
                    Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4b8170]">
                      mail
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@petcare.com"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-full ghost-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-[#4b8170]/60"
                      style={{ color: "#00362a" }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label htmlFor="login-password" className="block text-sm font-semibold" style={{ color: "#2f6555" }}>
                      Mật khẩu
                    </label>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4b8170]">
                      lock
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-4 bg-white rounded-full ghost-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-[#4b8170]/60"
                      style={{ color: "#00362a" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4b8170] hover:text-[#29664c] transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold hover:underline"
                    style={{ color: "#29664c" }}
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-sm text-red-500 font-medium px-1">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 font-bold rounded-full active:scale-[0.98] transition-all flex justify-center items-center gap-2 group shadow-lg disabled:opacity-60"
                  style={{ backgroundColor: "#29664c", color: "#c8ffe0", boxShadow: "0 10px 15px -3px rgba(41,102,76,0.1)" }}
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      Đăng nhập
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Registered success banner */}
              {justRegistered && (
                <div className="mt-6 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="material-symbols-outlined text-emerald-600 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <p className="text-sm text-emerald-700 font-medium">Đăng ký thành công! Hãy đăng nhập để tiếp tục.</p>
                </div>
              )}

              {/* Register link */}
              <div className="mt-10 pt-8 text-center" style={{ borderTop: "1px solid rgba(129,184,166,0.10)" }}>
                <p className="text-sm" style={{ color: "#2f6555" }}>
                  Chưa có tài khoản?{" "}
                  <Link href="/register" className="font-bold hover:underline underline-offset-4 ml-1" style={{ color: "#29664c" }}>
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex gap-6 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
              {[{ icon: "verified_user", label: "Bảo mật SSL" }, { icon: "favorite", label: "Pet Friendly" }].map(({ icon, label }) => (
                <div key={icon} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#00362a" }}>
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Auth Footer ── */}
      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-emerald-50/50">
        <div className="flex flex-col md:items-start items-center gap-2">
          <div className="text-lg font-bold text-primary font-headline flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-xl">pets</span>
            PetCare<span className="text-secondary font-light">Shop</span>
          </div>
          <p className="text-emerald-800/70 text-sm">© 2024 PetCareShop. Nurturing with intention.</p>
        </div>
        <div className="flex gap-6 text-sm text-emerald-700/70">
          {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
            <a key={item} href="#" className="hover:text-emerald-900 transition-colors">{item}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  minLength,
  suffix,
}: {
  id: keyof FormState;
  label: string;
  icon: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  minLength?: number;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold ml-4"
        style={{ color: "#00362a" }}
      >
        {label}
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#4b8170]">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          minLength={minLength}
          className="w-full pl-14 pr-12 py-4 rounded-full border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-[#4b8170]"
          style={{ backgroundColor: "#bffee8", color: "#00362a" }}
        />
        {suffix}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Generic field updater
  function setField(field: keyof FormState) {
    return (val: string) => setForm((prev) => ({ ...prev, [field]: val }));
  }

  // ── Client-side pre-validation ──────────────────────────────────────────
  function validate(): string | null {
    if (form.password !== form.confirmPassword) {
      return "Mật khẩu xác nhận không khớp.";
    }
    if (form.password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    return null;
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const clientError = validate();
    if (clientError) {
      setError(clientError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Đăng ký thất bại. Vui lòng thử lại.");
        return;
      }

      // Success → redirect to login with success flag
      router.push("/login?registered=true");
    } catch {
      setError("Không thể kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ color: "#00362a" }}>
      {/* Back to home */}
      <div className="absolute top-6 right-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "#2f6555" }}
        >
          <span className="material-symbols-outlined text-lg">west</span>
          <span>Quay lại trang chủ</span>
        </Link>
      </div>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── Left: Branding ── */}
          <div className="hidden md:flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">pets</span>
                </div>
                <div className="text-2xl font-black text-primary tracking-tighter">
                  PetCare<span className="text-secondary font-light">Shop</span>
                </div>
              </div>
              <h1
                className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter font-headline"
                style={{ color: "#00362a" }}
              >
                Khởi đầu hành trình <br />
                <span style={{ color: "#29664c" }}>chăm sóc tận tâm.</span>
              </h1>
              <p className="text-lg max-w-md" style={{ color: "#2f6555" }}>
                Tham gia cộng đồng yêu thú cưng để nhận được những dịch vụ
                chăm sóc hữu cơ và chuyên nghiệp nhất cho người bạn bốn chân
                của bạn.
              </p>
            </div>

            {/* Image */}
            <div className="relative pt-12">
              <div
                className="absolute -top-4 -left-4 w-32 h-32 rounded-full opacity-50 blur-3xl"
                style={{ backgroundColor: "#a0f4c8" }}
              />
              <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/5]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvw1Y99xt5GzC-IPCYa1XfWDhul69GDamrT14uy8sD0e9m5xPbSt0d0DbSag9beg2BziZ2Jpn7ICwYnrxo0TXIer2ve7u6u7P3GV0biEbPXbdJPIMI2rdUOPw84ogwGtkBHrjMmgCaFT53DSlXLgvyq1CYjgxNMyOnTS_eM5DMFTYFdAA2diqnGSjkY1mCysGsjkilsLE3Wyq6-I14RszOleoPYv8GYOSyYjP8i3mtgk6NGSwv1EmDjW2nyhonfuh0tX1DZKkDbEng"
                  alt="A friendly golden retriever puppy sitting in a sunlit garden"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 p-6 rounded-lg shadow-xl flex items-center gap-4"
                style={{ backgroundColor: "#b9f9d6" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#29664c", color: "#c8ffe0" }}
                >
                  <span className="material-symbols-outlined">pets</span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#246147" }}>Hơn 5000+</p>
                  <p className="text-xs opacity-80" style={{ color: "#246147" }}>Thú cưng hạnh phúc</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h2
                className="text-3xl font-bold mb-2 font-headline"
                style={{ color: "#00362a" }}
              >
                Đăng ký tài khoản
              </h2>
              <p style={{ color: "#2f6555" }}>Vui lòng điền thông tin để bắt đầu</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <FormField
                id="name"
                label="Họ và tên"
                icon="person"
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={setField("name")}
              />

              <FormField
                id="email"
                label="Email"
                icon="mail"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={setField("email")}
              />

              <FormField
                id="phone"
                label="Số điện thoại"
                icon="call"
                type="tel"
                placeholder="0901 234 567"
                value={form.phone}
                onChange={setField("phone")}
              />

              <FormField
                id="password"
                label="Mật khẩu"
                icon="lock"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={setField("password")}
                minLength={6}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4b8170] hover:text-primary transition-colors"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                }
              />

              <FormField
                id="confirmPassword"
                label="Xác nhận mật khẩu"
                icon="lock_reset"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={setField("confirmPassword")}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4b8170] hover:text-primary transition-colors"
                    aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showConfirm ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                }
              />

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  id="register-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 font-bold rounded-full active:scale-[0.98] transition-all flex justify-center items-center gap-2 group shadow-lg disabled:opacity-60"
                  style={{
                    backgroundColor: "#29664c",
                    color: "#c8ffe0",
                    boxShadow: "0 10px 15px -3px rgba(41,102,76,0.1)",
                  }}
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      Tạo tài khoản
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Login link */}
              <div className="text-center pt-4">
                <p style={{ color: "#2f6555" }}>
                  Đã có tài khoản?{" "}
                  <Link
                    href="/login"
                    className="font-bold hover:underline underline-offset-4 ml-1"
                    style={{ color: "#29664c" }}
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-emerald-50">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold text-primary font-headline flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-xl">pets</span>
            PetCare<span className="text-secondary font-light">Shop</span>
          </div>
          <p className="opacity-80 text-sm text-emerald-800">
            © 2024 PetCareShop. Nurturing with intention.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-700/70">
          {["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"].map((item) => (
            <a key={item} href="#" className="hover:text-emerald-900 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
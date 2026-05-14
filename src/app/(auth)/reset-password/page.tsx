"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!token || !email) {
    return (
      <div className="text-center space-y-4">
        <span className="material-symbols-outlined text-red-500 text-5xl">error</span>
        <h2 className="text-xl font-bold text-gray-800">Đường dẫn không hợp lệ</h2>
        <p className="text-gray-600">Vui lòng kiểm tra lại đường dẫn trong email của bạn.</p>
        <Link href="/forgot-password" className="inline-block mt-4 text-emerald-600 font-semibold hover:underline">
          Yêu cầu link mới
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch {
      setError("Không thể kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <span className="material-symbols-outlined text-emerald-500 text-5xl">check_circle</span>
        <h2 className="text-xl font-bold text-gray-800">Thành công!</h2>
        <p className="text-gray-600">Mật khẩu của bạn đã được thay đổi.</p>
        <p className="text-sm text-gray-500">Đang chuyển hướng về trang đăng nhập...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#00362a]">Đặt Lại Mật Khẩu</h1>
        <p className="text-[#2f6555] text-sm mt-1">
          Cho tài khoản: <strong>{email}</strong>
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#2f6555] ml-1">Mật khẩu mới</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4b8170]">lock</span>
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-[#f6f8f6] rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4b8170] hover:text-[#29664c]"
          >
            <span className="material-symbols-outlined text-xl">
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#2f6555] ml-1">Xác nhận mật khẩu mới</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4b8170]">lock_reset</span>
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#f6f8f6] rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 mt-2 bg-[#29664c] text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 hover:bg-[#1e4d39] transition-all disabled:opacity-70 flex justify-center items-center gap-2"
      >
        {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : "Cập Nhật Mật Khẩu"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f8f6] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-xl">
        <Suspense fallback={<div className="text-center p-10"><span className="material-symbols-outlined animate-spin text-3xl text-emerald-500">progress_activity</span></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}

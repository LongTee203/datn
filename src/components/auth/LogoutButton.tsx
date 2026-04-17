"use client";

import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
    >
      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
        logout
      </span>
      Đăng xuất
    </button>
  );
}

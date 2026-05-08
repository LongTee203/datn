"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-4 rounded-full font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
                backgroundColor: "#29664c",
                color: "#c8ffe0",
                boxShadow: "0 10px 15px -3px rgba(41,102,76,0.20)",
            }}
        >
            {pending ? "Đang xử lý..." : "Đăng ký"}
        </button>
    );
}
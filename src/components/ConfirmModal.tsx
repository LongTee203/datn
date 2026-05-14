import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  onConfirm,
  onCancel,
  isDanger = false,
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              isDanger ? "bg-red-100 text-red-500" : "bg-amber-100 text-amber-500"
            }`}
          >
            <span className="material-symbols-outlined text-3xl">
              {isDanger ? "warning" : "help"}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#2a3433] mb-2">{title}</h3>
          <p className="text-sm text-[#56615f] mb-8">{message}</p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-full font-semibold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 rounded-full font-bold text-white shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
                isDanger
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                  : "bg-[#006b62] hover:bg-[#005e56] shadow-[#006b62]/20"
              }`}
            >
              {isLoading && (
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
              )}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

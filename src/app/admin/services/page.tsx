"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ConfirmModal from "@/components/ConfirmModal";

interface Service {
  service_id: number;
  service_name: string;
  description?: string;
  category?: string;
  price: string | number;
  duration?: number;
  image?: string;
  is_active: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  // Success Notification state
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const categories = ["Tất cả", "Vệ sinh & Spa", "Y tế & Khám bệnh", "Lưu trú (Hotel)", "Khác"];

  const [form, setForm] = useState({
    service_name: "",
    description: "",
    category: "Vệ sinh & Spa",
    price: "",
    duration: "30",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmText?: string;
    isDanger: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Xác nhận",
    isDanger: false,
    onConfirm: () => {},
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Không tải được dữ liệu dịch vụ");
      const data = await res.json();
      setServices(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setForm({ service_name: "", description: "", category: "Vệ sinh & Spa", price: "", duration: "30" });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setForm({
      service_name: service.service_name,
      description: service.description || "",
      category: service.category || "Vệ sinh & Spa",
      price: service.price.toString(),
      duration: service.duration?.toString() || "30",
    });
    setImageFile(null);
    setImagePreview(service.image || null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("service_name", form.service_name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("duration", form.duration);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingService 
        ? `/api/services/${editingService.service_id}`
        : "/api/services";
      
      const method = editingService ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Lỗi hệ thống");
      }

      setIsModalOpen(false);
      fetchServices();
      showSuccess(editingService ? "Chỉnh sửa dịch vụ thành công!" : "Thêm dịch vụ mới thành công!");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const toggleStatus = (service: Service) => {
    const actionText = service.is_active ? "Tạm ngừng" : "Kích hoạt";
    setConfirmModal({
      isOpen: true,
      title: `${actionText} dịch vụ`,
      message: (
        <span>
          Bạn có chắc chắn muốn <strong>{actionText.toLowerCase()}</strong> dịch vụ <strong className="text-black">{service.service_name}</strong> không?
        </span>
      ),
      confirmText: actionText,
      isDanger: !!service.is_active,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/services/${service.service_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_active: !service.is_active }),
          });
          if (!res.ok) throw new Error("Cập nhật thất bại");
          fetchServices();
          showSuccess(`${actionText} thành công!`);
        } catch (e) {
          alert((e as Error).message);
        } finally {
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const deleteService = (service: Service) => {
    setConfirmModal({
      isOpen: true,
      title: "Xóa dịch vụ",
      message: (
        <span>
          Bạn có chắc chắn muốn xóa vĩnh viễn dịch vụ <strong className="text-red-500">{service.service_name}</strong> không? Hành động này không thể hoàn tác.
        </span>
      ),
      confirmText: "Xóa",
      isDanger: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/services/${service.service_id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Xóa thất bại");
          fetchServices();
          showSuccess("Xóa dịch vụ thành công!");
        } catch (e) {
          alert((e as Error).message);
        } finally {
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const filteredServices = activeFilter === "Tất cả" 
    ? services 
    : services.filter(s => (s.category || "Khác") === activeFilter);

  return (
    <div className="min-h-screen relative">
      <div className="flex justify-between items-end mb-10">
        <div>
          <nav className="flex items-center gap-2 text-xs text-[#56615f] mb-2 font-medium">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#006b62]">Quản lý dịch vụ</span>
          </nav>
          <h2 className="text-3xl font-extrabold text-[#2a3433] tracking-tight">Danh sách dịch vụ</h2>
          <p className="text-[#56615f] mt-1">Cấu hình và cập nhật thông tin các gói chăm sóc thú cưng của bạn.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-[#006b62] to-[#00897b] text-[#e2fff9] px-6 py-3 rounded-full font-bold shadow-lg shadow-[#006b62]/20 hover:shadow-[#006b62]/40 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>Thêm dịch vụ mới</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap ${
              activeFilter === cat 
                ? 'bg-[#82f6e7] text-[#005c54] font-bold' 
                : 'bg-[#eef5f3] text-[#56615f] font-medium hover:bg-[#e7f0ed]'
            }`}
          >
            {cat} {cat === "Tất cả" && `(${services.length})`}
          </button>
        ))}
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-white border-l-4 border-[#006b62] shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[#006b62] text-3xl">check_circle</span>
          <div>
            <h4 className="font-bold text-[#2a3433]">Thành công!</h4>
            <p className="text-sm text-[#56615f]">{successMsg}</p>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="ml-4 p-1 hover:bg-gray-100 rounded-full text-gray-400">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="material-symbols-outlined animate-spin text-4xl text-[#006b62]">progress_activity</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10 bg-white rounded-xl shadow-sm">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <div key={service.service_id} className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_50px_rgba(42,52,51,0.1)] flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                {service.image ? (
                  <img alt={service.service_name} className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${!service.is_active ? 'grayscale' : ''}`} src={service.image} />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-gray-400">image</span>
                )}
                <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm ${service.is_active ? 'text-[#006b62]' : 'text-[#727d7a]'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${service.is_active ? 'bg-[#006b62]' : 'bg-[#727d7a]'}`}></span>
                  {service.is_active ? 'HOẠT ĐỘNG' : 'TẠM NGỪNG'}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col relative">
                <div className="mb-2">
                  <span className="text-[10px] font-bold text-[#375853] bg-[#c6eae3]/50 px-2 py-0.5 rounded-md uppercase">{service.category || "Khác"}</span>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-[#2a3433]">{service.service_name}</h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleStatus(service)}
                      title={service.is_active ? "Tạm ngừng dịch vụ" : "Kích hoạt dịch vụ"}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors shrink-0"
                    >
                      <span className="material-symbols-outlined text-[#56615f] hover:text-[#006b62] transition-colors" style={{ fontVariationSettings: service.is_active ? "'FILL' 1" : "'FILL' 0" }}>
                        {service.is_active ? 'toggle_on' : 'toggle_off'}
                      </span>
                    </button>
                    <button
                      onClick={() => deleteService(service)}
                      title="Xóa dịch vụ"
                      className="p-1 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors shrink-0"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#56615f] line-clamp-2 mb-4">{service.description || "Không có mô tả"}</p>
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1.5 text-[#56615f]">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      <span>{service.duration || 30} phút</span>
                    </div>
                    <div className="font-bold text-[#006b62] text-[15px]">{Number(service.price).toLocaleString("vi-VN")}đ</div>
                  </div>
                  <button 
                    onClick={() => openEditModal(service)}
                    className="w-full py-3 rounded-2xl bg-[#e7f0ed] text-[#2a3433] font-bold text-sm hover:bg-[#006b62] hover:text-[#e2fff9] transition-all active:scale-95"
                  >
                    Chỉnh sửa chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#56615f] hover:text-[#2a3433] hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-extrabold text-[#2a3433] mb-6 tracking-tight">
              {editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Ảnh mô tả</label>
                <div 
                  className="w-full h-32 bg-[#eef5f3] rounded-xl border-2 border-dashed border-[#a9b4b1] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-[#006b62]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-[#a9b4b1] mb-2">cloud_upload</span>
                      <span className="text-xs text-[#a9b4b1]">Click để tải ảnh từ máy tính</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Tên dịch vụ *</label>
                <input 
                  required 
                  type="text" 
                  value={form.service_name}
                  onChange={e => setForm({...form, service_name: e.target.value})}
                  placeholder="Nhập tên dịch vụ..." 
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Danh mục</label>
                <select 
                  required 
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all cursor-pointer"
                >
                  <option value="Vệ sinh & Spa">Vệ sinh & Spa</option>
                  <option value="Y tế & Khám bệnh">Y tế & Khám bệnh</option>
                  <option value="Lưu trú (Hotel)">Lưu trú (Hotel)</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Mô tả dịch vụ</label>
                <textarea 
                  placeholder="Nhập mô tả..." 
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all resize-none h-20" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Giá tiền (VNĐ) *</label>
                  <input 
                    required 
                    type="number" 
                    min="0"
                    value={form.price}
                    onChange={e => setForm({...form, price: e.target.value})}
                    placeholder="VD: 150000" 
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#56615f] mb-2">Thời gian (Phút) *</label>
                  <input 
                    required 
                    type="number" 
                    min="1"
                    value={form.duration}
                    onChange={e => setForm({...form, duration: e.target.value})}
                    placeholder="VD: 30" 
                    className="w-full bg-[#eef5f3] border-none rounded-xl text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-[#006b62]/20 outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-full font-bold text-[#56615f] bg-[#eef5f3] hover:bg-[#d9e5e2] transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-full font-bold text-white bg-[#006b62] hover:bg-[#005e56] transition-colors shadow-lg shadow-[#006b62]/20 disabled:opacity-50"
                >
                  {saving ? "Đang lưu..." : (editingService ? "Lưu thay đổi" : "Thêm dịch vụ")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDanger={confirmModal.isDanger}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

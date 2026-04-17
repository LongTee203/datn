import Link from "next/link";
import ServiceCard from "./ServiceCard";

const services = [
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIzFDFCxdn2AaaIKG-g1lBY4pIRNYB9w8KfrfaYMpG8j57fN2-2Ru-3ttk1voWaRLXepBIa6GgsZ77k3lgGOXpA_4C4lHiRkZvX0vT6S42gyZrGIv_sU7UjxoFyBopxc9LV1WVFcXdb36HA4cI2HVGXk2g-iMEjMd1vivjl_OKVrv59N-iarDkpxIFXtSHRlxFs-QFsGF6-cU_SA3sNSfrksXL0YmVw43puM-n3kaxi-WiWlbKiMo5kdHdKbPRqcWTapyksVMJ8j8I",
    imageAlt: "Pet grooming service",
    iconName: "content_cut",
    iconColorClass: "text-primary",
    iconBgClass: "bg-primary/10",
    iconHoverBgClass: "group-hover:bg-primary",
    iconHoverTextClass: "group-hover:text-white",
    title: "Làm đẹp chuyên nghiệp",
    description:
      "Liệu trình spa đầy đủ, cắt tỉa theo giống loài và tắm rửa vệ sinh giúp thú cưng luôn tươm tất.",
    linkColorClass: "text-primary",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAn7YI4pJMusGHl8Z3Qx7qPAcd4zqSWyBUTcRrNLHAm3G4hbebnY0LsxL-q5xsK2_IwlDQ3B8cRE25vviDkeRdwrR5azdpBfE3Zb3U0X69VHnAgcO5e0FxNIhSFt_7ohc5OlQ2C9hnLO63cITVZ-SBdVM8C42JsQT5RyyVomyBodmKeTZbsA6BVMXlQwfYC69bfpwXCIYR40Jbma5aVHcV-hvhSBwj9nukno0brUYGA58MDHF31HLqDWE2yae_8BuCvFcb6O_Yz7HTl",
    imageAlt: "Pet hotel service",
    iconName: "hotel",
    iconColorClass: "text-accent-teal",
    iconBgClass: "bg-accent-teal/10",
    iconHoverBgClass: "group-hover:bg-accent-teal",
    iconHoverTextClass: "group-hover:text-white",
    title: "Khách sạn thú cưng ấm cúng",
    description:
      "Nơi lưu trú an toàn, có điều hòa và giám sát 24/7 với thời gian vui chơi hàng ngày.",
    linkColorClass: "text-accent-teal",
  },
  {
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHIpaQVQa84ky8hmEu3ZIuMRFGma7BbxaedAXW8vgSCkSazNqVVOq2sS0nxQy30BnbRdjpWfN-HcY3NXC7n-Rm3Vh_B26Vg8j4bKJGsAku2C7Sh4E7mjxstMpjBl-t8BTgsJNoe2htECrYkCRJXTKMLole0deVTFdCKfapbOl2YqqRs7s6lSxzlwrlTw4vX66I_wC_59H-LxCVYKQsR1-5QJ43XYf8hKm5O327V507wiDWX6g07YT3DKrQkh04g1fYpPyI0yXM8ZEy",
    imageAlt: "Veterinary consultation",
    iconName: "medical_services",
    iconColorClass: "text-accent-orange",
    iconBgClass: "bg-accent-orange/10",
    iconHoverBgClass: "group-hover:bg-accent-orange",
    iconHoverTextClass: "group-hover:text-white",
    title: "Tư vấn thú y",
    description:
      "Chăm sóc phòng ngừa chuyên nghiệp, tiêm chủng và kiểm tra sức khỏe bởi bác sĩ thú y chứng chỉ.",
    linkColorClass: "text-accent-orange",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16">
      {/* Header row */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-black text-[#111811] dark:text-white mb-4 font-headline">
            Dịch vụ Nổi Bật
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Từ spa thư giãn đến kiểm tra sức khỏe, chúng tôi cung cấp đầy đủ
            các dịch vụ phù hợp với nhu cầu riêng biệt của thú cưng.
          </p>
        </div>
        <Link
          href="/services"
          className="flex items-center gap-2 text-primary font-bold"
        >
          Xem tất cả dịch vụ{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}

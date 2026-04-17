import type { Metadata } from "next";
import HeroSection from "@/components/customer/home/HeroSection";
import ServicesSection from "@/components/customer/home/ServicesSection";
import TestimonialsSection from "@/components/customer/home/TestimonialsSection";
import CareTeamSection from "@/components/customer/home/CareTeamSection";
import NewsletterCTA from "@/components/customer/home/NewsletterCTA";

export const metadata: Metadata = {
  title: "PetCare Plus | Chuyên Gia Làm Đẹp, Lưu Trú & Chăm Sóc Thú Y",
  description:
    "Điểm đến lý tưởng cho dịch vụ làm đẹp chuyên nghiệp, lưu trú cao cấp và chăm sóc thú y tận tâm. Hơn 5.000 chủ nuôi tin tưởng PetCare Plus.",
};

export default function HomePage() {
  return (
    <main className="max-w-[1280px] mx-auto px-6">
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <CareTeamSection />
      <NewsletterCTA />
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// ─────────────────────────────────────────────
// Product data — 5 categories, 4–6 products each
// ─────────────────────────────────────────────
const ALL_PRODUCTS = [
  // ── 0: Thức ăn & Đồ ăn vặt ──
  {
    id: 1, cat: 0,
    name: "Hạt khô Cao cấp Không ngũ cốc",
    desc: "Cá hồi & Khoai lang cho chó trưởng thành",
    price: 550000, oldPrice: null, rating: 5, reviews: 128,
    badge: { text: "Bán chạy", color: "bg-[#2D6A4F] text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGBQHhi_RjMLrgZCrDBTjunmk4WTllhnojnFTlMceoKxTTM8GogoOucuHbb38AmIW4mim3RBWaU7Uzg0rs_-Zle3JYN5nqPHex6fjT6E7-W03fYBxxfT5M2cHHrjB4sX2tcaExpr7rw8o6rQMVhHAXcoQF8LP9aI_P69IExnBg9eldCJ7N4EhH51aCfznVfnIaynPpPb4IWo9Xdtsw45az3mNlh3Wjm8gIq6aX-m5exje04gr-6OdBvsNsOhmcDH3vZEzamHR1xmR6",
  },
  {
    id: 2, cat: 0,
    name: "Bánh thưởng Huấn luyện Tự nhiên",
    desc: "Hương vị Thịt xông khói & Gan",
    price: 90000, oldPrice: null, rating: 5, reviews: 342,
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW4AfakCVYMa40pb7PUK4pOSrJ1LrO4gMffFOu4aZ8SWGnRZUbkmUm8cI0UUdZ-hmPcJyP_n4ixz8HKbTFmhaqpBKwb_8TbwoAJxR_03p9RL9oPmQ9NiA_BmYXwiOXQhc22MjJg-v1nlAU5orNmwv625WlFoRQ3gfdSgYSTZv83ZXzm8IkR6j4_MaVKJ4egW0AX4ykV-TknKaQouLFU-rLRM-evn1xtxdgRzs6eFcPM8eM_xlhJJ-M5XnjBxTRpEAvLtGL4IZ7q4sT",
  },
  {
    id: 3, cat: 0,
    name: "Hạt Hữu Cơ Cao Cấp (Chó Lớn)",
    desc: "Trọng lượng: 2kg • Vị Cá Hồi, không chất bảo quản",
    price: 420000, oldPrice: null, rating: 5, reviews: 204,
    badge: { text: "Hữu cơ", color: "bg-emerald-600 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzYwfMNF41rR3tMNMucO6rdkjFTjiDvoKTpp_-ZZTqIl4K-XlxP3sRDiLd4kj_fm2ERKe6pIReqWtaS5yMXetyrW1_3XRI2VfV_TzlMw_J2YqtRAUUzeCAyxe-Y_Zf5hm68OBOxwaBOK19ja2QL3LuLupx-1DI4YD7bu_fgNcw2_kphNLdIPRWx3MY8T7YQB0ZXUADeazw2GbPKcrteAvSXQIjkdLBW7fCW3N4sx06Qe5-m2BAFW4UPFhZcnMT_Aq5gjM1hkst7TS0",
  },
  {
    id: 4, cat: 0,
    name: "Bánh Thưởng Gan Gà Sấy Lạnh",
    desc: "Gói 150g • Không chất bảo quản, không gluten",
    price: 165000, oldPrice: 220000, rating: 4, reviews: 88,
    badge: { text: "Giảm 25%", color: "bg-red-500 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIW5j-aEutgTdbQWwUOCfzqd3RFj87duzm4ZHvk1Hz0_lFBADUPA7647RMYicpg_WeRnjExGYbRconn1kxlgfWGLAO-aP0yzKtWNMWPiCEB75VXltJHexTxRD_XDYWasDOEzTZU5PXwxdCaMglBBMfj3CQpxRkW1b4JpFdidetEUO8vG1pn-KWB28csxcpfgznfU1zMpCK2j7T8hwOTTSvPKgTfml35B5yTQ0md_C7-YSeOamCnBRE4L6cdXRmP9uDCS4SRJhZfXfG",
  },

  // ── 1: Đồ chơi & Vui chơi ──
  {
    id: 5, cat: 1,
    name: "Xương gặm Cao su Bền bỉ",
    desc: "Dòng sản phẩm cho chó hay gặm",
    price: 125000, oldPrice: null, rating: 4, reviews: 84,
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCds7huXoqKaTMPPtjywUw8FXG-d7R54ZTwBQ961S6yRxFNvoG8wwyqORG9BTDlirRKkrtZSXOJidIROfUkcDNlpMLyHWIPqF-n-4JImR-0k5SMcUhLeqJayotZz0wN7IEUtAtpDKAfWhL4bE3PAA4AsKPJLQkyzUZ1CyHCb9XyMXdHk-H0dquMmc5kCfbNJIpSkmQpDpON0mrmEXVGCaCh8n1y9wf7fBsqv21_X-FMYW1bf6Qv0fKC5ku_lCVFz5xBQEPyjFp1Rzy4",
  },
  {
    id: 6, cat: 1,
    name: "Bóng đồ chơi nhảy thông minh",
    desc: "Tự động bật ngẫu nhiên, kích thích bản năng săn mồi",
    price: 190000, oldPrice: null, rating: 5, reviews: 156,
    badge: { text: "Mới", color: "bg-slate-900 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNvOAwSOmYzx2BKFP8FOWhcbJoLsnsPwofzCUEer5se8vdwkBfv1vStzPD25m0ODwotk53OtWuPEVreXnWnXzXXGGRrGTeBjGksNo1VgoX3-5MFUs1YZzNngnXPMLt7WmzS1JuUXM0A5Sw7L4Msz-LsTXl0SVtCEIg0p1z1DyxwGb6-8dO8RLcyhOnYSsb-QZ0S6jS7Zz8ih07tbY70kQgJSjFov56oKEQN1AeEIw1-_HivjwWWtMFts-q7SBa-B6DmDzEf1xVeAZK",
  },
  {
    id: 7, cat: 1,
    name: "Cây cào móng 5 tầng Deluxe",
    desc: "Sisal tự nhiên, khung ổn định, bệ rộng chống lật",
    price: 650000, oldPrice: 800000, rating: 5, reviews: 231,
    badge: { text: "Giảm 20%", color: "bg-red-500 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGBQHhi_RjMLrgZCrDBTjunmk4WTllhnojnFTlMceoKxTTM8GogoOucuHbb38AmIW4mim3RBWaU7Uzg0rs_-Zle3JYN5nqPHex6fjT6E7-W03fYBxxfT5M2cHHrjB4sX2tcaExpr7rw8o6rQMVhHAXcoQF8LP9aI_P69IExnBg9eldCJ7N4EhH51aCfznVfnIaynPpPb4IWo9Xdtsw45az3mNlh3Wjm8gIq6aX-m5exje04gr-6OdBvsNsOhmcDH3vZEzamHR1xmR6",
  },
  {
    id: 8, cat: 1,
    name: "Dây kéo & Bóng gai tương tác",
    desc: "Dây thừng bện chắc, bóng cao su tự nhiên an toàn",
    price: 95000, oldPrice: null, rating: 4, reviews: 62,
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCds7huXoqKaTMPPtjywUw8FXG-d7R54ZTwBQ961S6yRxFNvoG8wwyqORG9BTDlirRKkrtZSXOJidIROfUkcDNlpMLyHWIPqF-n-4JImR-0k5SMcUhLeqJayotZz0wN7IEUtAtpDKAfWhL4bE3PAA4AsKPJLQkyzUZ1CyHCb9XyMXdHk-H0dquMmc5kCfbNJIpSkmQpDpON0mrmEXVGCaCh8n1y9wf7fBsqv21_X-FMYW1bf6Qv0fKC5ku_lCVFz5xBQEPyjFp1Rzy4",
  },

  // ── 2: Nệm & Giấc ngủ ──
  {
    id: 9, cat: 2,
    name: "Nệm Cao su non Ortho-Comfort",
    desc: "Kích thước lớn – Xám than, chống nước",
    price: 890000, oldPrice: 1100000, rating: 5, reviews: 212,
    badge: { text: "Giảm 20%", color: "bg-red-500 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNvOAwSOmYzx2BKFP8FOWhcbJoLsnsPwofzCUEer5se8vdwkBfv1vStzPD25m0ODwotk53OtWuPEVreXnWnXzXXGGRrGTeBjGksNo1VgoX3-5MFUs1YZzNngnXPMLt7WmzS1JuUXM0A5Sw7L4Msz-LsTXl0SVtCEIg0p1z1DyxwGb6-8dO8RLcyhOnYSsb-QZ0S6jS7Zz8ih07tbY70kQgJSjFov56oKEQN1AeEIw1-_HivjwWWtMFts-q7SBa-B6DmDzEf1xVeAZK",
  },
  {
    id: 10, cat: 2,
    name: "Ổ nằm mèo lông cừu siêu mềm",
    desc: "Đường kính 55cm, máy giặt được, vải fleece cao cấp",
    price: 340000, oldPrice: null, rating: 5, reviews: 178,
    badge: { text: "Bán chạy", color: "bg-[#2D6A4F] text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFd8X5enmgOaj0d-TuZw0LHWB2RkXIggyQ4PjSBDGhUCccBcnih1D0Udtxo4ZRYkpD90Otece1mX7juWmyHWQ-_n6z-JqHY5ZgV-wqz2HdfONLl5Lmyf6Dsho7qmIww1cRWp2mLhq4-Ra-HIUmjgdNTKtxWQnwuDmUh1McxE_67xYyoG-VWS1vS-6dRIZ8Mv0yAmPLS9y9G8-aH24EorpMaoX27ge6JJ0_A4hewwiB1HfOsmqaz4voSYlAzW4yTCOkcSeOQMoDaScH",
  },
  {
    id: 11, cat: 2,
    name: "Lều ngủ mèo hình thú 3D",
    desc: "Cấu trúc tự đứng, thoáng khí, gấp gọn dễ dàng",
    price: 285000, oldPrice: null, rating: 4, reviews: 95,
    badge: { text: "Mới", color: "bg-slate-900 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNvOAwSOmYzx2BKFP8FOWhcbJoLsnsPwofzCUEer5se8vdwkBfv1vStzPD25m0ODwotk53OtWuPEVreXnWnXzXXGGRrGTeBjGksNo1VgoX3-5MFUs1YZzNngnXPMLt7WmzS1JuUXM0A5Sw7L4Msz-LsTXl0SVtCEIg0p1z1DyxwGb6-8dO8RLcyhOnYSsb-QZ0S6jS7Zz8ih07tbY70kQgJSjFov56oKEQN1AeEIw1-_HivjwWWtMFts-q7SBa-B6DmDzEf1xVeAZK",
  },
  {
    id: 12, cat: 2,
    name: "Chăn sưởi điện cho thú cưng",
    desc: "Điều chỉnh nhiệt độ 3 mức, tự ngắt an toàn",
    price: 450000, oldPrice: null, rating: 5, reviews: 143,
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGBQHhi_RjMLrgZCrDBTjunmk4WTllhnojnFTlMceoKxTTM8GogoOucuHbb38AmIW4mim3RBWaU7Uzg0rs_-Zle3JYN5nqPHex6fjT6E7-W03fYBxxfT5M2cHHrjB4sX2tcaExpr7rw8o6rQMVhHAXcoQF8LP9aI_P69IExnBg9eldCJ7N4EhH51aCfznVfnIaynPpPb4IWo9Xdtsw45az3mNlh3Wjm8gIq6aX-m5exje04gr-6OdBvsNsOhmcDH3vZEzamHR1xmR6",
  },

  // ── 3: Phụ kiện ──
  {
    id: 13, cat: 3,
    name: "Đai yếm Phản quang Chinh phục",
    desc: "Đồ dùng đi bộ chống chịu thời tiết, phản quang 360°",
    price: 350000, oldPrice: null, rating: 4, reviews: 45,
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFd8X5enmgOaj0d-TuZw0LHWB2RkXIggyQ4PjSBDGhUCccBcnih1D0Udtxo4ZRYkpD90Otece1mX7juWmyHWQ-_n6z-JqHY5ZgV-wqz2HdfONLl5Lmyf6Dsho7qmIww1cRWp2mLhq4-Ra-HIUmjgdNTKtxWQnwuDmUh1McxE_67xYyoG-VWS1vS-6dRIZ8Mv0yAmPLS9y9G8-aH24EorpMaoX27ge6JJ0_A4hewwiB1HfOsmqaz4voSYlAzW4yTCOkcSeOQMoDaScH",
  },
  {
    id: 14, cat: 3,
    name: "Vòng cổ GPS theo dõi thời gian thực",
    desc: "Pin 7 ngày, chống nước IP68, cảnh báo ra khỏi vùng an toàn",
    price: 890000, oldPrice: null, rating: 5, reviews: 119,
    badge: { text: "Mới", color: "bg-slate-900 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC40EkvX4TlPrDfFM9_D_CyWatpuJ5t5JvizPSluXEkyk5OYBx6kVKAcZ4Ak_C82F6Dn6Xo8tsmXZdbOl1iiAiVwzURJp8l4Nr_-Ut_3xfftMGmTd-JynZzqvyKgsFBxYFEaYFzA57Xr8mgtFNhEAEPgyj9b9EQMSY_OK2zd6F9KwhiNavB5HIpYqgy_y2L21-KJY5gHNa-v81gaD2qkwOqlTK5PQS_t7iONq-228p4vR_BFad--oL1BimLw0qomI2NqiO6-_NLiDii",
  },
  {
    id: 15, cat: 3,
    name: "Balo vận chuyển thú cưng thoáng khí",
    desc: "Cửa sổ lưới 4 mặt, tải trọng 8kg, khóa an toàn",
    price: 520000, oldPrice: 650000, rating: 5, reviews: 87,
    badge: { text: "Giảm 20%", color: "bg-red-500 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCds7huXoqKaTMPPtjywUw8FXG-d7R54ZTwBQ961S6yRxFNvoG8wwyqORG9BTDlirRKkrtZSXOJidIROfUkcDNlpMLyHWIPqF-n-4JImR-0k5SMcUhLeqJayotZz0wN7IEUtAtpDKAfWhL4bE3PAA4AsKPJLQkyzUZ1CyHCb9XyMXdHk-H0dquMmc5kCfbNJIpSkmQpDpON0mrmEXVGCaCh8n1y9wf7fBsqv21_X-FMYW1bf6Qv0fKC5ku_lCVFz5xBQEPyjFp1Rzy4",
  },
  {
    id: 16, cat: 3,
    name: "Máy uống nước Thông minh",
    desc: "Hệ thống lọc 3 lớp, lưu lượng 2L, siêu yên tĩnh",
    price: 420000, oldPrice: null, rating: 4, reviews: 18,
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC40EkvX4TlPrDfFM9_D_CyWatpuJ5t5JvizPSluXEkyk5OYBx6kVKAcZ4Ak_C82F6Dn6Xo8tsmXZdbOl1iiAiVwzURJp8l4Nr_-Ut_3xfftMGmTd-JynZzqvyKgsFBxYFEaYFzA57Xr8mgtFNhEAEPgyj9b9EQMSY_OK2zd6F9KwhiNavB5HIpYqgy_y2L21-KJY5gHNa-v81gaD2qkwOqlTK5PQS_t7iONq-228p4vR_BFad--oL1BimLw0qomI2NqiO6-_NLiDii",
  },

  // ── 4: Nhà thuốc ──
  {
    id: 17, cat: 4,
    name: "Sữa tắm Thảo mộc Lô hội 500ml",
    desc: "Chiết xuất tự nhiên, dịu nhẹ cho da nhạy cảm",
    price: 220000, oldPrice: null, rating: 5, reviews: 198,
    badge: { text: "Hữu cơ", color: "bg-emerald-600 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcFJH92AeihdUQSxwgFZLUyIsDhyJmbVN8eQMO-eV7h4qZgMKufDcJBAc8P1uUwnJadKYYv-pxXTA-tMVBCqKysIVbGZERYByR0jGRYhKs2D_MQNlweKzkKdsiC5F4IXnlf_bmeXnJpwkndaqwzWCGwHHCX5LMGPD4em1EEcwWItzUswFYaEG0IZc-OOksrynBUqCPf4cfpLydHUX1vMTtUikTkEM0qSVV1zwnvre0geDQ16OplU3vAwH2e4RM42VtptS1nhv_h1U8",
  },
  {
    id: 18, cat: 4,
    name: "Vitamin tổng hợp dạng nhai",
    desc: "Bổ sung Omega-3, Glucosamine & Vitamin E, hộp 60 viên",
    price: 315000, oldPrice: null, rating: 5, reviews: 275,
    badge: { text: "Bán chạy", color: "bg-[#2D6A4F] text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGBQHhi_RjMLrgZCrDBTjunmk4WTllhnojnFTlMceoKxTTM8GogoOucuHbb38AmIW4mim3RBWaU7Uzg0rs_-Zle3JYN5nqPHex6fjT6E7-W03fYBxxfT5M2cHHrjB4sX2tcaExpr7rw8o6rQMVhHAXcoQF8LP9aI_P69IExnBg9eldCJ7N4EhH51aCfznVfnIaynPpPb4IWo9Xdtsw45az3mNlh3Wjm8gIq6aX-m5exje04gr-6OdBvsNsOhmcDH3vZEzamHR1xmR6",
  },
  {
    id: 19, cat: 4,
    name: "Thuốc nhỏ gáy trị ve & bọ chét",
    desc: "Hiệu quả lên đến 3 tháng, an toàn cho chó từ 8 tuần tuổi",
    price: 180000, oldPrice: null, rating: 4, reviews: 132,
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcFJH92AeihdUQSxwgFZLUyIsDhyJmbVN8eQMO-eV7h4qZgMKufDcJBAc8P1uUwnJadKYYv-pxXTA-tMVBCqKysIVbGZERYByR0jGRYhKs2D_MQNlweKzkKdsiC5F4IXnlf_bmeXnJpwkndaqwzWCGwHHCX5LMGPD4em1EEcwWItzUswFYaEG0IZc-OOksrynBUqCPf4cfpLydHUX1vMTtUikTkEM0qSVV1zwnvre0geDQ16OplU3vAwH2e4RM42VtptS1nhv_h1U8",
  },
  {
    id: 20, cat: 4,
    name: "Kem chống nắng thú cưng SPF30",
    desc: "Dành cho vùng da không lông, không mùi, lành tính",
    price: 149000, oldPrice: null, rating: 4, reviews: 49,
    badge: { text: "Mới", color: "bg-slate-900 text-white" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGBQHhi_RjMLrgZCrDBTjunmk4WTllhnojnFTlMceoKxTTM8GogoOucuHbb38AmIW4mim3RBWaU7Uzg0rs_-Zle3JYN5nqPHex6fjT6E7-W03fYBxxfT5M2cHHrjB4sX2tcaExpr7rw8o6rQMVhHAXcoQF8LP9aI_P69IExnBg9eldCJ7N4EhH51aCfznVfnIaynPpPb4IWo9Xdtsw45az3mNlh3Wjm8gIq6aX-m5exje04gr-6OdBvsNsOhmcDH3vZEzamHR1xmR6",
  },
];

const CATEGORIES = [
  { icon: "restaurant", label: "Thức ăn & Đồ ăn vặt" },
  { icon: "sports_tennis", label: "Đồ chơi & Vui chơi" },
  { icon: "bed", label: "Nệm & Giấc ngủ" },
  { icon: "link", label: "Phụ kiện" },
  { icon: "health_and_safety", label: "Nhà thuốc" },
];

export default function ShopPage() {
  const { addItem, totalCount } = useCart();
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState<number | null>(null);

  const filtered = ALL_PRODUCTS.filter(
    (p) =>
      p.cat === activeCategory &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(p: (typeof ALL_PRODUCTS)[0]) {
    addItem({ id: p.id, name: p.name, desc: p.desc, price: p.price, imageUrl: p.img });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <div className="bg-[#f6f8f6] min-h-screen text-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">

        {/* ── Top bar: breadcrumb + cart icon ── */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex text-sm text-slate-500 gap-2 items-center">
            <Link href="/" className="hover:text-[#2D6A4F] transition-colors">
              Trang chủ
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 font-medium">Cửa hàng</span>
          </nav>

          {/* Cart button */}
          <Link
            href="/shop/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: "#2D6A4F", color: "#fff" }}
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            <span className="hidden sm:inline">Giỏ hàng</span>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-red-500 text-white">
                {totalCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 h-fit lg:sticky lg:top-24">
            <div>
              <h3 className="text-lg font-bold mb-4">Danh mục</h3>
              <div className="space-y-1">
                {CATEGORIES.map(({ icon, label }, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-left text-sm transition-colors ${activeCategory === i
                      ? "bg-[#2D6A4F]/10 text-[#2D6A4F] font-semibold"
                      : "hover:bg-slate-100 text-slate-700"
                      }`}
                  >
                    <span className={`material-symbols-outlined ${activeCategory === i ? "fill-1" : ""}`}>
                      {icon}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range decoration */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold mb-4">Khoảng giá</h3>
              <div className="px-2">
                <div className="relative h-1 bg-slate-200 rounded-full mb-6">
                  <div className="absolute left-0 right-1/4 h-full bg-[#2D6A4F] rounded-full" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#2D6A4F] rounded-full ring-2 ring-white" />
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#2D6A4F] rounded-full ring-2 ring-white" />
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>0đ</span><span>2.000.000đ</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold mb-4">Thương hiệu</h3>
              <div className="space-y-3">
                {["Royal Canin", "Blue Buffalo", "Kong Toys", "Wellness", "Petmate"].map((b, i) => (
                  <label key={b} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked={i < 2} className="rounded h-4 w-4 accent-[#2D6A4F]" />
                    <span className="text-sm group-hover:text-[#2D6A4F] transition-colors">{b}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Product grid ── */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold">{CATEGORIES[activeCategory].label}</h1>
                <p className="text-slate-500 text-sm">{filtered.length} sản phẩm</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    search
                  </span>
                  <input
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-full focus:ring-2 focus:ring-[#2D6A4F]/30 outline-none"
                    placeholder="Tìm sản phẩm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select className="bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 outline-none">
                  <option>Mới nhất</option>
                  <option>Giá thấp → cao</option>
                  <option>Giá cao → thấp</option>
                  <option>Đánh giá</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <Link href={`/shop/${p.id}`}>
                      <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </Link>
                    {p.badge && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded uppercase ${p.badge.color}`}>
                        {p.badge.text}
                      </span>
                    )}
                    <button className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-0.5 text-amber-400 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < p.rating ? "fill-1" : ""}`}>star</span>
                      ))}
                      <span className="text-slate-400 text-xs ml-1">({p.reviews})</span>
                    </div>
                    <Link href={`/shop/${p.id}`}>
                      <h3 className="font-bold text-slate-900 truncate hover:text-[#006b62] transition-colors">{p.name}</h3>
                    </Link>
                    <p className="text-slate-500 text-xs mb-3 line-clamp-1">{p.desc}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xl font-bold text-slate-900">{p.price.toLocaleString("vi-VN")}đ</span>
                        {p.oldPrice && (
                          <span className="text-xs text-slate-400 line-through ml-2">{p.oldPrice.toLocaleString("vi-VN")}đ</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAdd(p)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all ${addedId === p.id
                          ? "bg-green-500 text-white scale-95"
                          : "bg-[#2D6A4F] text-white hover:opacity-90"
                          }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          {addedId === p.id ? "check" : "add_shopping_cart"}
                        </span>
                        {addedId === p.id ? "Đã thêm" : "Thêm"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
                <p className="font-medium">Không tìm thấy sản phẩm phù hợp.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 

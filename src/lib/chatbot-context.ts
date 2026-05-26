/**
 * chatbot-context.ts
 * Xây dựng context dạng Graph Relations từ dữ liệu Prisma
 * Logic tương tự notebook Graph RAG: Entity → Relationship → Entity
 */

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = {
  product_id: number;
  product_name: string;
  price: number | string | { toNumber?: () => number };
  stock: number | null;
  description?: string | null;
  specifications?: string | null;
  details?: string | null;
  categories?: { category_name: string } | null;
};

type Service = {
  service_id: number;
  service_name: string;
  price: number | string | { toNumber?: () => number };
  description?: string | null;
  category?: string | null;
  duration?: number | null;
  is_active?: boolean;
};

type ShopSetting = { key: string; value: string };

type Category = {
  category_id: number;
  category_name: string;
  description?: string | null;
  products?: Product[];
};

type Article = {
  article_id: number;
  title: string;
  category: string;
  description?: string | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number | string | { toNumber?: () => number }): string {
  let num: number;
  if (typeof price === "object" && price !== null && typeof price.toNumber === "function") {
    num = price.toNumber();
  } else {
    num = Number(price);
  }
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
}

function truncate(text: string | null | undefined, max = 150): string {
  if (!text) return "";
  const clean = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max) + "..." : clean;
}

// ─── Context Builders (Graph-inspired) ───────────────────────────────────────

/**
 * Xây dựng context sản phẩm theo kiểu graph relations:
 * "Sản phẩm X →[CÓ_GIÁ]→ Y đ, →[THUỘC_DANH_MỤC]→ Z, →[CÒN_HÀNG]→ N cái"
 */
export function buildProductContext(products: Product[]): string {
  if (!products.length) return "Không tìm thấy sản phẩm phù hợp.";

  const lines: string[] = ["=== THÔNG TIN SẢN PHẨM ==="];

  for (const p of products.slice(0, 8)) {
    lines.push(`\n[Sản phẩm] ${p.product_name}`);
    lines.push(`  →[CÓ_GIÁ]→ ${formatPrice(p.price)}`);
    if (p.categories) {
      lines.push(`  →[THUỘC_DANH_MỤC]→ ${p.categories.category_name}`);
    }
    if (p.stock !== null && p.stock !== undefined) {
      lines.push(`  →[CÒN_TỒN_KHO]→ ${p.stock} sản phẩm`);
    }
    if (p.description) {
      lines.push(`  →[MÔ_TẢ]→ ${truncate(p.description, 120)}`);
    }
    if (p.specifications) {
      lines.push(`  →[THÔNG_SỐ]→ ${truncate(p.specifications, 120)}`);
    }
  }

  return lines.join("\n");
}

/**
 * Xây dựng context dịch vụ:
 * "Dịch vụ X →[CÓ_GIÁ]→ Y đ, →[THỜI_GIAN]→ Z phút"
 */
export function buildServiceContext(services: Service[]): string {
  if (!services.length) return "Không tìm thấy dịch vụ phù hợp.";

  const lines: string[] = ["=== THÔNG TIN DỊCH VỤ ==="];

  for (const s of services.slice(0, 8)) {
    lines.push(`\n[Dịch vụ] ${s.service_name}`);
    lines.push(`  →[CÓ_GIÁ]→ ${formatPrice(s.price)}`);
    if (s.category) lines.push(`  →[THUỘC_LOẠI]→ ${s.category}`);
    if (s.duration) lines.push(`  →[THỜI_GIAN_THỰC_HIỆN]→ ${s.duration} phút`);
    if (s.description) lines.push(`  →[MÔ_TẢ]→ ${truncate(s.description, 120)}`);
    lines.push(`  →[TRẠNG_THÁI]→ ${s.is_active ? "Đang hoạt động" : "Tạm ngừng"}`);
  }

  return lines.join("\n");
}

/**
 * Xây dựng context thông tin cửa hàng:
 */
export function buildShopContext(settings: ShopSetting[]): string {
  if (!settings.length) return "";

  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  const lines: string[] = ["=== THÔNG TIN CỬA HÀNG ==="];

  lines.push("[Cửa hàng] Pet Care Shop");
  if (map.shop_name) lines.push(`  →[TÊN]→ ${map.shop_name}`);
  if (map.address)   lines.push(`  →[ĐỊA_CHỈ]→ ${map.address}`);
  if (map.phone)     lines.push(`  →[SỐ_ĐIỆN_THOẠI]→ ${map.phone}`);
  if (map.email)     lines.push(`  →[EMAIL]→ ${map.email}`);
  if (map.open_from && map.open_to) {
    lines.push(`  →[GIỜ_MỞ_CỬA]→ ${map.open_from} - ${map.open_to}`);
  }
  if (map.facebook)  lines.push(`  →[FACEBOOK]→ ${map.facebook}`);
  if (map.zalo)      lines.push(`  →[ZALO]→ ${map.zalo}`);

  return lines.join("\n");
}

/**
 * Xây dựng context danh mục:
 */
export function buildCategoryContext(categories: Category[]): string {
  if (!categories.length) return "";

  const lines: string[] = ["=== DANH MỤC SẢN PHẨM ==="];

  for (const c of categories) {
    lines.push(`\n[Danh mục] ${c.category_name}`);
    if (c.description) lines.push(`  →[MÔ_TẢ]→ ${truncate(c.description, 100)}`);
    if (c.products?.length) {
      lines.push(`  →[SỐ_SẢN_PHẨM]→ ${c.products.length} sản phẩm`);
    }
  }

  return lines.join("\n");
}

/**
 * Xây dựng context bài viết:
 */
export function buildArticleContext(articles: Article[]): string {
  if (!articles.length) return "";

  const lines: string[] = ["=== BÀI VIẾT / TIN TỨC ==="];

  for (const a of articles.slice(0, 5)) {
    lines.push(`\n[Bài viết] ${a.title}`);
    lines.push(`  →[THUỘC_CHỦ_ĐỀ]→ ${a.category}`);
    if (a.description) lines.push(`  →[TÓM_TẮT]→ ${truncate(a.description, 120)}`);
  }

  return lines.join("\n");
}

/**
 * Thông tin chung về quy trình đặt lịch
 */
export function buildBookingContext(): string {
  return `=== QUY TRÌNH ĐẶT LỊCH HẸN ===
[Đặt lịch] Quy trình đặt lịch dịch vụ thú cưng
  →[BƯỚC_1]→ Đăng nhập tài khoản hoặc tạo tài khoản mới
  →[BƯỚC_2]→ Chọn dịch vụ mong muốn (tắm, cắt tỉa, spa, v.v.)
  →[BƯỚC_3]→ Điền thông tin thú cưng (tên, loài, giống, cân nặng)
  →[BƯỚC_4]→ Chọn ngày giờ hẹn phù hợp
  →[BƯỚC_5]→ Xác nhận và chờ nhân viên liên hệ
  →[PHƯƠNG_THỨC_THANH_TOÁN]→ Thanh toán tại cửa hàng hoặc chuyển khoản
  →[LƯU_Ý]→ Nên đặt lịch trước ít nhất 1 ngày`;
}

/**
 * Thông tin chung về thú cưng phổ biến
 */
export function buildPetCareContext(): string {
  return `=== THÔNG TIN CHĂM SÓC THÚ CƯNG ===
[Chó] 
  →[TẦN_SUẤT_TẮM]→ 2-4 tuần/lần tùy giống
  →[TIÊM_PHÒNG]→ Cần tiêm phòng định kỳ hàng năm
  →[CẮT_TỈA_LÔNG]→ 4-6 tuần/lần với giống lông dài
[Mèo]
  →[TẮM]→ Ít cần tắm, tự vệ sinh
  →[CẮT_VUỐT]→ Cần cắt vuốt định kỳ 2-3 tuần
  →[TIÊM_PHÒNG]→ Cần tiêm phòng hàng năm
[Dịch vụ cơ bản]
  →[TẮM_VỆ_SINH]→ Tắm, sấy khô, vệ sinh tai mắt
  →[CẮT_TỈA]→ Cắt lông theo yêu cầu hoặc kiểu chuẩn giống
  →[SPA]→ Massage, mặt nạ dưỡng lông, nước hoa thú cưng`;
}

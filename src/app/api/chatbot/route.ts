/**
 * /api/chatbot/route.ts
 * Chatbot API endpoint dùng Groq Cloud (miễn phí) + Llama 3.3 70B
 * Logic: Graph RAG - Trích xuất intent → Query Prisma → Build context → LLM answer
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { SESSION_COOKIE, parseSession } from "@/lib/auth";
import {
  buildProductContext,
  buildServiceContext,
  buildShopContext,
  buildCategoryContext,
  buildBookingContext,
  buildPetCareContext,
  buildArticleContext,
} from "@/lib/chatbot-context";

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = { role: "user" | "assistant"; content: string };

type Intent =
  | "product_query"
  | "service_query"
  | "shop_info"
  | "booking_query"
  | "pet_care"
  | "article_query"
  | "category_query"
  | "general";

// ─── Intent Detection ─────────────────────────────────────────────────────────
// Tương tự notebook: phân tích entity và relationship type từ câu hỏi

function detectIntent(message: string): Intent {
  const m = message.toLowerCase();

  // Đặt lịch – ưu tiên cao nhất
  if (
    /đặt lịch|lịch hẹn|booking|hẹn giờ|appointment|đăng ký lịch|lịch khám/.test(m)
  ) return "booking_query";

  // Thông tin cửa hàng
  if (
    /địa chỉ|giờ mở cửa|giờ làm việc|số điện thoại|liên hệ|email|mở cửa|đóng cửa|ở đâu|facebook|zalo/.test(m)
  ) return "shop_info";

  // Dịch vụ – chỉ khi KHÔNG có từ mua/hàng/giá
  if (
    /dịch vụ|spa|grooming|cạo|chải|làm đẹp|nail|móng|thẩm mỹ/.test(m) &&
    !/mua|hàng|giá|sản phẩm|còn không|bao nhiêu tiền/.test(m)
  ) return "service_query";

  // Bài viết
  if (
    /bài viết|tin tức|blog|hướng dẫn|kinh nghiệm|mẹo nuôi/.test(m)
  ) return "article_query";

  // Danh mục
  if (
    /danh mục|loại sản phẩm|nhóm hàng|category/.test(m) && !/sản phẩm nào|cụ thể/.test(m)
  ) return "category_query";

  // Sản phẩm – phạm vi rộng, bao gồm cả từ chỉ thú cưng khi có ngữ cảnh mua hàng
  if (
    /sản phẩm|mua|bán|giá|còn hàng|hết hàng|thức ăn|hạt|pate|đồ chơi|phụ kiện|vòng cổ|balo|dây dắt|bát|chuồng|tắm gội|dầu gội|lược|kéo|tông đơ|khăn|sữa bột/.test(m)
  ) return "product_query";

  // Từ chỉ thú cưng không kèm ngữ cảnh mua hàng → tư vấn chăm sóc
  if (
    /chăm sóc|nuôi|thú cưng|chó|mèo|hamster|thỏ|chim|tiêm phòng|bệnh|sức khỏe|pet care/.test(m)
  ) return "pet_care";

  return "general";
}

// ─── Keyword Extraction ───────────────────────────────────────────────────────
// Trích xuất từ khóa tìm kiếm từ câu hỏi (như entity extraction trong notebook)

function extractKeywords(message: string): string {
  const stopWords = new Set([
    "cho", "tôi", "biết", "về", "là", "có", "của", "và", "với", "như",
    "thế", "nào", "bao", "nhiêu", "gì", "ở", "đâu", "khi", "nào", "được",
    "không", "thì", "mà", "hay", "hoặc", "cũng", "vẫn", "đã", "đang",
    "sẽ", "rất", "lắm", "quá", "khá", "còn", "hỏi", "muốn", "cần",
  ]);

  return message
    .toLowerCase()
    .replace(/[?!.,]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w))
    .join(" ");
}

// ─── Data Retrieval ───────────────────────────────────────────────────────────
// Query Prisma theo intent - tương tự Cypher query trong notebook

async function retrieveContext(message: string, intent: Intent): Promise<string> {
  const keywords = extractKeywords(message);
  const contextParts: string[] = [];

  try {
    switch (intent) {
      case "product_query": {
        const allProducts = await prisma.products.findMany({
          include: { categories: true },
        });

        const queryStr = message.toLowerCase();
        // Tách các từ có nghĩa (loại bỏ stop-words và từ ngắn < 2 ký tự)
        const stopWords = new Set(["cho", "tôi", "bạn", "là", "có", "của", "và", "với", "như", "thế", "nào", "bao", "gì", "ở", "khi", "được", "không", "thì", "hay", "đã", "đang", "sẽ", "rất", "muốn", "cần", "tư", "vấn", "ơi", "ạ", "nhé", "giùm", "dùm"]);
        const queryTokens = queryStr
          .replace(/[.,?!]/g, "")
          .split(/\s+/)
          .filter(w => w.length >= 2 && !stopWords.has(w));

        const scoredProducts = allProducts.map((p) => {
          const nameNorm = p.product_name.toLowerCase();
          const catNorm  = (p.categories?.category_name || "").toLowerCase();
          const descNorm = (p.description || "").toLowerCase();
          const fullText = `${nameNorm} ${catNorm} ${descNorm}`;

          let score = 0;

          // Tên sản phẩm khớp → điểm cao
          for (const token of queryTokens) {
            if (nameNorm.includes(token)) score += 5;
            else if (catNorm.includes(token))  score += 3;
            else if (descNorm.includes(token)) score += 1;
          }

          // Bonus: nếu cả cụm keyword xuất hiện trong tên
          if (queryTokens.length >= 2) {
            const twoGrams = queryTokens.slice(0, -1).map((w, i) => `${w} ${queryTokens[i+1]}`);
            for (const gram of twoGrams) {
              if (fullText.includes(gram)) score += 8;
            }
          }

          return { product: p, score };
        });

        const matchedProducts = scoredProducts
          .filter(x => x.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
          .map(x => x.product);

        if (!matchedProducts.length) {
          // Fallback: trả về 8 sản phẩm mới nhất
          contextParts.push(buildProductContext(
            [...allProducts].sort((a, b) => b.product_id - a.product_id).slice(0, 8)
          ));
        } else {
          contextParts.push(buildProductContext(matchedProducts));
        }
        break;
      }

      case "service_query": {
        const services = await prisma.services.findMany({
          where: {
            is_active: true,
            OR: keywords
              ? [
                  { service_name: { contains: keywords.split(" ")[0] } },
                  { description: { contains: keywords.split(" ")[0] } },
                  { category: { contains: keywords.split(" ")[0] } },
                ]
              : undefined,
          },
          orderBy: { price: "asc" },
          take: 10,
        });

        if (!services.length) {
          const allServices = await prisma.services.findMany({
            where: { is_active: true },
            orderBy: { price: "asc" },
          });
          contextParts.push(buildServiceContext(allServices));
        } else {
          contextParts.push(buildServiceContext(services));
        }
        break;
      }

      case "shop_info": {
        const settings = await prisma.shop_settings.findMany();
        contextParts.push(buildShopContext(settings));
        break;
      }

      case "booking_query": {
        contextParts.push(buildBookingContext());
        // Cũng lấy danh sách dịch vụ để tham khảo
        const services = await prisma.services.findMany({
          where: { is_active: true },
          orderBy: { price: "asc" },
        });
        contextParts.push(buildServiceContext(services));
        break;
      }

      case "pet_care": {
        contextParts.push(buildPetCareContext());
        // Tìm bài viết liên quan
        const articles = await prisma.articles.findMany({
          where: {
            status: "published",
            OR: [
              { title: { contains: "thú cưng" } },
              { title: { contains: "chó" } },
              { title: { contains: "mèo" } },
              { category: { contains: "thú cưng" } },
            ],
          },
          take: 3,
        });
        if (articles.length) contextParts.push(buildArticleContext(articles));
        break;
      }

      case "article_query": {
        const articles = await prisma.articles.findMany({
          where: {
            status: "published",
            OR: keywords
              ? [
                  { title: { contains: keywords.split(" ")[0] } },
                  { category: { contains: keywords.split(" ")[0] } },
                ]
              : undefined,
          },
          take: 5,
          orderBy: { created_at: "desc" },
        });
        contextParts.push(buildArticleContext(articles));
        break;
      }

      case "category_query": {
        const categories = await prisma.categories.findMany({
          include: { products: true },
        });
        contextParts.push(buildCategoryContext(categories));
        break;
      }

      default: {
        // General: lấy thông tin cửa hàng + vài sản phẩm + dịch vụ
        const [settings, products, services] = await Promise.all([
          prisma.shop_settings.findMany(),
          prisma.products.findMany({ include: { categories: true }, take: 4 }),
          prisma.services.findMany({ where: { is_active: true }, take: 4 }),
        ]);
        contextParts.push(buildShopContext(settings));
        contextParts.push(buildProductContext(products));
        contextParts.push(buildServiceContext(services));
      }
    }
  } catch (err) {
    console.error("[chatbot] DB error:", err);
  }

  return contextParts.filter(Boolean).join("\n\n");
}

// ─── Groq Cloud API ───────────────────────────────────────────────────────────
// Miễn phí, tốc độ cao, model Llama 3.3 70B

async function callGroq(
  systemPrompt: string,
  history: Message[],
  userMessage: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey || apiKey === "your_groq_api_key_here") {
    throw new Error("GROQ_API_KEY chưa được cấu hình trong .env");
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6), // Giữ 6 tin nhắn gần nhất để tiết kiệm token
    { role: "user", content: userMessage },
  ];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", // Model mạnh nhất, miễn phí
      messages,
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Xin lỗi, tôi không thể trả lời lúc này.";
}

// ─── System Prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Bạn là trợ lý AI thân thiện của cửa hàng thú cưng "Pet Care Shop". 
Nhiệm vụ của bạn là hỗ trợ khách hàng hỏi về:
- Sản phẩm (thức ăn, phụ kiện, đồ chơi thú cưng)
- Dịch vụ (tắm, spa, cắt tỉa lông, chăm sóc thú cưng)
- Thông tin cửa hàng (địa chỉ, giờ mở cửa, liên hệ)
- Tư vấn chăm sóc thú cưng
- Hướng dẫn đặt lịch hẹn

Nguyên tắc:
1. Luôn trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
2. Chỉ trả lời dựa trên thông tin được cung cấp trong context
3. Nếu không có thông tin, nói khéo léo và gợi ý khách liên hệ trực tiếp
4. Giữ câu trả lời ngắn gọn, dễ hiểu (tối đa 200 từ)
5. Có thể dùng emoji phù hợp để thân thiện hơn 🐾
6. Không bịa đặt giá hoặc thông tin sản phẩm khi không có trong context
7. Khi tư vấn mua sản phẩm, hãy cung cấp thông tin chi tiết từ cơ sở dữ liệu và hướng dẫn khách hàng thêm sản phẩm vào giỏ hàng rồi tiến hành thanh toán trên website. Chatbot KHÔNG tự tạo đơn hàng trực tiếp.`;

// ─── Main Handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body as {
      message: string;
      history?: Message[];
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Tin nhắn không được để trống" }, { status: 400 });
    }

    // Read session from cookies
    const cookieStore = await cookies();
    const rawCookie = cookieStore.get(SESSION_COOKIE)?.value ?? "";
    const session = rawCookie
      ? parseSession(`${SESSION_COOKIE}=${rawCookie}`)
      : null;

    // Fetch active services
    const activeServices = await prisma.services.findMany({
      where: { is_active: true },
      select: { service_id: true, service_name: true, price: true, duration: true }
    });

    // Fetch customer pets if logged in
    let customerPets: any[] = [];
    if (session && session.id) {
      customerPets = await prisma.pets.findMany({
        where: { customer_id: parseInt(session.id, 10) },
        select: { pet_id: true, name: true, type: true, breed: true, weight: true }
      });
    }

    // Build user context
    let userContext = "";
    if (session) {
      userContext = `
--- THÔNG TIN KHÁCH HÀNG ĐĂNG NHẬP ---
- ID khách hàng: ${session.id}
- Tên khách hàng: ${session.name}
- Email khách hàng: ${session.email}
- Thú cưng đã đăng ký của khách: ${customerPets.length > 0 ? JSON.stringify(customerPets) : 'Chưa đăng ký thú cưng nào'}
`;
    } else {
      userContext = `
--- TRẠNG THÁI KHÁCH HÀNG ---
- Khách hàng CHƯA ĐĂNG NHẬP. Nếu họ yêu cầu đặt lịch (booking/hẹn lịch), bạn phải nhắc nhở thân thiện yêu cầu họ đăng nhập bằng liên kết: [/login](/login). Tuyệt đối không thực hiện đặt lịch khi chưa đăng nhập.
`;
    }

    // Format current time in Vietnam
    const currentInVietnam = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
    const timeStr = currentInVietnam.toISOString().slice(0, 19).replace('T', ' ');

    const servicesContext = `
--- DANH SÁCH DỊCH VỤ CỬA HÀNG ---
${activeServices.map(s => `- ID dịch vụ: ${s.service_id}, Tên dịch vụ: "${s.service_name}", Giá: ${Number(s.price).toLocaleString("vi-VN")}đ, Thời gian: ${s.duration} phút`).join('\n')}
`;

    const bookingInstructions = `
=== QUY TẮC ĐẶT LỊCH HẸN TRỰC TIẾP ===
Khi khách hàng yêu cầu đặt lịch hẹn/booking và ĐÃ ĐĂNG NHẬP:
- Xác định bé thú cưng sẽ sử dụng dịch vụ:
  - Nếu khách hàng chưa có thú cưng nào đăng ký trong tài khoản: Hỏi tên bé cưng và loài của bé (Chó, Mèo, Thỏ, Chim, Khác...). Khi khách trả lời, bạn PHẢI trả về phản hồi kèm tag tạo thú cưng ở cuối câu trả lời:
    $$CREATE_PET:{"name": "Tên bé", "type": "Dog|Cat|Bird|Rabbit|Other"}$$
    (Trong đó type phải là: Dog (Chó), Cat (Mèo), Bird (Chim), Rabbit (Thỏ), hoặc Other (Khác). Ví dụ: "Dạ em đã thêm bé Lu (Chó) vào danh sách thú cưng của bạn rồi! $$CREATE_PET:{"name":"Lu","type":"Dog"}$$")
  - Nếu đã có thú cưng đăng ký: Xác định xem đặt lịch cho bé nào trong số đó (hỏi khách nếu họ có nhiều bé mà chưa chỉ rõ).
- Xác định dịch vụ đặt lịch (chọn đúng ID dịch vụ tương ứng từ danh sách dịch vụ cửa hàng).
- Xác định thời gian đặt lịch (ngày giờ cụ thể). Dựa vào thời gian hiện tại của hệ thống (${timeStr}), hãy tự động quy đổi ngày giờ khách yêu cầu thành định dạng ISO 8601 YYYY-MM-DDTHH:mm:ss.
- Khi có đủ 3 thông tin (Dịch vụ, Tên thú cưng, Ngày giờ hẹn cụ thể), bạn PHẢI trả về phản hồi kèm tag tạo lịch đặt ở cuối phản hồi:
  $$CREATE_BOOKING:{"service_id": ID_DỊCH_VỤ, "pet_name": "Tên thú cưng", "date": "YYYY-MM-DDTHH:mm:ss", "note": "Ghi chú nếu có"}$$
  (Ví dụ: "Dạ em đã lên lịch hẹn dịch vụ Tắm vệ sinh cho bé Lu vào lúc 14:00 ngày mai rồi nhé! $$CREATE_BOOKING:{"service_id":1,"pet_name":"Lu","date":"2026-05-26T14:00:00","note":"Đặt qua chatbot"}$$")
- Lưu ý quan trọng: Chỉ output các thẻ tag này khi đã thu thập đầy đủ và chính xác các thông tin cần thiết từ người dùng.
`;

    // 1. Detect intent (Graph entity/relation extraction)
    const intent = detectIntent(message);

    // 2. Retrieve context from DB (Graph traversal equivalent)
    const context = await retrieveContext(message, intent);

    // 3. Build augmented prompt with graph context
    const augmentedMessage = context
      ? `Câu hỏi của khách: ${message}\n\n--- Dữ liệu từ hệ thống ---\n${context}`
      : message;

    const dynamicSystemPrompt = `${SYSTEM_PROMPT}\n${servicesContext}\n${userContext}\n${bookingInstructions}\n- Thời gian hiện tại trong hệ thống: ${timeStr}`;

    // 4. Call Groq (LLM) to generate answer
    let reply = await callGroq(dynamicSystemPrompt, history, augmentedMessage);
    let actionExecuted: string | null = null;

    // Parse $$CREATE_PET:JSON$$
    const petRegex = /\$\$CREATE_PET:(.*?)\$\$/;
    const petMatch = reply.match(petRegex);
    if (petMatch) {
      try {
        const petData = JSON.parse(petMatch[1].trim());
        const { name, type } = petData;
        if (session && session.id && name && type) {
          await prisma.pets.create({
            data: {
              customer_id: parseInt(session.id, 10),
              name,
              type,
            }
          });
          actionExecuted = "pet_created";
          reply = reply.replace(petRegex, "").trim();
        }
      } catch (err) {
        console.error("Lỗi khi tạo thú cưng từ Chatbot:", err);
      }
    }

    // Parse $$CREATE_BOOKING:JSON$$
    const bookingRegex = /\$\$CREATE_BOOKING:(.*?)\$\$/;
    const bookingMatch = reply.match(bookingRegex);
    if (bookingMatch) {
      try {
        const bookingData = JSON.parse(bookingMatch[1].trim());
        const { service_id, pet_name, date, note } = bookingData;
        if (session && session.id && service_id && pet_name && date) {
          const appointment = await prisma.appointments.create({
            data: {
              customer_id: parseInt(session.id, 10),
              service_id: parseInt(service_id, 10),
              pet_name,
              appointment_date: new Date(date),
              status: "Pending",
              note: note || "Đặt lịch hẹn tự động qua Chatbot",
            },
            select: { appointment_id: true }
          });

          // Tạo thông báo cho admin
          try {
            await prisma.notifications.create({
              data: {
                type: "booking",
                title: `Lịch hẹn mới #APT-${appointment.appointment_id}`,
                message: `Khách hàng vừa đặt lịch cho thú cưng "${pet_name}" vào ${new Date(date).toLocaleString("vi-VN")}, đang chờ xác nhận. (Đặt qua Chatbot)`,
                source_id: appointment.appointment_id,
              }
            });
          } catch (notifErr) {
            console.error("Lỗi tạo thông báo cho Admin:", notifErr);
          }

          actionExecuted = "booking_created";
          reply = reply.replace(bookingRegex, "").trim();
        }
      } catch (err) {
        console.error("Lỗi khi tạo lịch hẹn từ Chatbot:", err);
      }
    }

    return NextResponse.json({ reply, intent, actionExecuted });
  } catch (err) {
    console.error("[POST /api/chatbot]", err);
    const msg = err instanceof Error ? err.message : "Lỗi máy chủ";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

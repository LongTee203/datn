import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Vui lòng nhập địa chỉ email." },
        { status: 400 }
      );
    }

    // 1. Kiểm tra email có tồn tại không (ở cả admins và customers)
    const [admin, customer] = await Promise.all([
      prisma.admins.findFirst({ where: { email } }),
      prisma.customers.findFirst({ where: { email } }),
    ]);

    if (!admin && !customer) {
      // Để bảo mật, không tiết lộ email có tồn tại hay không, vẫn báo thành công giả
      return NextResponse.json({
        message: "Nếu email tồn tại trong hệ thống, link khôi phục đã được gửi.",
      });
    }

    // 2. Tạo token ngẫu nhiên
    const rawToken = crypto.randomBytes(32).toString("hex");
    // Băm token trước khi lưu vào database (chống lộ DB)
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    
    // Token hết hạn sau 15 phút
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 3. Xóa các token cũ của email này (nếu có) để tránh spam database
    await prisma.password_resets.deleteMany({
      where: { email },
    });

    // 4. Lưu token vào database
    await prisma.password_resets.create({
      data: {
        email,
        token: hashedToken,
        expires_at: expiresAt,
      },
    });

    // 5. Gửi email
    // Tạo link chứa token gốc (chưa băm) để user click
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    // Nếu chưa cấu hình email trong .env, in ra console để test tạm
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("====== TEST MODE: EMAIL CHƯA ĐƯỢC CẤU HÌNH ======");
      console.log("Link khôi phục:", resetUrl);
      console.log("==================================================");
    } else {
      await sendResetEmail(email, resetUrl);
    }

    return NextResponse.json({
      message: "Nếu email tồn tại trong hệ thống, link khôi phục đã được gửi.",
    });
  } catch (error) {
    console.error("[POST /api/auth/forgot-password]", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

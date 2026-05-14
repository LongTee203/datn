import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { error: "Thông tin không hợp lệ." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự." },
        { status: 400 }
      );
    }

    // 1. Tìm token trong database
    const resetRecord = await prisma.password_resets.findFirst({
      where: { email },
      orderBy: { created_at: "desc" },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { error: "Yêu cầu khôi phục mật khẩu không hợp lệ hoặc đã hết hạn." },
        { status: 400 }
      );
    }

    // 2. Kiểm tra hạn sử dụng
    if (new Date() > new Date(resetRecord.expires_at)) {
      // Xóa token đã hết hạn
      await prisma.password_resets.delete({ where: { id: resetRecord.id } });
      return NextResponse.json(
        { error: "Link khôi phục đã hết hạn. Vui lòng yêu cầu lại." },
        { status: 400 }
      );
    }

    // 3. Đối chiếu mã hash của token
    const hashedProvidedToken = crypto.createHash("sha256").update(token).digest("hex");
    if (hashedProvidedToken !== resetRecord.token) {
      return NextResponse.json(
        { error: "Token không hợp lệ." },
        { status: 400 }
      );
    }

    // 5. Cập nhật mật khẩu
    const admin = await prisma.admins.findFirst({ where: { email } });
    
    if (admin) {
      // Bắt buộc hash mật khẩu cho Admin
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.admins.update({
        where: { admin_id: admin.admin_id },
        data: { password: hashedNewPassword },
      });
    } else {
      const customer = await prisma.customers.findFirst({ where: { email } });
      if (customer) {
        // Lưu plain text cho Customer theo yêu cầu
        await prisma.customers.update({
          where: { customer_id: customer.customer_id },
          data: { password: newPassword },
        });
      } else {
        return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
      }
    }

    // 6. Xóa token đã sử dụng
    await prisma.password_resets.delete({ where: { id: resetRecord.id } });

    return NextResponse.json({ message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.error("[POST /api/auth/reset-password]", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

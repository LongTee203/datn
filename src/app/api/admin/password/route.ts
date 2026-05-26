import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { admin_id, currentPassword, newPassword } = body;

    if (!admin_id || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "Vui lòng cung cấp đủ thông tin." }, { status: 400 });
    }

    const admin = await prisma.admins.findUnique({
      where: { admin_id: parseInt(admin_id, 10) }
    });

    if (!admin) {
      return NextResponse.json({ error: "Không tìm thấy tài khoản admin." }, { status: 404 });
    }

    // Verify current password
    const isValid = admin.password.startsWith("$2") 
      ? await bcrypt.compare(currentPassword, admin.password)
      : currentPassword === admin.password; // fallback cho plain text nếu có

    if (!isValid) {
      return NextResponse.json({ error: "Mật khẩu hiện tại không đúng." }, { status: 400 });
    }

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.admins.update({
      where: { admin_id: parseInt(admin_id, 10) },
      data: { password: hashed }
    });

    return NextResponse.json({ message: "Đổi mật khẩu thành công." });
  } catch (err) {
    console.error("[PATCH /api/admin/password]", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

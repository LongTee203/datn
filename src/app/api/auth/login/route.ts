import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string = (body.email ?? "").trim();
    const password: string = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập email và mật khẩu." },
        { status: 400 }
      );
    }

    const result = await loginUser(email, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json(result.user);
  } catch (err) {
    console.error("[POST /api/auth/login]", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ, vui lòng thử lại." },
      { status: 500 }
    );
  }
}

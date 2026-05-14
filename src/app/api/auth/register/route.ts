import { NextResponse } from "next/server";
import { registerCustomer } from "@/lib/auth.service";

// ─── Validation ───────────────────────────────────────────────────────────────

function validateRegisterInput(body: Record<string, unknown>) {
  const name = (body.name as string)?.trim() ?? "";
  const email = (body.email as string)?.trim() ?? "";
  const phone = (body.phone as string)?.trim() ?? "";
  const password = (body.password as string) ?? "";
  const confirmPassword = (body.confirmPassword as string) ?? "";

  if (!name || !email || !phone || !password || !confirmPassword) {
    return { error: "Vui lòng điền đầy đủ thông tin." };
  }
  if (password !== confirmPassword) {
    return { error: "Mật khẩu xác nhận không khớp." };
  }
  if (password.length < 6) {
    return { error: "Mật khẩu phải có ít nhất 6 ký tự." };
  }

  return { data: { name, email, phone, password } };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = validateRegisterInput(body);

    if ("error" in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const result = await registerCustomer(validated.data);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json(
      { message: "Đăng ký thành công." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/auth/register]", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ, vui lòng thử lại." },
      { status: 500 }
    );
  }
}

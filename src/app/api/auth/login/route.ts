import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

interface AdminRow extends RowDataPacket {
  admin_id: number;
  username: string;
  password: string;
  full_name: string;
  email: string;
  role: string;
}

interface CustomerRow extends RowDataPacket {
  customer_id: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập email và mật khẩu" },
        { status: 400 }
      );
    }

    // Check admin table – allow login by email OR username
    const admins = await query<AdminRow[]>(
      "SELECT * FROM admins WHERE email = ? OR username = ? LIMIT 1",
      [email, email]
    );

    if (admins.length > 0) {
      const admin = admins[0];
      // Support both plain-text (legacy) and bcrypt hashed passwords
      const isValid =
        admin.password === password ||
        (admin.password.startsWith("$2") &&
          (await bcrypt.compare(password, admin.password)));

      if (isValid) {
        return NextResponse.json({
          id: String(admin.admin_id),
          email: admin.email ?? email,
          name: admin.full_name,
          role: "admin",
          avatar: admin.full_name?.charAt(0).toUpperCase() ?? "A",
        });
      }
    }

    // Check customers table
    const customers = await query<CustomerRow[]>(
      "SELECT * FROM customers WHERE email = ? LIMIT 1",
      [email]
    );

    if (customers.length > 0) {
      // Customers table has no password column in this schema,
      // so we use phone as password (common pattern in VN small business apps)
      // or match against a "password" field if added later.
      // For now: allow login with phone number as password.
      const customer = customers[0];
      if (customer.phone === password) {
        return NextResponse.json({
          id: String(customer.customer_id),
          email: customer.email ?? email,
          name: customer.full_name,
          role: "customer",
          avatar: customer.full_name?.charAt(0).toUpperCase() ?? "C",
        });
      }
    }

    return NextResponse.json(
      { error: "Email hoặc mật khẩu không đúng" },
      { status: 401 }
    );
  } catch (err) {
    console.error("[/api/auth/login] Error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ, vui lòng thử lại" },
      { status: 500 }
    );
  }
}

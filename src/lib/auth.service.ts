/**
 * Auth Service – business logic for authentication.
 * Keeps API routes thin and testable.
 */
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const BCRYPT_ROUNDS = 10;

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "customer";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  /** First letter of name, used as avatar fallback */
  avatar: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export type LoginResult =
  | { success: true; user: AuthUser }
  | { success: false; error: string };

export type RegisterResult =
  | { success: true }
  | { success: false; error: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeAvatar(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

async function verifyPassword(
  plain: string,
  stored: string
): Promise<boolean> {
  if (stored.startsWith("$2")) return bcrypt.compare(plain, stored);
  // Legacy plain-text fallback
  return plain === stored;
}

// ─── Login ────────────────────────────────────────────────────────────────────

/** Validate credentials against admins and then customers tables. */
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResult> {
  // 1. Check admins (login by email OR username)
  const admin = await prisma.admins.findFirst({
    where: { OR: [{ email }, { username: email }] },
  });

  if (admin) {
    const valid = await verifyPassword(password, admin.password);
    if (!valid) {
      return { success: false, error: "Email hoặc mật khẩu không đúng" };
    }
    return {
      success: true,
      user: {
        id: String(admin.admin_id),
        email: admin.email ?? email,
        name: admin.full_name,
        role: "admin",
        avatar: makeAvatar(admin.full_name),
      },
    };
  }

  // 2. Check customers
  const customer = await prisma.customers.findFirst({
    where: { email },
  });

  if (customer) {
    // Không cho phép đăng nhập nếu tài khoản bị Admin vô hiệu hóa
    if (customer.is_active === false) {
      return { success: false, error: "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ Admin." };
    }

    const valid = await verifyPassword(password, customer.password);
    if (!valid) {
      return { success: false, error: "Email hoặc mật khẩu không đúng" };
    }
    return {
      success: true,
      user: {
        id: String(customer.customer_id),
        email: customer.email ?? email,
        name: customer.full_name,
        role: "customer",
        avatar: makeAvatar(customer.full_name),
      },
    };
  }

  return { success: false, error: "Email hoặc mật khẩu không đúng" };
}

// ─── Register ─────────────────────────────────────────────────────────────────

/** Validate input, check duplicates, hash password, and create customer. */
export async function registerCustomer(
  input: RegisterInput
): Promise<RegisterResult> {
  const { name, email, phone, password } = input;

  // Check for existing email or phone
  const existing = await prisma.customers.findFirst({
    where: { OR: [{ email }, { phone }] },
    select: { email: true, phone: true },
  });

  if (existing) {
    if (existing.email === email) {
      return { success: false, error: "Email đã được sử dụng." };
    }
    if (existing.phone === phone) {
      return { success: false, error: "Số điện thoại đã được sử dụng." };
    }
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

  await prisma.customers.create({
    data: {
      full_name: name,
      email,
      phone,
      password: hashedPassword,
    },
  });

  return { success: true };
}

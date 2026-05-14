import mysql from "mysql2/promise";

// ─── Connection Pool ──────────────────────────────────────────────────────────
// Parses DATABASE_URL (mysql://user:pass@host:port/db) so we only need one env var.
function buildPoolConfig() {
  const url = process.env.DATABASE_URL;
  if (url) {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port ? parseInt(u.port, 10) : 3306,
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
    };
  }
  // Fallback to individual env vars (legacy)
  return {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

const pool = mysql.createPool({
  ...buildPoolConfig(),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

// ─── Named query helper ───────────────────────────────────────────────────────
// Allows `import { query } from "@/lib/db"` in existing API routes.
// Accepts `unknown[]` so callers don't need explicit casts.
import type { ExecuteValues } from "mysql2/promise";
export async function query<T>(
  sql: string,
  params?: ExecuteValues | unknown[]
): Promise<T> {
  const [rows] = await pool.execute(sql, params as ExecuteValues);
  return rows as T;
}
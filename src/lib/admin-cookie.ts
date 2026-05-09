import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "px_admin";

const TTL = 60 * 60 * 8; // 8 hours

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function sign(value: string): string | null {
  const key = secret();
  if (!key) return null;
  return createHmac("sha256", key).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createAdminToken(now = Date.now()): {
  token: string;
  maxAge: number;
} | null {
  const expiresAt = String(now + TTL * 1000);
  const signature = sign(expiresAt);
  if (!signature) return null;

  return {
    token: `${expiresAt}.${signature}`,
    maxAge: TTL,
  };
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;

  const expires = Number(expiresAt);
  if (!Number.isFinite(expires) || expires <= Date.now()) return false;

  const expected = sign(expiresAt);
  if (!expected) return false;

  return safeEqual(signature, expected);
}

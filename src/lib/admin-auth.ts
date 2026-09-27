import { cookies } from "next/headers";
import { createHmac, createHash, timingSafeEqual } from "crypto";
import { ADMIN_PROFILES, type AdminId as ProfileAdminId } from "@/data/admin-profiles";
import { hasStoredAdminPassword, verifyStoredAdminPassword } from "@/lib/admin-passwords";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

const ENV_KEYS: Record<ProfileAdminId, string[]> = {
  lakshay: ["ADMIN_LAKSHAY_PASSWORD"],
  benjamin: ["ADMIN_BENJAMIN_PASSWORD", "ADMIN_BEN_PASSWORD"],
  kayvan: ["ADMIN_KAYVAN_PASSWORD"],
  eleanor: ["ADMIN_ELEANOR_PASSWORD", "ADMIN_ELEANOR_BASE_PASSWORD"],
};

export const ADMIN_USERS = ADMIN_PROFILES.map((p) => ({
  ...p,
  envKeys: ENV_KEYS[p.id],
})) as ReadonlyArray<(typeof ADMIN_PROFILES)[number] & { envKeys: string[] }>;

export type AdminId = ProfileAdminId;
export type AdminSession = {
  id: AdminId;
  name: string;
  role: (typeof ADMIN_USERS)[number]["role"];
  passwordChangeRequired: boolean;
};

function getSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.ADMIN_SECRET;
  if (!secret?.trim()) throw new Error("AUTH_SECRET or ADMIN_SECRET required");
  return secret;
}

function sign(payload: { id: string; ts: number }): string {
  const secret = getSecret();
  const data = JSON.stringify(payload);
  const b64 = Buffer.from(data, "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${b64}.${sig}`;
}

function verify(token: string): { id: string; ts: number } | null {
  try {
    const [b64, sig] = token.split(".");
    if (!b64 || !sig) return null;
    const data = Buffer.from(b64, "base64url").toString("utf8");
    const payload = JSON.parse(data) as { id?: string; ts?: number };
    if (typeof payload.id !== "string" || typeof payload.ts !== "number") return null;
    const expectedSig = createHmac("sha256", getSecret()).update(data).digest("base64url");
    if (!timingSafeEqual(Buffer.from(sig, "base64url"), Buffer.from(expectedSig, "base64url")))
      return null;
    if (Date.now() - payload.ts > MAX_AGE_SEC * 1000) return null;
    return { id: payload.id, ts: payload.ts };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verify(token);
  if (!payload) return null;
  const user = ADMIN_USERS.find((u) => u.id === payload.id);
  if (!user) return null;
  const passwordChangeRequired =
    user.role === "employee" && !(await hasStoredAdminPassword(user.id));
  return { id: user.id, name: user.name, role: user.role, passwordChangeRequired };
}

export function createSessionCookie(adminId: AdminId): string {
  const payload = { id: adminId, ts: Date.now() };
  const value = sign(payload);
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SEC}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function verifyEnvPassword(adminId: string, password: string): boolean {
  const user = ADMIN_USERS.find((u) => u.id === adminId);
  if (!user) return false;
  const envPassword = user.envKeys.map((key) => process.env[key]).find(Boolean);
  if (!envPassword) return false;
  const a = createHash("sha256").update(password.trim(), "utf8").digest();
  const b = createHash("sha256").update(envPassword.trim(), "utf8").digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function verifyPassword(adminId: string, password: string): Promise<boolean> {
  const user = ADMIN_USERS.find((u) => u.id === adminId);
  if (!user) return false;
  if (user.role === "employee" && (await hasStoredAdminPassword(user.id))) {
    return verifyStoredAdminPassword(user.id, password);
  }
  return verifyEnvPassword(adminId, password);
}

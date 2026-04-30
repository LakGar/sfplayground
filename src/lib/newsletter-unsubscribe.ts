import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  const secret = process.env.NEWSLETTER_UNSUBSCRIBE_SECRET;
  if (!secret) {
    throw new Error("NEWSLETTER_UNSUBSCRIBE_SECRET is not configured");
  }
  return secret;
}

function sign(email: string): string {
  return createHmac("sha256", getSecret())
    .update(email.trim().toLowerCase())
    .digest("hex");
}

export function createUnsubscribeToken(email: string): string {
  return sign(email);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = sign(email);
  const provided = (token ?? "").trim();
  if (!provided || provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
}

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { buildIntakeEmailHtml } from "@/lib/intake-email-html";
import type { IntakeKind } from "@/lib/intake-types";
import { INTAKE_SUBJECT } from "@/lib/intake-types";
import { getTeamRecipients, SFPLAYGROUND_FROM } from "@/lib/team-email";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MIN_FORM_FILL_MS = 2000;

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore: Map<string, RateLimitEntry> =
  (globalThis as { __intakeRateLimit?: Map<string, RateLimitEntry> }).__intakeRateLimit ??
  new Map<string, RateLimitEntry>();

if (!(globalThis as { __intakeRateLimit?: Map<string, RateLimitEntry> }).__intakeRateLimit) {
  (globalThis as { __intakeRateLimit?: Map<string, RateLimitEntry> }).__intakeRateLimit =
    rateLimitStore;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);
  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function validEmail(v: string): boolean {
  return v.includes("@") && v.length < 320;
}

const INTAKE_KINDS = new Set<IntakeKind>(["sponsors", "startups", "vcs", "speakers"]);

function validatePayload(
  kind: IntakeKind,
  body: Record<string, unknown>,
): { ok: true; data: Record<string, string> } | { ok: false; error: string } {
  const honeypot = str(body.fax);
  if (honeypot.length > 0) {
    return { ok: false, error: "Invalid submission" };
  }

  const pick = (key: string) => str(body[key]);

  if (kind === "sponsors") {
    const companyName = pick("companyName");
    const contactName = pick("contactName");
    const email = pick("email");
    const phone = pick("phone");
    const website = pick("website");
    const companyType = pick("companyType");
    const sponsorshipBudgetRange = pick("sponsorshipBudgetRange");
    const interestedIn = pick("interestedIn");
    const goals = pick("goals");
    const anythingElse = pick("anythingElse");
    if (!companyName || !contactName || !email || !phone || !website || !companyType) {
      return { ok: false, error: "Missing required fields" };
    }
    if (!validEmail(email)) return { ok: false, error: "Valid email is required" };
    if (!sponsorshipBudgetRange) return { ok: false, error: "Budget range is required" };
    if (!interestedIn) return { ok: false, error: "Select at least one sponsorship interest" };
    if (!goals) return { ok: false, error: "Goals are required" };
    return {
      ok: true,
      data: {
        companyName,
        contactName,
        email,
        phone,
        website,
        companyType,
        sponsorshipBudgetRange,
        interestedIn,
        goals,
        anythingElse,
      },
    };
  }

  if (kind === "startups") {
    const startupName = pick("startupName");
    const founderName = pick("founderName");
    const email = pick("email");
    const phone = pick("phone");
    const website = pick("website");
    const stage = pick("stage");
    const industry = pick("industry");
    const description = pick("description");
    const fundraising = pick("fundraising");
    const roundAndTarget = pick("roundAndTarget");
    const teamSize = pick("teamSize");
    const lookingFor = pick("lookingFor");
    const anythingElse = pick("anythingElse");
    if (!startupName || !founderName || !email || !phone || !website || !stage || !industry || !description) {
      return { ok: false, error: "Missing required fields" };
    }
    if (!validEmail(email)) return { ok: false, error: "Valid email is required" };
    if (!fundraising) return { ok: false, error: "Please indicate if you are fundraising" };
    const fr = fundraising.toLowerCase();
    if (fr === "yes" && !roundAndTarget) {
      return { ok: false, error: "Round and target amount required when fundraising" };
    }
    if (!teamSize) return { ok: false, error: "Team size is required" };
    if (!lookingFor) return { ok: false, error: "Please describe what you are looking for" };
    return {
      ok: true,
      data: {
        startupName,
        founderName,
        email,
        phone,
        website,
        stage,
        industry,
        description,
        fundraising,
        roundAndTarget: roundAndTarget || "—",
        teamSize,
        lookingFor,
        anythingElse,
      },
    };
  }

  if (kind === "vcs") {
    const firmName = pick("firmName");
    const investorName = pick("investorName");
    const email = pick("email");
    const phone = pick("phone");
    const website = pick("website");
    const checkSize = pick("checkSize");
    const stageFocus = pick("stageFocus");
    const sectorFocus = pick("sectorFocus");
    const geographicFocus = pick("geographicFocus");
    const openToJudging = pick("openToJudging");
    const startupsToMeet = pick("startupsToMeet");
    const anythingElse = pick("anythingElse");
    if (
      !firmName ||
      !investorName ||
      !email ||
      !phone ||
      !website ||
      !checkSize ||
      !stageFocus ||
      !sectorFocus ||
      !geographicFocus ||
      !openToJudging ||
      !startupsToMeet
    ) {
      return { ok: false, error: "Missing required fields" };
    }
    if (!validEmail(email)) return { ok: false, error: "Valid email is required" };
    return {
      ok: true,
      data: {
        firmName,
        investorName,
        email,
        phone,
        website,
        checkSize,
        stageFocus,
        sectorFocus,
        geographicFocus,
        openToJudging,
        startupsToMeet,
        anythingElse,
      },
    };
  }

  /* speakers */
  const fullName = pick("fullName");
  const email = pick("email");
  const phone = pick("phone");
  const company = pick("company");
  const roleTitle = pick("roleTitle");
  const webOrLinkedin = pick("webOrLinkedin");
  const topicExpertise = pick("topicExpertise");
  const speakingExperience = pick("speakingExperience");
  const whySpeak = pick("whySpeak");
  const preferredEventType = pick("preferredEventType");
  const anythingElse = pick("anythingElse");
  if (
    !fullName ||
    !email ||
    !phone ||
    !company ||
    !roleTitle ||
    !webOrLinkedin ||
    !topicExpertise ||
    !speakingExperience ||
    !whySpeak ||
    !preferredEventType
  ) {
    return { ok: false, error: "Missing required fields" };
  }
  if (!validEmail(email)) return { ok: false, error: "Valid email is required" };
  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      company,
      roleTitle,
      webOrLinkedin,
      topicExpertise,
      speakingExperience,
      whySpeak,
      preferredEventType,
      anythingElse,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const typeRaw = str(body.type);
    if (!INTAKE_KINDS.has(typeRaw as IntakeKind)) {
      return NextResponse.json({ error: "Invalid intake type" }, { status: 400 });
    }
    const kind = typeRaw as IntakeKind;

    const startedAt = Number(body.formStartedAt);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_FILL_MS) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const validated = validatePayload(kind, body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { data } = validated;
    const replyTo = data.email;

    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

    if (resend) {
      const html = buildIntakeEmailHtml(kind, data, clientIp);
      await resend.emails.send({
        from: SFPLAYGROUND_FROM,
        to: getTeamRecipients(),
        replyTo,
        subject: INTAKE_SUBJECT[kind],
        html,
      });
    }

    return NextResponse.json({ success: true, message: "Thank you—we received your submission." }, { status: 200 });
  } catch (error) {
    console.error("Error in intake route:", error);
    return NextResponse.json(
      {
        error: "Failed to submit",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

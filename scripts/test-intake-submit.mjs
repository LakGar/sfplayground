#!/usr/bin/env node
/**
 * Submits test intake payloads to a running dev server.
 * Usage: node scripts/test-intake-submit.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? "http://localhost:3000";
const ts = String(Math.floor(Date.now() / 1000));
const formStartedAt = Date.now() - 5000;

async function uploadLogo() {
  const { readFile } = await import("fs/promises");
  const { basename } = await import("path");
  const filePath = "public/images/logo.png";
  const buffer = await readFile(filePath);
  const form = new FormData();
  form.append(
    "file",
    new Blob([buffer], { type: "image/png" }),
    basename(filePath),
  );
  const res = await fetch(`${BASE}/api/intake/upload`, { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) {
    throw new Error(`Logo upload failed (${res.status}): ${data.error ?? JSON.stringify(data)}`);
  }
  return data.url;
}

async function submit(name, body) {
  const res = await fetch(`${BASE}/api/intake`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  const ok = res.ok;
  console.log(`\n=== ${name} ===`);
  console.log(`HTTP ${res.status}`);
  console.log(JSON.stringify(data, null, 2));
  return ok;
}

const logoUrl = await uploadLogo();
console.log("Logo upload OK:", logoUrl);

const common = { fax: "", formStartedAt };

const results = await Promise.all([
  submit("Sponsors", {
    type: "sponsors",
    companyName: "[TEST] Cursor Sponsor Co",
    logoUrl,
    contactName: "Test Contact",
    email: `test-sponsor-${ts}@mailinator.com`,
    phone: "+1 555 010 0001",
    website: "https://example.com/test-sponsor",
    companyType: "Venture fund",
    sponsorshipBudgetRange: "$5K – $15K",
    interestedIn: "Pitch Playoffs, Capital Night",
    goals:
      "We want brand visibility among founders and investors at live programs.",
    anythingElse: "Automated test submission — safe to delete.",
    ...common,
  }),
  submit("VCs", {
    type: "vcs",
    firmName: "[TEST] Cursor Ventures",
    logoUrl,
    investorName: "Test Investor",
    email: `test-vc-${ts}@mailinator.com`,
    phone: "+1 555 010 0002",
    website: "https://example.com/test-vc",
    checkSize: "$250K – $1M",
    stageFocus: "Seed",
    sectorFocus: "AI, infra, fintech",
    geographicFocus: "San Francisco",
    openToJudging: "Yes",
    startupsToMeet:
      "Early-stage AI startups with strong technical founders and early revenue.",
    anythingElse: "Automated test submission — safe to delete.",
    ...common,
  }),
  submit("Speakers", {
    type: "speakers",
    fullName: "[TEST] Cursor Speaker",
    email: `test-speaker-${ts}@mailinator.com`,
    phone: "+1 555 010 0003",
    company: "[TEST] Expert Labs",
    logoUrl,
    roleTitle: "Partner",
    webOrLinkedin: "https://linkedin.com/in/test",
    topicExpertise: "Fundraising, GTM",
    speakingExperience:
      "Spoke at multiple Bay Area founder events and podcasts.",
    whySpeak: "I want to share practical lessons with this community.",
    preferredEventType: "Panel",
    anythingElse: "Automated test submission — safe to delete.",
    ...common,
  }),
  submit("Startups", {
    type: "startups",
    startupName: "[TEST] Cursor Startup",
    founderName: "Test Founder",
    email: `test-startup-${ts}@mailinator.com`,
    phone: "+1 555 010 0004",
    website: "https://example.com/test-startup",
    stage: "Seed",
    industry: "B2B SaaS / AI",
    description: "We help teams automate workflow with AI agents.",
    fundraising: "No",
    roundAndTarget: "—",
    teamSize: "4–10",
    lookingFor: "Intros to customers and community at SFPLAYGROUND events.",
    anythingElse: "Automated test submission — safe to delete.",
    ...common,
  }),
]);

const passed = results.filter(Boolean).length;
console.log(`\n--- Summary: ${passed}/${results.length} succeeded ---`);
process.exit(passed === results.length ? 0 : 1);

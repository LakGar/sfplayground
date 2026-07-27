export type IndustrySpace = {
  label: string;
  aliases: string[];
};

export const INDUSTRY_SPACES: IndustrySpace[] = [
  {
    label: "Agtech / Agriculture",
    aliases: [
      "agtech",
      "ag tech",
      "agriculture",
      "agricultural",
      "farming",
      "farm",
      "food systems",
      "foodtech",
      "food tech",
      "crop",
      "livestock",
      "soil",
      "regenerative",
      "precision agriculture",
    ],
  },
  {
    label: "AI Healthtech",
    aliases: ["healthtech", "health tech", "healthcare", "health care", "clinical", "medical", "medtech", "bio"],
  },
  {
    label: "Climate / Energy",
    aliases: ["climate", "energy", "clean energy", "cleantech", "clean tech", "carbon", "grid", "battery"],
  },
  {
    label: "Robotics / Physical AI",
    aliases: ["robotics", "robot", "physical ai", "embodied ai", "automation", "hardware", "deep tech"],
  },
  {
    label: "Construction / Real Estate",
    aliases: ["construction", "real estate", "proptech", "property", "built environment", "housing", "aec"],
  },
  {
    label: "Fintech / Wealth",
    aliases: ["fintech", "finance", "wealth", "wealthtech", "banking", "payments", "lending", "insurance"],
  },
  {
    label: "Aerospace / Defense",
    aliases: ["aerospace", "defense", "defence", "space", "dual use", "national security", "gov contractor"],
  },
  {
    label: "Data Center / AI Infra",
    aliases: ["data center", "datacenter", "ai infra", "infrastructure", "compute", "gpu", "cloud", "chips"],
  },
  {
    label: "Legal / GovTech",
    aliases: ["legal", "law", "compliance", "regulatory", "govtech", "government", "public sector"],
  },
  {
    label: "Industrial AI / Manufacturing",
    aliases: ["industrial", "manufacturing", "factory", "supply chain", "logistics", "operations"],
  },
  {
    label: "Enterprise SaaS / GTM",
    aliases: ["enterprise", "saas", "b2b", "gtm", "sales", "marketing", "revops", "customer success"],
  },
  {
    label: "Consumer / Community",
    aliases: ["consumer", "marketplace", "social", "community", "creator", "media", "gaming"],
  },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function includesTerm(text: string, term: string): boolean {
  const normalizedText = ` ${normalize(text)} `;
  const normalizedTerm = normalize(term);
  return Boolean(normalizedTerm) && normalizedText.includes(` ${normalizedTerm} `);
}

export function getIndustrySpace(labelOrAlias: string): IndustrySpace | null {
  const query = normalize(labelOrAlias);
  if (!query) return null;
  return (
    INDUSTRY_SPACES.find(
      (space) =>
        normalize(space.label) === query ||
        space.aliases.some((alias) => normalize(alias) === query || includesTerm(alias, query)),
    ) ?? null
  );
}

export function expandIndustryQuery(query: string): string[] {
  const space = getIndustrySpace(query);
  return space ? [space.label, ...space.aliases] : [query];
}

export function classifyIndustryText(values: unknown[]): string[] {
  const text = values
    .map((value) => (typeof value === "string" ? value : ""))
    .filter(Boolean)
    .join(" ");

  return INDUSTRY_SPACES.filter((space) =>
    [space.label, ...space.aliases].some((term) => includesTerm(text, term)),
  ).map((space) => space.label);
}

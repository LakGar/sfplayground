export type PartnerBrand = {
  name: string;
  logo: string;
};

/** Logo strip — partners & friends horizontal marquee */
export const PARTNER_BRANDS: PartnerBrand[] = [
  { name: "Actern", logo: "/images/partners/actern.png" },
  { name: "AngelList", logo: "/images/partners/anglelist.png" },
  { name: "Berkeley", logo: "/images/partners/berkeley.png" },
  { name: "CBRE", logo: "/images/partners/cbre.png" },
  { name: "EDC", logo: "/images/partners/edc.png" },
  { name: "Glo", logo: "/images/partners/glo.png" },
  { name: "Harvard", logo: "/images/partners/harvardq.png" },
  { name: "Marvell", logo: "/images/partners/marvelll.png" },
  { name: "MIT", logo: "/images/partners/mit.png" },
  { name: "Salesforce", logo: "/images/partners/salesforce.png" },
  { name: "Stanford", logo: "/images/partners/stanford.png" },
  { name: "Three", logo: "/images/partners/three.png" },
];

/** Vertical CTA marquee — who’s in the network */
export const NETWORK_AUDIENCE_MARQUEE = [
  "Family Offices",
  "Angel Investors",
  "VCs",
  "Founders",
  "Builders",
  "Operators",
  "Limited Partners",
  "Corporate Partners",
  "Customers",
  "Growth Teams",
] as const;

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "@fontsource-variable/stack-sans-headline/wght.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = "https://www.sfplayground.com";
const SITE_NAME = "SFPlayground";
const SITE_TITLE = `${SITE_NAME} | San Francisco Venture Network`;
const SITE_DESCRIPTION =
  "SFPlayground is San Francisco's venture network for live startup pitches, real investor decisions, curated founder events, and high-signal startup community. Also searched as SFPlaygroundAI.";
const SOCIAL_IMAGE = "/images/previous-events/capitalnight.avif";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "SFPlayground",
    "SFPlaygroundAI",
    "sfplaygroundai",
    "SF Playground",
    "SFPLAYGROUND",
    "SFPLAYGROUND VC",
    "SFPLAYGROUND investors",
    "San Francisco venture network",
    "investors",
    "VC",
    "Pitch Playoffs",
    "Events San Francisco",
    "Events Silicon Valley",
    "Events Bay Area",
    "Events California",
    "Events USA",
    "Events Worldwide",
    "Events Online",
    "Events Virtual",
    "Events In-Person",
    "venture capital",
    "startup pitches",
    "investor events",
    "San Francisco",
    "startup community",
    "pitch events",
    "startup showcase",
    "VC events San Francisco",
    "startup investors",
    "live pitch events",
    "founder pitch",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1600,
        height: 900,
        alt: "SFPlayground Capital Night event",
        type: "image/avif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@sfplayground",
    images: [SOCIAL_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "wjhVAf5IsogoQsRm2y3HoNhJxFu_W9SZpiZe-YWstJg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["SFPlaygroundAI", "sfplaygroundai", "SF Playground"],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/images/logo.png`,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@sfplayground.com",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.linkedin.com/company/sfplayground",
      "https://www.instagram.com/sfplayground/",
      "https://x.com/sf_playgro27142",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}

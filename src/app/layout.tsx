import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "SF Playground | Live Startup Pitches & Real Investor Decisions",
  description: "An SF-based platform for live startup pitches and real investor decisions. Join us for exclusive pitch events, discover success stories, and connect with the startup community.",
  keywords: ["startup pitches", "investor events", "San Francisco", "startup community", "pitch events", "venture capital", "startup showcase"],
  authors: [{ name: "SF Playground" }],
  creator: "SF Playground",
  publisher: "SF Playground",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sfplayground.com",
    siteName: "SF Playground",
    title: "SF Playground | Live Startup Pitches & Real Investor Decisions",
    description: "An SF-based platform for live startup pitches and real investor decisions.",
    images: [
      {
        url: "https://sfplayground.com/herohighlight1.jpeg",
        width: 1200,
        height: 630,
        alt: "SF Playground - Live Startup Pitch Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SF Playground | Live Startup Pitches & Real Investor Decisions",
    description: "An SF-based platform for live startup pitches and real investor decisions.",
    creator: "@sfplayground",
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
    // Add Google Search Console verification when you have it
    // google: "your-google-verification-code",
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
    name: "SF Playground",
    url: "https://sfplayground.com",
    logo: "https://sfplayground.com/logo.png",
    description: "An SF-based platform for live startup pitches and real investor decisions.",
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
        {children}
      </body>
    </html>
  );
}

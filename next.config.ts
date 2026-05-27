import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const productionCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "frame-src 'self' https://luma.com",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https:",
  "form-action 'self' https:",
  "upgrade-insecure-requests",
].join("; ");

/** Dev CSP: allow http/ws so LAN IP (http://192.168.x.x:3000) loads CSS/JS/HMR. */
const developmentCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "frame-src 'self' https://luma.com",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:",
  "style-src 'self' 'unsafe-inline' https: http:",
  "img-src 'self' data: blob: https: http:",
  "media-src 'self' blob: https: http:",
  "font-src 'self' data: https: http:",
  "connect-src 'self' https: http: ws: wss:",
  "form-action 'self' https: http:",
].join("; ");

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    const commonHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    const prodOnlyHeaders = [
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
      { key: "Content-Security-Policy", value: productionCsp },
    ];

    const devOnlyHeaders = [
      { key: "Content-Security-Policy", value: developmentCsp },
    ];

    return [
      {
        source: "/(.*)",
        headers: [
          ...commonHeaders,
          ...(isProd ? prodOnlyHeaders : devOnlyHeaders),
        ],
      },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: "/api/image",
        search: "?url=*",
      },
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "luma.com",
      },
      {
        protocol: "https",
        hostname: "images.lumacdn.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "www.getpetpin.com",
      },
      {
        protocol: "https",
        hostname: "www.petpin.ai",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "www.googleapis.com",
      },
      // allow all other domains
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;

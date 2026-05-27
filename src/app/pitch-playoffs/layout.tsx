import { Inter, Oswald } from "next/font/google";
import type { ReactNode } from "react";
import "./pitch-playoffs.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-pp-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function PitchPlayoffsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`pp-root ${inter.variable} ${oswald.variable}`}>{children}</div>
  );
}

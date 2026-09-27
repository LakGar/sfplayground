import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page Not Found | SFPLAYGROUND",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  notFound();
}

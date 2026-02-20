import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import Image from "next/image";
import type { Metadata } from "next";
import siteData from "@/data/site-data.json";

const eventsBySlug = Object.fromEntries(
  siteData.events.map((e) => [e.slug, e])
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const normalizedSlug = resolvedParams.slug.toLowerCase().trim();
  const event = eventsBySlug[normalizedSlug];

  if (!event) {
    return {
      title: "Event Not Found | SF Playground",
    };
  }

  return {
    title: `${event.title} | SF Playground Events`,
    description: `${event.description} Join us at ${event.location} on ${event.date}.`,
    alternates: {
      canonical: `https://sfplayground.com/events/${normalizedSlug}`,
    },
    openGraph: {
      title: `${event.title} | SF Playground Events`,
      description: event.description,
      url: `https://sfplayground.com/events/${normalizedSlug}`,
      type: "website",
    },
  };
}

export default async function EventGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const normalizedSlug = resolvedParams.slug.toLowerCase().trim();
  const event = eventsBySlug[normalizedSlug];

  if (!event) {
    return (
      <div className="relative overflow-x-hidden bg-black min-h-screen">
        <Nav />
        <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-oswald text-white mb-4">
            Event Not Found
          </h1>
          <Link
            href="/#events"
            className="text-[#19f7ea] hover:underline font-oswald"
          >
            Back to Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />
      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 font-oswald transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-oswald font-bold rounded backdrop-blur-sm">
                PAST EVENT
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/70 font-oswald mb-6">
              <span>{event.date}</span>
              <span>•</span>
              <span>{event.location}</span>
              <span>•</span>
              <span>{event.attendees} attendees</span>
            </div>
            <p className="text-white/80 text-lg font-oswald leading-relaxed max-w-3xl">
              {event.description}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-white/20 group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${event.title} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


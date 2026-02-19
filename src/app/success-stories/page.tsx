import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import VideoBackground from "@/component/ui/video-background";
import type { Metadata } from "next";
import siteData from "@/data/site-data.json";

export const metadata: Metadata = {
  title: "Success Stories | SF Playground",
  description: "Discover how startups have transformed their journey through live pitch events at SF Playground. Read success stories from featured startups like Petpin AI.",
  alternates: {
    canonical: "https://sfplayground.com/success-stories",
  },
  openGraph: {
    title: "Success Stories | SF Playground",
    description: "Discover how startups have transformed their journey through live pitch events at SF Playground.",
    url: "https://sfplayground.com/success-stories",
  },
};

const successStories = siteData.successStories;

export default function SuccessStoriesPage() {
  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />
      
      {/* Hero Section with Video Background */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald text-white mb-4">
            Success <span className="text-[#00d5ff]">Stories</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-oswald max-w-2xl mx-auto">
            Discover how startups have transformed their journey through live
            pitch events and real investor feedback.
          </p>
        </div>
      </div>
      
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Success Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <Link
                key={story.slug}
                href={`/success-stories/${story.slug}`}
                className="group relative h-96 rounded-lg overflow-hidden border border-white/20 hover:border-[#00d5ff] transition-all duration-300"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-[#00d5ff] text-black text-xs font-oswald font-bold rounded">
                      SUCCESS STORY
                    </span>
                  </div>
                  <h3 className="text-2xl font-oswald text-white mb-2 group-hover:text-[#00d5ff] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-white/90 font-oswald text-sm mb-3 line-clamp-2">
                    {story.tagline}
                  </p>
                  <p className="text-white/70 text-sm font-oswald line-clamp-2">
                    {story.description}
                  </p>
                  <div className="mt-4 flex items-center text-[#00d5ff] font-oswald text-sm group-hover:translate-x-2 transition-transform">
                    Read Story →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


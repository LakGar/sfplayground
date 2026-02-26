import * as React from "react";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { ArrowRight } from "lucide-react";
import AvatarGroup from "./avatar-group";

// Define the props for the DestinationCard component
interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag: string;
  stats: string;
  href: string;
  themeColor: string; // e.g., "150 50% 25%" for a deep green
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  (
    { className, imageUrl, location, flag, stats, href, themeColor, ...props },
    ref,
  ) => {
    return (
      // The 'group' class enables hover effects on child elements
      <div
        ref={ref}
        style={
          {
            // @ts-ignore - CSS custom properties are valid
            "--theme-color": themeColor,
          } as React.CSSProperties
        }
        className={cn("group w-full h-full", className)}
        {...props}
      >
        <a
          href={href}
          className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out 
                     group-hover:scale-102 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          aria-label={`Explore details for ${location}`}
          style={{
            boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`,
          }}
        >
          {/* Background Image with Parallax Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center 
                       transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Themed Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.9), hsl(var(--theme-color) / 0.6) 30%, transparent 60%)`,
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-6 text-white">
            <h3 className="text-3xl font-bold tracking-tight">
              {location} <span className="text-2xl ml-1">{flag}</span>
            </h3>
            <p className="text-sm text-white/80 mt-1 font-medium">{stats}</p>

            {/* Explore Button */}
            <div
              className="mt-8 flex items-center justify-between bg-white/30 backdrop-blur-md border border-[hsl(var(--theme-color)/0.3)] 
                           rounded-lg px-4 py-3 
                           transition-all duration-300 
                           group-hover:bg-white group-hover:border-[hsl(var(--theme-color)/0.5)]"
            >
              <AvatarGroup
                items={[
                  {
                    id: 2,
                    name: "Jane Smith",
                    designation: "Product Manager",
                    image: "https://randomuser.me/api/portraits/men/61.jpg",
                  },
                  {
                    id: 3,
                    name: "Jim Beam",
                    designation: "Marketing Manager",
                    image: "https://randomuser.me/api/portraits/men/62.jpg",
                  },
                  {
                    id: 4,
                    name: "John Doe",
                    designation: "Software Engineer",
                    image: "https://randomuser.me/api/portraits/men/63.jpg",
                  },
                  {
                    id: 5,
                    name: "John Doe",
                    designation: "Software Engineer",
                    image: "https://randomuser.me/api/portraits/men/64.jpg",
                  },
                  {
                    id: 6,
                    name: "John Doe",
                    designation: "Software Engineer",
                    image: "https://randomuser.me/api/portraits/men/65.jpg",
                  },
                ]}
                maxVisible={5}
                size="md"
              />
              <span className="text-sm font-light tracking-wide text-white group-hover:text-black transition-colors duration-300">
                View Details
              </span>

              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 text-white group-hover:text-black" />
            </div>
          </div>
        </a>
      </div>
    );
  },
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };

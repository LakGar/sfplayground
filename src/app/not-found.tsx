import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-oswald font-bold text-[#00d5ff] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-oswald text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-white/70 font-oswald mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#00d5ff] text-black px-8 py-3 rounded-md font-oswald font-bold hover:bg-[#00d5ff]/90 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}


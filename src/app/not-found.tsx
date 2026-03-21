import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="text-center">
        <h1 className="mb-4 font-oswald text-6xl font-bold text-white md:text-8xl">
          404
        </h1>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-4xl">
          Page Not Found
        </h2>
        <p className="mx-auto mb-8 max-w-md text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-white/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

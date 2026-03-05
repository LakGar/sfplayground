"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SEGMENT_LABELS: Record<string, string> = {
  admin: "Dashboard",
  subscribers: "Subscribers",
  blog: "Blog",
  newsletters: "Newsletters",
  sends: "Send history",
  "next-event": "Next event",
  events: "Past events",
  "success-stories": "Success stories",
  website: "Edit website",
  new: "New",
  edit: "Edit",
  send: "Send",
};

function buildBreadcrumbs(pathname: string): { label: string; href: string | null }[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [];
  const crumbs: { label: string; href: string | null }[] = [];
  let pathSoFar = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const isNumeric = /^\d+$/.test(seg);
    if (isNumeric) {
      pathSoFar += `/${seg}`;
      continue;
    }
    pathSoFar += (pathSoFar ? "/" : "") + seg;
    const label = SEGMENT_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
    const isLast = i === segments.length - 1;
    const href = isLast ? null : `/${pathSoFar}`;
    crumbs.push({ label, href });
  }
  return crumbs;
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignIn = pathname === "/admin/signin";

  if (isSignIn) {
    return <>{children}</>;
  }

  const breadcrumbs = buildBreadcrumbs(pathname);

  const linkClass = (href: string, exact = false) => {
    const active =
      exact
        ? pathname === href || pathname === href + "/"
        : pathname.startsWith(href);
    return [
      "font-oswald text-sm py-2 rounded px-2 -mx-2",
      active
        ? "text-[#19f7ea] bg-white/10"
        : "text-white/80 hover:text-white",
    ].join(" ");
  };

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-56 shrink-0 border-r border-white/10 p-4 flex flex-col">
        <Link
          href="/admin"
          className="text-lg font-oswald font-bold text-[#19f7ea] mb-6"
        >
          SF Admin
        </Link>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className={linkClass("/admin", true)}>
            Dashboard
          </Link>
          <Link href="/admin/subscribers" className={linkClass("/admin/subscribers")}>
            Subscribers
          </Link>
          <Link href="/admin/blog" className={linkClass("/admin/blog")}>
            Blog
          </Link>
          <Link href="/admin/newsletters" className={linkClass("/admin/newsletters", true)}>
            Newsletters
          </Link>
          <Link href="/admin/newsletters/sends" className={`pl-4 ${linkClass("/admin/newsletters/sends")}`}>
            Send history
          </Link>
          <Link href="/admin/next-event" className={linkClass("/admin/next-event")}>
            Next event
          </Link>
          <Link href="/admin/events" className={linkClass("/admin/events")}>
            Past events
          </Link>
          <Link href="/admin/success-stories" className={linkClass("/admin/success-stories")}>
            Success stories
          </Link>
          <Link href="/admin/website" className={linkClass("/admin/website")}>
            Edit website
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <form action="/api/auth/signout" method="POST" className="contents">
            <button
              type="submit"
              className="text-white/60 hover:text-white text-sm font-oswald text-left"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {breadcrumbs.length > 0 && (
          <nav className="font-oswald text-sm text-white/60 mb-4" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                {i > 0 && " / "}
                {crumb.href != null ? (
                  <Link href={crumb.href} className="text-[#19f7ea] hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {children}
      </main>
    </div>
  );
}

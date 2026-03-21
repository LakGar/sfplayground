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
  const currentPageLabel =
    breadcrumbs.length > 0
      ? breadcrumbs[breadcrumbs.length - 1]?.label
      : "Dashboard";
  const shouldWrapChildren = !pathname.startsWith("/admin/website");

  const linkClass = (href: string, exact = false) => {
    const active =
      exact
        ? pathname === href || pathname === href + "/"
        : pathname.startsWith(href);
    return [
      "w-full flex items-center font-oswald text-sm px-3 py-2 rounded-xl border transition-colors",
      active
        ? "text-white border-white/20 bg-white/10"
        : "text-white/75 border-transparent hover:text-white hover:bg-white/5 hover:border-white/10",
    ].join(" ");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 shrink-0 border-r border-white/10 p-5 flex flex-col bg-black/40 backdrop-blur">
        <Link href="/admin" className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200 shadow-[0_0_20px_rgba(148,163,184,0.35)]" />
          <span className="text-lg font-oswald font-bold text-slate-200">
            SF Admin
          </span>
        </Link>
        <nav className="flex flex-col gap-1">
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
          <Link
            href="/admin/newsletters/sends"
            className={`pl-8 ${linkClass("/admin/newsletters/sends")}`}
          >
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
              className="text-white/60 hover:text-white text-sm font-oswald text-left w-full py-2"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 md:p-8 bg-[radial-gradient(ellipse_at_top_left,rgba(148,163,184,0.12),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_40%)]">
        {breadcrumbs.length > 0 && (
          <div className="mb-5">
            <h1 className="font-oswald text-2xl font-bold text-white">
              {currentPageLabel}
            </h1>
            <nav
              className="mt-2 flex flex-wrap items-center gap-2 font-oswald text-sm text-white/55"
              aria-label="Breadcrumb"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  {i > 0 && <span className="text-white/25">/</span>}
                  {crumb.href != null ? (
                    <Link
                      href={crumb.href}
                      className="text-slate-200 hover:underline underline-offset-4"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        )}

        {shouldWrapChildren ? (
          <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur p-6">
            {children}
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

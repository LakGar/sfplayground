import Link from "next/link";
import {
  getSubscribers,
  getBlogPosts,
  getNewsletterDrafts,
  getNewsletterSendsCount,
  getLatestNewsletterSend,
  getNextEvent,
  getEvents,
  getSuccessStories,
} from "@/lib/db";

export const dynamic = "force-dynamic";

function relativeTime(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const sec = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const week = Math.floor(day / 7);
  if (week < 4) return `${week}w ago`;
  return d.toLocaleDateString();
}

export default async function AdminDashboardPage() {
  const [
    subscribers,
    allPosts,
    drafts,
    sendsCount,
    latestSend,
    nextEvent,
    events,
    successStories,
  ] = await Promise.all([
    getSubscribers(),
    getBlogPosts(false),
    getNewsletterDrafts(),
    getNewsletterSendsCount(),
    getLatestNewsletterSend(),
    getNextEvent(),
    getEvents(),
    getSuccessStories(),
  ]);

  const publishedPosts = allPosts.filter((p) => p.published_at);
  const draftPosts = allPosts.filter((p) => !p.published_at);
  const latestPost = allPosts[0];
  const latestDraft = drafts[0];
  const latestSub = subscribers[0];

  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-2">
        Dashboard
      </h1>
      <p className="text-white/60 mb-8">
        Overview of your content and audience. Manage everything from the links below.
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-3xl font-oswald font-bold text-white tabular-nums">
            {subscribers.length}
          </p>
          <p className="text-white/60 text-sm font-oswald mt-0.5">Subscribers</p>
          {latestSub && (
            <p className="text-white/40 text-xs mt-2">
              Latest: {relativeTime(latestSub.subscribed_at)}
            </p>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-3xl font-oswald font-bold text-white tabular-nums">
            {publishedPosts.length}
          </p>
          <p className="text-white/60 text-sm font-oswald mt-0.5">Published posts</p>
          {draftPosts.length > 0 && (
            <p className="text-white/40 text-xs mt-2">
              {draftPosts.length} draft{draftPosts.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-3xl font-oswald font-bold text-white tabular-nums">
            {drafts.length}
          </p>
          <p className="text-white/60 text-sm font-oswald mt-0.5">Newsletter drafts</p>
          {latestDraft && (
            <p className="text-white/40 text-xs mt-2 truncate" title={latestDraft.subject}>
              Latest: {latestDraft.subject}
            </p>
          )}
        </div>
        <Link
          href="/admin/newsletters/sends"
          className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-white/20 transition-colors block"
        >
          <p className="text-3xl font-oswald font-bold text-white tabular-nums">
            {sendsCount}
          </p>
          <p className="text-white/60 text-sm font-oswald mt-0.5">Newsletters sent</p>
          {latestSend && (
            <p className="text-white/40 text-xs mt-2">
              Last: {relativeTime(latestSend.sent_at)} · {latestSend.subscriber_count} recipients
            </p>
          )}
          <span className="text-[#19f7ea] text-xs font-oswald mt-2 inline-block">
            View history →
          </span>
        </Link>
      </div>

      {/* Quick info: next event */}
      {nextEvent && (
        <div className="rounded-xl border border-[#19f7ea]/20 bg-[#19f7ea]/5 p-4 mb-8">
          <p className="text-white/70 text-sm font-oswald mb-1">Next event (hero)</p>
          <p className="font-oswald font-bold text-white text-lg">{nextEvent.title}</p>
          <p className="text-white/60 text-sm mt-1">
            {nextEvent.date}
            {nextEvent.time ? ` · ${nextEvent.time}` : ""} · {nextEvent.location}
          </p>
          <Link
            href="/admin/next-event"
            className="inline-block mt-3 text-[#19f7ea] font-oswald text-sm hover:underline"
          >
            Edit next event →
          </Link>
        </div>
      )}

      {/* Section: Content & audience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/subscribers"
          className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors group"
        >
          <span className="font-oswald font-bold text-white group-hover:text-[#19f7ea] transition-colors">
            Subscribers
          </span>
          <p className="text-white/50 text-sm mt-1">
            {subscribers.length} newsletter signup{subscribers.length !== 1 ? "s" : ""}. Export or manage list.
          </p>
          <span className="text-white/40 text-xs mt-2 inline-block">View list →</span>
        </Link>

        <Link
          href="/admin/blog"
          className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors group"
        >
          <span className="font-oswald font-bold text-white group-hover:text-[#19f7ea] transition-colors">
            Blog
          </span>
          <p className="text-white/50 text-sm mt-1">
            {publishedPosts.length} live, {draftPosts.length} draft{draftPosts.length !== 1 ? "s" : ""}.
            {latestPost && (
              <span className="block mt-1 text-white/40">Latest: {latestPost.title}</span>
            )}
          </p>
          <span className="text-white/40 text-xs mt-2 inline-block">Write & manage posts →</span>
        </Link>

        <Link
          href="/admin/newsletters"
          className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors group"
        >
          <span className="font-oswald font-bold text-white group-hover:text-[#19f7ea] transition-colors">
            Newsletters
          </span>
          <p className="text-white/50 text-sm mt-1">
            {drafts.length} draft{drafts.length !== 1 ? "s" : ""}, {sendsCount} send{sendsCount !== 1 ? "s" : ""} so far. Draft with AI, then send via Resend.
          </p>
          <span className="text-white/40 text-xs mt-2 inline-block">Draft & send →</span>
        </Link>

        <Link
          href="/admin/next-event"
          className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors group"
        >
          <span className="font-oswald font-bold text-white group-hover:text-[#19f7ea] transition-colors">
            Next event
          </span>
          <p className="text-white/50 text-sm mt-1">
            Hero block on the homepage. Title, date, time, location, CTA.
          </p>
          <span className="text-white/40 text-xs mt-2 inline-block">Edit hero →</span>
        </Link>

        <Link
          href="/admin/events"
          className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors group"
        >
          <span className="font-oswald font-bold text-white group-hover:text-[#19f7ea] transition-colors">
            Past events
          </span>
          <p className="text-white/50 text-sm mt-1">
            {events.length} event{events.length !== 1 ? "s" : ""} in the archive. Edit titles, dates, photos.
          </p>
          <span className="text-white/40 text-xs mt-2 inline-block">Manage events →</span>
        </Link>

        <Link
          href="/admin/success-stories"
          className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors group"
        >
          <span className="font-oswald font-bold text-white group-hover:text-[#19f7ea] transition-colors">
            Success stories
          </span>
          <p className="text-white/50 text-sm mt-1">
            {successStories.length} stor{successStories.length === 1 ? "y" : "ies"}. Case studies and founder quotes.
          </p>
          <span className="text-white/40 text-xs mt-2 inline-block">Edit stories →</span>
        </Link>

        <Link
          href="/admin/website"
          className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors group"
        >
          <span className="font-oswald font-bold text-white group-hover:text-[#19f7ea] transition-colors">
            Edit website
          </span>
          <p className="text-white/50 text-sm mt-1">
            Visual editor for all pages. Copy, sections, and key-value content.
          </p>
          <span className="text-white/40 text-xs mt-2 inline-block">Open editor →</span>
        </Link>
      </div>
    </div>
  );
}

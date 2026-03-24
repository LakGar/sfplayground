"use client";

import type { Subscriber } from "@/lib/db";

export function SubscribersList({
  subscribers,
}: {
  subscribers: Subscriber[];
}) {
  if (subscribers.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/60 font-oswald">
        No subscribers yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
              Email
            </th>
            <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
              Name
            </th>
            <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
              Subscribed
            </th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s) => (
            <tr
              key={s.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="px-4 py-3 text-white font-oswald text-sm">
                <a
                  href={`mailto:${s.email}`}
                  className="hover:text-slate-200 transition-colors"
                >
                  {s.email}
                </a>
              </td>
              <td className="px-4 py-3 text-white/70 text-sm">
                {s.name ?? "—"}
              </td>
              <td className="px-4 py-3 text-white/50 text-sm">
                {new Date(s.subscribed_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

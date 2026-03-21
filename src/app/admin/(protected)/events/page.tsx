import { getEvents } from "@/lib/db";
import Link from "next/link";
import { DeleteEventButton } from "@/component/admin/DeleteEventButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await getEvents();
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-start sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-oswald text-xl font-bold text-white">
              Past events
            </h1>
            <p className="text-white/60 text-sm">
              Manage past events. Edit title, date, cover image, description, and
              gallery images.
            </p>
          </div>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center justify-center w-fit px-4 py-2 rounded-lg bg-slate-200 text-slate-900 font-oswald font-bold text-sm hover:bg-white transition-colors"
          >
            New event
          </Link>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="p-8 text-center text-white/60 font-oswald">
          No events yet. Create one or import from site-data.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Title
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Slug
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Date
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-white font-oswald text-sm">
                    {e.title}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm font-mono">
                    {e.slug}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm">
                    {e.date}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/events/${e.id}/edit`}
                        className="text-slate-200 hover:underline font-oswald text-sm"
                    >
                      Edit
                    </Link>
                    {" · "}
                    <a
                      href={`/events/${e.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:underline text-sm"
                    >
                      View
                    </a>
                    <DeleteEventButton id={e.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

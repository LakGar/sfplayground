import { DeleteNewsletterDraftButton } from "@/app/admin/(protected)/newsletters/DeleteNewsletterDraftButton";
import { getLatestSendPerDraftId, getNewsletterDrafts } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminNewslettersPage() {
  const [drafts, latestSendByDraftId] = await Promise.all([
    getNewsletterDrafts(),
    getLatestSendPerDraftId(),
  ]);
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-oswald font-bold text-white">
          Newsletters
        </h1>
        <Link
          href="/admin/newsletters/new"
          className="inline-flex items-center justify-center w-fit px-4 py-2 rounded-lg bg-slate-200 text-slate-900 font-oswald font-bold text-sm hover:bg-white transition-colors"
        >
          New draft
        </Link>
      </div>
      <p className="text-white/60 text-sm mb-6">
        Draft newsletters and send to all subscribers.
      </p>
      {drafts.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/60 font-oswald">
          No drafts yet. Create one to get started.
        </div>
      ) : (
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Subject
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Sent
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Updated
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-white font-oswald text-sm">
                    {d.subject}
                  </td>
                  <td className="px-4 py-3 text-white/50 text-sm font-oswald">
                    {(() => {
                      const last = latestSendByDraftId.get(d.id);
                      if (!last) return "No";
                      const date = new Date(last.sent_at).toLocaleDateString();
                      return `Yes – ${date} (${last.subscriber_count} recipients)`;
                    })()}
                  </td>
                  <td className="px-4 py-3 text-white/50 text-sm">
                    {new Date(d.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/newsletters/${d.id}/edit`}
                      className="text-slate-200 hover:underline font-oswald text-sm"
                    >
                      Edit
                    </Link>
                    {" · "}
                    <Link
                      href={`/admin/newsletters/${d.id}/send`}
                      className="text-white/80 hover:text-slate-200 font-oswald text-sm"
                    >
                      Send
                    </Link>
                    {" · "}
                    <DeleteNewsletterDraftButton id={d.id} />
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


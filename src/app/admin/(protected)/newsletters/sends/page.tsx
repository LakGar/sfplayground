import { getNewsletterSendsHistory } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterSendsPage() {
  const sends = await getNewsletterSendsHistory();
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-2">
        Send history
      </h1>
      <p className="text-white/60 text-sm mb-6">
        Past newsletter sends with draft subject and recipient count.
      </p>
      {sends.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/60 font-oswald">
          No sends yet.
        </div>
      ) : (
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Sent at
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Subject
                </th>
                <th className="px-4 py-3 font-oswald text-white/80 text-sm font-bold">
                  Recipients
                </th>
              </tr>
            </thead>
            <tbody>
              {sends.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-white/80 text-sm">
                    {new Date(s.sent_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-white font-oswald text-sm">
                    {s.subject ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-white/80 text-sm tabular-nums">
                    {s.subscriber_count}
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

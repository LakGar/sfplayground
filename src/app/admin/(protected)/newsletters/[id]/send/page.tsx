import { getNewsletterDraftById } from "@/lib/db";
import { getSubscribers } from "@/lib/db";
import { notFound } from "next/navigation";
import { SendNewsletterButton } from "./SendNewsletterButton";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterSendPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const draft = await getNewsletterDraftById(Number(id));
  if (!draft) notFound();
  const subscribers = await getSubscribers();
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        Send newsletter
      </h1>
      <div className="max-w-xl space-y-4">
        <p className="text-white/80 font-oswald">
          <strong>Subject:</strong> {draft.subject}
        </p>
        <p className="text-white/60 text-sm font-oswald">
          Choose recipients below. If none are selected, it sends to all{" "}
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}.
        </p>
        {subscribers.length === 0 ? (
          <p className="text-amber-400/90 text-sm font-oswald">
            No subscribers. Add some from the newsletter signup on the site first.
          </p>
        ) : (
          <SendNewsletterButton draftId={draft.id} subscribers={subscribers} />
        )}
      </div>
    </div>
  );
}

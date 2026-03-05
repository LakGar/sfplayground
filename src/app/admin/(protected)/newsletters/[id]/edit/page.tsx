import { getNewsletterDraftById } from "@/lib/db";
import { notFound } from "next/navigation";
import { NewsletterDraftForm } from "../../NewsletterDraftForm";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const draft = await getNewsletterDraftById(Number(id));
  if (!draft) notFound();
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        Edit: {draft.subject}
      </h1>
      <NewsletterDraftForm draft={draft} />
    </div>
  );
}

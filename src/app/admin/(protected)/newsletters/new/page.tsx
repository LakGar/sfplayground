import { NewsletterDraftForm } from "../NewsletterDraftForm";

export const dynamic = "force-dynamic";

export default function AdminNewsletterNewPage() {
  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        New draft
      </h1>
      <NewsletterDraftForm />
    </div>
  );
}

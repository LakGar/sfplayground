import { redirect } from "next/navigation";

import { AdminAiDraftsPage } from "@/components/admin-ai-drafts-page";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminShell } from "@/components/admin-shell";
import { isFounderAdmin } from "@/lib/admin-access";
import { getSession } from "@/lib/admin-auth";

export const metadata = {
  title: "AI Drafts | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function AiDraftsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");
  if (session.passwordChangeRequired) redirect("/admin/change-password");
  if (!isFounderAdmin(session)) redirect("/admin/relationships");

  return (
    <AdminShell session={session}>
      <AdminPageHeader
        title="AI Drafts"
        description="Generate newsletter HTML or blog Markdown drafts from a starting point."
      />
      <AdminAiDraftsPage />
    </AdminShell>
  );
}

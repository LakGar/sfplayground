import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminShell } from "@/components/admin-shell";
import { AdminWorkspace } from "@/components/admin-workspace";
import { getAuditLog } from "@/lib/admin-audit";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData } from "@/lib/admin-crm";
import { getBlogPosts, getNewsletterDrafts, getSubscribers } from "@/lib/db";

export const metadata = {
  title: "SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  const [crm, posts, drafts, subscribers, audit] = await Promise.all([
    getAdminCrmData(),
    getBlogPosts(false),
    getNewsletterDrafts(),
    getSubscribers(),
    getAuditLog(),
  ]);

  return (
    <AdminShell>
      <AdminPageHeader
        title="Command Center"
        description="High-level SFPlayground metrics, publishing tools, newsletters, and audit trail."
      />
          <AdminWorkspace
            session={session}
            stats={crm.stats}
            chart={crm.chart}
            records={crm.records}
            posts={posts.map((post) => ({
              ...post,
              published_at: post.published_at?.toISOString() ?? null,
              updated_at: post.updated_at.toISOString().slice(0, 10),
              created_at: post.created_at.toISOString(),
            }))}
            drafts={drafts.map((draft) => ({
              ...draft,
              updated_at: draft.updated_at.toISOString().slice(0, 10),
              created_at: draft.created_at.toISOString(),
            }))}
            subscribers={subscribers.map((subscriber) => ({
              id: subscriber.id,
              email: subscriber.email,
              name: subscriber.name,
            }))}
            audit={audit.map((item) => ({
              ...item,
              created_at: item.created_at.toISOString(),
            }))}
          />
    </AdminShell>
  );
}

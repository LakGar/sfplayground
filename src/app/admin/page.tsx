import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminShell } from "@/components/admin-shell";
import { AdminWorkspace } from "@/components/admin-workspace";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { getAuditLog } from "@/lib/admin-audit";
import { buildCrmStats, filterCrmRecordsForSession, isFounderAdmin } from "@/lib/admin-access";
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
  if (session.passwordChangeRequired) redirect("/admin/change-password");

  if (!isFounderAdmin(session)) {
    const crm = await getAdminCrmData();
    const records = filterCrmRecordsForSession(crm.records, session);
    const summary = buildCrmStats(records, { employeeName: session.name });

    return (
      <AdminShell session={session}>
        <AdminPageHeader
          title="My Dashboard"
          description="Your assigned relationships, priority work, and CRM growth over time."
        />
        <div className="@container/main flex min-w-0 max-w-full flex-1 flex-col gap-5 overflow-hidden py-4 md:py-6">
          <SectionCards stats={summary.stats} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive data={summary.chart} />
          </div>
          <div className="grid min-w-0 max-w-full gap-4 overflow-hidden pb-8 pt-2">
            <DataTable
              data={records.slice(0, 50)}
              session={session}
              serverPageSize={50}
              serverTotalRecords={records.length}
            />
          </div>
        </div>
      </AdminShell>
    );
  }

  const [crm, posts, drafts, subscribers, audit] = await Promise.all([
    getAdminCrmData(),
    getBlogPosts(false),
    getNewsletterDrafts(),
    getSubscribers(),
    getAuditLog(),
  ]);

  return (
    <AdminShell session={session}>
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

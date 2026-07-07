import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminRecordsPage } from "@/components/admin-records-page";
import { AdminShell } from "@/components/admin-shell";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData } from "@/lib/admin-crm";

export const metadata = {
  title: "Startup Pipeline | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function StartupPipelinePage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  const crm = await getAdminCrmData();

  return (
    <AdminShell>
      <AdminPageHeader
        title="Startup Pipeline"
        description="Founder applications, pitch candidates, outreach status, funding stages, and next steps."
      />
      <AdminRecordsPage records={crm.records} category="Startup" />
    </AdminShell>
  );
}

import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminRecordsPage } from "@/components/admin-records-page";
import { AdminShell } from "@/components/admin-shell";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData } from "@/lib/admin-crm";

export const metadata = {
  title: "Sponsor Pipeline | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function SponsorPipelinePage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  const crm = await getAdminCrmData();

  return (
    <AdminShell>
      <AdminPageHeader
        title="Sponsor Pipeline"
        description="Sponsor relationships, partner leads, and sponsorship outreach records."
      />
      <AdminRecordsPage records={crm.records} category="Sponsor" />
    </AdminShell>
  );
}


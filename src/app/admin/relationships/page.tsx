import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminRecordsPage } from "@/components/admin-records-page";
import { AdminShell } from "@/components/admin-shell";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData } from "@/lib/admin-crm";

export const metadata = {
  title: "Relationships | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function RelationshipsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  const crm = await getAdminCrmData();

  return (
    <AdminShell>
      <AdminPageHeader
        title="Relationships"
        description="All startup, investor, sponsor, operator, and subscriber records in one CRM view."
      />
      <AdminRecordsPage records={crm.records} />
    </AdminShell>
  );
}


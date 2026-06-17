import { redirect } from "next/navigation";

import { AdminOutreachPage } from "@/components/admin-outreach-page";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminShell } from "@/components/admin-shell";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData } from "@/lib/admin-crm";

export const metadata = {
  title: "Outreach | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function OutreachPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  const crm = await getAdminCrmData();

  return (
    <AdminShell>
      <AdminPageHeader
        title="Outreach"
        description="Choose the exact audience type, stage, and source before composing outreach."
      />
      <AdminOutreachPage records={crm.records} />
    </AdminShell>
  );
}


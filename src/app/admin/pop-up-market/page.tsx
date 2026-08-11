import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminRecordsPage } from "@/components/admin-records-page";
import { AdminShell } from "@/components/admin-shell";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData } from "@/lib/admin-crm";

export const metadata = {
  title: "Pop-up Market | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function PopUpMarketAdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  const crm = await getAdminCrmData();

  return (
    <AdminShell>
      <AdminPageHeader
        title="Pop-up Market"
        description="Physical product startup applications, booth approvals, product links, and $500 booth follow-up."
      />
      <AdminRecordsPage
        records={crm.records}
        category="Startup"
        source="Pop-up market intake"
      />
    </AdminShell>
  );
}

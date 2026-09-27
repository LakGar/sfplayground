import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminRecordsPage } from "@/components/admin-records-page";
import { AdminShell } from "@/components/admin-shell";
import { isFounderAdmin } from "@/lib/admin-access";
import { getSession } from "@/lib/admin-auth";
import { getAdminCrmData } from "@/lib/admin-crm";

export const metadata = {
  title: "Investor Network | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function InvestorNetworkPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");
  if (session.passwordChangeRequired) redirect("/admin/change-password");
  if (!isFounderAdmin(session)) redirect("/admin");

  const crm = await getAdminCrmData();

  return (
    <AdminShell session={session}>
      <AdminPageHeader
        title="Investor Network"
        description="Investor relationships, VC intake records, and warm-intro pipeline."
      />
      <AdminRecordsPage records={crm.records} session={session} category="Investor" />
    </AdminShell>
  );
}

import { redirect } from "next/navigation";

import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminShell } from "@/components/admin-shell";
import { AdminWebsiteContentPage } from "@/components/admin-website-content-page";
import { getSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Website Content | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function WebsiteContentPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  return (
    <AdminShell>
      <AdminPageHeader
        title="Website Content"
        description="Edit public website titles, sections, image URLs, and video URLs from one place."
      />
      <AdminWebsiteContentPage />
    </AdminShell>
  );
}

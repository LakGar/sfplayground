import { redirect } from "next/navigation";

import { AdminEventsPage } from "@/components/admin-events-page";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminShell } from "@/components/admin-shell";
import { getSession } from "@/lib/admin-auth";
import { getEvents, getNextEvent } from "@/lib/db";

export const metadata = {
  title: "Events | SFPlayground",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/signin");

  const [events, nextEvent] = await Promise.all([getEvents(), getNextEvent()]);

  return (
    <AdminShell>
      <AdminPageHeader
        title="Events"
        description="Next event and past event records from the live database."
      />
      <AdminEventsPage events={events} nextEvent={nextEvent} />
    </AdminShell>
  );
}


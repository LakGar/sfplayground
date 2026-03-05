import { getSubscribers } from "@/lib/db";
import { SubscribersPageClient } from "./SubscribersPageClient";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-oswald font-bold text-white">
          Subscribers
        </h1>
        <a
          href="/api/admin/subscribers/export"
          className="inline-flex items-center justify-center w-fit px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 font-oswald text-sm"
        >
          Export CSV
        </a>
      </div>
      <p className="text-white/60 text-sm mb-6">
        {subscribers.length} newsletter signup{subscribers.length !== 1 ? "s" : ""}.
      </p>
      <SubscribersPageClient subscribers={subscribers} />
    </div>
  );
}

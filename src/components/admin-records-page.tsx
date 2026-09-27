import { DataTable } from "@/components/data-table";
import { filterCrmRecordsForSession } from "@/lib/admin-access";
import type { AdminSession } from "@/lib/admin-auth";
import type { CrmCategory, CrmRecord } from "@/lib/admin-crm-types";

const INITIAL_PAGE_SIZE = 50;

export function AdminRecordsPage({
  records,
  session,
  category,
  source,
}: {
  records: CrmRecord[];
  session: AdminSession;
  category?: CrmCategory;
  source?: string;
}) {
  const visibleRecords = filterCrmRecordsForSession(records, session);
  const scopedRecords = visibleRecords.filter((record) => {
    if (category && record.category !== category) return false;
    if (source && record.source !== source) return false;
    return true;
  });
  const firstPage = scopedRecords.slice(0, INITIAL_PAGE_SIZE);

  return (
    <div className="grid min-w-0 max-w-full gap-4 overflow-hidden pb-8 pt-2">
      <DataTable
        data={firstPage}
        session={session}
        serverPageSize={INITIAL_PAGE_SIZE}
        serverTotalRecords={scopedRecords.length}
        serverCategory={category}
        serverSource={source}
      />
    </div>
  );
}

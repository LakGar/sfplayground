import { DataTable } from "@/components/data-table";
import type { CrmCategory, CrmRecord } from "@/lib/admin-crm-types";

export function AdminRecordsPage({
  records,
  category,
  source,
}: {
  records: CrmRecord[];
  category?: CrmCategory;
  source?: string;
}) {
  const scopedRecords = records.filter((record) => {
    if (category && record.category !== category) return false;
    if (source && record.source !== source) return false;
    return true;
  });

  return (
    <div className="grid min-w-0 max-w-full gap-4 overflow-hidden pb-8 pt-2">
      <DataTable data={scopedRecords} />
    </div>
  );
}

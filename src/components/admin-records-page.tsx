import { DataTable } from "@/components/data-table";
import type { CrmCategory, CrmRecord } from "@/lib/admin-crm-types";

export function AdminRecordsPage({
  records,
  category,
}: {
  records: CrmRecord[];
  category?: CrmCategory;
}) {
  const scopedRecords = category
    ? records.filter((record) => record.category === category)
    : records;

  return (
    <div className="grid min-w-0 max-w-full gap-4 overflow-hidden pb-8 pt-2">
      <DataTable data={scopedRecords} />
    </div>
  );
}

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
    <div className="pb-6">
      <DataTable data={scopedRecords} />
    </div>
  );
}


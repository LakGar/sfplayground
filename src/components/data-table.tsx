"use client";

import * as React from "react";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  CircleDashed,
  Columns3,
  ExternalLink,
  MoreVertical,
  Plus,
  Search,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import type { CrmCategory, CrmPriority, CrmRecord, CrmStage } from "@/lib/admin-crm-types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories: Array<"All" | CrmCategory> = [
  "All",
  "Startup",
  "Investor",
  "Sponsor",
  "Operator",
  "Subscriber",
];

const stages: CrmStage[] = [
  "New",
  "Review",
  "Qualified",
  "Intro ready",
  "Follow-up",
  "Closed",
];

const priorities: CrmPriority[] = ["High", "Medium", "Low"];

type NewRecordForm = {
  category: Exclude<CrmCategory, "Subscriber">;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  stage: CrmStage;
  priority: CrmPriority;
  owner: string;
  value: string;
  nextStep: string;
  notes: string;
  tags: string;
};

const emptyNewRecordForm: NewRecordForm = {
  category: "Startup",
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  stage: "New",
  priority: "Medium",
  owner: "Staff",
  value: "",
  nextStep: "",
  notes: "",
  tags: "",
};

function priorityVariant(priority: CrmPriority): "default" | "secondary" | "outline" {
  if (priority === "High") return "default";
  if (priority === "Medium") return "secondary";
  return "outline";
}

function stageIcon(stage: CrmStage) {
  if (stage === "Closed" || stage === "Intro ready") return CircleCheck;
  return CircleDashed;
}

function filterData(data: CrmRecord[], category: string) {
  if (category === "All") return data;
  return data.filter((item) => item.category === category);
}

const columns: ColumnDef<CrmRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <Button variant="ghost" size="sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Relationship
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <RelationshipViewer item={row.original} />,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const Icon = stageIcon(row.original.stage);
      return (
        <Badge variant="secondary" className="px-1.5">
          <Icon />
          {row.original.stage}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge variant={priorityVariant(row.original.priority)}>{row.original.priority}</Badge>
    ),
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => <span className="font-medium">{row.original.value}</span>,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => row.original.owner,
  },
  {
    accessorKey: "nextStep",
    header: "Next step",
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-[280px] text-muted-foreground">
        {row.original.nextStep}
      </span>
    ),
  },
  {
    accessorKey: "updated",
    header: "Updated",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 text-muted-foreground" size="icon">
            <MoreVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                window.open(
                  `mailto:${row.original.email}?subject=${encodeURIComponent(
                    `Following up from SFPlayground`,
                  )}`,
                  "_self",
                );
              }}
            >
              <Send />
              Send follow-up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const url = row.original.website || row.original.links[0]?.url;
                if (url) window.open(url, "_blank", "noopener,noreferrer");
                else toast.info("No profile link is available for this record.");
              }}
            >
              <ExternalLink />
              Open profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              if (confirm(`Archive ${row.original.company}?`)) {
                window.dispatchEvent(
                  new CustomEvent("admin:archive-record", { detail: { id: row.original.id } }),
                );
              }
            }}
          >
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTable({ data: initialData }: { data: CrmRecord[] }) {
  const [records, setRecords] = React.useState(initialData);
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [newRecordOpen, setNewRecordOpen] = React.useState(false);
  const [newRecordForm, setNewRecordForm] = React.useState<NewRecordForm>(emptyNewRecordForm);
  const [isCreatingRecord, setIsCreatingRecord] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const data = React.useMemo(
    () => filterData(records, activeCategory),
    [activeCategory, records],
  );
  const recordsRef = React.useRef(records);
  const dataRef = React.useRef(data);

  React.useEffect(() => {
    setRecords(initialData);
  }, [initialData]);

  React.useEffect(() => {
    recordsRef.current = records;
    dataRef.current = data;
  }, [data, records]);

  React.useEffect(() => {
    if (window.sessionStorage.getItem("sfpg-open-new-record") === "1") {
      window.sessionStorage.removeItem("sfpg-open-new-record");
      setNewRecordOpen(true);
    }
  }, []);

  const updateNewRecordForm = (key: keyof NewRecordForm, value: string) => {
    setNewRecordForm((current) => ({ ...current, [key]: value }));
  };

  const createRecord = React.useCallback(async () => {
    if (!newRecordForm.company.trim()) {
      toast.error("Company is required.");
      return;
    }

    setIsCreatingRecord(true);
    try {
      const response = await fetch("/api/admin/crm-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecordForm),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Could not create CRM record.");
      }
      setRecords((current) => [result as CrmRecord, ...current]);
      setNewRecordForm(emptyNewRecordForm);
      setNewRecordOpen(false);
      toast.success("CRM record saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create CRM record.");
    } finally {
      setIsCreatingRecord(false);
    }
  }, [newRecordForm]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  React.useEffect(() => {
    const exportCsv = () => {
      const headers = [
        "company",
        "name",
        "category",
        "email",
        "phone",
        "stage",
        "priority",
        "value",
        "source",
        "updated",
        "nextStep",
      ];
      const csv = [
        headers.join(","),
        ...recordsRef.current.map((record) =>
          headers
            .map((header) => {
              const value = String(record[header as keyof CrmRecord] ?? "");
              return `"${value.replace(/"/g, '""')}"`;
            })
            .join(","),
        ),
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "sfplayground-crm.csv";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("CRM export downloaded.");
    };

    const openNewRecordForm = () => setNewRecordOpen(true);

    const outreachSelected = () => {
      const selected = table.getFilteredSelectedRowModel().rows.map((row) => row.original);
      const targets = selected.length > 0 ? selected : dataRef.current.slice(0, 20);
      const emails = targets.map((record) => record.email).filter(Boolean);
      if (emails.length === 0) {
        toast.error("No email addresses available for outreach.");
        return;
      }
      window.open(
        `mailto:${emails.join(",")}?subject=${encodeURIComponent(
          "SFPlayground follow-up",
        )}`,
        "_self",
      );
    };

    const archiveRecord = (event: Event) => {
      const id = (event as CustomEvent<{ id: number }>).detail?.id;
      setRecords((current) => current.filter((record) => record.id !== id));
      toast.success("Record archived locally.");
    };

    const settings = () => toast.info("CRM settings are controlled by database tables and environment variables.");

    window.addEventListener("admin:export-crm", exportCsv);
    window.addEventListener("admin:new-record", openNewRecordForm);
    window.addEventListener("admin:outreach", outreachSelected);
    window.addEventListener("admin:archive-record", archiveRecord);
    window.addEventListener("admin:settings", settings);
    return () => {
      window.removeEventListener("admin:export-crm", exportCsv);
      window.removeEventListener("admin:new-record", openNewRecordForm);
      window.removeEventListener("admin:outreach", outreachSelected);
      window.removeEventListener("admin:archive-record", archiveRecord);
      window.removeEventListener("admin:settings", settings);
    };
  }, [table]);

  return (
    <>
    <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full flex-col gap-6">
      <div className="flex flex-col gap-3 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <Label htmlFor="crm-search" className="sr-only">
            Search CRM
          </Label>
          <div className="relative w-full lg:w-[340px]">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input
              id="crm-search"
              placeholder="Search companies, people, notes..."
              value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("company")?.setFilterValue(event.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-36 @4xl/main:hidden" size="sm" aria-label="Select CRM view">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-2">
          <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
                <Badge variant="secondary">{filterData(records, category).length}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3 />
                <span className="hidden lg:inline">Columns</span>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            onClick={() => setNewRecordOpen(true)}
          >
            <Plus />
            <span className="hidden lg:inline">Add relationship</span>
            <span className="lg:hidden">Add</span>
          </Button>
        </div>
      </div>
      <TabsContent value={activeCategory} className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border bg-card">
          <Table>
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No relationships found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-2">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} selected.
          </div>
          <div className="flex w-full items-center gap-6 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
    <Sheet open={newRecordOpen} onOpenChange={setNewRecordOpen}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Add relationship</SheetTitle>
          <SheetDescription>
            Create a real CRM record for a startup, investor, sponsor, or operator.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 px-4 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="new-record-category">Type</Label>
              <Select
                value={newRecordForm.category}
                onValueChange={(value) => updateNewRecordForm("category", value)}
              >
                <SelectTrigger id="new-record-category" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {(["Startup", "Investor", "Sponsor", "Operator"] as const).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-record-stage">Stage</Label>
              <Select
                value={newRecordForm.stage}
                onValueChange={(value) => updateNewRecordForm("stage", value)}
              >
                <SelectTrigger id="new-record-stage" className="w-full">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="new-record-company">Company</Label>
              <Input
                id="new-record-company"
                value={newRecordForm.company}
                onChange={(event) => updateNewRecordForm("company", event.target.value)}
                placeholder="Acme AI"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-record-name">Contact</Label>
              <Input
                id="new-record-name"
                value={newRecordForm.name}
                onChange={(event) => updateNewRecordForm("name", event.target.value)}
                placeholder="Founder or partner name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="new-record-email">Email</Label>
              <Input
                id="new-record-email"
                value={newRecordForm.email}
                onChange={(event) => updateNewRecordForm("email", event.target.value)}
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-record-phone">Phone</Label>
              <Input
                id="new-record-phone"
                value={newRecordForm.phone}
                onChange={(event) => updateNewRecordForm("phone", event.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-record-website">Website or LinkedIn</Label>
            <Input
              id="new-record-website"
              value={newRecordForm.website}
              onChange={(event) => updateNewRecordForm("website", event.target.value)}
              placeholder="https://"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="new-record-priority">Priority</Label>
              <Select
                value={newRecordForm.priority}
                onValueChange={(value) => updateNewRecordForm("priority", value)}
              >
                <SelectTrigger id="new-record-priority" className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-record-owner">Owner</Label>
              <Input
                id="new-record-owner"
                value={newRecordForm.owner}
                onChange={(event) => updateNewRecordForm("owner", event.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-record-value">Value / segment</Label>
            <Input
              id="new-record-value"
              value={newRecordForm.value}
              onChange={(event) => updateNewRecordForm("value", event.target.value)}
              placeholder="Sponsor tier, funding stage, check size, or segment"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-record-next-step">Next step</Label>
            <Input
              id="new-record-next-step"
              value={newRecordForm.nextStep}
              onChange={(event) => updateNewRecordForm("nextStep", event.target.value)}
              placeholder="Send intro, invite to event, schedule call..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-record-tags">Tags</Label>
            <Input
              id="new-record-tags"
              value={newRecordForm.tags}
              onChange={(event) => updateNewRecordForm("tags", event.target.value)}
              placeholder="AI, fintech, Visa2Venture"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-record-notes">Notes</Label>
            <textarea
              id="new-record-notes"
              value={newRecordForm.notes}
              onChange={(event) => updateNewRecordForm("notes", event.target.value)}
              placeholder="Context, relationship history, interests, or outreach notes"
              className="min-h-28 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <SheetFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setNewRecordOpen(false)}
            disabled={isCreatingRecord}
          >
            Cancel
          </Button>
          <Button onClick={createRecord} disabled={isCreatingRecord}>
            {isCreatingRecord ? "Saving..." : "Save relationship"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </>
  );
}

function RelationshipViewer({ item }: { item: CrmRecord }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="h-auto w-fit flex-col items-start gap-0 px-0 text-left text-foreground">
          <span className="font-medium">{item.company}</span>
          <span className="text-xs text-muted-foreground">{item.name}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.company}</DrawerTitle>
          <DrawerDescription>
            {item.category} relationship owned by {item.owner}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="flex flex-wrap gap-2">
            <Badge>{item.priority} priority</Badge>
            <Badge variant="secondary">{item.stage}</Badge>
            {item.tags.map((tag) => (
              <Badge variant="outline" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <Separator />
          {item.links.length > 0 ? (
            <>
              <div className="grid gap-2">
                <div className="font-medium">Links</div>
                <div className="flex flex-wrap gap-2">
                  {item.links.map((link) => (
                    <Button variant="outline" size="sm" asChild key={`${link.label}-${link.url}`}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        <ExternalLink />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          ) : null}
          <div className="grid gap-3">
            <div>
              <div className="font-medium">Next step</div>
              <div className="text-muted-foreground">{item.nextStep}</div>
            </div>
            <div>
              <div className="font-medium">Notes</div>
              <div className="text-muted-foreground">{item.notes}</div>
            </div>
          </div>
          <Separator />
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${item.id}-name`}>Contact</Label>
                <Input id={`${item.id}-name`} defaultValue={item.name} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${item.id}-company`}>Company</Label>
                <Input id={`${item.id}-company`} defaultValue={item.company} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${item.id}-email`}>Email</Label>
                <Input id={`${item.id}-email`} defaultValue={item.email} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${item.id}-phone`}>Phone</Label>
                <Input id={`${item.id}-phone`} defaultValue={item.phone} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${item.id}-stage`}>Stage</Label>
                <Select defaultValue={item.stage}>
                  <SelectTrigger id={`${item.id}-stage`} className="w-full">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {stages.map((stage) => (
                        <SelectItem value={stage} key={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${item.id}-value`}>Value</Label>
                <Input id={`${item.id}-value`} defaultValue={item.value} />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button onClick={() => toast.success("Relationship changes saved locally.")}>
            Save relationship
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

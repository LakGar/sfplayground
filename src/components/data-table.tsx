"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  Flag,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Send,
  Sparkles,
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

import type {
  CrmCategory,
  CrmFlag,
  CrmPriority,
  CrmRecord,
  CrmStage,
  CrmTier,
} from "@/lib/admin-crm-types";
import {
  INDUSTRY_SPACES,
  classifyIndustryText,
  expandIndustryQuery,
  getIndustrySpace,
  type IndustrySpace,
} from "@/lib/industry-taxonomy";
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
const tiers: Exclude<CrmTier, "">[] = ["Tier 1", "Tier 2", "Tier 3"];
const flags: Exclude<CrmFlag, "">[] = ["Do not reach out", "Standout"];
const ALL_FILTER_VALUE = "__all";

type NewRecordForm = {
  category: Exclude<CrmCategory, "Subscriber">;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  stage: CrmStage;
  priority: CrmPriority;
  tier: CrmTier;
  flag: CrmFlag;
  owner: string;
  industry: string;
  value: string;
  nextStep: string;
  nextSteps: string;
  priorityNotes: string;
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
  tier: "",
  flag: "",
  owner: "Staff",
  industry: "",
  value: "",
  nextStep: "",
  nextSteps: "",
  priorityNotes: "",
  notes: "",
  tags: "",
};

function priorityVariant(priority: CrmPriority): "default" | "secondary" | "outline" {
  if (priority === "High") return "default";
  if (priority === "Medium") return "secondary";
  return "outline";
}

function flagVariant(flag: CrmFlag): "default" | "secondary" | "destructive" | "outline" {
  if (flag === "Do not reach out") return "destructive";
  if (flag === "Standout") return "default";
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

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b),
  );
}

function recordSearchBlob(record: CrmRecord) {
  return [
    record.company,
    record.name,
    record.email,
    record.phone,
    record.website,
    record.stage,
    record.priority,
    record.tier,
    record.flag,
    record.industry,
    record.value,
    record.source,
    record.owner,
    record.nextStep,
    record.priorityNotes,
    record.notes,
    ...record.tags,
    ...record.nextSteps,
    ...record.links.flatMap((link) => [link.label, link.url]),
  ]
    .join(" ")
    .toLowerCase();
}

function recordIndustryLabels(record: CrmRecord) {
  return classifyIndustryText([
    record.industry,
    record.value,
    record.notes,
    record.priorityNotes,
    record.company,
    ...record.tags,
  ]);
}

function recordMatchesIndustry(record: CrmRecord, industry: string) {
  if (industry === ALL_FILTER_VALUE) return true;
  const space = getIndustrySpace(industry);
  const labels = recordIndustryLabels(record);
  if (space && labels.includes(space.label)) return true;

  const haystack = recordSearchBlob(record);
  return expandIndustryQuery(industry).some((term) => haystack.includes(term.toLowerCase()));
}

function recordMatchesQuery(record: CrmRecord, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = recordSearchBlob(record);
  return expandIndustryQuery(normalized).some((term) => haystack.includes(term.toLowerCase()));
}

function countSpace(records: CrmRecord[], space: IndustrySpace) {
  const matches = records.filter((record) => recordMatchesIndustry(record, space.label));
  return {
    label: space.label,
    query: space.aliases[0] ?? space.label,
    total: matches.length,
    founders: matches.filter((record) => record.category === "Startup").length,
    investors: matches.filter((record) => record.category === "Investor").length,
  };
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
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) =>
      row.original.tier ? (
        <Badge variant={row.original.tier === "Tier 3" ? "default" : "outline"}>
          {row.original.tier}
        </Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
  },
  {
    accessorKey: "flag",
    header: "Flag",
    cell: ({ row }) =>
      row.original.flag ? (
        <Badge variant={flagVariant(row.original.flag)}>
          <Flag />
          {row.original.flag}
        </Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-[160px] font-medium">
        {row.original.industry || row.original.tags[0] || "-"}
      </span>
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
  const router = useRouter();
  const [records, setRecords] = React.useState(initialData);
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState(ALL_FILTER_VALUE);
  const [priorityFilter, setPriorityFilter] = React.useState(ALL_FILTER_VALUE);
  const [tierFilter, setTierFilter] = React.useState(ALL_FILTER_VALUE);
  const [flagFilter, setFlagFilter] = React.useState(ALL_FILTER_VALUE);
  const [industryFilter, setIndustryFilter] = React.useState(ALL_FILTER_VALUE);
  const [sourceFilter, setSourceFilter] = React.useState(ALL_FILTER_VALUE);
  const [tagFilter, setTagFilter] = React.useState(ALL_FILTER_VALUE);
  const [autoRefresh, setAutoRefresh] = React.useState(false);
  const [lastRefresh, setLastRefresh] = React.useState<Date | null>(null);
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

  const categoryData = React.useMemo(
    () => filterData(records, activeCategory),
    [activeCategory, records],
  );

  const sourceOptions = React.useMemo(
    () => uniqueSorted(categoryData.map((record) => record.source)),
    [categoryData],
  );
  const tagOptions = React.useMemo(
    () => uniqueSorted(categoryData.flatMap((record) => record.tags)),
    [categoryData],
  );
  const industryOptions = React.useMemo(
    () =>
      uniqueSorted([
        ...INDUSTRY_SPACES.map((space) => space.label),
        ...categoryData.flatMap((record) => [
          record.industry,
          ...recordIndustryLabels(record),
          record.tags[0] || "",
        ]),
      ]),
    [categoryData],
  );
  const spaceSummaries = React.useMemo(
    () =>
      INDUSTRY_SPACES.map((space) => countSpace(records, space))
        .filter((space) => space.total > 0)
        .sort((a, b) => b.total - a.total)
        .slice(0, 10),
    [records],
  );

  const data = React.useMemo(
    () =>
      categoryData.filter((record) => {
        if (!recordMatchesQuery(record, searchQuery)) return false;
        if (stageFilter !== ALL_FILTER_VALUE && record.stage !== stageFilter) return false;
        if (priorityFilter !== ALL_FILTER_VALUE && record.priority !== priorityFilter) return false;
        if (tierFilter !== ALL_FILTER_VALUE && record.tier !== tierFilter) return false;
        if (flagFilter !== ALL_FILTER_VALUE && record.flag !== flagFilter) return false;
        if (!recordMatchesIndustry(record, industryFilter)) return false;
        if (sourceFilter !== ALL_FILTER_VALUE && record.source !== sourceFilter) return false;
        if (tagFilter !== ALL_FILTER_VALUE && !record.tags.includes(tagFilter)) return false;
        return true;
      }),
    [
      categoryData,
      flagFilter,
      industryFilter,
      priorityFilter,
      searchQuery,
      sourceFilter,
      stageFilter,
      tagFilter,
      tierFilter,
    ],
  );

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    stageFilter !== ALL_FILTER_VALUE ||
    priorityFilter !== ALL_FILTER_VALUE ||
    tierFilter !== ALL_FILTER_VALUE ||
    flagFilter !== ALL_FILTER_VALUE ||
    industryFilter !== ALL_FILTER_VALUE ||
    sourceFilter !== ALL_FILTER_VALUE ||
    tagFilter !== ALL_FILTER_VALUE;

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
    setPagination((current) => ({ ...current, pageIndex: 0 }));
    setRowSelection({});
  }, [
    activeCategory,
    flagFilter,
    industryFilter,
    priorityFilter,
    searchQuery,
    sourceFilter,
    stageFilter,
    tagFilter,
    tierFilter,
  ]);

  React.useEffect(() => {
    if (window.sessionStorage.getItem("sfpg-open-new-record") === "1") {
      window.sessionStorage.removeItem("sfpg-open-new-record");
      setNewRecordOpen(true);
    }
    const category = new URLSearchParams(window.location.search).get("category");
    if (category && categories.includes(category as "All" | CrmCategory)) {
      setActiveCategory(category);
    }
  }, []);

  React.useEffect(() => {
    if (!autoRefresh) return;
    const interval = window.setInterval(() => {
      setLastRefresh(new Date());
      router.refresh();
    }, 30000);
    return () => window.clearInterval(interval);
  }, [autoRefresh, router]);

  const updateNewRecordForm = (key: keyof NewRecordForm, value: string) => {
    setNewRecordForm((current) => ({ ...current, [key]: value }));
  };

  const applySpaceSearch = (query: string) => {
    setActiveCategory("All");
    setSearchQuery(query);
    setStageFilter(ALL_FILTER_VALUE);
    setPriorityFilter(ALL_FILTER_VALUE);
    setTierFilter(ALL_FILTER_VALUE);
    setFlagFilter(ALL_FILTER_VALUE);
    setIndustryFilter(ALL_FILTER_VALUE);
    setSourceFilter(ALL_FILTER_VALUE);
    setTagFilter(ALL_FILTER_VALUE);
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
        "tier",
        "flag",
        "industry",
        "value",
        "source",
        "updated",
        "nextStep",
        "nextSteps",
        "priorityNotes",
        "notes",
      ];
      const exportRows = dataRef.current;
      const csv = [
        headers.join(","),
        ...exportRows.map((record) =>
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
      toast.success(`Exported ${exportRows.length.toLocaleString()} visible records.`);
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
    <Tabs
      value={activeCategory}
      onValueChange={setActiveCategory}
      className="min-w-0 max-w-full flex-col gap-6 overflow-hidden"
    >
      <div className="flex min-w-0 flex-col gap-3 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-6">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <Label htmlFor="crm-search" className="sr-only">
            Search CRM
          </Label>
          <div className="relative min-w-[220px] flex-1 lg:max-w-[340px]">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input
              id="crm-search"
              placeholder="Search company, founder, tags, notes..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-full min-w-32 max-w-40 @4xl/main:hidden" size="sm" aria-label="Select CRM view">
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
        <div className="flex min-w-0 max-w-full flex-wrap items-center justify-start gap-2 overflow-hidden lg:justify-end">
          <TabsList className="hidden h-auto max-w-full flex-wrap justify-start overflow-x-auto **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
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
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            className="shrink-0"
            onClick={() => {
              setAutoRefresh((current) => !current);
              if (!autoRefresh) {
                setLastRefresh(new Date());
                router.refresh();
              }
            }}
          >
            <RefreshCw />
            <span className="hidden lg:inline">{autoRefresh ? "Live on" : "Live off"}</span>
          </Button>
          <Button
            size="sm"
            className="shrink-0"
            onClick={() => setNewRecordOpen(true)}
          >
            <Plus />
            <span className="hidden lg:inline">Add relationship</span>
            <span className="lg:hidden">Add</span>
          </Button>
        </div>
      </div>
      <div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 px-4 lg:px-6">
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger size="sm" className="w-full" aria-label="Filter by stage">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_FILTER_VALUE}>All stages</SelectItem>
            {stages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger size="sm" className="w-full" aria-label="Filter by priority">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_FILTER_VALUE}>All priorities</SelectItem>
            {priorities.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger size="sm" className="w-full" aria-label="Filter by tier">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_FILTER_VALUE}>All tiers</SelectItem>
            {tiers.map((tier) => (
              <SelectItem key={tier} value={tier}>
                {tier}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={flagFilter} onValueChange={setFlagFilter}>
          <SelectTrigger size="sm" className="w-full" aria-label="Filter by flag">
            <SelectValue placeholder="Flag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_FILTER_VALUE}>All flags</SelectItem>
            {flags.map((flag) => (
              <SelectItem key={flag} value={flag}>
                {flag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger size="sm" className="w-full" aria-label="Filter by industry">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_FILTER_VALUE}>All industries</SelectItem>
            {industryOptions.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger size="sm" className="w-full" aria-label="Filter by source">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_FILTER_VALUE}>All sources</SelectItem>
            {sourceOptions.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger size="sm" className="w-full" aria-label="Filter by tag or funding stage">
            <SelectValue placeholder="Tag / funding stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_FILTER_VALUE}>All tags / stages</SelectItem>
            {tagOptions.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          disabled={!hasActiveFilters}
          onClick={() => {
            setSearchQuery("");
            setStageFilter(ALL_FILTER_VALUE);
            setPriorityFilter(ALL_FILTER_VALUE);
            setTierFilter(ALL_FILTER_VALUE);
            setFlagFilter(ALL_FILTER_VALUE);
            setIndustryFilter(ALL_FILTER_VALUE);
            setSourceFilter(ALL_FILTER_VALUE);
            setTagFilter(ALL_FILTER_VALUE);
          }}
        >
          Clear filters
        </Button>
      </div>
      {spaceSummaries.length > 0 ? (
        <div className="flex min-w-0 flex-col gap-2 px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-medium">Summit spaces</div>
              <div className="text-muted-foreground">
                Click a space to see matching founders and investors across industries, tags, notes, and interests.
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Alias-aware search: agtech, agriculture, farming, food systems.
            </div>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
            {spaceSummaries.map((space) => (
              <Button
                key={space.label}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto shrink-0 flex-col items-start gap-1 px-3 py-2 text-left"
                onClick={() => applySpaceSearch(space.query)}
              >
                <span>{space.label}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {space.founders} founders · {space.investors} investors · {space.total} total
                </span>
              </Button>
            ))}
          </div>
        </div>
      ) : null}
      <TabsContent value={activeCategory} className="relative flex min-w-0 max-w-full flex-col gap-4 overflow-hidden px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {data.length.toLocaleString()} of {categoryData.length.toLocaleString()}{" "}
            {activeCategory === "All" ? "relationships" : activeCategory.toLowerCase() + " records"}
          </span>
          <span>
            Search checks names, companies, notes, sources, next steps, tags, and funding/segment values.
            {lastRefresh ? ` Last live refresh ${lastRefresh.toLocaleTimeString()}.` : ""}
          </span>
        </div>
        <div className="min-w-0 overflow-hidden rounded-lg border bg-card">
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
              Page {Math.min(table.getState().pagination.pageIndex + 1, Math.max(table.getPageCount(), 1))} of{" "}
              {Math.max(table.getPageCount(), 1)}
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
              <Label htmlFor="new-record-tier">Tier</Label>
              <Select
                value={newRecordForm.tier || ALL_FILTER_VALUE}
                onValueChange={(value) =>
                  updateNewRecordForm("tier", value === ALL_FILTER_VALUE ? "" : value)
                }
              >
                <SelectTrigger id="new-record-tier" className="w-full">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_FILTER_VALUE}>No tier</SelectItem>
                  {tiers.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-record-flag">Flag</Label>
              <Select
                value={newRecordForm.flag || ALL_FILTER_VALUE}
                onValueChange={(value) =>
                  updateNewRecordForm("flag", value === ALL_FILTER_VALUE ? "" : value)
                }
              >
                <SelectTrigger id="new-record-flag" className="w-full">
                  <SelectValue placeholder="Select flag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_FILTER_VALUE}>No flag</SelectItem>
                  {flags.map((flag) => (
                    <SelectItem key={flag} value={flag}>
                      {flag}
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
            <Label htmlFor="new-record-industry">Industry / category</Label>
            <Input
              id="new-record-industry"
              value={newRecordForm.industry}
              onChange={(event) => updateNewRecordForm("industry", event.target.value)}
              placeholder="agtech, agriculture, fintech, climate..."
            />
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
            <Label htmlFor="new-record-next-steps">Next steps</Label>
            <textarea
              id="new-record-next-steps"
              value={newRecordForm.nextSteps}
              onChange={(event) => updateNewRecordForm("nextSteps", event.target.value)}
              placeholder="One follow-up per line"
              className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-record-priority-notes">Priority notes</Label>
            <textarea
              id="new-record-priority-notes"
              value={newRecordForm.priorityNotes}
              onChange={(event) => updateNewRecordForm("priorityNotes", event.target.value)}
              placeholder="Why this relationship is high, medium, or low priority"
              className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
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
            {item.tier ? (
              <Badge variant={item.tier === "Tier 3" ? "default" : "outline"}>
                <Sparkles />
                {item.tier}
              </Badge>
            ) : null}
            {item.flag ? (
              <Badge variant={flagVariant(item.flag)}>
                <Flag />
                {item.flag}
              </Badge>
            ) : null}
            <Badge variant="secondary">{item.stage}</Badge>
            {item.industry ? <Badge variant="outline">{item.industry}</Badge> : null}
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
            {item.nextSteps.length > 0 ? (
              <div>
                <div className="font-medium">Next steps</div>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {item.nextSteps.map((step, index) => (
                    <li key={`${item.id}-next-step-${index}`}>{step}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {item.priorityNotes ? (
              <div>
                <div className="font-medium">Priority notes</div>
                <div className="text-muted-foreground">{item.priorityNotes}</div>
              </div>
            ) : null}
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

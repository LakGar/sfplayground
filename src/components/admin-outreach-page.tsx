"use client";

import * as React from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { CrmCategory, CrmRecord, CrmStage } from "@/lib/admin-crm-types";

const categories: Array<"All" | CrmCategory> = [
  "All",
  "Startup",
  "Investor",
  "Sponsor",
  "Operator",
  "Subscriber",
];

const stages: Array<"All" | CrmStage> = [
  "All",
  "New",
  "Review",
  "Qualified",
  "Intro ready",
  "Follow-up",
  "Closed",
];

export function AdminOutreachPage({ records }: { records: CrmRecord[] }) {
  const [category, setCategory] = React.useState<"All" | CrmCategory>("All");
  const [stage, setStage] = React.useState<"All" | CrmStage>("All");
  const [query, setQuery] = React.useState("");
  const [subject, setSubject] = React.useState("SFPlayground follow-up");
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

  const sources = React.useMemo(
    () => Array.from(new Set(records.map((record) => record.source))).filter(Boolean).sort(),
    [records],
  );
  const [source, setSource] = React.useState("All");

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      if (category !== "All" && record.category !== category) return false;
      if (stage !== "All" && record.stage !== stage) return false;
      if (source !== "All" && record.source !== source) return false;
      if (!normalizedQuery) return true;
      return `${record.company} ${record.name} ${record.email} ${record.notes}`
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [category, query, records, source, stage]);

  const selected = React.useMemo(
    () => filtered.filter((record) => selectedIds.has(record.id)),
    [filtered, selectedIds],
  );
  const selectedWithEmail = selected.filter((record) => record.email);

  const toggleAll = (checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      for (const record of filtered) {
        if (checked) next.add(record.id);
        else next.delete(record.id);
      }
      return next;
    });
  };

  const openOutreach = () => {
    if (selectedWithEmail.length === 0) {
      toast.error("Select at least one record with an email address.");
      return;
    }
    const body = selectedWithEmail
      .map((record) => `Hi ${record.name || record.company},%0D%0A%0D%0A`)
      .join("%0D%0A---%0D%0A");
    const recipients = selectedWithEmail.map((record) => record.email).join(",");
    window.open(`mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${body}`, "_self");
  };

  return (
    <div className="grid gap-4 px-4 pb-6 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Audience</CardTitle>
          <CardDescription>Select who this outreach is for before you send anything.</CardDescription>
        </CardHeader>
        <div className="grid gap-3 px-6 pb-6 md:grid-cols-2 xl:grid-cols-5">
          <div className="grid gap-2">
            <Label>People type</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as "All" | CrmCategory)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Stage</Label>
            <Select value={stage} onValueChange={(value) => setStage(value as "All" | CrmStage)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {stages.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem>
                  {sources.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 xl:col-span-2">
            <Label htmlFor="outreach-search">Search</Label>
            <Input
              id="outreach-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Company, person, email, notes..."
            />
          </div>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Recipients</CardTitle>
              <CardDescription>
                {filtered.length.toLocaleString()} matching records. {selectedWithEmail.length.toLocaleString()} selected with email.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => toggleAll(true)}>Select matching</Button>
              <Button variant="outline" onClick={() => toggleAll(false)}>Clear matching</Button>
            </div>
          </div>
        </CardHeader>
        <div className="grid gap-4 px-6 pb-6">
          <div className="grid gap-2">
            <Label htmlFor="outreach-subject">Subject</Label>
            <Input id="outreach-subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
          </div>
          <div className="max-h-[520px] overflow-auto rounded-md border">
            {filtered.slice(0, 400).map((record) => (
              <label
                className="grid cursor-pointer grid-cols-[auto_1fr] gap-3 border-b px-3 py-3 text-sm last:border-b-0 hover:bg-muted/60"
                key={record.id}
              >
                <Checkbox
                  checked={selectedIds.has(record.id)}
                  onCheckedChange={(checked) => {
                    setSelectedIds((current) => {
                      const next = new Set(current);
                      if (checked) next.add(record.id);
                      else next.delete(record.id);
                      return next;
                    });
                  }}
                />
                <span className="grid gap-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{record.company}</span>
                    <Badge variant="outline">{record.category}</Badge>
                    <Badge variant="secondary">{record.stage}</Badge>
                  </span>
                  <span className="text-muted-foreground">
                    {record.name} {record.email ? `- ${record.email}` : "- no email"}
                  </span>
                  <span className="line-clamp-1 text-muted-foreground">{record.nextStep}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={openOutreach}>
              <Send />
              Open outreach email
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(selectedWithEmail.map((record) => record.email).join(", "));
                toast.success("Recipient emails copied.");
              }}
            >
              <Mail />
              Copy emails
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

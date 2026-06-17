"use client";

import * as React from "react";
import { Bot, Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DraftType = "blog" | "newsletter";

export function AdminAiDraftsPage() {
  const [type, setType] = React.useState<DraftType>("newsletter");
  const [startingPoint, setStartingPoint] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isBusy, setIsBusy] = React.useState(false);

  async function generateDraft() {
    if (!startingPoint.trim()) {
      toast.error("Add a starting point first.");
      return;
    }
    setIsBusy(true);
    try {
      const response = await fetch("/api/admin/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, startingPoint }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Draft failed");
      setOutput(JSON.stringify(payload, null, 2));
      toast.success("Draft generated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not generate draft.");
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="grid gap-4 px-4 pb-6 lg:px-6 xl:grid-cols-[360px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="size-5" />
            Draft request
          </CardTitle>
          <CardDescription>Generate a blog Markdown draft or newsletter HTML draft from a short prompt.</CardDescription>
        </CardHeader>
        <div className="grid gap-4 px-6 pb-6">
          <div className="grid gap-2">
            <Label>Draft type</Label>
            <Select value={type} onValueChange={(value) => setType(value as DraftType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newsletter">Newsletter HTML</SelectItem>
                  <SelectItem value="blog">Blog Markdown</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="draft-starting-point">Starting point</Label>
            <textarea
              id="draft-starting-point"
              value={startingPoint}
              onChange={(event) => setStartingPoint(event.target.value)}
              className="min-h-48 rounded-md border bg-background p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              placeholder="Example: Announce Visa2Venture sponsor openings to startup lawyers and banks..."
            />
          </div>
          <Button onClick={generateDraft} disabled={isBusy}>
            <Wand2 />
            Generate draft
          </Button>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
          <CardDescription>Copy this into the blog or newsletter editor after reviewing it.</CardDescription>
        </CardHeader>
        <div className="grid gap-3 px-6 pb-6">
          <textarea
            value={output}
            onChange={(event) => setOutput(event.target.value)}
            className="min-h-[520px] rounded-md border bg-background p-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            placeholder="Generated draft JSON will appear here."
          />
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(output);
              toast.success("Draft copied.");
            }}
            disabled={!output}
          >
            <Copy />
            Copy output
          </Button>
        </div>
      </Card>
    </div>
  );
}


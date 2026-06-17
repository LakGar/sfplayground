"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import type { CrmChartPoint } from "@/lib/admin-crm-types";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartConfig = {
  startups: {
    label: "Startups",
    color: "var(--chart-1)",
  },
  investors: {
    label: "Investors",
    color: "var(--chart-2)",
  },
  sponsors: {
    label: "Sponsors",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ data }: { data: CrmChartPoint[] }) {
  const isMobile = useIsMobile();
  const [view, setView] = React.useState("pipeline");

  React.useEffect(() => {
    if (isMobile) {
      setView("startups");
    }
  }, [isMobile]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Relationship Pipeline</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Monthly growth across founders, investors, and sponsor prospects.
          </span>
          <span className="@[540px]/card:hidden">Monthly CRM growth</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value) => value && setView(value)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="pipeline">Pipeline</ToggleGroupItem>
            <ToggleGroupItem value="startups">Startups</ToggleGroupItem>
            <ToggleGroupItem value="capital">Capital</ToggleGroupItem>
          </ToggleGroup>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger
              className="flex w-36 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select pipeline view"
            >
              <SelectValue placeholder="Pipeline" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="pipeline" className="rounded-lg">
                Pipeline
              </SelectItem>
              <SelectItem value="startups" className="rounded-lg">
                Startups
              </SelectItem>
              <SelectItem value="capital" className="rounded-lg">
                Capital
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillStartups" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-startups)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="var(--color-startups)" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="fillInvestors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-investors)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--color-investors)" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="fillSponsors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sponsors)" stopOpacity={0.45} />
                <stop offset="95%" stopColor="var(--color-sponsors)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="sponsors"
              type="natural"
              fill="url(#fillSponsors)"
              stroke="var(--color-sponsors)"
              stackId="a"
            />
            <Area
              dataKey="investors"
              type="natural"
              fill="url(#fillInvestors)"
              stroke="var(--color-investors)"
              stackId="a"
            />
            <Area
              dataKey="startups"
              type="natural"
              fill="url(#fillStartups)"
              stroke="var(--color-startups)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

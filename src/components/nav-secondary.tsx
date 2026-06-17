"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const runAction = (title: string) => {
    if (title === "Search") {
      document.getElementById("crm-search")?.focus();
      toast.success("Search focused.");
      return;
    }
    if (title === "Settings") {
      window.dispatchEvent(new CustomEvent("admin:settings"));
      return;
    }
    if (title === "Help") {
      window.open("mailto:staff@sfplaygroundai.com?subject=SFPlayground admin help", "_self");
    }
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={() => runAction(item.title)}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

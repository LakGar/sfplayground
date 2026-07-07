"use client";

import * as React from "react";
import Image from "next/image";
import {
  BadgeDollarSign,
  Bot,
  CalendarDays,
  CircleHelp,
  Database,
  Handshake,
  Rocket,
  LayoutDashboard,
  Mail,
  Megaphone,
  Search,
  Settings,
  Users,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "SFPlayground",
    email: "staff@sfplaygroundai.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Command Center",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Relationships",
      url: "/admin/relationships",
      icon: Users,
    },
    {
      title: "Startups",
      url: "/admin/startups",
      icon: Rocket,
    },
    {
      title: "Sponsor Pipeline",
      url: "/admin/sponsors",
      icon: BadgeDollarSign,
    },
    {
      title: "Investor Network",
      url: "/admin/investors",
      icon: Handshake,
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: CalendarDays,
    },
    {
      title: "Outreach",
      url: "/admin/outreach",
      icon: Megaphone,
    },
    {
      title: "AI drafts",
      url: "/admin/ai-drafts",
      icon: Bot,
    },
  ],
  navSecondary: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Help",
      url: "#",
      icon: CircleHelp,
    },
  ],
  documents: [
    {
      name: "Startup outreach sheet",
      url: "https://docs.google.com/spreadsheets/d/1UBzji17RVwtSL5HVdSRxCK-Xqh2L1DvQ/edit",
      icon: Database,
    },
    {
      name: "Startup form sheet",
      url: "https://docs.google.com/spreadsheets/d/1azbqwhFvk0K9M345dlEk8JIfdN6xm0czYrIrLh48bJ0/edit",
      icon: Database,
    },
    {
      name: "Investor intake",
      url: "/network/apply?type=vcs",
      icon: Handshake,
    },
    {
      name: "Sponsor data",
      url: "/sponsors/apply",
      icon: Megaphone,
    },
    {
      name: "Newsletter",
      url: "/admin/outreach",
      icon: Mail,
    },
    {
      name: "AI drafts",
      url: "/admin/ai-drafts",
      icon: Bot,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="/admin">
                <Image
                  src="/images/logo.png"
                  alt="SFPlayground"
                  width={28}
                  height={28}
                  className="size-7 rounded-md object-contain"
                />
                <span className="text-base font-semibold">SFPlayground</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

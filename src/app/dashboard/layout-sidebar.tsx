"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Tag, LogOut } from "lucide-react";

import * as SidebarUI from "@ui/Sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Articles", url: "/dashboard/articles", icon: Newspaper },
  { title: "Category", url: "/dashboard/category", icon: Tag },
  { title: "Logout", url: "#", icon: LogOut },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <SidebarUI.Sidebar>
      <SidebarUI.SidebarContent>
        <SidebarUI.SidebarHeader>
          <Link href="/">
            <SidebarUI.SidebarBrand/>
          </Link>
        </SidebarUI.SidebarHeader>
        <SidebarUI.SidebarGroup>
          <SidebarUI.SidebarGroupContent>
            <SidebarUI.SidebarMenu>
              {items.map((item) => (
                <SidebarUI.SidebarMenuItem key={item.title}>
                  <SidebarUI.SidebarMenuButton isActive={pathname === item.url} asChild>
                    <Link href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarUI.SidebarMenuButton>
                </SidebarUI.SidebarMenuItem>
              ))}
            </SidebarUI.SidebarMenu>
          </SidebarUI.SidebarGroupContent>
        </SidebarUI.SidebarGroup>
      </SidebarUI.SidebarContent>
    </SidebarUI.Sidebar>
  );
}

"use client";

import { useState } from "react";
import { Home, Newspaper, Tag, LogOut, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useLogout } from "@hooks/useLogout";

import * as SidebarUI from "@ui/Sidebar";
import * as DialogUI from "@ui/Dialog";
import { Button } from "@ui/Button";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Articles", url: "/dashboard/articles", icon: Newspaper },
  { title: "Category", url: "/dashboard/category", icon: Tag },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { loading, logout } = useLogout();

  return (
    <>
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
                <SidebarUI.SidebarMenuItem>
                  <SidebarUI.SidebarMenuButton onClick={() => setOpen(true)} preventClose>
                    <LogOut/>
                    <span>Logout</span>
                  </SidebarUI.SidebarMenuButton>
                </SidebarUI.SidebarMenuItem>
              </SidebarUI.SidebarMenu>
            </SidebarUI.SidebarGroupContent>
          </SidebarUI.SidebarGroup>
        </SidebarUI.SidebarContent>
      </SidebarUI.Sidebar>
      <DialogUI.Dialog open={open} onOpenChange={(open) => setOpen(!loading ? open : true)}>
        <DialogUI.DialogContent noClose>
          <DialogUI.DialogHeader>
            <DialogUI.DialogTitle>Logout</DialogUI.DialogTitle>
            <DialogUI.DialogDescription>Are you sure you want to log out?</DialogUI.DialogDescription>
          </DialogUI.DialogHeader>
          <DialogUI.DialogFooter>
            <DialogUI.DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogUI.DialogClose>
            <Button onClick={logout} disabled={loading}>
              {loading && <Loader2 className="animate-spin"/>}
              Logout
            </Button>
          </DialogUI.DialogFooter>
        </DialogUI.DialogContent>
      </DialogUI.Dialog>
    </>
  );
}

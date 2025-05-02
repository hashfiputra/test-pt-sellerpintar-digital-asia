"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useSession } from "@contexts/SessionContext";

import { Avatar, AvatarFallback } from "@ui/Avatar";
import { SidebarTrigger } from "@ui/Sidebar";

const items: Record<string, string> = {
  "/dashboard/articles": "Articles",
  "/dashboard/category": "Category",
  "/dashboard/profile": "User Profile",
};

export default function DashboardHeader() {
  const pathname = usePathname();
  const { username } = useSession() || {};
  const initial = useMemo(() => username?.charAt(0).toUpperCase(), [username]);
  const title = useMemo(() => items[pathname] || "Dashboard", [pathname]) ;

  return (
    <header
      className="header"
      id="header"
      data-scrolled={true}
      data-border={true}
      data-variant="dashboard"
    >
      <div className="header__title">
        <SidebarTrigger/>
        <h1>{title}</h1>
      </div>
      <div className="header__profile">
        <Avatar asChild>
          <Link href="/dashboard/profile">
            <AvatarFallback>{initial}</AvatarFallback>
          </Link>
        </Avatar>
        <Link className="header__username" href="/dashboard/profile">
          {username}
        </Link>
      </div>
    </header>
  );
}

import { type ReactNode } from "react";
import { type Metadata } from "next";

import { SidebarProvider } from "@ui/Sidebar";

import DashboardHeader from "./layout-header";
import DashboardSidebar from "./layout-sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard — The Journal",
    absolute: "Dashboard — The Journal",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <DashboardSidebar/>
      <div className="dashboard">
        <DashboardHeader/>
        {children}
      </div>
    </SidebarProvider>
  );
}

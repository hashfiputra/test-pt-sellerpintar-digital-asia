import { type ReactNode } from "react";
import { SidebarProvider } from "@ui/Sidebar";

import DashboardHeader from "./layout-header";
import DashboardSidebar from "./layout-sidebar";

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

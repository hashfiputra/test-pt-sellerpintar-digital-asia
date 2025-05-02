import { type ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@ui/Sidebar";

import DashboardSidebar from "./layout-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <DashboardSidebar/>
      <main className="dashboard" id="skip">
        <SidebarTrigger/>
        {children}
      </main>
    </SidebarProvider>
  );
}

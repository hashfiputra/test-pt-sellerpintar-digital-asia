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
      <main className="dashboard" id="skip">
        <DashboardHeader/>
        {children}
      </main>
    </SidebarProvider>
  );
}

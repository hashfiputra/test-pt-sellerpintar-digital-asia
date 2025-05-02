import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Manage your articles categories, create, edit, and delete them.",
  keywords: ["category", "blog", "dashboard", "content management"],
};

export default function DashboardCategoryLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

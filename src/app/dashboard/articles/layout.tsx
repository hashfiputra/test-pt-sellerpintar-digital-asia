import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Manage your articles and blog posts, create, edit, and delete them.",
  keywords: ["articles", "blog", "dashboard", "content management"],
};

export default function DashboardCategoryLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

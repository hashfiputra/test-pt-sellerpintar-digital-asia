import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Articles",
  description: "Create new articles for people to read and share.",
  keywords: ["articles", "create articles", "blog", "dashboard", "content management"],
};

export default function DashboardCategoryLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

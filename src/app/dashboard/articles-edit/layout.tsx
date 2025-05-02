import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Articles",
  description: "Edit existing articles for people to read and share.",
  keywords: ["articles", "edit articles", "blog", "dashboard", "content management"],
};

export default function DashboardCategoryLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

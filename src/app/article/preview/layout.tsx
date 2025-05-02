import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview Articles",
  description: "Preview articles to make sure they look good before publishing them.",
  keywords: ["articles", "preview articles", "blog", "dashboard", "content management"],
};

export default function DashboardCategoryLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

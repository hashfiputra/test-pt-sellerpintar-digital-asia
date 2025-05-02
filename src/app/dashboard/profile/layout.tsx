import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "View your profile you use to experience The Journal.",
  keywords: ["user profile", "profile", "blog", "dashboard", "content management"],
};

export default function DashboardProfileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

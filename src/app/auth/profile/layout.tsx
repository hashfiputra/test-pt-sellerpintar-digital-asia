import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your profile you use to experience The Journal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

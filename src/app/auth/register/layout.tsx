import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account to start exploring curated design resources, exclusive interviews, and contribute to our design community.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

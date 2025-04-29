import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your Journal account to explore curated design resources, exclusive interviews, and contribute to our design community.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

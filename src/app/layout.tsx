import "@styles/globals.css";
import { fontVariables } from "@styles/fonts";

import type { ReactNode } from "react";
import type { Metadata } from "next";

import Link from "next/link";
import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";

import Comments from "@common/Comments";
import { Toaster } from "@ui/Toast";

import SessionProvider from "@contexts/SessionContext";
import { decrypt } from "@lib/auth";

export const metadata: Metadata = {
  title: {
    default: "The Journal",
    template: "%s | The Journal",
    absolute: "The Journal: Design Resources, Interviews, and Industry News",
  },
  appleWebApp: {
    title: "The Journal",
    statusBarStyle: "black",
  },
  description: "Discover curated design resources, in-depth interviews with industry leaders, and the latest news from the design world. The Journal is your destination for design inspiration and professional insights.",
  keywords: "design resources, design interviews, industry news, design inspiration, design professionals, design trends, creative insights, design community, design articles, design blog",
};

export default async function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const store = await cookies();
  const session = store.get("session")?.value;
  const data = session ? await decrypt(session) : null;

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
    <body>
    <Comments/>
    <Link className="sr-only" href="./#skip">Skip to main content</Link>
    <ThemeProvider defaultTheme="light">
      <SessionProvider username={data?.username} role={data?.role}>
        {children}
      </SessionProvider>
      <Toaster richColors closeButton/>
    </ThemeProvider>
    </body>
    </html>
  );
}
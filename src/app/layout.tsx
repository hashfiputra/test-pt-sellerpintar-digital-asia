import "@styles/globals.css";
import { fontVariables } from "@styles/fonts";

import type { ReactNode } from "react";
import type { Metadata } from "next";

import Link from "next/link";

import Comments from "@common/Comments";

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

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
    <body>
    <Comments/>
    <Link className="visually-hidden" href="./#skip">
      Skip to main content
    </Link>
    {children}
    </body>
    </html>
  );
}
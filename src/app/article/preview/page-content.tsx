"use client";

import { notFound, useSearchParams } from "next/navigation";
import { Dot } from "lucide-react";

import { parseDate } from "@lib/utils";
import { CardThumbnail, CardImage } from "@ui/Card";

export type ArticlePreviewContentProps = {
  username: string;
};

export default function ArticlePreviewContent({ username }: ArticlePreviewContentProps) {
  const searchParams = useSearchParams();
  const encoded = searchParams.get("data") || "{}";
  const decoded = atob(encoded);
  const { title, content, imageUrl } = JSON.parse(decoded);
  if (!title) return notFound();

  return (
    <section className="section" id="content">
      <div className="container">
        <div className="headline">
          <div className="meta">
            <span className="meta__detail">
              Preview article
            </span>
            <span className="meta__item">
              <span>{parseDate(new Date().toISOString())}</span>
              <Dot className="meta__divider"/>
              <span>Created by {username}</span>
            </span>
          </div>
          <h1 className="title">{title}</h1>
        </div>
        <CardThumbnail className="thumbnail">
          <CardImage src={imageUrl} alt={title}/>
        </CardThumbnail>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }}/>
      </div>
    </section>
  );
}

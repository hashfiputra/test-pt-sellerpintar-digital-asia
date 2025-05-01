"use client";

import Image from "next/image";
import TimeAgo from "react-timeago";
import { Dot } from "lucide-react";

import { parseDate } from "@lib/utils";
import { type Article } from "@lib/articles";

export type ArticleContentProps = {
  article: Article;
};

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <section className="section" id="content">
      <div className="container">
        <div className="headline">
          <div className="meta">
            <span className="meta__detail">
              Last edited <TimeAgo date={article.updatedAt}/>
            </span>
            <span className="meta__item">
              <span>{parseDate(article.createdAt)}</span>
              <Dot className="meta__divider"/>
              <span>Created by {article.user.username}</span>
            </span>
          </div>
          <h1>{article.title}</h1>
        </div>
        <div className="thumbnail">
          <Image src={article.imageUrl} alt={article.title} fill/>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: article.content }}/>
      </div>
    </section>
  );
}

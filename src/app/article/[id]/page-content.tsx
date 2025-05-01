"use client";

import TimeAgo from "react-timeago";
import { Dot } from "lucide-react";

import { CardThumbnail, CardImage } from "@ui/Card";

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
          <h1 className="title">{article.title}</h1>
        </div>
        <CardThumbnail className="thumbnail">
          <CardImage src={article.imageUrl} alt={article.title}/>
        </CardThumbnail>
        <div className="content" dangerouslySetInnerHTML={{ __html: article.content }}/>
      </div>
    </section>
  );
}

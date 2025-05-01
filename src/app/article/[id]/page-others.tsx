import Link from "next/link";
import { Shrimp } from "lucide-react";

import * as CardUI from "@ui/Card";
import { Button } from "@ui/Button";
import { Badge } from "@ui/Badge";

import { getArticles } from "@lib/articles";
import { parseDate } from "@lib/utils";

export type ArticleOthersProps = {
  id: string;
  category: string;
};

export default async function ArticleOthers({ id, category }: ArticleOthersProps) {
  const { data } = await getArticles({ category, limit: 4 });
  const others = data.filter(article => article.id !== id).slice(0, 3);

  return (
    <section className="section" id="others">
      <h2 className="title">Other articles</h2>
      {others.length > 0 && (
        <div className="cards">
          {others.map(({ id, imageUrl, title, createdAt, excerpt, category }) => (
            <CardUI.Card key={id}>
              <CardUI.CardThumbnail>
                <CardUI.CardImage src={imageUrl} alt={title}/>
              </CardUI.CardThumbnail>
              <CardUI.CardContent>
                <CardUI.CardDate>{parseDate(createdAt)}</CardUI.CardDate>
                <CardUI.CardTitle href={`/article/${id}`}>
                  {title}
                </CardUI.CardTitle>
                <CardUI.CardDescription>{excerpt}</CardUI.CardDescription>
                <CardUI.CardBadges>
                  <Badge>{category.name}</Badge>
                </CardUI.CardBadges>
              </CardUI.CardContent>
            </CardUI.Card>
          ))}
        </div>
      )}
      {!others.length && (
        <div className="empty">
          <div className="empty__icon">
            <Shrimp className="empty__svg"/>
          </div>
          <div className="empty__content">
            <div className="empty__title">
              No related articles found
            </div>
            <div className="empty__description">
              There are no other articles in this category at the moment.
              Go back to home to see more articles.
            </div>
            <Button asChild>
              <Link href="/">
                Go back to home
              </Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

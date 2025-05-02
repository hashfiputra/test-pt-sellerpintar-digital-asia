"use client";

import { type MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Shrimp } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import Pagination from "@common/Pagination";
import { Badge } from "@ui/Badge";
import * as CardUI from "@ui/Card";

import { useFilter } from "@contexts/FilterContext";

import { type Articles } from "@lib/articles";
import { parseDate, toNumber } from "@lib/utils";

export type HomeArticlesProps = {
  articles: Articles;
};

export default function HomeArticles({ articles }: HomeArticlesProps) {
  const [saved, setSaved] = useState(articles);
  const [loading, setLoading] = useState(false);

  const { category, title } = useFilter();
  const { data, page, total, limit } = saved;
  const [current, setCurrent] = useState(page);

  const sum = useMemo(() => Math.min(total, current * limit), [current, limit, total]);
  const last = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = e.currentTarget.getAttribute("data-number");
    const parsed = limit.toString();
    const query = new URLSearchParams();

    if (page) query.set("page", page);
    if (parsed) query.set("limit", parsed);
    if (category) query.set("category", category);
    if (title) query.set("title", title);

    try {
      const url = "/api/articles" + "?" + query.toString();
      const update = await axios.get(url);
      const parsed = toNumber(page);

      setCurrent(parsed);
      setSaved(update.data);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [limit, category, title]);

  const onPrevious = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = (current - 1).toString();
    const parsed = limit.toString();
    const query = new URLSearchParams();

    if (page) query.set("page", page);
    if (parsed) query.set("limit", parsed);
    if (category) query.set("category", category);
    if (title) query.set("title", title);

    try {
      const url = "/api/articles" + "?" + query.toString();
      const update = await axios.get(url);

      setCurrent(current - 1);
      setSaved(update.data);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [current, limit, category, title]);

  const onNext = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const page = (current + 1).toString();
    const parsed = limit.toString();
    const query = new URLSearchParams();

    if (page) query.set("page", page);
    if (parsed) query.set("limit", parsed);
    if (category) query.set("category", category);
    if (title) query.set("title", title);

    try {
      const url = "/api/articles" + "?" + query.toString();
      const update = await axios.get(url);

      setCurrent(current + 1);
      setSaved(update.data);
    } catch (e) {
      const response = axios.isAxiosError(e) ? e.response : null;
      const message = response?.data?.message || "Something went wrong, try again later";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [current, limit, category, title]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);

      const page = "1";
      const parsed = limit.toString();
      const query = new URLSearchParams();

      if (page) query.set("page", "1");
      if (parsed) query.set("limit", parsed);
      if (category) query.set("category", category);
      if (title) query.set("title", title);

      try {
        const url = "/api/articles" + "?" + query.toString();
        const update = await axios.get(url);

        setCurrent(1);
        setSaved(update.data);
      } catch (e) {
        const response = axios.isAxiosError(e) ? e.response : null;
        const message = response?.data?.message || "Something went wrong, try again later";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    getArticles().then();
  }, [limit, category, title]);

  return (
    <section className="section" id="articles" data-loading={loading}>
      <span className="counter">
        Showing {sum} of {total} articles
      </span>
      <div className="container">
        <div className="cards">
          {data.map(({ id, imageUrl, title, createdAt, excerpt, category }) => (
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
          {!data.length && (
            <div className="cards__empty">
              <div className="cards__empty-icon">
                <Shrimp className="cards__empty-svg"/>
              </div>
              <div className="cards__empty-content">
                <div className="cards__empty-title">
                  Nothing found in here
                </div>
                <div className="cards__empty-description">
                  There are currently no articles with this filter, try again later or change the filter.
                </div>
              </div>
            </div>
          )}
        </div>
        {!!data.length && (
          <Pagination
            page={current}
            last={last}
            onClick={onClick}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        )}
      </div>
    </section>
  );
}

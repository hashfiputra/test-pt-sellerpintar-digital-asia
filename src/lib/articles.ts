import axios from "axios";

import { getExcerpt } from "@lib/utils";
import { type Category } from "@lib/categories";
import { type User } from "@lib/auth";

const BASE = "https://test-fe.mysellerpintar.com";
const PATH = "/api/articles";

export type Article = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  userId: string;
  categoryId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
};

export type Articles = {
  data: Article[];
  total: number;
  page: number;
  limit: number;
};

export type GetArticlesProps = {
  articleId?: string;
  userId?: string;
  title?: string;
  category?: string;
  createdAtStart?: string;
  updatedAtEnd?: string;
  sortOrder?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
};

export async function getArticles(props: GetArticlesProps = {}) {
  const url = new URL(PATH, BASE);
  const pageParsed = props.page ? Math.abs(props.page).toString() : null;
  const limitParsed = props.limit ? Math.abs(props.limit).toString() : null;

  if (props.articleId) url.searchParams.set("articleId", props.articleId);
  if (props.userId) url.searchParams.set("userId", props.userId);
  if (props.title) url.searchParams.set("title", props.title);
  if (props.category) url.searchParams.set("category", props.category);
  if (props.createdAtStart) url.searchParams.set("createdAtStart", props.createdAtStart);
  if (props.updatedAtEnd) url.searchParams.set("updatedAtEnd", props.updatedAtEnd);
  if (props.sortOrder) url.searchParams.set("sortOrder", props.sortOrder);
  if (props.sortBy) url.searchParams.set("sortBy", props.sortBy);

  if (limitParsed) url.searchParams.set("limit", limitParsed);
  if (pageParsed) url.searchParams.set("page", pageParsed);

  const link = url.toString();
  const { data } = await axios.get<Articles>(link);

  for (const item of data.data) {
    const excerpt = getExcerpt(item.content);
    const createdMs = Date.parse(item.createdAt);
    const updatedMs = Date.parse(item.updatedAt);

    item.excerpt = excerpt || "Content is empty, there's no excerpt to display";
    item.createdAt = new Date(createdMs).getTime().toString();
    item.updatedAt = new Date(updatedMs).getTime().toString();
  }

  return data;
}

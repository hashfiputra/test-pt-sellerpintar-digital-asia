import { cookies } from "next/headers";
import axios from "axios";

import { getExcerpt } from "@lib/utils";
import { type Category } from "@lib/categories";
import { type User, decrypt } from "@lib/auth";

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
  user: Pick<User, "id" | "username">;
};

export type Articles = {
  data: Article[];
  total: number;
  page: number;
  limit: number;
};

export type GetArticlesPayload = {
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

export type GetArticlePayload = {
  id: string;
};

export type CreateArticlePayload = { title: string; content: string; categoryId: string };
export type EditArticlePayload = { id: string; } & CreateArticlePayload;
export type DeleteArticlePayload = { id: string; };

export async function getArticles(payload: GetArticlesPayload = {}) {
  const url = new URL(PATH, BASE);
  const pageParsed = payload.page ? Math.abs(payload.page).toString() : null;
  const limitParsed = payload.limit ? Math.abs(payload.limit).toString() : null;

  if (payload.articleId) url.searchParams.set("articleId", payload.articleId);
  if (payload.userId) url.searchParams.set("userId", payload.userId);
  if (payload.title) url.searchParams.set("title", payload.title);
  if (payload.category) url.searchParams.set("category", payload.category);
  if (payload.createdAtStart) url.searchParams.set("createdAtStart", payload.createdAtStart);
  if (payload.updatedAtEnd) url.searchParams.set("updatedAtEnd", payload.updatedAtEnd);
  if (payload.sortOrder) url.searchParams.set("sortOrder", payload.sortOrder);
  if (payload.sortBy) url.searchParams.set("sortBy", payload.sortBy);

  if (limitParsed) url.searchParams.set("limit", limitParsed);
  if (pageParsed) url.searchParams.set("page", pageParsed);

  const link = url.toString();
  const { data } = await axios.get<Articles>(link);

  for (const item of data.data) {
    const basic = "Content is empty, there's no excerpt to display";
    item.excerpt = getExcerpt(item.content) || basic;
  }

  return data;
}

export async function getArticle(payload: GetArticlePayload) {
  const url = new URL(PATH + "/" + payload.id, BASE);
  const link = url.toString();

  const { data } = await axios.get<Article>(link);
  const basic = "Content is empty, there's no excerpt to display";
  data.excerpt = getExcerpt(data.content) || basic;

  return data;
}

export async function createArticle(payload: CreateArticlePayload) {
  const store = await cookies();
  const session = store.get("session")?.value;
  const { token } = await decrypt(session);

  const url = new URL(PATH, BASE);
  const link = url.toString();
  const config = { headers: { "Authorization": `Bearer ${token}` } };
  const { data } = await axios.post<Article>(link, payload, config);

  return data;
}

export async function editArticle(payload: EditArticlePayload) {
  const store = await cookies();
  const session = store.get("session")?.value;
  const { token } = await decrypt(session);

  const { id, ...body } = payload;
  const url = new URL(PATH + "/" + id, BASE);
  const link = url.toString();
  const config = { headers: { "Authorization": `Bearer ${token}` } };
  const { data } = await axios.put<Article>(link, body, config);

  return data;
}

export async function deleteArticle(payload: DeleteArticlePayload) {
  const store = await cookies();
  const session = store.get("session")?.value;
  const { token } = await decrypt(session);

  const { id } = payload;
  const url = new URL(PATH + "/" + id, BASE);
  const link = url.toString();
  const config = { headers: { "Authorization": `Bearer ${token}` } };
  const { data } = await axios.delete(link, config);

  return data;
}

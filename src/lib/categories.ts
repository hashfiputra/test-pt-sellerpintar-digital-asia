import { cookies } from "next/headers";
import axios from "axios";

import { decrypt } from "@lib/auth";

const BASE = "https://test-fe.mysellerpintar.com";
const PATH = "/api/categories";

export type Category = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Categories = {
  data: Category[];
  totalData: number;
  currentPage: number;
  totalPages: number;
};

export type GetCategoriesPayload = {
  search?: string;
  limit?: number;
  page?: number;
};

export type GetCategoryAllPayload = Pick<
  GetCategoriesPayload, "search"
>;

export type CreateCategoryPayload = { name: string; };
export type EditCategoryPayload = { id: string; name: string; };
export type DeleteCategoryPayload = { id: string; };

export async function getCategories(payload: GetCategoriesPayload = {}) {
  const url = new URL(PATH, BASE);
  const limitParsed = payload.limit ? Math.abs(payload.limit).toString() : null;
  const pageParsed = payload.page ? Math.abs(payload.page).toString() : null;

  if (payload.search) url.searchParams.set("search", payload.search);
  if (limitParsed) url.searchParams.set("limit", limitParsed);
  if (pageParsed) url.searchParams.set("page", pageParsed);

  const link = url.toString();
  const { data } = await axios.get<Categories>(link);

  return data;
}

export async function getCategoriesAll(payload: GetCategoryAllPayload = {}) {
  const url = new URL(PATH, BASE);
  if (payload.search) url.searchParams.set("search", payload.search);
  url.searchParams.set("page", "1");

  let current = 1;
  let link = url.toString();

  const { data } = await axios.get<Categories>(link);
  const total = data.totalPages;

  while (current++ < total) {
    const page = current.toString();
    url.searchParams.set("page", page);
    link = url.toString();

    const { data: update } = await axios.get<Categories>(link);
    data.data = [...data.data, ...update.data];
    data.currentPage = current;
  }

  return data;
}

export async function createCategory(payload: CreateCategoryPayload) {
  const store = await cookies();
  const session = store.get("session")?.value;
  const { token } = await decrypt(session);

  const url = new URL(PATH, BASE);
  const link = url.toString();
  const config = { headers: { "Authorization": `Bearer ${token}` } };
  const { data } = await axios.post<Category>(link, payload, config);

  return data;
}

export async function editCategory(payload: EditCategoryPayload) {
  const store = await cookies();
  const session = store.get("session")?.value;
  const { token } = await decrypt(session);

  const { id, name } = payload;
  const url = new URL(PATH + "/" + id, BASE);
  const link = url.toString();
  const config = { headers: { "Authorization": `Bearer ${token}` } };
  const { data } = await axios.put<Category>(link, { name }, config);

  return data;
}

export async function deleteCategory(payload: DeleteCategoryPayload) {
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

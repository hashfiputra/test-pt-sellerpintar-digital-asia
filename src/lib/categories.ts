import axios from "axios";

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

export async function getCategoriesAll(search?: string) {
  const url = new URL(PATH, BASE);
  if (search) url.searchParams.set("search", search);
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

export async function getCategories(search?: string, limit?: number, page?: number) {
  const url = new URL(PATH, BASE);
  const limitParsed = limit ? Math.abs(limit).toString() : null;
  const pageParsed = page ? Math.abs(page).toString() : null;

  if (search) url.searchParams.set("search", search);
  if (limitParsed) url.searchParams.set("limit", limitParsed);
  if (pageParsed) url.searchParams.set("page", pageParsed);

  const link = url.toString();
  const { data } = await axios.get<Categories>(link);

  return data;
}

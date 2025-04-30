import axios from "axios";
import { NextResponse } from "next/server";

import { toNumber } from "@lib/utils";
import { getArticles, type GetArticlesProps } from "@lib/articles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const payload: GetArticlesProps = {
    articleId: searchParams.get("articleId") || undefined,
    userId: searchParams.get("userId") || undefined,
    title: searchParams.get("title") || undefined,
    category: searchParams.get("category") || undefined,
    createdAtStart: searchParams.get("createdAtStart") || undefined,
    updatedAtEnd: searchParams.get("updatedAtEnd") || undefined,
    sortOrder: searchParams.get("sortOrder") || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    limit: toNumber(searchParams.get("limit")) || 9,
    page: toNumber(searchParams.get("page")) || 1,
  };

  try {
    const data = await getArticles(payload);
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (e) {
    const message = axios.isAxiosError(e) ? e.response?.data?.error : "Something went wrong, try again later";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
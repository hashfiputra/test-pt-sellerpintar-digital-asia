import axios from "axios";
import { NextResponse } from "next/server";

import { toBoolean, toNumber } from "@lib/utils";
import { getCategoriesAll, getCategories } from "@lib/categories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const limit = toNumber(searchParams.get("limit")) || 10;
  const page = toNumber(searchParams.get("page")) || 1;
  const all = toBoolean(searchParams.get("all")) || false;

  try {
    const action = all ? getCategoriesAll : getCategories;
    const categories = await action(search, limit, page);

    return NextResponse.json({ success: true, ...categories }, { status: 200 });
  } catch (e) {
    const message = axios.isAxiosError(e) ? e.response?.data?.error : "Something went wrong, try again later";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { toBoolean, toNumber } from "@lib/utils";
import { getCategoriesAll, getCategories, createCategory } from "@lib/categories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const payload = {
    search: searchParams.get("search") || undefined,
    limit: toNumber(searchParams.get("limit")) || 10,
    page: toNumber(searchParams.get("page")) || 1,
  };

  const all = toBoolean(searchParams.get("all")) || false;
  const action = all ? getCategoriesAll : getCategories;

  try {
    const data = await action(payload);
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await createCategory(payload);

    const message = "Category created successfully";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

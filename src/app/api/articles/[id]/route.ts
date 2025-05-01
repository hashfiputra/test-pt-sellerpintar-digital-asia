import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { getArticle, GetArticlePayload } from "@lib/articles";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload: GetArticlePayload = { id };

  try {
    const data = await getArticle(payload);
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (e) {
    const message = isAxiosError(e) ? e.response?.data?.error : "Something went wrong, try again later";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { type GetArticlePayload, deleteArticle, editArticle, getArticle } from "@lib/articles";

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
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await request.json();
    await editArticle({ id, ...payload });

    const message = "Article updated successfully";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteArticle({ id });

    const message = "Article deleted successfully";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}
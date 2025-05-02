import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { editCategory, deleteCategory } from "@lib/categories";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payload = await request.json();
    await editCategory({ id, ...payload });

    const message = "Category updated successfully";
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
    await deleteCategory({ id });

    const message = "Category deleted successfully";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

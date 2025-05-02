import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { uploadImage } from "@lib/image";

export async function POST(request: Request) {
  try {
    const payload = await request.formData();
    const { imageUrl } = await uploadImage(payload);

    return NextResponse.json({ success: true, imageUrl }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

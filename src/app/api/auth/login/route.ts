import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

import { authLogin } from "@lib/auth";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { username, password } = payload;
    await authLogin({ username, password });

    const message = "Login successful, redirecting to homepage...";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

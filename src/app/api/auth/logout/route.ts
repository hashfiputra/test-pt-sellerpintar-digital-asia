import { NextResponse } from "next/server";
import { authLogout } from "@lib/auth";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    await authLogout();
    const message = "Logout successful";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const response = isAxiosError(e) ? e.response : null;
    const message = response?.data?.error || "Something went wrong, try again later";
    const status = response?.status || 400;
    return NextResponse.json({ success: false, message }, { status });
  }
}

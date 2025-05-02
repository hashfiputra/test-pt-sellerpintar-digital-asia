import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { authProfile } from "@lib/auth";

export async function GET() {
  try {
    const data = await authProfile();
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch(e) {
    const message = isAxiosError(e) ? e.response?.data?.error : "Something went wrong, try again later";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

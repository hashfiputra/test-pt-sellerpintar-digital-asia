import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

import { authRegister } from "@lib/auth";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { username, password, role } = payload;
    await authRegister({ username, password, role });

    const message = "Registration successful, redirecting to homepage...";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const message = isAxiosError(e) ? e.response?.data?.error : "Something went wrong, try again later";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { encrypt } from "@lib/auth";

export async function POST(request: Request) {
  const payload = await request.json();
  const base = "https://test-fe.mysellerpintar.com";
  const path = "/api/auth/login";

  try {
    const url = new URL(path, base).toString();
    const { data } = await axios.post(url, payload);
    const { username } = payload;
    const { token, role } = data;

    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const session = await encrypt({ token, username, role });
    const store = await cookies();

    store.set("session", session, {
      expires: new Date(expires),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    const message = "Login successful, redirecting to homepage...";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (e) {
    const message = axios.isAxiosError(e) ? e.response?.data?.error : "Something went wrong, try again later";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

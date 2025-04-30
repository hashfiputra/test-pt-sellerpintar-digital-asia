import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const base = "https://test-fe.mysellerpintar.com";
  const path = "/api/auth/register";

  try {
    const url = new URL(path, base).toString();
    await axios.post(url, payload);

    const message = "Registration successful, login to continue";
    return NextResponse.json({success: true, message}, {status: 200});
  } catch (e) {
    const message = axios.isAxiosError(e) ? e.response?.data?.error : "Something went wrong, try again later";
    return NextResponse.json({success: false, message}, {status: 400});
  }
}

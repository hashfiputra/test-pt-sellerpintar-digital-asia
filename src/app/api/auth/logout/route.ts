import { NextResponse } from "next/server";
import { authLogout } from "@lib/auth";

export async function GET() {
  try {
    await authLogout();
    const message = "Logout successful";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch {
    const message = "Something went wrong, try again later";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

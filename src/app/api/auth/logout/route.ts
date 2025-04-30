import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const store = await cookies();
    store.delete("session");

    return NextResponse.json({success: true});
  } catch {
    const message = "Something went wrong, try again later";
    return NextResponse.json({success: false, message}, {status: 400});
  }
}

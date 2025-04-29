import { cookies } from "next/headers";

import { encrypt, login } from "@lib/auth";
import { getResponse } from "@lib/utils";

export async function POST(request: Request) {
  const payload = await request.json();
  const {success, token, role, message} = await login(payload);
  if (!success || !token || !role) return getResponse({success: false, message});

  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const session = await encrypt(token, role);
  const store = await cookies();

  store.set("session", session, {
    expires: new Date(expires),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return getResponse({success: true, session});
}

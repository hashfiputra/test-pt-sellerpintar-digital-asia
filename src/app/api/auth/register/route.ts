import { register } from "@lib/auth";
import { getResponse } from "@lib/utils";

export async function POST(request: Request) {
  const payload = await request.json();
  const {success, message} = await register(payload);
  if (!success) return getResponse({success: false, message});

  return getResponse({success: true, message});
}

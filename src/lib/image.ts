import { cookies } from "next/headers";
import axios from "axios";

import { decrypt } from "@lib/auth";

const BASE = "https://test-fe.mysellerpintar.com";
const PATH = "/api/upload";

export type Image = { imageUrl: string };
export type UploadImagePayload = FormData;

export async function uploadImage(payload: UploadImagePayload) {
  const store = await cookies();
  const session = store.get("session")?.value;
  const { token } = await decrypt(session);

  const url = new URL(PATH, BASE);
  const link = url.toString();
  const config = { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
  const { data } = await axios.post<Image>(link, payload, config);

  return data;
}

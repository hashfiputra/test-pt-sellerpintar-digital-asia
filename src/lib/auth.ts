import axios from "axios";
import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";

const SECRET_KEY = process.env.SESSION_SECRET;
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginResponse = {
  token: string;
  role: "User" | "Admin";
  error?: string;
};

export const loginSchema = z.object({
  username: z.string().nonempty("Please enter your username"),
  password: z.string().nonempty("Please enter your password"),
});

export async function login(payload: LoginSchema) {
  const base = "https://test-fe.mysellerpintar.com";
  const path = "/api/auth/login";

  try {
    const url = new URL(path, base).toString();
    const {data} = await axios.post<LoginResponse>(url, payload);
    const {token, role} = data;

    return {success: true, token, role};
  } catch (error) {
    const basic = "Something went wrong, please try again later.";
    const message = axios.isAxiosError(error) ? error.response?.data?.error || error.message || basic : basic;

    return {success: false, message};
  }
}

export async function encrypt(token: LoginResponse["token"], role: LoginResponse["role"]) {
  return await new SignJWT({token, role})
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(ENCODED_KEY);
}

export async function decrypt(jwt: string | undefined = "") {
  const options = {algorithms: ["HS256"]};
  const {payload} = await jwtVerify(jwt, ENCODED_KEY, options);

  return payload;
}

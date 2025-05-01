import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import axios from "axios";

const BASE = "https://test-fe.mysellerpintar.com";
const PATH = "/api/auth";

const SECRET_KEY = process.env.SESSION_SECRET;
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

export type User = {
  id: string;
  username: string;
  role: "User" | "Admin";
  createdAt: string;
  updatedAt: string;
};

export type UserEncrypt = {
  token: string;
  username: User["username"];
  role: User["role"];
};

export type LoginPayload = {
  username: User["username"];
  password: string;
};

export type RegisterPayload = LoginPayload & {
  role: User["role"];
};

export async function encrypt(payload: UserEncrypt) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(ENCODED_KEY);
}

export async function decrypt(jwt: string | undefined = "") {
  const options = { algorithms: ["HS256"] };
  const { payload } = await jwtVerify<UserEncrypt>(jwt, ENCODED_KEY, options);

  return payload;
}

export async function authLogin(payload: LoginPayload) {
  const url = new URL(PATH + "/login", BASE);
  const link = url.toString();

  const { data } = await axios.post(link, payload);
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

  return true;
}

export async function authRegister(payload: RegisterPayload) {
  const url = new URL(PATH + "/register", BASE);
  const link = url.toString();

  await axios.post(link, payload);
  await authLogin(payload);

  return true;
}

export async function authLogout() {
  const store = await cookies();
  store.delete("session");

  return true;
}

export async function authProfile() {
  const url = new URL(PATH + "/profile", BASE);
  const link = url.toString();

  const store = await cookies();
  const session = store.get("session")?.value;
  const { token } = await decrypt(session);
  const { data } = await axios.get<User>(link, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
}

import axios from "axios";
import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";

const SECRET_KEY = process.env.SESSION_SECRET;
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export type LoginResponse = {
  token: string;
  role: RegisterResponse["role"];
  error?: string;
};

export type RegisterResponse = {
  "username": string;
  "password": string;
  "role": "User" | "Admin",
  "createdAt": string;
  "updatedAt": string;
};

export const loginSchema = z.object({
  username: z.string().nonempty("Please enter your username"),
  password: z.string().nonempty("Please enter your password"),
});

export const registerSchema = z.object({
  username: z.string()
    .nonempty("Username field cannot be empty")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores and hyphens"),
  password: z.string()
    .nonempty("Password field cannot be empty")
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/, "Password must contain A-Z, a-z, and 0-9\n"),
  role: z.enum(["User", "Admin"], {
    errorMap: () => ({message: "Please select a valid role"}),
  }),
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
    const basic = "Something went wrong, try again later";
    const message = axios.isAxiosError(error) ? error.response?.data?.error || error.message || basic : basic;

    return {success: false, message};
  }
}

export async function register(payload: RegisterSchema) {
  const base = "https://test-fe.mysellerpintar.com";
  const path = "/api/auth/register";

  try {
    const url = new URL(path, base).toString();
    await axios.post<RegisterResponse>(url, payload);
    const message = "Registration successful, login to continue";

    return {success: true, message};
  } catch (error) {
    const basic = "Something went wrong, try again later";
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

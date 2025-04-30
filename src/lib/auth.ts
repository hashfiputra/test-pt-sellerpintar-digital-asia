import { z } from "zod";
import { jwtVerify, SignJWT } from "jose";

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

export type EncryptPayload = {
  token: LoginResponse["token"];
  username: LoginSchema["username"];
  role: LoginResponse["role"];
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
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

export async function encrypt(payload: EncryptPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(ENCODED_KEY);
}

export async function decrypt(jwt: string | undefined = "") {
  const options = { algorithms: ["HS256"] };
  const { payload } = await jwtVerify<EncryptPayload>(jwt, ENCODED_KEY, options);

  return payload;
}

"use server";
import { cookies } from "next/headers";

export async function getSession() {
  return (await cookies()).get("session")?.value;
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

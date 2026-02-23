import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const response = await fetch(`${appUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password", data: null },
        { status: 401 },
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: "Login failed", success: false, data: null },
        { status: 401 },
      );
    }
    const data = await response.json();
    if (response.ok && data.user && data.token) {
      const cookieStore = await cookies();
      cookieStore.set(
        "session",
        JSON.stringify({
          token: data.token,
          user: data.user,
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: data,
    });
  } catch (error) {
    console.log("Login Error-----", error);
    return NextResponse.json(
      { message: "Something went wrong", success: false, data: null },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const sessionCookie = await getSession();
    if (!sessionCookie) {
      throw new Error("Not Authenticated");
    }
    const session = JSON.parse(sessionCookie);
    console.log("Session", session);
    const result = await fetch(`${appUrl}/api/v1/employee`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "Content-Type": "application/json",
      },
    });

    const data = result.json();
    console.log(data);
    return NextResponse.json(
      {
        success: true,
        data: data,
        message: "Employees retrieved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET employees error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch users", data: null },
      { status: 500 },
    );
  }
}

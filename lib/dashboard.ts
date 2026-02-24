"use server";
import { getSession } from "./auth";
export async function getdashboardDetails() {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const sessionCookie = await getSession();
    if (!sessionCookie) {
      throw new Error("Not Authenticated. Logout and try againlo");
    }
    const session = JSON.parse(sessionCookie);
    const url = `${appUrl}/api/v1/dashboard`;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const contentType = result.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error("User not Authenticated. Logout and try again");
    }
    const res = await result.json();
    console.log("Response-------", res);
    if (!res) {
      throw new Error("Couldn't retrieve dashboard details");
    }
    return {
      success: true,
      data: res,
      message: "Dashboard details retrieved successfully",
    };
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "Could not fetch dashboard details";
    console.log(error);
    return { success: false, message: msg, data: null };
  }
}

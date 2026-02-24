"use server";
import { getSession } from "./auth";
export async function getAllEmployees(
  page: number,
  searchQuery: string | null,
) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const sessionCookie = await getSession();
    if (!sessionCookie) {
      throw new Error("Not Authenticated");
    }
    const session = JSON.parse(sessionCookie);
    const url = `${appUrl}/api/v1/employee?page=${page}&${searchQuery ?? ""}`;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const contentType = result.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error("User not Authenticated");
    }
    const res = await result.json();
    if (!res.success || !res.data) {
      throw new Error("Couldn't retrieve employee list");
    }
    return {
      success: true,
      data: res.data,
      message: "Employees retrieved successfully",
    };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : "Could not fetch employee list";
    console.log(error);
    return { success: false, message: msg, data: null };
  }
}

export async function getSingleEmployee(id: number) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const sessionCookie = await getSession();
    if (!sessionCookie) {
      throw new Error("Not Authenticated");
    }
    const session = JSON.parse(sessionCookie);
    const url = `${appUrl}/api/v1/employee/${id}`;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const contentType = result.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error("User not Authenticated");
    }
    const res = await result.json();
    if (!res.success || !res.data) {
      throw new Error("Couldn't retrieve employee's details");
    }
    return {
      success: true,
      data: res.data,
      message: "Employee's details retrieved successfully",
    };
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "Could not fetch employee's details";
    console.log(error);
    return { success: false, message: msg, data: null };
  }
}

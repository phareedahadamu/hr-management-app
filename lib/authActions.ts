export async function login(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData,
) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const result = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await result.json();
    if (!res.data || !res.success) {
      throw new Error(res.message);
    }
    console.log("Login----", res);
    return { success: true, message: "Login Successful" };
  } catch (error) {
    console.log("Login Error", error);
    const errorMsg = error instanceof Error ? error.message : "Login failed";
    return { success: false, message: errorMsg };
  }
}

import * as z from "zod";
export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("Password must be a string")
    .min(1, "Password is required"),
});

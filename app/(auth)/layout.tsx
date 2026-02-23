import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionCookie = await getSession();
  if (sessionCookie) {
    redirect("/");
  }
  return <>{children}</>;
}

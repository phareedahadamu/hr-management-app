import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionCookie = await getSession();

  if (!sessionCookie) {
    redirect("/login");
  }
  const session = JSON.parse(sessionCookie);
  return (
    <SessionProvider session={session}>
      <div className="w-full flex flex-col">
        <Header />
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}

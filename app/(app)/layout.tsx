import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import ResponsiveSideBar from "@/components/ResponsiveSideBar";
import { SidebarProvider } from "@/components/SideBarProvider";

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
      <SidebarProvider>
        <div className="w-full flex flex-col">
          <Header />
          <div className="flex items-start bg-grey-6">
            <ResponsiveSideBar />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}

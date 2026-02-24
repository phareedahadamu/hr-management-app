"use client";
import { useSession } from "@/lib/provider";
import { appRoutes } from "@/lib/appRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/lib/provider";
import { useMediaQuery } from "@/lib/hooks";
import { LogOut } from "lucide-react";
import { logOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
export default function Sidebar() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sideBarContext = useSidebar();
  const closeSidebar = sideBarContext ? sideBarContext?.closeSidebar : () => {};
  const session = useSession();
  const pathname = usePathname();
  if (!session || !session.user) return;

  const appRoutesComps = appRoutes.map((r, index) => {
    const activePath =
      r.url &&
      (r.url === "/" ? pathname === r.url : pathname.startsWith(r.url));
    return (
      <Link
        onClick={() => {
          if (isMobile) {
            closeSidebar();
          }
        }}
        href={r.url}
        key={index}
        className={`px-4 py-3 text-bt rounded-[10px] items-center flex gap-3 duration-200 transition-colors ${activePath ? "bg-blue-3 text-blue-2" : "text-blue-4 hover:bg-blue-3/25"} ${r.url === "" ? "pointer-events-none" : "pointer-events-auto"}`}
      >
        <r.icon
          size={20}
          className={`${activePath ? "text-blue-2" : "text-grey-5"}`}
        />
        {r.name}
      </Link>
    );
  });
  return (
    <aside className="border-r-[0.89px] border-r-grey-4 flex flex-col  w-[256px] min-h-[calc(100dvh-73px)] py-4 justify-between bg-white">
      <div className="flex flex-col gap-1 px-4 ">{appRoutesComps}</div>
      <div className="flex flex-col w-full px-4 gap-4">
        <hr className="w-full text-grey-4" />
        {!isMobile && (
          <div className="rounded-[10px] border-[0.89px] border-blue-5 bg-blue-3 p-4.25 flex flex-col items-center gap-1">
            <p className="text-grey-1 text-bt font-bold">Need Help?</p>
            <p className="text-[12px] text-blue-1">
              Contact HR support for assistance
            </p>
            <Link
              href=""
              className="pointer-events-none w-full bg-white h-8.25 rounded-lg text-blue-2 border-[0.89px] border-blue-5 text-[12px] flex justify-center items-center "
            >
              Contact Support
            </Link>
          </div>
        )}
        <button
          className={`px-4 py-2 text-bt rounded-[10px] items-center flex gap-3 duration-200 transition-colors text-grey-2 border-[0.89px] border-grey-2 hover:border-grey-2/40 cursor-pointer justify-center`}
          onClick={async () => {
            await logOut();
            router.push("/login");
          }}
        >
          <LogOut size={16} className="text-inherit" /> LogOut
        </button>
      </div>
    </aside>
  );
}

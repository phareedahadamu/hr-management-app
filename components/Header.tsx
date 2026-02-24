"use client";
import Image from "next/image";
import { useSession } from "@/lib/provider";
import { Bell, CircleQuestionMark, Menu, X } from "lucide-react";
import { useSidebar } from "@/lib/provider";
import { useMediaQuery } from "@/lib/hooks";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sideBarContext = useSidebar();
  const toggleSidebar = sideBarContext
    ? sideBarContext?.toggleSidebar
    : () => {};
  const isOpen = sideBarContext?.isOpen;
  const session = useSession();
  if (!session || !session.user) return;

  return (
    <nav className="flex w-full justify-between items-center md:px-8 px-4 h-18.25 border-b-[0.89px] border-b-grey-4 bg-white">
      <Image src="/logo.png" width={162} height={38} alt="logo" />
      <div className="flex md:gap-4 gap-2">
        <button
          disabled
          className="not-disabled:hover:text-grey-1/80 text-grey-1 cursor-pointer disabled:cursor-not-allowed duration-200 transition-colors"
        >
          <CircleQuestionMark size={16} className="text-inherit" />
        </button>
        <button
          className="not-disabled:hover:text-grey-1/80 text-grey-1 cursor-pointer disabled:cursor-not-allowed duration-200 transition-colors"
          disabled
        >
          <Bell size={16} className="text-inherit" />
        </button>
        <p className="text-[20px] text-white rounded-full bg-grey-2 size-8 text-center leading-8">
          {session.user.name[0].toUpperCase()}
        </p>
        {isMobile && (
          <button
            className="hover:text-grey-3 text-grey-2 cursor-pointer duration-200 transition-colors"
            onClick={() => {
              toggleSidebar();
            }}
          >
            {isOpen ? (
              <X className="text-inherit" size={24} />
            ) : (
              <Menu className="text-inherit" size={24} />
            )}
          </button>
        )}
      </div>
    </nav>
  );
}

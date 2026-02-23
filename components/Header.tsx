"use client";
import Image from "next/image";
import { useSession } from "@/lib/provider";
import { Bell, CircleQuestionMark } from "lucide-react";

export default function Header() {
  const session = useSession();
  if (!session || !session.user) return;

  return (
    <nav className="flex w-full justify-between items-center px-8 h-18.25 border-b-[0.89px] border-b-grey-4">
      <Image src="/logo.png" width={162} height={38} alt="logo" />
      <div className="flex gap-4">
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
      </div>
    </nav>
  );
}

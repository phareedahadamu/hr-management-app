"use client";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "@/lib/hooks";
import { useSidebar } from "@/lib/provider";
export default function ResponsiveSideBar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sideBarContext = useSidebar();
  const isOpen = sideBarContext?.isOpen;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  return (
    <>
      {isMobile === null ? (
        <></>
      ) : !isMobile ? (
        <Sidebar />
      ) : isOpen ? (
        <div className="fixed top-18.5 bottom-0 left-0 right-0 flex flex-col w-full">
          <div className="flex w-full bg-black/25 backdrop-blur-md">
            <Sidebar />
          </div>
        </div>
      ) : null}
    </>
  );
}

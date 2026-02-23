"use client";
import { Session } from "@/lib/types";
import { ReactNode } from "react";
import { SessionContext } from "@/lib/provider";

export default function SessionProvider({
  session,
  children,
}: {
  session: Session;
  children: ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

import { Session } from "./types";
import { createContext, useContext } from "react";
export const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  return context ?? null;
};

import { Session } from "./types";
import { createContext, useContext } from "react";
export const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  return context ?? null;
};

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  return context ?? null;
};

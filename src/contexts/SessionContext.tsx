"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

export type SessionContextType = {
  authenticated: boolean;
  username?: string;
  role?: string;
};

export type SessionProviderType = PropsWithChildren<{
  username?: string;
  role?: string;
}>;

export const SessionContext = createContext<
  SessionContextType
>({ authenticated: false });

export const SessionProvider = (props: SessionProviderType) => {
  const { children, username, role } = props;
  const value = username && role ? { authenticated: true, username, role } : { authenticated: false };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) throw new Error("useSession should be used within <SessionProvider>");

  return context;
};

export default SessionProvider;

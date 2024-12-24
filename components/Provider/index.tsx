"use client";

import { SessionProvider } from "next-auth/react";
import * as React from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

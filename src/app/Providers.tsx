"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextUiProviderProps {
  children: ReactNode;
}
export default function NextUiProvider({ children }: NextUiProviderProps) {
  return (
    <SessionProvider>
      {/* Session provider is for get access to session obejct on client component */}
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}

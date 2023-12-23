"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}

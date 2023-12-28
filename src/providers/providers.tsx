"use client"

import { SessionProvider } from "next-auth/react"

import { Toaster } from "@/components/ui/sonner"

import { ThemeProvider } from "./theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Toaster richColors position="top-center" />
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

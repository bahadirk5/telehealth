"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

import { register } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const initialState = { message: null, errors: {} }
  const [state, action] = useFormState(register, initialState)
  const { pending } = useFormStatus()

  return (
    <div className={cn("grid gap-6")}>
      <form action={action}>
        <div className="grid gap-4">
          {state.message && (
            <div
              id="name-error"
              aria-live="polite"
              className="px-1 text-xs text-red-600"
            >
              <p key={state.message}>{state.message}</p>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="m@example.com"
              disabled={pending}
              required
            />
            {state.errors?.name ? (
              <div
                id="name-error"
                aria-live="polite"
                className="px-1 text-xs text-red-600"
              >
                {state.errors.name.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              disabled={pending}
              required
            />
            {state.errors?.email ? (
              <div
                id="name-error"
                aria-live="polite"
                className="px-1 text-xs text-red-600"
              >
                {state.errors.email.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              disabled={pending}
              required
            />
            {state.errors?.password ? (
              <div
                id="name-error"
                aria-live="polite"
                className="px-1 text-xs text-red-600"
              >
                {state.errors.password.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
          <Button aria-disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  )
}

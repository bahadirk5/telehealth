"use client"

import * as React from "react"
import { register } from "@/actions/register"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const { pending } = useFormStatus()
  const { execute, fieldErrors } = useAction(register, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    execute({ name, email, password })
  }
  return (
    <div className={cn("grid gap-6")}>
      <form action={onSubmit}>
        <div className="grid gap-4">
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
            {fieldErrors?.name ? (
              <div
                id="name-error"
                aria-live="polite"
                className="px-1 text-xs text-rose-500"
              >
                {fieldErrors.name.map((error: string) => (
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
            {fieldErrors?.email ? (
              <div
                id="name-error"
                aria-live="polite"
                className="px-1 text-xs text-rose-500"
              >
                {fieldErrors.email.map((error: string) => (
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
            {fieldErrors?.password ? (
              <div
                id="name-error"
                aria-live="polite"
                className="px-1 text-xs text-rose-500"
              >
                {fieldErrors.password.map((error: string) => (
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

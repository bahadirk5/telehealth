"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

const formSchema = z.object({
  specialty: z
    .string()
    .min(2, { message: "Specialty must be at least 2 characters long." })
    .max(30, { message: "Specialty must be no more than 30 characters long." }),
})

export function BecomeAProviderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialty: "",
    },
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const { data: session, status, update } = useSession()
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)
    try {
      await axios.post("/api/provider/enroll", values)
      toast.success("Enrollment successful")
      await update({ role: "Provider" })
      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data || error.message)
        toast.error("Error: " + (error.response?.data.message || error.message))
      } else {
        console.error("Unexpected error:", error)
        toast.error("Unexpected error.")
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialty</FormLabel>
              <FormControl>
                <Input placeholder="Neurology" {...field} />
              </FormControl>
              <FormDescription>
                List your areas of expertise or specialization (e.g., Neurology,
                Counseling).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="hover:bg-primary-600 rounded bg-primary px-4 py-2 font-bold text-primary-foreground"
          disabled={isSaving}
        >
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  )
}

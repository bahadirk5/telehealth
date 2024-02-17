"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"

const FormSchema = z.object({
  date: z.array(
    z.date({
      required_error: "Please select a date or use the calendar to override.",
    })
  ),
})

export function DateOverrideForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:border-r md:pr-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Calendar
                    mode="multiple"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>{form.getValues("date")?.length > 0 ? <p>adana</p> : null}</div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

"use client"

import { useParams, useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { MultipleFileUploader } from "@/components/multiple-uploader"
import { Uploader } from "@/components/uploader"

export function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string
  description: string
  helpText: string
  inputAttrs: {
    name: string
    type: string
    defaultValue: string | string[]
    placeholder?: string
    maxLength?: number
    pattern?: string
  }
  handleSubmit: any
}) {
  const { id } = useParams() as { id?: string }
  const router = useRouter()

  return (
    <form
      action={async (data: FormData) => {
        handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
          if (res.error) {
            toast.error(res.error)
          } else {
            if (id) {
              router.refresh()
            } else {
              router.refresh()
            }
            toast.success(`Successfully updated ${inputAttrs.name}!`)
          }
        })
      }}
      className="rounded-lg border"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h4>
        <Label>{description}</Label>
        {inputAttrs.name === "image" ? (
          <Uploader
            defaultValue={
              typeof inputAttrs.defaultValue === "string"
                ? inputAttrs.defaultValue
                : ""
            }
            name={inputAttrs.name}
          />
        ) : inputAttrs.name === "imageGallery" ? (
          <MultipleFileUploader
            defaultValue={
              Array.isArray(inputAttrs.defaultValue)
                ? inputAttrs.defaultValue.map((item) => {
                    // @ts-ignore
                    return { url: item.url, key: item.key }
                  })
                : []
            }
            name={inputAttrs.name}
          />
        ) : inputAttrs.type === "textarea" ? (
          <Textarea
            {...inputAttrs}
            rows={5}
            required
            className="w-full max-w-xl rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
          />
        ) : (
          <Input {...inputAttrs} required />
        )}
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-muted p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-sm">{helpText}</p>
        <FormButton />
      </div>
    </form>
  )
}

function FormButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      className={cn({ "cursor-not-allowed": pending })}
      disabled={pending}
    >
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  )
}

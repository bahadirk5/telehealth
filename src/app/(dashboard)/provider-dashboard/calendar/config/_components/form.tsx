"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { WeekDay } from "@prisma/client"
import axios from "axios"
import { Plus, X } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"

type TimeRange = { start: string; end: string }

type FormValues = {
  selectedDays: WeekDay[]
  timeRanges: Partial<Record<WeekDay, TimeRange[]>>
}

const timeRangeSchema = z.object({
  start: z.string().regex(/^\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{2}:\d{2}$/),
})

const formSchema = z.object({
  selectedDays: z.array(
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  ),
  timeRanges: z.record(timeRangeSchema.array()),
})

const weekDays: WeekDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

type FieldArrayRecord = Record<
  WeekDay,
  ReturnType<typeof useFieldArray<FormValues, `timeRanges.${WeekDay}`, "id">>
>

interface CalendarConfigFormProps {
  defaultValues: FormValues
}

export function CalendarConfigForm({ defaultValues }: CalendarConfigFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const { control, register, setValue, getValues } = form
  const selectedDays = form.watch("selectedDays")

  const fieldArrays = weekDays.reduce((acc: FieldArrayRecord, day) => {
    acc[day] = useFieldArray<FormValues, `timeRanges.${WeekDay}`, "id">({
      control,
      name: `timeRanges.${day}` as const,
    })
    return acc
  }, {} as FieldArrayRecord)

  const handleSelectedDaysChange = (day: WeekDay) => {
    const currentSelectedDays = getValues("selectedDays")
    setValue(
      "selectedDays",
      currentSelectedDays.includes(day)
        ? currentSelectedDays.filter((d) => d !== day)
        : [...currentSelectedDays, day]
    )
  }

  async function onSubmit(data: FormValues) {
    setIsSaving(true)

    try {
      // Validate that all selected days have time ranges
      const allSelectedDaysHaveTimeRanges = data.selectedDays.every((day) => {
        const dayTimeRanges = data.timeRanges[day]
        return dayTimeRanges && dayTimeRanges.length > 0
      })

      if (!allSelectedDaysHaveTimeRanges) {
        toast.error("Please set at least one time range for each selected day.")
        return
      }

      // Filter and prepare the data to be sent
      const filteredTimeRanges = Object.keys(data.timeRanges)
        .filter((day) => data.selectedDays.includes(day as WeekDay))
        .reduce(
          (obj, day) => {
            obj[day as WeekDay] = data.timeRanges[day as WeekDay] || []
            return obj
          },
          {} as Partial<Record<WeekDay, TimeRange[]>>
        )

      const finalData = {
        selectedDays: data.selectedDays,
        timeRanges: filteredTimeRanges,
      }

      // Send the request to the server
      const response = await axios.post("/api/provider/schedule", finalData)

      // Handle success
      if (response.status === 200) {
        toast.success("Form submitted successfully!")
        router.refresh()
      } else {
        throw new Error(`Request failed with status code ${response.status}`)
      }
    } catch (error) {
      // Handle errors
      console.error("Form submission error", error)
      toast.error("Error submitting form.")
    } finally {
      // Reset the saving state in both success and failure cases
      setIsSaving(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {weekDays.map((day) => (
          <div key={day}>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="mb-5 flex items-center space-x-3">
                <Switch
                  id={day}
                  {...register("selectedDays")}
                  value={day}
                  checked={selectedDays.includes(day)}
                  onCheckedChange={() => handleSelectedDaysChange(day)}
                />
                <Label htmlFor={day} className="font-medium text-foreground">
                  {day}
                </Label>
              </div>
              {selectedDays.includes(day) && (
                <div className="space-y-3">
                  {fieldArrays[day].fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-3">
                      <Controller
                        render={({ field }) => <Input type="time" {...field} />}
                        name={`timeRanges.${day}.${index}.start`}
                        control={control}
                      />
                      <Controller
                        render={({ field }) => <Input type="time" {...field} />}
                        name={`timeRanges.${day}.${index}.end`}
                        control={control}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="p-3"
                        onClick={() => fieldArrays[day].remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        fieldArrays[day].append({ start: "", end: "" })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Time Range
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
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

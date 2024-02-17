import { Pen, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { DateOverrideForm } from "./date-override-form"

export function DateOverride() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Date overrides</CardTitle>
          <CardDescription>
            Add dates when your availability changes from your daily hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between rounded-md border p-4">
            <div>
              <p className="font-semibold">Wed, 24 January</p>
              <p className="text-sm text-muted-foreground">09:00 - 15:15</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="destructive">
                <Trash className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Pen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add an override
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-max">
              <DialogHeader>
                <DialogTitle>Select the dates to override</DialogTitle>
                <DialogDescription>
                  Please select a date or use the calendar to override.
                </DialogDescription>
              </DialogHeader>
              <DateOverrideForm />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

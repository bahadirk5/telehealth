"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { PlacesAutocomplete } from "@/components/place-autocomplete"

interface MapFormProps {
  title: string
  description: string
  helpText: string
  value: {
    lat: number
    lng: number
  }
  handleSubmit: (location: { lat: number; lng: number }) => Promise<any>
}

export function MapForm({
  title,
  description,
  helpText,
  value,
  handleSubmit,
}: MapFormProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  })

  const [location, setLocation] = React.useState(value)
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const router = useRouter()

  const handleSelectLocation = (latLng: { lat: number; lng: number }) => {
    setLocation(latLng)
  }

  const handleMarkerChange = (e: any) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    handleSelectLocation(latLng)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const res = await handleSubmit(location)
      if (res.error) {
        toast.error(res.error)
      } else {
        router.refresh()
        toast.success("Location updated successfully!")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoaded) return <div>Loading map...</div>

  return (
    <form className="rounded-lg border" onSubmit={handleFormSubmit}>
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h4 className="text-xl font-semibold">{title}</h4>
        <Label>{description}</Label>
        <PlacesAutocomplete setSelected={handleSelectLocation} />
        <div className="map-container">
          <GoogleMap
            zoom={18}
            center={location}
            mapContainerClassName="map-container"
          >
            {location && (
              <MarkerF
                position={location}
                draggable={true}
                onDragEnd={handleMarkerChange}
              />
            )}
          </GoogleMap>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-muted p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-sm">{helpText}</p>
        <Button
          type="submit"
          className="hover:bg-primary-600 rounded bg-primary px-4 py-2 font-bold text-primary-foreground"
          disabled={isSaving}
        >
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}

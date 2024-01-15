import { editProvider, providerMapEdit } from "@/lib/actions"
import { getCurrentProvider } from "@/lib/data"
import { Form } from "@/components/form/form"
import { MapForm } from "@/components/form/map-form"

export default async function ProviderAddress() {
  const provider = await getCurrentProvider()
  const latlng = {
    lat: 37.7749,
    lng: -122.4194,
  }

  return (
    <>
      <Form
        title="Address"
        description="Your name on this app."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "address",
          type: "text",
          defaultValue: provider?.provider?.address!,
        }}
        handleSubmit={editProvider}
      />
      <Form
        title="Phone Number"
        description="Your name on this app."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "phone_number",
          type: "text",
          defaultValue: provider?.provider?.phone_number!,
          maxLength: 32,
        }}
        handleSubmit={editProvider}
      />
      <MapForm
        title="Provider Address"
        description="Set your location on the map."
        helpText="Please use 32 characters maximum."
        //@ts-ignore
        value={provider?.provider?.latlng || latlng}
        handleSubmit={providerMapEdit}
      />
    </>
  )
}

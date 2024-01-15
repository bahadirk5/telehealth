import { editUser, uploadProviderProfileImage } from "@/lib/actions"
import { getCurrentProvider } from "@/lib/data"
import { Form } from "@/components/form/form"

export default async function Settings() {
  const provider = await getCurrentProvider()

  return (
    <>
      <Form
        title="Name"
        description="Your name on this app."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: provider?.name!,
          maxLength: 32,
        }}
        handleSubmit={editUser}
      />
      <Form
        title="Email"
        description="Your email on this app."
        helpText="Please enter a valid email."
        inputAttrs={{
          name: "email",
          type: "email",
          defaultValue: provider?.email!,
        }}
        handleSubmit={editUser}
      />
      <Form
        title="Image"
        description="Thumbnail image"
        helpText="Max file size 50MB. Recommended size 1200x630."
        inputAttrs={{
          name: "image",
          type: "image",
          defaultValue: provider?.image!,
        }}
        handleSubmit={uploadProviderProfileImage}
      />
    </>
  )
}

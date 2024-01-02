import { getServerAuthSession } from "@/lib/auth"
import Form from "@/components/form/form"

export default async function Settings() {
  const session = await getServerAuthSession()

  async function editUser(formData: FormData, _id: unknown, key: string) {
    "use server"
    const value = formData.get(key) as string

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(value)
      return { message: "success" }
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already in use`,
        }
      } else {
        return {
          error: error.message,
        }
      }
    }
  }

  return (
    <>
      <Form
        title="Name"
        description="Your name on this app."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: session?.user.name!,
          placeholder: "Brendon Urie",
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
          defaultValue: session?.user.email!,
          placeholder: "panic@thedis.co",
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
          defaultValue: session?.user.image ? session?.user.image : "",
        }}
        handleSubmit={editUser}
      />
    </>
  )
}

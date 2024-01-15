import { editProvider, uploadProviderImageGallery } from "@/lib/actions"
import { getCurrentProvider } from "@/lib/data"
import { Form } from "@/components/form/form"

export default async function ProviderResume() {
  const provider = await getCurrentProvider()

  const imageGalleryUrls =
    provider?.provider?.imageGallery?.map((image) => ({
      url: image.url,
      key: image.key,
    })) || []
    
  return (
    <>
      <Form
        title="Specialty"
        description="Your name on this app."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "specialty",
          type: "text",
          defaultValue: provider?.provider?.specialty!,
        }}
        handleSubmit={editProvider}
      />
      <Form
        title="About"
        description="Your name on this app."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "about",
          type: "textarea",
          defaultValue: provider?.provider?.about!,
        }}
        handleSubmit={editProvider}
      />
      <Form
        title="Image Gallery"
        description="Your name on this app."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "imageGallery",
          type: "image",
          // @ts-ignore
          defaultValue: imageGalleryUrls,
        }}
        handleSubmit={uploadProviderImageGallery}
      />
    </>
  )
}

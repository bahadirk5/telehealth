"use server"

import { db } from "@/lib/db"
import { utapi } from "@/lib/uploadthing"

import { getServerAuthSession } from "./auth"

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string
) => {
  const session = await getServerAuthSession()
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    }
  }
  const value = formData.get(key) as string

  try {
    const response = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    })
    return response
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

export async function uploadFiles(
  formData: FormData,
  _id: unknown,
  key: string
) {
  try {
    const session = await getServerAuthSession()
    const userId = session?.user.id

    if (!userId) {
      return { error: "Unauthorized" }
    }

    const file = formData.get(key) as File
    const uploadResponse = await utapi.uploadFiles(file)

    if (!uploadResponse?.data?.key || !uploadResponse.data.url) {
      throw new Error("Invalid upload response")
    }

    const { key: uploadedKey, url: uploadedUrl } = uploadResponse.data

    const existingImage = await db.providerProfileImage.findFirst({
      where: { userId: userId },
    })

    if (existingImage) {
      try {
        await utapi.deleteFiles(existingImage.key)
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError)
        // Decide how to handle this error. For example, you might want to continue with the update, or you might want to stop and return an error response.
      }

      await db.providerProfileImage.update({
        where: { id: existingImage.id },
        data: { key: uploadedKey, url: uploadedUrl },
      })
    } else {
      await db.providerProfileImage.create({
        data: {
          key: uploadedKey,
          url: uploadedUrl,
          userId: userId,
        },
      })
    }

    // Update the user's image field
    await db.user.update({
      where: { id: userId },
      data: { image: uploadedUrl },
    })

    return { message: "Profile image updated successfully" }
  } catch (error: any) {
    console.error("Error details:", error)
    return { error: error.message }
  }
}

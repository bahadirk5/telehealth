"use server"

import { db } from "@/lib/db"
import { utapi } from "@/lib/uploadthing"

import { getServerAuthSession } from "./auth"

interface GalleryItem {
  url: string
  key: string
  providerUserId: string
}

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

export const editProvider = async (
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
    const response = await db.provider.update({
      where: {
        userId: session.user.id,
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

export async function uploadProviderProfileImage(
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
      where: { providerUserId: userId },
    })

    if (existingImage) {
      try {
        await utapi.deleteFiles(existingImage.key)
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError)
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
          providerUserId: userId,
        },
      })
    }

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

export async function uploadProviderImageGallery(
  formData: FormData,
  _id: unknown,
  key: string
) {
  const session = await getServerAuthSession()
  const userId = session?.user.id

  if (!userId) {
    return { error: "Unauthorized" }
  }

  const files = formData.getAll(key)

  try {
    const uploadResponses = await utapi.uploadFiles(files)

    const galleryData = uploadResponses.reduce<GalleryItem[]>(
      (acc, response) => {
        if (response.data) {
          acc.push({
            url: response.data.url,
            key: response.data.key,
            providerUserId: userId,
          })
        }
        return acc
      },
      []
    )

    await db.$transaction(
      galleryData.map((galleryItem) =>
        db.providerImageGallery.create({ data: galleryItem })
      )
    )

    return { message: "Image gallery updated successfully" }
  } catch (error: any) {
    console.error("Error details:", error)
    return { error: error.message }
  }
}

export async function deleteFile(key: string) {
  const session = await getServerAuthSession()
  const userId = session?.user.id

  if (!userId) {
    return { error: "Unauthorized" }
  }
  // Check if the provider has the key
  const providerImage = await db.providerImageGallery.findFirst({
    where: {
      key: key,
      provider: {
        userId: userId,
      },
    },
  })

  if (!providerImage) {
    return { error: "File not found or not authorized to delete this file" }
  }
  try {
    await utapi.deleteFiles(key)
    // Optionally, delete the record from the database as well
    await db.providerImageGallery.delete({
      where: {
        key: key,
      },
    })

    return { message: "File deleted successfully" }
  } catch (error: any) {
    console.error("Error deleting file:", error)
    return { error: error.message }
  }
}

export async function providerMapEdit(data: any) {
  const session = await getServerAuthSession()
  const userId = session?.user.id

  if (!userId) {
    return { error: "Unauthorized" }
  }

  try {
    const response = await db.provider.update({
      where: {
        userId: session.user.id,
      },
      data: {
        latlng: data,
      },
    })
    return response
  } catch (error: any) {
    console.error("Error details:", error)
    return { error: error.message }
  }
}

"use server"

import { signIn } from "~/src/auth"
import bcrypt from "bcrypt"
import { z } from "zod"

import { db } from "@/lib/db"

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

const RegisterSchema = UserSchema.omit({ id: true })

export type RegisterState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

export async function register(prevState: RegisterState, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return {
      message: "Success",
    }
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Acount.",
    }
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData))
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin"
    }
    throw error
  }
}

"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { toast } from "sonner"

import { deleteFile } from "@/lib/actions"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Button } from "./ui/button"

interface ImageInfo {
  url: string
  key: string
}

interface MultipleFileUploaderProps {
  defaultValue: ImageInfo[] | null
  name: string
}

export function MultipleFileUploader({
  defaultValue,
  name,
}: MultipleFileUploaderProps) {
  const aspectRatio = "aspect-video"
  const inputRef = useRef<HTMLInputElement>(null)
  const [newFiles, setNewFiles] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const router = useRouter()

  const handleUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter((file) => {
        if (file.size / 1024 / 1024 > 50) {
          toast.error("File size too big (max 50MB)")
          return false
        } else if (
          !file.type.includes("png") &&
          !file.type.includes("jpg") &&
          !file.type.includes("jpeg")
        ) {
          toast.error("Invalid file type (must be .png, .jpg, or .jpeg)")
          return false
        }
        return true
      })

      validFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setNewFiles((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  async function removeDefaultFile(
    key: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    e.stopPropagation()
    setIsSaving(true)
    try {
      await deleteFile(key)
      toast.success(`${key} deleted successfully`)
      router.refresh()
    } catch (error) {
      console.error("Error deleting file:", error)
      toast.error("Failed to delete file")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <label
        htmlFor={`${name}-upload`}
        className={cn(
          "group relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-border bg-background shadow-sm transition-all hover:bg-background/50",
          aspectRatio,
          {
            "max-w-screen-md": aspectRatio === "aspect-video",
          }
        )}
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDragEnter={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrop={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const files = e.dataTransfer.files
            inputRef.current!.files = files
            handleUpload(files)
          }}
        />
        <div
          className={`absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            newFiles.length
              ? "bg-background/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
              : "bg-background opacity-100 hover:bg-background/50"
          }`}
        >
          <svg
            className="h-7 w-7 text-slate-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <p className="mt-2 text-center text-sm text-slate-500">
            Drag and drop or click to upload.
          </p>
          <p className="mt-2 text-center text-sm text-slate-500">
            Max file size: 50MB
          </p>
          <span className="sr-only">Photo upload</span>
        </div>
        <div className="mx-auto max-w-screen-sm columns-1 gap-4 space-y-4 p-5 sm:columns-2 xl:columns-3">
          {newFiles.map((url, index) => (
            <div key={index} className="relative">
              <Image
                src={url}
                alt={`New Image ${index}`}
                width={720}
                height={480}
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
        <input
          id={`${name}-upload`}
          ref={inputRef}
          name={name}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => handleUpload(e.currentTarget.files)}
        />
      </label>
      <div className="max-w-screen-sm columns-1 gap-4 space-y-4 p-5 sm:columns-2 xl:columns-3">
        {defaultValue?.map((data, index) => (
          <div key={index} className="relative">
            <Image
              src={data.url}
              alt={`Default Image ${index}`}
              width={720}
              height={480}
              className="h-auto max-w-full rounded-lg"
              priority={false}
              quality={70}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => removeDefaultFile(data.key, e)}
              className="absolute right-2 top-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

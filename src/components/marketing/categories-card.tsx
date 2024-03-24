"use client"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"

export function CategoriesCard({
  title,
  description,
  image,
  path,
}: {
  title: string
  description: string
  image: string
  path: string
}) {
  return (
    <CarouselItem className="w-full flex-none pl-6 md:w-2/3 lg:w-2/5">
      <Card className="relative h-80 w-full overflow-hidden">
        <Image
          src={image}
          fill
          quality={80}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="Background"
          className="object-cover object-center dark:opacity-50"
        />
        <div className="relative z-10 h-full">
          <CardHeader>
            <CardDescription className="text-slate-100">
              {description}
            </CardDescription>
            <CardTitle className="text-slate-100">{title}</CardTitle>
          </CardHeader>
          <CardFooter className="absolute bottom-0">
            <Link
              href={path}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                })
              )}
            >
              Show all
            </Link>
          </CardFooter>
        </div>
      </Card>
    </CarouselItem>
  )
}

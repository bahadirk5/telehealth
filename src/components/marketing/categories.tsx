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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const categoryItems = [
  {
    title: "Doctors",
    description: "Licensed medical professionals for health and wellness.",
    image: "/doctors.png",
    path: "/",
  },
  {
    title: "Psychologists",
    description: "Experts in mental health and behavioral therapy.",
    image: "/psychologists.png",
    path: "/",
  },
  {
    title: "Dietitians",
    description:
      "Nutrition specialists for diet planning and weight management.",
    image: "/dietitians.png",
    path: "/",
  },
  {
    title: "Fitness Trainers",
    description:
      "Certified trainers for physical fitness and exercise programs.",
    image: "/fitness-trainers.png",
    path: "/",
  },
  {
    title: "Laboratory",
    description: "Medical labs for diagnostic tests and clinical analysis.",
    image: "/laboratory.png",
    path: "/",
  },
  {
    title: "Imaging Centers",
    description:
      "Facilities equipped for diagnostic imaging services like MRI and CT scans.",
    image: "/imaging-centers.png",
    path: "/",
  },
]

function CategoriesCard({
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
          className="object-cover object-center filter brightness-75"
        />
        <div className="relative z-10 h-full">
          <CardHeader>
            <CardDescription className="text-primary-foreground dark:text-foreground">
              {description}
            </CardDescription>
            <CardTitle className="text-primary-foreground dark:text-foreground">{title}</CardTitle>
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

export function Categories() {
  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
          Explore Specialties
        </h2>
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="-ml-6">
        {categoryItems.map((item) => (
          <CategoriesCard
            key={item.image}
            title={item.title}
            description={item.description}
            image={item.image}
            path={item.path}
          />
        ))}
      </CarouselContent>
    </Carousel>
  )
}

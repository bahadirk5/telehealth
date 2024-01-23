"use client"

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { CategoriesCard } from "./categories-card"

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

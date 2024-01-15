"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Categories() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
          Explore Specialties
        </h2>
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-1 md:basis-7/12 lg:basis-5/12"
          >
            <Card className="md:w-[540px]">
              <CardContent>
                <span className="text-2xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

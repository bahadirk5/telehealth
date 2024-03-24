import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { getProviders } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"
import { Categories } from "@/components/marketing/categories"

function SkeletonCard() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-[300px] w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </>
  )
}

function ProviderCard({
  id,
  name,
  image,
  specialty,
}: {
  id: string
  name: string
  image: string | null
  specialty: string
}) {
  return (
    <Link
      href={`/provider/${id}`}
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="p-6">
        {image !== null ? (
          <Image
            src={image}
            alt={name + "'s image"}
            height={400}
            width={400}
            className="rounded-md"
          />
        ) : null}
        <div className="flex items-center justify-between pt-5">
          <div className="text-lg font-semibold leading-none tracking-tight">
            {name}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{specialty}</p>
      </div>
    </Link>
  )
}

async function FeaturedProviders() {
  const providers = await getProviders()

  if (providers && providers.length > 0) {
    return (
      <>
        {providers.map((provider) => (
          <ProviderCard
            key={provider.userId}
            id={provider.userId}
            name={provider.user.name}
            image={provider.user.image}
            specialty={provider.specialty}
          />
        ))}
      </>
    )
  }

  return null
}

export default async function Home() {
  return (
    <main className="container mx-auto my-10">
      <Categories />
      <div className="my-10">
        <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-bold tracking-tight transition-colors first:mt-0">
          Featured Doctors
        </h2>
        <div className="grid-col-1 grid gap-6 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:py-4 lg:grid-cols-4">
          <Suspense fallback={<SkeletonCard />}>
            <FeaturedProviders />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

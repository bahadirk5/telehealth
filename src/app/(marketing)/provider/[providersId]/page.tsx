import Image from "next/image"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"

import { ReservationCard } from "../components/reservation-card"

async function getProvider(id: string) {
  "use server"

  return await db.provider.findFirst({
    where: { userId: id },
    include: { user: true, imageGallery: true },
  })
}

export default async function Providers({
  params,
}: {
  params: { providersId: string }
}) {
  const provider = await getProvider(params.providersId)

  if (!provider) {
    return notFound()
  }

  return (
    <>
      <div className="container">
        <div className="my-5 flex gap-2">
          {provider.imageGallery.map((image) => (
            <Image
              key={image.key}
              src={image.url}
              alt={provider.user.name}
              height={400}
              width={400}
              className="rounded-md"
            />
          ))}
        </div>
        <h4 className="text-lg font-semibold leading-none tracking-tight">
          {provider.user.name}
        </h4>
        <p className="text-sm text-muted-foreground">{provider.specialty}</p>
        <div className="mt-5 text-muted-foreground">{provider.about}</div>
        <div className="my-20 max-w-4xl">
          <ReservationCard
            name={provider.user.name}
            image={provider.user.image}
          />
        </div>
        {/* <pre>{JSON.stringify(provider, null, 2)}</pre> */}
      </div>
    </>
  )
}

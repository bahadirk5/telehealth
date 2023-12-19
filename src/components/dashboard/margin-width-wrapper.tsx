import { ReactNode } from "react"

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col sm:border-r sm:border-border md:ml-72">
      {children}
    </div>
  )
}

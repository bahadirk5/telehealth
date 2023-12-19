import { ReactNode } from "react"

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-grow flex-col space-y-2 bg-secondary">
      <div className="m-10 rounded-md min-h-screen bg-background p-10">{children}</div>
    </div>
  )
}

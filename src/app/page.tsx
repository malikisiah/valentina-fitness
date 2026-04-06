import Feature from "~/components/Feature"
import Hero from "~/components/Hero"
import { calendlyApi } from "~/lib/calendly"

export default async function Page() {
  const availability = await calendlyApi.getAvailability()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Hero availability={availability} />
      <Feature />
    </div>
  )
}

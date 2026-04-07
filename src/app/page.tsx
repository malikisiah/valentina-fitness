import Feature from "~/components/Feature"
import Hero from "~/components/Hero"
import { calendlyApi } from "~/lib/calendly"

export default async function Page() {
  const availability = await calendlyApi.getAvailability()

  return (
    <>
      <Hero availability={availability} />
      <Feature />
    </>
  )
}

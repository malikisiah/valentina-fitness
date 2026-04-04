import Feature from "~/components/Feature"
import Footer from "~/components/Footer"
import Hero from "~/components/Hero"
import { calendlyApi } from "~/lib/calendly"

export default async function Page() {
  const availability = await calendlyApi.getAvailability()
  console.log(availability.collection[0].rules)

  return (
    <>
      <Hero availability={availability} />
      <Feature />
      <Footer />
    </>
  )
}

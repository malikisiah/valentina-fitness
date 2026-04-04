import { calendlyApi } from "~/lib/calendly"
import BookSession from "~/components/BookSession"
import { Subheading } from "~/components/ui/header"
import { Text } from "~/components/ui/text"
import { getNearestAvailableDate } from "~/lib/scheduling-utils"
import { type AvailabilityRule } from "~/lib/calendly"

export default async function Page() {
  const availability = await calendlyApi.getAvailability()
  const allRules: AvailabilityRule[] = availability.collection.flatMap(
    (schedule) => schedule.rules
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div>
        <Subheading className="tr">Schedule an Intro Session</Subheading>
        <Text>
          {" "}
          We can hop on a call to discuss your fitness goals and how we can help
          you achieve them.
        </Text>
      </div>
      <div className="mt-8">
        <BookSession
          availability={availability}
          initialDate={getNearestAvailableDate(allRules)}
        />
      </div>
    </div>
  )
}

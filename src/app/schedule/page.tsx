import { calendlyApi } from "~/lib/calendly"
import BookSession from "~/components/BookSession"
import { Subheading } from "~/components/ui/header"
import { Text } from "~/components/ui/text"
import {
  getNearestAvailableDate,
  isSlotAvailable,
} from "~/lib/scheduling-utils"
import { type AvailabilityRule } from "~/lib/calendly"
import { Card } from "~/components/ui/card"
import { getLocale, getTranslations } from "~/lib/i18n"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; slot?: string }>
}) {
  const { date, slot } = await searchParams
  const [availability, locale] = await Promise.all([
    calendlyApi.getAvailability(),
    getLocale(),
  ])
  const t = getTranslations(locale)
  const allRules: AvailabilityRule[] = availability.collection.flatMap(
    (schedule) => schedule.rules
  )
  const initialDate = date ? new Date(date) : getNearestAvailableDate(allRules)
  const initialSlot =
    date && slot && isSlotAvailable(allRules, new Date(date), slot)
      ? slot
      : undefined

  return (
    <>
      <Card className="bg-card p-8">
        <div>
          <Subheading className="tr">{t.schedule.title}</Subheading>
          <Text>{t.schedule.description}</Text>
        </div>
        <div className="mt-8">
          <BookSession
            availability={availability}
            initialDate={initialDate}
            initialSlot={initialSlot}
          />
        </div>
      </Card>
    </>
  )
}

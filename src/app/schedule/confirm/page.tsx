import ConfirmSessionForm from "../../../components/BookingConfirmationForm"
import { Heading } from "~/components/ui/header"
import { getLocale, getTranslations } from "~/lib/i18n"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; slot?: string }>
}) {
  const { date, slot } = await searchParams
  const locale = await getLocale()
  const t = getTranslations(locale)

  if (!date || !slot) {
    return <Heading>{t.confirm.invalidSession}</Heading>
  }

  return <ConfirmSessionForm date={new Date(date)} slot={slot} t={t.confirm} />
}

import AboutMe from "~/components/AboutMe"
import Hero from "~/components/Hero"
import Mission from "~/components/Mission"
import { calendlyApi } from "~/lib/calendly"
import { getLocale, getTranslations } from "~/lib/i18n"

export default async function Page() {
  const [availability, locale] = await Promise.all([
    calendlyApi.getAvailability(),
    getLocale(),
  ])
  const t = getTranslations(locale)

  return (
    <>
      <Hero availability={availability} t={t.hero} />
      <Mission t={t.mission} />
      <AboutMe t={t.about} />
    </>
  )
}

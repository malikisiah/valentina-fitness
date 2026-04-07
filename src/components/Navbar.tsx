import { Navbar, NavbarItem, NavbarSection } from "./ui/navbar"
import { getLocale, getTranslations } from "~/lib/i18n"

export default async function NavbarComponent() {
  const locale = await getLocale()
  const t = getTranslations(locale)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-sidebar/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Navbar className="justify-center">
          <NavbarSection className="space-x-16">
            <NavbarItem href="/">{t.nav.home}</NavbarItem>
            <NavbarItem href="/schedule">{t.nav.schedule}</NavbarItem>
            <NavbarItem href="/about">{t.nav.about}</NavbarItem>
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  )
}

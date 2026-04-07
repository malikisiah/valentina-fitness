import { Navbar, NavbarItem, NavbarSection } from "./ui/navbar"

export default function NavbarComponent() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-sidebar/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Navbar className="justify-center">
          <NavbarSection className="space-x-16">
            <NavbarItem href="/">Home</NavbarItem>
            <NavbarItem href="/schedule">Schedule</NavbarItem>
            <NavbarItem href="/about">About Me</NavbarItem>
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  )
}

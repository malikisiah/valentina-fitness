import { Navbar, NavbarItem, NavbarSection } from "./ui/navbar"

export default function NavbarComponent() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Navbar className="justify-center">
          <NavbarSection className="space-x-16">
            <NavbarItem href="/">Home</NavbarItem>
            <NavbarItem href="/events">Schedule</NavbarItem>
            <NavbarItem href="/orders">Orders</NavbarItem>
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  )
}

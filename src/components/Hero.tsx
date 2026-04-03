import Image from "next/image"
import { Button } from "./button"

export default function Hero() {
  return (
    <div className="relative bg-background">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-40 lg:pb-48 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            <div className="hidden sm:mt-32 sm:flex lg:mt-16"></div>
            <h1 className="mt-24 text-5xl font-semibold tracking-tight text-pretty text-foreground sm:mt-10 sm:text-7xl">
              Valentina Fitness
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button variant="default" size="lg">
                Get started
              </Button>

              <Button variant="outline" size="lg">
                Book Session
              </Button>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            width={4000}
            height={4000}
            quality={100}
            alt=""
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-3/2 w-full bg-background object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  )
}

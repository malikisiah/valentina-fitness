"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Heading, Subheading } from "./ui/header"
import { Text } from "./ui/text"
import Image from "next/image"
import stoic from "../../public/stoic.png"
import Link from "next/link"
import BookSession from "./BookSession"
import { AvailabilityResponse, AvailabilityRule } from "~/lib/calendly"
import Modal from "./ui/modal"
import { getNearestAvailableDate } from "~/lib/scheduling-utils"
import { Translations } from "~/lib/i18n"
import FadeIn from "./FadeIn"

export default function Hero({
  availability,
  t,
}: {
  availability: AvailabilityResponse
  t: Translations["hero"]
}) {
  const [open, setOpen] = useState(false)
  const allRules: AvailabilityRule[] = availability.collection.flatMap(
    (schedule) => schedule.rules
  )
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-accent opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>
      <div className="py-24 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <Heading size="3xl">
                FitSoul<span className="align-top text-sm">™</span>
              </Heading>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Subheading size="lg">{t.tagline}</Subheading>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Text>{t.description}</Text>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("mission")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t.learnMore}
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  size="lg"
                  className="hidden sm:inline-flex"
                >
                  {t.bookSession}
                </Button>
                <Link href="/schedule" className="sm:hidden">
                  <Button variant="outline" size="lg">
                    {t.bookSession}
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="mt-16 flex justify-center sm:mt-24">
            <div className="w-full max-w-3xl rounded-2xl p-2 sm:max-w-xl lg:max-w-3xl">
              <Image
                alt="Valentina Fernandez"
                src={stoic}
                className="aspect-square w-full rounded-xl border border-accent object-cover shadow-xl"
              />
            </div>
          </FadeIn>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-primary to-accent opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <BookSession
          availability={availability}
          initialDate={getNearestAvailableDate(allRules)}
        />
      </Modal>
    </div>
  )
}

"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Heading } from "./ui/header"
import { Text } from "./ui/text"
import Image from "next/image"
import Link from "next/link"
import BookSession from "./BookSession"
import { AvailabilityResponse, AvailabilityRule } from "~/lib/calendly"
import Modal from "./ui/modal"
import { getNearestAvailableDate } from "~/lib/scheduling-utils"

export default function Hero({
  availability,
}: {
  availability: AvailabilityResponse
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
            <Heading size="3xl">Valentina Fitness</Heading>
            <Text>
              A new way to build your body and mind. Get fit, stay healthy, and
              feel great with our expert-led fitness programs and personalized
              coaching.
            </Text>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="default" size="lg">
                Learn More
              </Button>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                size="lg"
                className="hidden sm:inline-flex"
              >
                Book Session
              </Button>
              <Link href="/schedule" className="sm:hidden">
                <Button variant="outline" size="lg">
                  Book Session
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl p-2 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                width={4000}
                height={4000}
                quality={100}
                alt=""
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-304 rounded-md border border-accent shadow-xl"
              />
            </div>
          </div>
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

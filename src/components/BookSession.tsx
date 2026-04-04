"use client"

import { useState } from "react"

import { CalendarBookedDates } from "./CalendarBookedDates"
import { Text } from "./ui/text"
import { type AvailabilityResponse, type AvailabilityRule } from "~/lib/calendly"
import { Button } from "./ui/button"
import { Subheading } from "./ui/header"
import { getUnavailableDays, getSlotsForDate } from "~/lib/scheduling-utils"

export default function BookSession({
  availability,
  initialDate,
}: {
  availability: AvailabilityResponse
  initialDate: Date
}) {
  const allRules: AvailabilityRule[] = availability.collection.flatMap(
    (schedule) => schedule.rules
  )
  const unavailableDays = getUnavailableDays(allRules)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  )
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(
    undefined
  )

  const availableSlots = selectedDate ? getSlotsForDate(allRules, selectedDate) : []

  return (
    <div className="md:grid md:grid-cols-2 md:divide-x md:divide-primary-foreground">
      <CalendarBookedDates
        unavailableDays={unavailableDays}
        selected={selectedDate}
        onSelect={(date) => {
          if (!date) return
          setSelectedDate(date)
          setSelectedSlot(undefined)
        }}
      />
      <section className="mt-12 md:mt-0 md:pl-14">
        <Subheading>
          {selectedDate ? (
            <>
              Schedule for{" "}
              <time>
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </>
          ) : (
            "Select a date"
          )}
        </Subheading>

        <ol className="mt-4 flex flex-col gap-y-1 text-sm/6 text-muted-foreground">
          {availableSlots.map((slot) => (
            <li
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`group justify-left flex cursor-pointer items-center gap-x-4 rounded-xl px-4 py-2 hover:bg-muted ${selectedSlot === slot ? "bg-muted font-medium text-foreground" : ""}`}
            >
              <Text className="mt-0.5">{slot}</Text>
              {selectedSlot === slot && (
                <Button className="ml-auto">Book</Button>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import Modal from "./ui/modal"
import { CalendarBookedDates } from "./CalendarBookedDates"
import { Text } from "./ui/text"
import { AvailabilityResponse } from "~/lib/calendly"
import { Button } from "./ui/button"
import { Subheading } from "./ui/header"

const SLOT_DURATION_MINUTES = 30
const BOOKING_BUFFER_MINUTES = 0

function getSlots(from: string, to: string, durationMinutes = SLOT_DURATION_MINUTES): string[] {
  const [fromH, fromM] = from.split(":").map(Number)
  const [toH, toM] = to.split(":").map(Number)
  const end = toH * 60 + toM
  const slots: string[] = []

  let current = fromH * 60 + fromM
  while (current + durationMinutes <= end) {
    const next = current + durationMinutes
    const fmt = (m: number) =>
      `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`
    slots.push(`${fmt(current)} - ${fmt(next)}`)
    current = next
  }
  return slots
}

export default function BookSessionModal({
  open,
  setOpen,
  availability,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  availability: AvailabilityResponse
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(
    undefined
  )

  const allRules = availability.collection.flatMap((schedule) => schedule.rules)

  const unavailableDays = allRules
    .filter((rule) => rule.intervals.length === 0)
    .map((rule) => rule.wday!)

  const selectedWday = selectedDate
    ? [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ][selectedDate.getDay()]
    : null

  const intervals = selectedWday
    ? (allRules.find((rule) => rule.wday === selectedWday)?.intervals ?? [])
    : []

  const isToday =
    selectedDate?.toDateString() === new Date().toDateString()

  const availableSlots = intervals
    .flatMap((interval) => getSlots(interval.from, interval.to))
    .filter((slot) => {
      if (!isToday) return true
      const [startTime] = slot.split(" - ")
      const [h, m] = startTime.split(":").map(Number)
      const slotMinutes = h * 60 + m
      const now = new Date()
      const nowMinutes = now.getHours() * 60 + now.getMinutes()
      const cutoff = Math.ceil(nowMinutes / SLOT_DURATION_MINUTES) * SLOT_DURATION_MINUTES + BOOKING_BUFFER_MINUTES
      return slotMinutes > cutoff
    })

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-primary-foreground">
        <CalendarBookedDates
          unavailableDays={unavailableDays}
          selected={selectedDate}
          onSelect={(date) => {
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
    </Modal>
  )
}

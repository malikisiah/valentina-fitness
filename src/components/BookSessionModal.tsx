"use client"

import { useState } from "react"
import Modal from "./ui/modal"
import { CalendarBookedDates } from "./CalendarBookedDates"
import { Text } from "./ui/text"
import { AvailabilityResponse } from "~/lib/calendly"


function getSlots(from: string, to: string, durationMinutes = 30): string[] {
  const [fromH, fromM] = from.split(":").map(Number)
  const [toH, toM] = to.split(":").map(Number)
  const end = toH * 60 + toM
  const slots: string[] = []

  let current = fromH * 60 + fromM
  while (current + durationMinutes <= end) {
    const next = current + durationMinutes
    const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`
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
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(undefined)

  const allRules = availability.collection.flatMap((schedule) => schedule.rules)

  const unavailableDays = allRules
    .filter((rule) => rule.intervals.length === 0)
    .map((rule) => rule.wday!)

  const selectedWday = selectedDate
    ? ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][selectedDate.getDay()]
    : null

  const intervals = selectedWday
    ? allRules.find((rule) => rule.wday === selectedWday)?.intervals ?? []
    : []

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-primary-foreground">
        <CalendarBookedDates
          unavailableDays={unavailableDays}
          selected={selectedDate}
          onSelect={(date) => { setSelectedDate(date); setSelectedSlot(undefined) }}
        />
        <section className="mt-12 md:mt-0 md:pl-14">
          <h2 className="text-base font-semibold text-gray-900">
            {selectedDate
              ? <>Schedule for <time>{selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time></>
              : "Select a date"}
          </h2>
          <ol className="mt-4 flex flex-col gap-y-1 text-sm/6 text-gray-500">
            {intervals.flatMap((interval) => getSlots(interval.from, interval.to)).map((slot) => (
              <li
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`group justify-left flex cursor-pointer items-center gap-x-4 rounded-xl px-4 py-2 hover:bg-gray-100 ${selectedSlot === slot ? "bg-gray-100 font-medium text-gray-900" : ""}`}
              >
                <Text className="mt-0.5">{slot}</Text>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Modal>
  )
}

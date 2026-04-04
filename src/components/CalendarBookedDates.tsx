"use client"

import * as React from "react"

import { Calendar } from "~/components/ui/calendar"
import { Card, CardContent } from "~/components/ui/card"

type Weekday = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"

const WEEKDAY_INDEX: Record<Weekday, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
}

function getDatesForWeekdays(weekdays: Weekday[], month: Date): Date[] {
  const year = month.getFullYear()
  const mon = month.getMonth()
  const daysInMonth = new Date(year, mon + 1, 0).getDate()
  const dates: Date[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, mon, day)
    const wday = d.getDay()
    if (weekdays.some((w) => WEEKDAY_INDEX[w] === wday)) {
      dates.push(d)
    }
  }
  return dates
}

export function CalendarBookedDates({
  unavailableDays,
  selected,
  onSelect,
}: {
  unavailableDays: Weekday[]
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
}) {
  const [month, setMonth] = React.useState(new Date())

  const bookedDates = getDatesForWeekdays(unavailableDays, month)

  return (
    <Card className="w-full p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={selected}
          onSelect={onSelect}
          disabled={bookedDates}
          modifiers={{ booked: bookedDates }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
          className="w-full"
        />
      </CardContent>
    </Card>
  )
}

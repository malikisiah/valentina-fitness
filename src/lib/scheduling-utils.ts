import { AvailabilityRule, Interval } from "./calendly"

const SLOT_DURATION_MINUTES = 90

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

/**
 * Formats the given minutes into a "HH:MM" string.
 * @param minutes
 */
const fmt = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`

/**
 * Returns the available slots between the given start and end times. Each slot is formatted as "HH:MM - HH:MM". The duration of each slot can be customized by providing the `durationMinutes` parameter (default is 30 minutes).
 * @param from
 * @param to
 * @param durationMinutes
 */
const getSlots = (
  from: string,
  to: string,
  durationMinutes = SLOT_DURATION_MINUTES
): string[] => {
  const [fromH, fromM] = from.split(":").map(Number)
  const [toH, toM] = to.split(":").map(Number)
  const end = toH * 60 + toM
  const slots: string[] = []

  let current = fromH * 60 + fromM
  while (current + durationMinutes <= end) {
    const next = current + durationMinutes
    slots.push(`${fmt(current)} - ${fmt(next)}`)
    current = next
  }
  return slots
}

/**
 * Returns the unavailable days of the week based on the provided availability rules. A day is considered unavailable if it has no intervals defined.
 * @param allRules
 */
const getUnavailableDays = (allRules: AvailabilityRule[]) =>
  allRules
    .filter((rule) => rule.intervals.length === 0)
    .map((rule) => rule.wday!)

/**
 * Returns the available slots for a given date. If the date is not provided, it returns the slots for the nearest available date.
 * @param intervals
 * @param date
 */
const getAvailableSlots = (intervals: Interval[], date: Date | undefined) => {
  const isToday = date?.toDateString() === new Date().toDateString()

  return intervals
    .flatMap((interval) => getSlots(interval.from, interval.to))
    .filter((slot) => {
      if (!isToday) return true
      const [from] = slot.split(" - ")
      const [fromH, fromM] = from.split(":").map(Number)
      const slotTime = new Date()
      slotTime.setHours(fromH, fromM, 0, 0)
      return slotTime > new Date()
    })
}

/**
 * Returns the available slots for a given date. If the date is not provided, it returns the slots for the nearest available date.
 * @param allRules
 * @param date
 */
const getSlotsForDate = (allRules: AvailabilityRule[], date: Date) => {
  const wday = DAYS[date.getDay()]
  const intervals = allRules.find((rule) => rule.wday === wday)?.intervals ?? []
  return getAvailableSlots(intervals, date)
}

/**
 * Returns true if the given slot is still available for the given date.
 * Returns false if the date is in the past or the slot has been filtered out
 * (e.g. already passed today).
 * @param allRules
 * @param date
 * @param slot
 */
const isSlotAvailable = (
  allRules: AvailabilityRule[],
  date: Date,
  slot: string
): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (date < today) return false
  return getSlotsForDate(allRules, date).includes(slot)
}

/**
 * Returns the nearest date (from today) that has at least one available slot.
 * @param allRules
 */
const getNearestAvailableDate = (allRules: AvailabilityRule[]): Date => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  while (getSlotsForDate(allRules, date).length === 0) {
    date.setDate(date.getDate() + 1)
  }
  return date
}

export {
  getSlots,
  getUnavailableDays,
  getAvailableSlots,
  getSlotsForDate,
  getNearestAvailableDate,
  isSlotAvailable,
}

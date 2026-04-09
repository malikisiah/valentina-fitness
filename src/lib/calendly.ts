export interface Interval {
  from: string
  to: string
}

export interface AvailabilityRule {
  type: "wday" | "date"
  wday?:
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
  date?: string
  intervals: Interval[]
}

export interface AvailabilitySchedule {
  uri: string
  default: boolean
  name: string
  user: string
  timezone: string
  rules: AvailabilityRule[]
}

export interface AvailabilityResponse {
  collection: AvailabilitySchedule[]
}

export interface BookingUrlParams {
  name: string
  email: string
  notes?: string
  date: Date
  slot: string // "HH:MM - HH:MM"
}

function buildBookingUrl(params: BookingUrlParams): string {
  const username = process.env.NEXT_PUBLIC_CALENDLY_USERNAME
  const eventSlug = process.env.NEXT_PUBLIC_CALENDLY_EVENT_SLUG

  if (!username || !eventSlug) {
    throw new Error("Missing Calendly configuration")
  }

  const [startTime] = params.slot.split(" - ")
  const isoDate = params.date.toISOString().split("T")[0]
  const dateTimeSegment = `${isoDate}T${startTime}:00`

  const query = new URLSearchParams({ name: params.name, email: params.email })
  if (params.notes) query.set("a1", params.notes)

  return `https://calendly.com/${username}/${eventSlug}/${dateTimeSegment}?${query.toString()}`
}

async function getAvailability(): Promise<AvailabilityResponse> {
  const token = process.env.CALENDLY_API_TOKEN!
  const userUri = process.env.CALENDLY_USER_URI!

  const res = await fetch(
    `https://api.calendly.com/user_availability_schedules?user=${encodeURIComponent(userUri)}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  )
  if (!res.ok) throw new Error(`Calendly API error: ${res.status}`)
  return res.json() as Promise<AvailabilityResponse>
}

export const calendlyApi = {
  getAvailability,
  buildBookingUrl,
}

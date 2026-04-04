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

async function getAvailability(): Promise<AvailabilityResponse> {
  const token = process.env.CALENDLY_API_TOKEN!
  const userUri = process.env.CALENDLY_USER_URI!

  const res = await fetch(
    `https://api.calendly.com/user_availability_schedules?user=${encodeURIComponent(userUri)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`Calendly API error: ${res.status}`)
  return res.json() as Promise<AvailabilityResponse>
}

export const calendlyApi = {
  getAvailability,
}

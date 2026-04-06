"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Heading, Subheading } from "~/components/ui/header"
import {
  ClockIcon,
  VideoCameraIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid"
import { Text } from "~/components/ui/text"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Link } from "~/components/ui/link"
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from "~/components/ui/fieldset"
import type { $ZodType } from "zod/v4/core"
import {
  bookingSchema,
  type BookingFormValues,
} from "~/lib/validations/booking"
import { calendlyApi } from "~/lib/calendly"

export default function ConfirmSessionForm({
  date,
  slot,
}: {
  date: Date
  slot: string
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const backUrl = `/schedule?${searchParams.toString()}`
  const [bookingError, setBookingError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(
      bookingSchema as $ZodType<BookingFormValues, BookingFormValues>
    ),
  })

  function onSubmit(data: BookingFormValues): void {
    setBookingError(null)
    try {
      const url = calendlyApi.buildBookingUrl({ ...data, date, slot })
      router.push(url)
    } catch {
      setBookingError("Unable to generate booking link. Please try again.")
    }
  }

  return (
    <Card className="p-9">
      <form className="h-full" onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <div className="">
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
            <div>
              <Subheading>Valentina</Subheading>
              <Heading size="xl"> 30 min intro session</Heading>
              <div className="mt-12 flex-col space-y-2">
                <div className="flex items-center gap-x-3">
                  <ClockIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  <Text>30 min</Text>
                </div>
                <div className="flex items-center gap-x-3">
                  <VideoCameraIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  <Text>Video call</Text>
                </div>
                <div className="flex items-center gap-x-3">
                  <CalendarIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  <Text>
                    {date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    at {slot}
                  </Text>
                </div>
              </div>
            </div>

            <Fieldset className="grid max-w-2xl grid-cols-1 gap-x-6 sm:grid-cols-6 md:col-span-2">
              <FieldGroup className="sm:col-span-4">
                <Field>
                  <Label>Name</Label>
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="Your name"
                    invalid={!!errors.name}
                  />
                  {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                  )}
                </Field>
              </FieldGroup>

              <FieldGroup className="col-span-full">
                <Field>
                  <Label>Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    invalid={!!errors.email}
                  />
                  {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                </Field>
              </FieldGroup>

              <FieldGroup className="col-span-full">
                <Field>
                  <Label>Notes</Label>
                  <Textarea
                    {...register("notes")}
                    placeholder="Anything you'd like me to know before our session?"
                    rows={4}
                  />
                </Field>
              </FieldGroup>
            </Fieldset>
          </div>
        </div>

        {bookingError && (
          <ErrorMessage className="mt-4">{bookingError}</ErrorMessage>
        )}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href={backUrl}>
            <Button variant="secondary" type="button">
              Back
            </Button>
          </Link>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Card>
  )
}

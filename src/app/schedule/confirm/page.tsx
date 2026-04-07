import ConfirmSessionForm from "../../../components/BookingConfirmationForm"
import { Heading } from "~/components/ui/header"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; slot?: string }>
}) {
  const { date, slot } = await searchParams

  if (!date || !slot) {
    return (
      <Heading>
        Invalid session details. Please go back and select a valid session.
      </Heading>
    )
  }

  return (
    <>
      <ConfirmSessionForm date={new Date(date)} slot={slot} />
    </>
  )
}

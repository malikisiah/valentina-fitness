import ConfirmSessionForm from "../../../components/BookingConfirmationForm"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; slot?: string }>
}) {
  const { date, slot } = await searchParams

  if (!date || !slot) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-center text-sm/6 text-gray-600">
          Invalid session details. Please go back and select a valid session.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl justify-center px-4 py-16">
      <ConfirmSessionForm date={new Date(date)} slot={slot} />
    </div>
  )
}

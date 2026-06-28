import { redirect } from "next/navigation";
import { stripe } from "../lib/stripe";
import { bookClass } from "../lib/actions/Booking";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  let bookingResult = null;
  let bookingError = null;

  if (status === "complete") {
    try {
      bookingResult = await bookClass({
        classId: session.metadata.classId,
        userId: session.metadata.userId,
        name: session.metadata.name,
        email: session.metadata.email,
        phone: session.metadata.phone,
        amount: session.amount_total / 100,
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent?.id,
        paymentStatus: "paid",
      });
    } catch (err) {
      bookingError = err.message || "Something went wrong while booking";
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full rounded-xl border bg-white p-6 text-center shadow">
        {/* SUCCESS CASE */}
        {status === "complete" && bookingResult && (
          <>
            <h1 className="mb-4 text-3xl font-bold text-green-600">
              Payment Successful ✅
            </h1>

            <p className="mb-2">Thank you for booking your class.</p>

            <p className="mb-4 text-gray-600">
              A confirmation email has been sent to{" "}
              <strong>{customerEmail}</strong>
            </p>

            <div className="rounded bg-gray-100 p-4 text-left text-sm">
              <p>
                <strong>Class ID:</strong> {session.metadata.classId}
              </p>
              <p>
                <strong>Transaction ID:</strong> {session.payment_intent?.id}
              </p>
            </div>
          </>
        )}

        {/* ERROR CASE */}
        {status === "complete" && !bookingResult && (
          <>
            <h1 className="mb-4 text-3xl font-bold text-red-600">
              Something went wrong ❌
            </h1>

            <p className="mb-3 text-gray-700">
              Payment was successful, but we couldn&apos;t complete your
              booking.
            </p>

            {bookingError && (
              <p className="mb-4 text-sm text-red-500">Error: {bookingError}</p>
            )}

            <p className="text-gray-500 text-sm">
              Please contact support or try again.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

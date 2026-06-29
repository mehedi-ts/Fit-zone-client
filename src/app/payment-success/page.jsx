import { redirect } from "next/navigation";
import { stripe } from "../lib/stripe";
import { bookClass } from "../lib/actions/Booking";
import Link from "next/link";

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
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full rounded-2xl bg-white shadow-xl overflow-hidden">

        {/* SUCCESS CASE */}
        {status === "complete" && bookingResult && (
          <>
            {/* Top banner */}
            <div className="bg-green-500 px-6 py-8 flex flex-col items-center text-white">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-4xl">
                ✅
              </div>
              <h1 className="text-2xl font-bold">Payment Successful!</h1>
              <p className="mt-1 text-sm text-green-100">
                Your class has been booked.
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-6 flex flex-col gap-4">
              <p className="text-center text-sm text-gray-500">
                A confirmation has been sent to{" "}
                <span className="font-semibold text-gray-700">
                  {customerEmail}
                </span>
              </p>

              {/* Details card */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 divide-y divide-gray-100">
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">Class ID</span>
                  <span className="font-medium text-gray-800 truncate max-w-[180px]">
                    {session.metadata.classId}
                  </span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-medium text-gray-800 truncate max-w-[180px]">
                    {session.payment_intent?.id}
                  </span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="font-medium text-green-600">
                    ${(session.amount_total / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/classes"
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Browse Classes
                </Link>
                <Link
                  href="/"
                  className="flex-1 rounded-xl bg-green-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-green-600 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </>
        )}

        {/* ERROR CASE */}
        {status === "complete" && !bookingResult && (
          <>
            {/* Top banner */}
            <div className="bg-red-500 px-6 py-8 flex flex-col items-center text-white">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-4xl">
                ❌
              </div>
              <h1 className="text-2xl font-bold">Booking Failed</h1>
              <p className="mt-1 text-sm text-red-100">
                Payment went through, but booking didn&apos;t complete.
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-6 flex flex-col gap-4">
              <p className="text-center text-sm text-gray-600">
                Your payment was successful but we couldn&apos;t confirm your
                booking. Please contact support with your transaction details.
              </p>

              {bookingError && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <span className="font-medium">Error:</span> {bookingError}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/classes"
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Browse Classes
                </Link>
                <Link
                  href="/"
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
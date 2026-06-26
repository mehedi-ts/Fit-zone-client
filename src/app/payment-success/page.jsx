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
  console.log("Stripe Session55:", session);

  const status = session.status;
  const customerEmail = session.customer_details?.email;

  console.log("Session Status:", status);
  console.log("Customer Email:", customerEmail);
  console.log("Payment Intent ID:", session.payment_intent?.id);
  console.log("Metadata:", session.metadata);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const bookingResult = await bookClass({
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

    console.log("Booking Result:", bookingResult);

    return (
      <section
        id="success"
        className="flex min-h-screen items-center justify-center"
      >
        <div className="max-w-lg rounded-xl border p-6 text-center shadow">
          <h1 className="mb-4 text-3xl font-bold text-green-600">
            Payment Successful ✅
          </h1>

          <p className="mb-2">Thank you for booking your class.</p>

          <p className="mb-4">
            A confirmation email has been sent to{" "}
            <strong>{customerEmail}</strong>
          </p>

          <div className="rounded bg-gray-100 p-4 text-left">
            <p>
              <strong>Class ID:</strong> {session.metadata.classId}
            </p>
            <p>
              <strong>Transaction ID:</strong> {session.payment_intent?.id}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return redirect("/");
}

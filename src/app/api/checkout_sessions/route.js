import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/lib/stripe";
import { getClassById } from "@/app/lib/api/getClassById";

// তোমার DB connection import
// import dbConnect from "@/app/lib/dbConnect";

export async function POST(req) {
  try {
    const { bookingData } = await req.json();
    console.log("Received booking data:", bookingData);
    const { classId } = bookingData;
    const classInfo = await getClassById(classId);
    console.log("Fetched class info:", classInfo);

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Database থেকে class বের করবে
    // Example:
    // const db = await dbConnect();
    // const classInfo = await db.collection("classes").findOne({
    //   _id: new ObjectId(classId),
    // });

    // // Temporary Example
    // const classInfo = {
    //   className: "Yoga Class",
    //   price: 10,
    // };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: bookingData.email,

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: classInfo.className,
            },

            unit_amount: Number(classInfo.price) * 100,
          },

          quantity: 1,
        },
      ],

      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/classes`,

      metadata: {
        classId: bookingData.classId,
        userId: bookingData.userId || "",
        name: bookingData.name || "",
        email: bookingData.email || "",
        phone: bookingData.phone || "",
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Session Error:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

import { getBookingByUserId } from "@/app/lib/api/getBookingByUserId";
import { getUser } from "@/app/lib/getUser";
import BookedClass from "@/components/dashboardUi/member/BookedClass";
import React from "react";

const page = async () => {
  const userdata = await getUser();
  const userId = userdata?.id;
  const bookingData = await getBookingByUserId(userId);
  console.log("Booking Data:", bookingData);

  return (
    <div>
      <BookedClass bookingData={bookingData} />
    </div>
  );
};

export default page;

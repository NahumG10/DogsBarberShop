import React, { useRef } from "react";
import SelectTime from "./SelectTime";
import { useGlobalState } from "../context/GlobalStateContext";

export default function NewBooking() {
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const {
    setResponseMessage,
    API_BASE_URL,
    setIsLoading,
    token,
    refreshBookingsList,
  } = useGlobalState();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/Bookings/AddNewBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingDate: dateRef.current.value,
          bookingHour: timeRef.current.value,
        }),
      });

      const json = await response.text();

      setResponseMessage(json);
      refreshBookingsList();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="new-booking" onSubmit={onSubmit}>
        <input required type="date" ref={dateRef} />
        <SelectTime refElem={timeRef} />
        <button>קבע תור חדש</button>
      </form>
    </>
  );
}

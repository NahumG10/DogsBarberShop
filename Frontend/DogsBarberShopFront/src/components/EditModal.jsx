import React, { useRef } from "react";
import SelectTime from "./SelectTime";
import { useGlobalState } from "../context/GlobalStateContext";

export default function EditModal({ item }) {
  const {
    setIsLoading,
    HideEditModal,
    API_BASE_URL,
    setResponseMessage,
    token,
    refreshBookingsList,
  } = useGlobalState();
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const editSave = async (e) => {
    try {
      e.preventDefault();
      HideEditModal();
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/Bookings/EditBooking?HaircutId=${item.bookingId}&date=${dateRef.current.value}&hour=${timeRef.current.value}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message = await response.text();
      setResponseMessage(message);
      refreshBookingsList();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          HideEditModal();
        }
      }}
    >
      <div className="modal">
        <div className="list-item-text">
          <form onSubmit={editSave} className="edit-form">
            <div>
              <h4>עידכון תור</h4>
              שם לקוח: {item.name} <br />
              תאריך: <input type="date" required ref={dateRef} /> <br />
              שעה: <SelectTime refElem={timeRef} />
            </div>
            <div style={{ margin: "auto" }}>
              <button>שמור</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  HideEditModal();
                }}
              >
                ביטול
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

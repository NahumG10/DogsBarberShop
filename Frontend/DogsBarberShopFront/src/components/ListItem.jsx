import React from "react";
import { useGlobalState } from "../context/GlobalStateContext";

export default function ListItem({ item }) {
  const {
    setIsLoading,
    setModalItem,
    ShowInfoModal,
    ShowEditModal,
    API_BASE_URL,
    setResponseMessage,
    userData,
    token,
    refreshBookingsList,
  } = useGlobalState();

  const showPopup = (e) => {
    if (
      e.target.className == "list-item" ||
      e.target.className == "list-item-text"
    ) {
      setModalItem(item);
      ShowInfoModal();
    }
  };
  const handleEdit = async () => {
    ShowEditModal();
    setModalItem(item);
  };

  const handleDelete = async () => {
    if (!confirm("האם לבטל את התור?")) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/Bookings/DeleteBooking?HaircutId=${item.bookingId}`,
        {
          method: "DELETE",
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
    <div className="list-item" onClick={showPopup}>
      <div className="list-item-text">
        שם לקוח: {item.name} <br />
        תאריך: {new Date(item.date).toLocaleDateString()} <br />
        שעה: {item.hour}
      </div>
      {/* Rendering delete and edit button only to booking user */}
      {userData.id == item.userId && (
        <div className="buttons">
          <button onClick={handleEdit}>
            <img src="/images/icons8-edit-24.png" alt="" />
          </button>
          <button onClick={handleDelete}>
            <img src="/images/icons8-delete-24.png" alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

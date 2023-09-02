import React from "react";
import { useGlobalState } from "../context/GlobalStateContext";

export default function Modal({ item }) {
  const { HideInfoModal } = useGlobalState();
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          HideInfoModal();
        }
      }}
    >
      <div className="modal">
        <div className="list-item-text">
          <h4>פרטי התור</h4>
          שם לקוח: {item.name} <br />
          תאריך: {new Date(item.date).toLocaleDateString()} <br />
          שעה: {item.hour} <br />
          זמן קביעת התור: {new Date(item.created).toLocaleString()}
        </div>
        <button onClick={() => HideInfoModal()}>סגור</button>
      </div>
    </div>
  );
}

import React from "react";
import { useGlobalState } from "../context/GlobalStateContext";

export default function Header() {
  const { userData, setToken } = useGlobalState();
  return (
    <div className="header">
      <h3>שלום משתמש {userData.name}</h3>
      <h2>מספרת כלבים</h2>
      <a
        onClick={() => {
          if (confirm("האם להתנתק?")) {
            localStorage.removeItem("token");
            setToken("");
          }
        }}
      >
        התנתק
      </a>
    </div>
  );
}

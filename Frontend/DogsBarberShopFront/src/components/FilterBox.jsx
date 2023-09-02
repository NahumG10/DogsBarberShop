import React from "react";

export default function FilterBox({ setNameFilter, setDateFilter }) {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="סנן לפי שם לקוח"
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <input
        type="date"
        onChange={(e) => {
          if (e.target.value == "") {
            setDateFilter(null);
          } else {
            setDateFilter(new Date(e.target.value) || null);
          }
        }}
      />
      <button
        onClick={() => {
          setDateFilter(null);
          setNameFilter("");
        }}
      >
        נקה סינון
      </button>
    </div>
  );
}

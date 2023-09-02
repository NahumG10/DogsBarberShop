import React from "react";

export default function SelectTime({ refElem }) {
  return (
    <select required ref={refElem}>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
    </select>
  );
}

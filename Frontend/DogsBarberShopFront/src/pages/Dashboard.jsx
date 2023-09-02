import React, { useEffect, useState } from "react";
import NewBooking from "../components/NewBooking";
import ListItem from "../components/listItem";
import Header from "../components/Header";
import Modal from "../components/Modal";
import EditModal from "../components/EditModal";
import FilterBox from "../components/FilterBox";
import { useGlobalState } from "../context/GlobalStateContext";

export default function Dashboard() {
  const {
    isModalVisible,
    isEditModalVisible,
    modalItem,
    responseMessage,
    refreshBookingsList,
    BookingList,
  } = useGlobalState();

  const [dateFilter, setDateFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    refreshBookingsList();
  }, []);

  return (
    <div style={{ marginTop: 50 }}>
      <Header />
      <FilterBox setDateFilter={setDateFilter} setNameFilter={setNameFilter} />
      {BookingList.filter(
        (item) =>
          (nameFilter === "" || item.name.includes(nameFilter)) &&
          (dateFilter == null ||
            new Date(item.date).getDate() == dateFilter.getDate())
      ).map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
      <NewBooking />
      {isModalVisible && <Modal item={modalItem} />}
      {isEditModalVisible && <EditModal item={modalItem} />}
      <h3>{responseMessage}</h3>
    </div>
  );
}

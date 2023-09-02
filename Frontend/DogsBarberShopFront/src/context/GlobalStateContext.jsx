import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext(null);

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

// global state component acting like redux
export function GlobalStateProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [userData, setUserData] = useState({});
  const [BookingList, setBookingList] = useState([]);

  const HideInfoModal = () => setIsModalVisible(false);
  const ShowInfoModal = () => setIsModalVisible(true);
  const HideEditModal = () => setIsEditModalVisible(false);
  const ShowEditModal = () => setIsEditModalVisible(true);

  const refreshBookingsList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/Bookings/GetBookingsList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // rendering list of bookings to logged in user
      if (response.status === 200) {
        const json = await response.json();
        setBookingList(json);
      } else {
        // logging out unauthorized user
        localStorage.removeItem("token");
        setToken("");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isLoading,
        setIsLoading,
        responseMessage,
        setResponseMessage,
        HideInfoModal,
        ShowInfoModal,
        HideEditModal,
        ShowEditModal,
        modalItem,
        setModalItem,
        isModalVisible,
        isEditModalVisible,
        API_BASE_URL,
        token,
        setToken,
        userData,
        setUserData,
        refreshBookingsList,
        BookingList,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

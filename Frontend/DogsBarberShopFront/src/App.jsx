import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AnonymousRoutes from "./components/AnonymousRoutes";
import Dashboard from "./pages/Dashboard";
import { useGlobalState } from "./context/GlobalStateContext";

function App() {
  const { isLoading, setIsLoading, token, setUserData } = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== "") {
      try {
        // decoding jwt to extract user data
        setUserData(jwt_decode(token));

        // saving token in local storage to prevent logging out on refreshing page
        localStorage.setItem("token", token);
        navigate("dashboard");
      } catch {
        // logging out unauthorized user
        setIsLoading(false);
        navigate("/");
      }
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route element={<AnonymousRoutes />}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<Login />}></Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<Dashboard />}></Route>
        </Route>
      </Routes>
      {isLoading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}

export default App;

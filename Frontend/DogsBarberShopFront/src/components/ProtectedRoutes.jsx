import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalStateContext";

export default function ProtectedRoutes() {
  const { token } = useGlobalState();

  // preventing anonymous user navigating to logged in user content
  return token !== "" ? <Outlet /> : <Navigate to="/" />;
}

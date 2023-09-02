import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalStateContext";

export default function AnonymousRoutes() {
  const { token } = useGlobalState();

  // preventing logged in user navigating to anonymous user pages (login and register)
  return token === "" ? <Outlet /> : <Navigate to="/dashboard" />;
}

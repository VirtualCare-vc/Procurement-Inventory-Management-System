// src/routes/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute component that checks if the user is authenticated
export default function PrivateRoute() {
  const isAuthenticated = localStorage.getItem("token"); // Example check for token in localStorage

  // If authenticated, render the child routes using Outlet
  // If not authenticated, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

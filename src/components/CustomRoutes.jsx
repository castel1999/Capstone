import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export const ExceptAdminModRoute = ({ exceptRoles }) => {
  const { user } = useAuth();


  if (exceptRoles && exceptRoles.includes(user.role)) {
    return <Navigate to="/about" replace />;
  }

  return <Outlet />;
};
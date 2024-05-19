import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const AdminPrivateroute = () => {
  const currentUser = useSelector((state) => state.register.currentUser);

  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" />
  );
};

export default AdminPrivateroute;

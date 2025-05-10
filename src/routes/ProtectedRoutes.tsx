import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
  const user = true;
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoutes;

import React from "react";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

interface PublicRoutesProps {}

const PublicRoutes: React.FC<PublicRoutesProps> = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;

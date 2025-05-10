import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

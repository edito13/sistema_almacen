import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Saidas from "@/screens/Saidas";
import Entradas from "@/screens/Entradas";
import Dashboard from "@/screens/Dashboard";
import SignIn from "@/screens/auth/Sign-in";

import Layout from "@/components/Layout";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="entradas" element={<Entradas />} />
            <Route path="saidas" element={<Saidas />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Saidas from "@/screens/Saidas";
import Entradas from "@/screens/Entradas";
import Dashboard from "@/screens/Dashboard";
import Stock from "@/screens/Stock";
import SignIn from "@/screens/auth/Sign-in";
import Config from "@/screens/Config";

import Layout from "@/components/Layout";
import ProtectedRoutes from "./ProtectedRoutes";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="stock" element={<Stock />} />
            <Route path="entradas" element={<Entradas />} />
            <Route path="saidas" element={<Saidas />} />
            <Route path="config" element={<Config />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

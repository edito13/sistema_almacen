import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Stock from "@/screens/Stock";
import Areas from "@/screens/Areas";
import Config from "@/screens/Config";
import Codigo from "@/screens/Codigo";
import Saidas from "@/screens/Saidas";
import Familia from "@/screens/Familia";
import Conjunto from "@/screens/Conjunto";
import Entradas from "@/screens/Entradas";
import Produtos from "@/screens/Produtos";
import Clientes from "@/screens/Clientes";
import Dashboard from "@/screens/Dashboard";
import SignUp from "@/screens/auth/Sign-up";
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
          <Route path="/sign-up" element={<SignUp />} />

        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stock" element={<Stock />} />
          <Route path="areas" element={<Areas />} />
          <Route path="saidas" element={<Saidas />} />
          <Route path="config" element={<Config />} />
          <Route path="codigo" element={<Codigo />} />
          <Route path="familia" element={<Familia />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="entradas" element={<Entradas />} />
          <Route path="conjuntos" element={<Conjunto />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

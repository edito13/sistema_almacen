import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './i18n.ts';

import "@/styles/index.css";
import App from "./App.tsx";
import AuthProvider from "@/providers/AuthProvider.tsx";
import QueryProvider from "@/providers/QueryProvider.tsx";
import ModalProvider from "./providers/ModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </QueryProvider>
  </StrictMode>
);

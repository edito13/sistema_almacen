import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/index.css";
import App from "./App.tsx";
import AuthProvider from "@/providers/AuthProvider.tsx";
import QueryProvider from "@/providers/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);

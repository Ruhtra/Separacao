import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { queryClient } from "./services/QueryClient.ts";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
  // </StrictMode>
);

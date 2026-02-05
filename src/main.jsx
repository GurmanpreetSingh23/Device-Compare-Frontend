import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CompareProvider } from "./contexts/ContextProvider.jsx";
import ScrollTrigger from "./utils/ScrollTrigger.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CompareProvider>
      <ScrollTrigger>
        <App />
      </ScrollTrigger>
    </CompareProvider>
  </StrictMode>
);

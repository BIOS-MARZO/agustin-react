import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.module.css"; // Cambia el nombre aquí

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

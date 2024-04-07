import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "../lib/theme";
import App from "./App.tsx";
import "./index.css";

const rootElement =
  document.getElementById("root") || document.createElement("div");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

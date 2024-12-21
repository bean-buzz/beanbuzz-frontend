import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/index.css";
import App from "../src/components/App_ComponentRouter.jsx";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div id="root">
      <main className="main-content">
        <App />
      </main>
      <Footer />
    </div>
  </StrictMode>
);

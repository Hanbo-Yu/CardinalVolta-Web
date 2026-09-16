import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import App from "./App.jsx";
import { pageForPath } from "./pages.js";
import "./styles.css";
import "./home-sections.css";
import "./footer.css";
import "./cycle-diagram.css";
import "./home-refinements.css";

const root = document.getElementById("root");
const page = pageForPath(window.location.pathname);
document.title = page.title;
const app = (
  <React.StrictMode>
    <App page={page.id} />
  </React.StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

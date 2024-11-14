import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRouter from "./Routing/routingElement";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);

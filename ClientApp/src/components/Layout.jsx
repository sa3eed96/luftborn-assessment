import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import "./Layout.css";

const Layout = (props) => {
  const location = useLocation();

  return (
    <div className="layout">
      {!(
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) && <TopBar />}
      <div
        className="mainContainer"
        style={
          location.pathname.includes("login") ||
          location.pathname.includes("signup")
            ? {
                backgroundImage: "url(/images/background.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : {}
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;

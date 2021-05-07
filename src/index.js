import React from "react";
import ReactDOM from "react-dom";
import AppThemeProvider from "./components/AppThemeProvider";
import "./index.css";
import Pages from "./pages";

ReactDOM.render(
  <React.StrictMode>
    <AppThemeProvider>
      <Pages />
    </AppThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

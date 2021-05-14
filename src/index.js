import React from "react";
import ReactDOM from "react-dom";
import AppThemeProvider from "./components/AppThemeProvider";
import { AuthContextProvider } from "./contexts/AuthContext";
import "./index.css";
import Pages from "./pages";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppThemeProvider>
        <Pages />
      </AppThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

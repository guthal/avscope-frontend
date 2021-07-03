import React from "react";
import ReactDOM from "react-dom";
import AppThemeProvider from "./components/AppThemeProvider";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AppStateContextProvider } from "./contexts/AppStateContext";
import "./index.css";
import Pages from "./pages";

ReactDOM.render(
  <React.StrictMode>
    <AppThemeProvider>
      <AppStateContextProvider>
        <AuthContextProvider>
          <Pages />
        </AuthContextProvider>
      </AppStateContextProvider>
    </AppThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

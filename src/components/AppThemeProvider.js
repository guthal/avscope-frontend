import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function AppThemeProvider({ children }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#222",
      },
      secondary: {
        main: "#e6dd00",
      },
      background: {
        default: "#333",
        paper: "#444",
      },
      text: {
        primary: "#cecece",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;

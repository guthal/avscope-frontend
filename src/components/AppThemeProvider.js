import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { COLORS } from "../configs/theme";

function AppThemeProvider({ children }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: COLORS.PRIMARY_MAIN,
      },
      secondary: {
        main: COLORS.SECONDARY_MAIN,
      },
      background: {
        default: COLORS.BACKGROUND_DEFAULT,
        paper: COLORS.BACKGROUND_PAPER,
      },
      text: {
        primary: COLORS.TEXT_PRIMARY,
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

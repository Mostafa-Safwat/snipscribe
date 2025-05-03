import { createTheme, Theme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeOptions } from "./types";

export const generateTheme = (options: ThemeOptions): Theme => {
  const theme = createTheme({
    palette: {
      mode: options.mode,
      primary: {
        main: options.primaryColor,
      },
      secondary: {
        main: options.secondaryColor,
      },
      error: {
        main: options.errorColor,
      },
      warning: {
        main: options.warningColor,
      },
      info: {
        main: options.infoColor,
      },
      success: {
        main: options.successColor,
      },
      background: {
        default: options.backgroundDefault,
        paper: options.backgroundPaper,
        elevated: options.backgroundElevated,
      },
      text: {
        primary: options.textPrimary,
        secondary: options.textSecondary,
      },
    },
    typography: {
      fontFamily: options.fontFamily,
    },
    shape: {
      borderRadius: options.borderRadius,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          }
        `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

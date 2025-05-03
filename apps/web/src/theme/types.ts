import { PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    elevated: string;
  }

  interface TypeBackgroundOptions {
    elevated?: string;
  }
}

export interface ThemeOptions {
  mode: PaletteMode;
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;
  warningColor: string;
  infoColor: string;
  successColor: string;
  backgroundDefault: string;
  backgroundPaper: string;
  backgroundElevated: string;
  textPrimary: string;
  textSecondary: string;
  fontFamily: string;
  borderRadius: number;
}

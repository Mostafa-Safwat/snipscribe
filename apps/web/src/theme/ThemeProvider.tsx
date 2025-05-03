import React, { useMemo, useEffect, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { generateTheme } from "./themeGenerator";
import { toggleMode } from "@/store/slices/themeSlice";
import { RootState } from "@/store";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeOptions = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const theme = useMemo(() => generateTheme(themeOptions), [themeOptions]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      dispatch(toggleMode());
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

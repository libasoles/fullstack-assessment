"use client";

import darkScrollbar from "@mui/material/darkScrollbar";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#88cb8a",
    },
    error: {
      main: "#ff6868",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar,
          color: "#e3e6e8",
          backgroundColor: "#252627",
          "& main": {
            marginTop: 64,
          },
        },
      },
    },
  },
});

export default theme;

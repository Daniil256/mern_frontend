import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: "none",
  palette: {
    primary: {
      main: "#22c",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

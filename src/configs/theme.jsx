import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#00A046",
      dark: "#008F3A",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#FFA900",
      contrastText: "#000000",
    },

    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#221F1F",
      secondary: "#6B6B6B",
    },

    divider: "#E0E0E0",
  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 6,
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        containedPrimary: {
          fontWeight: 700,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid #E0E0E0",
          boxShadow: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;

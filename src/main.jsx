import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./configs/theme";
import { UIProvider } from "./stores/ui.store";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./translations/i18nProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <I18nProvider>
            <App />
          </I18nProvider>
        </ThemeProvider>
      </UIProvider>
    </BrowserRouter>
  </StrictMode>,
);

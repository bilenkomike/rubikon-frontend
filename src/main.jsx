import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./configs/theme";
import { UIProvider } from "./stores/ui.store";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./translations/i18nProvider";
import { AuthProvider } from "./stores/auth.store.jsx";
import { WishlistProvider } from "./stores/wishlist.store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <UIProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <I18nProvider>
                <App />
              </I18nProvider>
            </ThemeProvider>
          </UIProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

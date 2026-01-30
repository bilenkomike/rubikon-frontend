import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

/**
 * UIProvider
 * Centralized UI state for:
 * - catalog sidebar
 * - orders / user sidebar
 * - future overlays (cart, auth, etc.)
 */
export const UIProvider = ({ children }) => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const value = {
    // catalog
    catalogOpen,
    setCatalogOpen,

    // orders / user
    ordersOpen,
    setOrdersOpen,
    menuOpen,
    setMenuOpen,
    authOpen,
    setAuthOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

/**
 * useUI
 * Hook to access UI state anywhere in the app
 */
export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
};

import { createContext, useContext, useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { translations } from "./translations";

const I18nContext = createContext(null);

const SUPPORTED_LANGS = ["en", "ru"];
const DEFAULT_LANG = "en";

export const I18nProvider = ({ children }) => {
  const location = useLocation();

  // extract lang from URL: /en/..., /ru/...
  const langFromPath = location.pathname.split("/")[1];

  const lang = SUPPORTED_LANGS.includes(langFromPath)
    ? langFromPath
    : DEFAULT_LANG;

  const value = useMemo(
    () => ({
      lang,
      t: translations[lang],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return ctx;
};

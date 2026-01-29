import { useParams } from "react-router-dom";
import { translations } from "./translations";

export const useLang = () => {
  const { lang } = useParams();

  const currentLang = translations[lang] ? lang : "en";

  const t = translations[currentLang];

  return {
    lang: currentLang,
    t,
  };
};

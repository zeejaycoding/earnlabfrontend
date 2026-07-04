import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en/landing.json";
import urL from "./ur/common.json";
import ur from "./ur/landing.json";
import es from "./es/landing.json";
import fr from "./fr/landing.json";
import de from "./de/landing.json";
import ar from "./ar/landing.json";
import zh from "./zh-CN/landing.json";

const resources = {
  en: { translation: en },
  ur: { translation: ur },
  urL: { translation: urL },
  ar: { translation: ar },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  "zh-CN": { translation: zh },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
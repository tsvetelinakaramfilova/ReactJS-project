import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import bg from "./locales/bg";
const resources = {
  en,
  bg,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  resources,
  fallbackLng: "bg",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const backend = {
  loadPath: '/locales/{{lng}}/translation.json',
};

const languagesMeta = [
  {
    flagCode: 'gb',
    title: 'en',
  },
  {
    flagCode: 'es',
    title: 'es',
  },
];

const fallbackLng = 'en';

const options = {
  fallbackLng,
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  backend,
  languagesMeta,
  react: {
    wait: true,
  },
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;

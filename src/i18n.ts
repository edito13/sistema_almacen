import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'es'],
    resources: {
        pt: {translation: require('./locales/pt/translation.json')},
        es: {translation: require('./locales/es/translation.json')},
    },
    interpolation: {escapeValue: false},
});

export default i18n;
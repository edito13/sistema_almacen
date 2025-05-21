import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './locales/pt/translation.json';
import es from './locales/es/translation.json';

i18n
    .use(LanguageDetector) // detecta o idioma do navegador
    .use(initReactI18next) // conecta ao React
    .init({
        fallbackLng: 'pt', // idioma padrão se não detectado
        supportedLngs: ['pt', 'es'], // idiomas suportados
        resources: {
            pt: { translation: pt },
            es: { translation: es },
        },
        interpolation: {
            escapeValue: false, // React já faz escaping
        },
        detection: {
            order: ['localStorage', 'navigator'], // onde procurar o idioma
            caches: ['localStorage'], // salva a preferência no localStorage
        },
    });

export default i18n;

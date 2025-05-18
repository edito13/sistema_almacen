import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
];

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const currentCode = i18n.language.split('-')[0];
    const current = languages.find(l => l.code === currentCode) || languages[0];

    const toggleOpen = () => setOpen(prev => !prev);
    const handleLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    // close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={ref}>
            <button
                onClick={toggleOpen}
                className="flex items-center bg-white px-3 py-1 rounded shadow hover:bg-gray-100 focus:outline-none"
            >
                <span className="text-lg mr-1">{current.flag}</span>
                <span className="text-sm font-medium">{current.label}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-20"
                    >
                        <div className="py-1">
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguage(lang.code)}
                                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <span className="text-lg mr-2">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
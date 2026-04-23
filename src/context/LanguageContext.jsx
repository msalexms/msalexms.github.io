/**
 * LanguageContext.jsx
 *
 * Contexto de React para gestionar el idioma de la aplicación.
 * Proporciona el idioma actual y una función para cambiarlo.
 * Usa localStorage para persistir la preferencia del usuario.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

/**
 * Hook personalizado para usar el contexto de idioma.
 * Uso: const { lang, toggleLang } = useLanguage();
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/**
 * Proveedor del contexto de idioma.
 * Envuelve la aplicación para que todos los componentes accedan al idioma.
 * Persiste la preferencia en localStorage.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('portfolio-lang') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
/**
 * Header.jsx
 *
 * Navegación fija estilo terminal/minimalista.
 * Estética OPENCODE: sobrio, cuadrado, monoespaciado.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Header() {
  const { lang, toggleLang } = useLanguage();
  const nav = portfolioData.nav[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: nav.about },
    { id: 'experience', label: nav.experience },
    { id: 'projects', label: nav.projects },
    { id: 'academic', label: nav.academic },
    { id: 'education', label: nav.education },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/95 border-b border-[#262626]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label="Go to top"
        >
          <img
            src="/logo.svg"
            alt="[AMS]"
            width={32}
            height={32}
            className="block"
          />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-xs font-medium uppercase tracking-widest text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={toggleLang}
            className="text-xs font-medium uppercase tracking-widest text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-3 py-1 hover:border-[#525252]"
            aria-label="Toggle language"
          >
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
        </div>

        <button
          className="md:hidden text-[#e5e5e5] border border-[#262626] px-3 py-1 text-xs uppercase tracking-widest hover:border-[#525252] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0a0a0a] border-t border-[#262626]"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-sm font-medium uppercase tracking-widest text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-[#262626]">
                <button
                  onClick={toggleLang}
                  className="text-xs font-medium uppercase tracking-widest text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-3 py-1 hover:border-[#525252]"
                >
                  {lang === 'es' ? 'ES' : 'EN'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

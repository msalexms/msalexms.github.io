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

const SECTION_IDS = ['hero', 'about', 'experience', 'projects', 'academic', 'education'];

export default function Header() {
  const { lang, toggleLang } = useLanguage();
  const es = lang === 'es';
  const nav = portfolioData.nav[lang] ?? portfolioData.nav.es;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + 120;
      let current = 'hero';
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) current = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = 'education';
      }
      setActiveSection(current);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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

  const linkClass = (id) =>
    `border-b pb-0.5 text-xs font-medium uppercase tracking-widest transition-colors ${
      activeSection === id
        ? 'border-[#e5e5e5] text-[#e5e5e5]'
        : 'border-transparent text-[#a3a3a3] hover:border-[#525252] hover:text-[#e5e5e5]'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#262626] bg-[#0a0a0a]">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="text-sm font-bold tracking-tight text-[#e5e5e5] transition-colors hover:text-[#d4d4d4]"
          aria-label={es ? 'AMS, volver al inicio' : 'AMS, back to top'}
        >
          [AMS]
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={linkClass(link.id)}
              aria-current={activeSection === link.id ? 'location' : undefined}
            >
              {link.label}
            </button>
          ))}

          <a
            href={portfolioData.social.amstech}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline text-xs font-medium tracking-widest text-[#9EA6F2] transition-colors hover:text-white"
          >
            amstech.dev ↗
          </a>

          <button
            onClick={() => window.dispatchEvent(new Event('ams:palette'))}
            className="text-[10px] tracking-widest text-[#9c9c9c] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-2 py-1 hover:border-[#525252]"
            aria-label={es ? 'Abrir paleta de comandos' : 'Open command palette'}
          >
            Ctrl K
          </button>

          <button
            onClick={toggleLang}
            className="text-xs font-medium uppercase tracking-widest text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-3 py-1 hover:border-[#525252]"
            aria-label={es ? 'Cambiar idioma' : 'Switch language'}
          >
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
        </div>

        <button
          className="md:hidden text-[#e5e5e5] border border-[#262626] px-3 py-1 text-xs uppercase tracking-widest hover:border-[#525252] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? (es ? 'Cerrar menú' : 'Close menu') : (es ? 'Abrir menú' : 'Open menu')}
        >
          {mobileOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      <div className="absolute inset-x-0 bottom-0 h-px bg-[#262626]" aria-hidden="true">
        <div
          className="h-full bg-[#6FD08C] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

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
                  className={`text-left text-sm font-medium uppercase tracking-widest transition-colors ${
                    activeSection === link.id ? 'text-[#e5e5e5]' : 'text-[#a3a3a3] hover:text-[#e5e5e5]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={portfolioData.social.amstech}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium tracking-widest text-[#9EA6F2] transition-colors hover:text-white"
              >
                amstech.dev ↗
              </a>
              <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
                <button
                  onClick={toggleLang}
                  className="text-xs font-medium uppercase tracking-widest text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-3 py-1 hover:border-[#525252]"
                  aria-label={es ? 'Cambiar idioma' : 'Switch language'}
                >
                  {lang === 'es' ? 'ES' : 'EN'}
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => window.dispatchEvent(new Event('ams:palette')), 60);
                  }}
                  className="text-xs font-medium uppercase tracking-widest text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-3 py-1 hover:border-[#525252]"
                >
                  {es ? '$ comandos' : '$ commands'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

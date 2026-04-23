/**
 * Header.jsx
 *
 * Navegación sticky con efecto glassmorphism.
 * Acento: Esmeralda (alta legibilidad).
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
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
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          <span className="text-emerald-600 dark:text-emerald-400">{'<'}</span>
          {portfolioData.general[lang].name.split(' ')[0]}
          <span className="text-emerald-600 dark:text-emerald-400">{'/>'}</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={toggleLang}
            className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors"
            aria-label="Toggle language"
          >
            <motion.div
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
              animate={{ left: lang === 'es' ? '4px' : 'calc(100% - 24px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {lang === 'es' ? (
                <span className="text-[10px] font-bold text-emerald-600">ES</span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-600">EN</span>
              )}
            </motion.div>
          </button>

          <ThemeToggle />
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-lg font-medium py-2 text-slate-900 dark:text-white"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t">
                <button onClick={toggleLang} className="font-medium">
                  {lang === 'es' ? '🇪🇸 Español' : '🇬🇧 English'}
                </button>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
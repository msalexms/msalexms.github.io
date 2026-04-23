/**
 * Hero.jsx
 *
 * Sección de presentación de alto impacto con foto de perfil.
 * Layout responsivo: móvil apilado, desktop dos columnas.
 * Acento: Esmeralda (alta legibilidad en claro y oscuro).
 */

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { lang } = useLanguage();
  const general = portfolioData.general[lang];
  const hero = portfolioData.hero[lang];
  const social = portfolioData.social;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay },
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950" />

      {/* Círculos decorativos */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl" />

      {/* Layout principal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Foto de perfil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
          className="flex-shrink-0 mx-auto md:mx-0 mt-6 md:mt-10"
        >
          <div className="relative group">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow duration-500">
              <img
                src="/perfil.jpeg"
                alt={general.name}
                className="w-full h-full rounded-full object-cover object-top ring-4 ring-white dark:ring-slate-900"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
              <span className="text-white text-sm md:text-base font-bold">{'</>'}</span>
            </div>
          </div>
        </motion.div>

        {/* Texto y CTAs */}
        <div className="text-center md:text-left flex-1">
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg md:text-xl text-emerald-600 dark:text-emerald-400 font-medium mb-4"
          >
            {hero.greeting}
          </motion.p>

          <motion.h1
            {...fadeUp(0.4)}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white"
          >
            {general.name}
          </motion.h1>

          <motion.p
            {...fadeUp(0.6)}
            className="text-2xl md:text-3xl text-slate-700 dark:text-slate-200 mb-4"
          >
            {general.role}
          </motion.p>

          <motion.p
            {...fadeUp(0.8)}
            className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl md:max-w-none"
          >
            {general.slogan}
          </motion.p>

          <motion.div
            {...fadeUp(1)}
            className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
            >
              {hero.ctaPrimary}
            </button>

            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <img src="/github.png" alt="GitHub" className="w-5 h-5" />
              GitHub
            </a>

            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="animate-bounce text-slate-400" size={28} />
      </motion.div>
    </section>
  );
}
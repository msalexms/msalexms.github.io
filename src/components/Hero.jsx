/**
 * Hero.jsx
 *
 * Sección de presentación estilo terminal/ASCII.
 * Incluye AsciiPortrait interactivo.
 */

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import AsciiPortrait from './AsciiPortrait';

export default function Hero() {
  const { lang } = useLanguage();
  const general = portfolioData.general[lang];
  const hero = portfolioData.hero[lang];
  const social = portfolioData.social;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.4, ease: 'linear' },
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* ASCII Portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex-shrink-0 mx-auto md:mx-0 mt-6 md:mt-10"
        >
          <div className="border border-[#262626] hover:border-[#525252] transition-colors duration-300">
            {/* Efectos disponibles: 'scan' | 'decode' | 'static' | 'glitch' | 'matrix' */}
            <AsciiPortrait
              alt={general.name}
              width={320}
              height={320}
              effect="glitch"
            />
          </div>
        </motion.div>

        {/* Texto y CTAs */}
        <div className="text-center md:text-left flex-1">
          <motion.p
            {...fadeUp(0.2)}
            className="text-xs text-[#525252] font-mono mb-6"
          >
            {`> msalexms@portfolio:~$ cat about.txt`}
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="text-sm text-[#a3a3a3] font-mono mb-2"
          >
            {hero.greeting}
          </motion.p>

          <motion.h1
            {...fadeUp(0.4)}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#e5e5e5]"
          >
            {general.name}
          </motion.h1>

          <motion.p
            {...fadeUp(0.5)}
            className="text-lg md:text-xl text-[#a3a3a3] mb-4"
          >
            {`$ ${general.role}`}
          </motion.p>

          <motion.p
            {...fadeUp(0.6)}
            className="text-sm text-[#525252] mb-10 max-w-xl md:max-w-none leading-relaxed"
          >
            {general.slogan}
          </motion.p>

          <motion.div
            {...fadeUp(0.7)}
            className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 border border-[#262626] text-[#e5e5e5] text-sm font-medium hover:bg-[#262626] transition-colors duration-200"
            >
              {hero.ctaPrimary}
            </button>

            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-[#262626] text-[#a3a3a3] text-sm font-medium hover:text-[#e5e5e5] hover:border-[#525252] transition-colors duration-200"
            >
              [GitHub]
            </a>

            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-[#262626] text-[#a3a3a3] text-sm font-medium hover:text-[#e5e5e5] hover:border-[#525252] transition-colors duration-200"
            >
              [LinkedIn]
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <span className="text-[#525252] text-xs animate-pulse">↓</span>
      </motion.div>
    </section>
  );
}

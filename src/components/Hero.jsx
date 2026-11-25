/**
 * Hero.jsx
 *
 * Sección de presentación estilo terminal/ASCII.
 * El retrato se presenta como un fichero abierto en el sistema; debajo,
 * la cadena de capas que resume el perfil: silicon → edge → vision → cloud.
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
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0a]"
    >
      <div className="terminal-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-14 pt-28">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(280px,360px)_1fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="order-2 mx-auto w-full max-w-[360px] md:order-1 md:mx-0"
          >
            <div className="border border-[#262626] bg-[#0d0d0d] transition-colors duration-300 hover:border-[#525252]">
              <AsciiPortrait
                alt={general.name}
                width={320}
                height={320}
                effect="glitch"
              />
            </div>
          </motion.div>

          <div className="order-1 text-center md:order-2 md:text-left">
            <motion.h1
              {...fadeUp(0.2)}
              className="mb-4 text-4xl font-bold tracking-tight text-[#e5e5e5] md:text-6xl"
            >
              {general.name}
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="mb-4 text-base text-[#a3a3a3] md:text-lg">
              {`$ ${general.role}`}
            </motion.p>

            <motion.p
              {...fadeUp(0.4)}
              className="mb-9 max-w-xl font-mono text-[12px] leading-relaxed text-[#909090] md:max-w-none"
            >
              {general.slogan}
            </motion.p>

            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap md:justify-start"
            >
              <button
                type="button"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full border border-[#e5e5e5] bg-[#e5e5e5] px-6 py-2.5 font-mono text-xs font-medium text-[#0a0a0a] transition-colors duration-200 hover:bg-white sm:w-auto"
              >
                {hero.ctaPrimary}
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full border border-[#262626] px-6 py-2.5 font-mono text-xs font-medium text-[#a3a3a3] transition-colors duration-200 hover:border-[#525252] hover:text-[#e5e5e5] sm:w-auto"
              >
                {hero.ctaProjects}
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.6)}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.13em] text-[#909090] md:justify-start"
            >
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e5e5e5]">
                GitHub ↗
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e5e5e5]">
                LinkedIn ↗
              </a>
              <a href={social.amstech} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#e5e5e5]">
                amstech.dev ↗
              </a>
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="transition-colors hover:text-[#e5e5e5]"
              >
                {hero.ctaSecondary}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="relative z-10 border-t border-[#262626] bg-[#0a0a0a]/90 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 border-t border-[#262626] px-6 md:grid-cols-4 md:divide-x md:divide-[#262626]">
          {hero.stack.map((layer) => (
            <div key={layer.label} className="px-3 py-3.5 md:px-4">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#e5e5e5]">
                {layer.label}
              </p>
              <p className="mt-1 font-mono text-[10px] text-[#9c9c9c]">{layer.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

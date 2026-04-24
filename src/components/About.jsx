/**
 * About.jsx
 *
 * Sección Sobre Mí — estética OPENCODE.
 * Prefijo 01., texto plano, fondo alterno.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { lang } = useLanguage();
  const about = portfolioData.about[lang];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 px-6 bg-[#111111]">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xs font-medium text-[#525252] uppercase tracking-widest mb-2">
            01.
          </h2>
          <h2 className="text-3xl font-bold text-[#e5e5e5] tracking-tight">
            {about.title}
          </h2>
          <div className="w-full h-px bg-[#262626] mt-6" />
        </motion.div>

        <div className="space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-sm text-[#a3a3a3] leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

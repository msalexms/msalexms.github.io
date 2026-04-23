/**
 * Education.jsx — Acento: Esmeralda
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { lang } = useLanguage();
  const edu = portfolioData.education;
  const certs = portfolioData.certifications;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="education" className="py-24 px-6 bg-white dark:bg-slate-900">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold mb-16 text-center text-slate-900 dark:text-white"
        >
          {lang === 'es' ? edu.title : edu.enTitle}
          <span className="block w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={28} className="text-emerald-500" />
<h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {lang === 'es' ? 'Formación Académica' : 'Academic Background'}
                </h3>
            </div>

            <div className="space-y-6">
              {edu.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-emerald-500"
                >
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{item.degree[lang]}</h4>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {item.institution}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {item.period[lang]}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-3">
                    {item.description[lang]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award size={28} className="text-emerald-500" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{certs[lang].title}</h3>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {certs.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-shadow overflow-hidden w-[166px]">
                    <iframe
                      src={`https://www.credly.com/embedded_badge/${badge.id}`}
                      width="150"
                      height="270"
                      frameBorder="0"
                      scrolling="no"
                      title={`Credly badge ${index + 1}`}
                      className="block"
                    />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white text-center max-w-[166px]">
                    {badge[lang].name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
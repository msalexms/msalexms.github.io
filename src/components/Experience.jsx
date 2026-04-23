/**
 * Experience.jsx — Acento: Esmeralda
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { lang } = useLanguage();
  const exp = portfolioData.experience;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="experience" className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold mb-16 text-center text-slate-900 dark:text-white"
        >
          {exp[lang].title}
          <span className="block w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </motion.h2>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 md:-translate-x-1/2" />

          {exp.items.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-emerald-500 rounded-full -translate-x-1/2 mt-6 ring-4 ring-white dark:ring-slate-950 z-10" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase size={20} className="text-emerald-500" />
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.role[lang]}</h3>
                    </div>

                    <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                      {item.company}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      {item.period[lang]}
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      {item.description[lang]}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
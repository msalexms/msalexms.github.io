/**
 * Experience.jsx
 *
 * Experiencia laboral — lista vertical sin timeline.
 * Estética OPENCODE: bordes cuadrados, tags ASCII.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { lang } = useLanguage();
  const exp = portfolioData.experience;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="experience" className="py-24 px-6 bg-[#0a0a0a]">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xs font-medium text-[#525252] uppercase tracking-widest mb-2">
            02.
          </h2>
          <h2 className="text-3xl font-bold text-[#e5e5e5] tracking-tight">
            {exp[lang].title}
          </h2>
          <div className="w-full h-px bg-[#262626] mt-6" />
        </motion.div>

        <div className="space-y-0">
          {exp.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-t border-[#262626] py-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#e5e5e5]">
                    {item.role[lang]}
                  </h3>
                  <p className="text-sm text-[#a3a3a3]">{item.company}</p>
                </div>
                <p className="text-xs text-[#525252] font-mono uppercase tracking-widest md:text-right">
                  {item.period[lang]}
                </p>
              </div>

              <p className="text-sm text-[#a3a3a3] leading-relaxed mb-4">
                {item.description[lang]}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#171717] border border-[#262626] text-[#a3a3a3]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

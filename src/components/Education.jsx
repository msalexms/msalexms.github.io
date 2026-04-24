/**
 * Education.jsx
 *
 * Educación — lista vertical con bordes, certificaciones cuadradas.
 * Estética OPENCODE.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { lang } = useLanguage();
  const edu = portfolioData.education;
  const certs = portfolioData.certifications;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="education" className="py-24 px-6 bg-[#111111]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xs font-medium text-[#525252] uppercase tracking-widest mb-2">
            05.
          </h2>
          <h2 className="text-3xl font-bold text-[#e5e5e5] tracking-tight">
            {lang === 'es' ? edu.title : edu.enTitle}
          </h2>
          <div className="w-full h-px bg-[#262626] mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#a3a3a3] uppercase tracking-widest">
                {lang === 'es' ? 'Formación Académica' : 'Academic Background'}
              </h3>
              <div className="w-full h-px bg-[#262626] mt-3" />
            </div>

            <div className="space-y-0">
              {edu.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-t border-[#262626] py-6"
                >
                  <h4 className="text-base font-semibold text-[#e5e5e5]">{item.degree[lang]}</h4>
                  <p className="text-sm text-[#a3a3a3] mt-1">
                    {item.institution}
                  </p>
                  <p className="text-xs text-[#525252] font-mono uppercase tracking-wider mt-1">
                    {item.period[lang]}
                  </p>
                  <p className="text-xs text-[#a3a3a3] mt-3 leading-relaxed">
                    {item.description[lang]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#a3a3a3] uppercase tracking-widest">
                {certs[lang].title}
              </h3>
              <div className="w-full h-px bg-[#262626] mt-3" />
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {certs.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="border border-[#262626] overflow-hidden w-[166px] hover:border-[#525252] transition-colors duration-200">
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
                  <p className="text-xs font-medium text-[#a3a3a3] text-center max-w-[166px] leading-tight">
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

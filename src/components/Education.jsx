/**
 * Education.jsx
 *
 * Educación — formación académica e insignias verificables.
 * Estética terminal: años en mono, contenido escaneable.
 */

import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

export default function Education() {
  const { lang } = useLanguage();
  const edu = portfolioData.education;
  const certs = portfolioData.certifications;

  return (
    <section id="education" className="bg-[#111111] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={edu[lang].title} />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7d7d7d]">
                {lang === 'es' ? 'Formación académica' : 'Academic background'}
              </h3>
              <div className="mt-3 h-px w-full bg-[#262626]" />
            </div>

            <div>
              {edu.items.map((item) => (
                <div
                  key={item.degree[lang]}
                  className="grid gap-3 border-t border-[#262626] py-6 first:border-t-0 sm:grid-cols-[96px_1fr] sm:gap-6"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#7d7d7d]">
                      {item.period[lang]}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#e5e5e5]">{item.degree[lang]}</h4>
                    <p className="mt-1 text-sm text-[#a3a3a3]">{item.institution}</p>
                    <p className="mt-3 text-xs leading-relaxed text-[#858585]">
                      {item.description[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7d7d7d]">
                {certs[lang].title}
              </h3>
              <div className="mt-3 h-px w-full bg-[#262626]" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {certs.badges.map((badge, index) => (
                <div key={badge.id} className="flex flex-col items-center gap-3">
                  <div className="w-[152px] overflow-hidden border border-[#262626] bg-white transition-colors duration-200 hover:border-[#525252]">
                    <iframe
                      src={`https://www.credly.com/embedded_badge/${badge.id}`}
                      width="150"
                      height="270"
                      frameBorder="0"
                      scrolling="no"
                      loading="lazy"
                      title={`Credly badge ${index + 1}`}
                      className="mx-auto block"
                    />
                  </div>
                  <p className="max-w-[152px] text-center text-xs font-medium leading-tight text-[#a3a3a3]">
                    {badge[lang].name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

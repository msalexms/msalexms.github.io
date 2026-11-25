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
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#909090]">
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
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#909090]">
                      {item.period[lang]}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#e5e5e5]">{item.degree[lang]}</h4>
                    <p className="mt-1 text-sm text-[#a3a3a3]">{item.institution}</p>
                    <p className="mt-3 text-xs leading-relaxed text-[#9c9c9c]">
                      {item.description[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#909090]">
                {certs[lang].title}
              </h3>
              <div className="mt-3 h-px w-full bg-[#262626]" />
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {certs.badges.map((badge) => (
                <li key={badge.id}>
                  <a
                    href={`https://www.credly.com/badges/${badge.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col items-center gap-3 border border-[#262626] bg-[#0d0d0d] p-4 text-center transition-colors duration-200 hover:border-[#525252]"
                  >
                    <img
                      src={badge.image}
                      alt=""
                      width="96"
                      height="96"
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-24 transition-transform duration-200 group-hover:scale-105"
                    />
                    <span className="text-xs font-medium leading-snug text-[#e5e5e5]">
                      {badge[lang].name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8a8a8a]">
                      {badge.issuer} · {lang === 'es' ? 'verificar' : 'verify'} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

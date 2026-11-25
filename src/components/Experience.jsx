/**
 * Experience.jsx
 *
 * Experiencia laboral — línea temporal vertical.
 * La empresa y el periodo quedan a la izquierda; el contexto y el stack, a la derecha.
 */

import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

export default function Experience() {
  const { lang } = useLanguage();
  const exp = portfolioData.experience;
  const copy = exp[lang];

  return (
    <section id="experience" className="bg-[#0a0a0a] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={copy.title} />

        <div className="relative border-l border-[#262626] pl-6 md:pl-8">
          {exp.items.map((item, index) => (
            <article
              key={`${item.company}-${index}`}
              className="group relative grid gap-5 border-b border-[#262626] py-8 last:border-b-0 md:grid-cols-[190px_1fr] md:gap-10"
            >
              <span
                className={`absolute -left-[29px] md:-left-[37px] top-[42px] h-2 w-2 border ${
                  index === 0
                    ? 'border-[#6FD08C] bg-[#6FD08C]'
                    : 'border-[#525252] bg-[#0a0a0a] transition-colors group-hover:border-[#a3a3a3]'
                }`}
                aria-hidden="true"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#909090]">
                  <span>{item.period[lang]}</span>
                </div>
                <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-[#e5e5e5]">
                  {item.company}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.1em] text-[#9c9c9c]">
                  {item.role[lang]}
                </p>
              </div>

              <div>
                <p className="max-w-[620px] text-sm leading-relaxed text-[#a3a3a3]">
                  {item.description[lang]}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#262626] bg-[#111111] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.07em] text-[#9c9c9c]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

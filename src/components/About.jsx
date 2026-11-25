/**
 * About.jsx
 *
 * Sección Sobre Mí: lead, tres párrafos y "fuera del trabajo".
 * Una sola columna, pensada para leerse cómodamente.
 */

import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import { ThorLogo } from './AmsEmblems';

export default function About() {
  const { lang } = useLanguage();
  const about = portfolioData.about[lang];

  return (
    <section id="about" className="bg-[#111111] px-6 py-24">
      <div className="mx-auto max-w-[720px]">
        <SectionHeading title={about.title} />

        <div>
          <p className="text-xl leading-relaxed text-[#e5e5e5] md:text-2xl">{about.lead}</p>

          <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-[#b8b8b8]">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#a3a3a3]">
              {about.offClockTitle}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {about.offClock.map((tag) => (
                <li
                  key={tag}
                  className="border border-[#3a3a3a] bg-[#171717] px-3.5 py-1.5 text-[13px] text-[#e5e5e5]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <p className="mt-7 flex items-center gap-3 text-[13px] leading-relaxed text-[#a3a3a3]">
              <ThorLogo size={28} />
              <span>{about.catNote}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * About.jsx
 *
 * Sección Sobre Mí.
 * Relato a la izquierda; ficha de perfil (rol, foco, base, contacto) a la derecha.
 */

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import { ThorLogo } from './AmsEmblems';

export default function About() {
  const { lang } = useLanguage();
  const about = portfolioData.about[lang];
  const card = about.card;
  const general = portfolioData.general[lang];
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(general.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* mailto sigue disponible */
    }
  };

  return (
    <section id="about" className="bg-[#111111] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={about.title} />

        <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <p className="max-w-[620px] text-lg leading-relaxed text-[#d4d4d4] md:text-xl">
              {about.lead}
            </p>

            <div className="mt-7 max-w-[620px] space-y-5 text-sm leading-relaxed text-[#a3a3a3]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#909090]">
                {about.offClockTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {about.offClock.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#262626] bg-[#0d0d0d] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#a3a3a3]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="border border-[#262626] bg-[#0d0d0d]">
              <div className="flex items-center gap-2.5 border-b border-[#262626] px-5 py-3.5">
                <span className="relative flex h-2 w-2 flex-none" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6FD08C] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6FD08C]" />
                </span>
                <p className="text-[13px] text-[#d4d4d4]">{card.status}</p>
              </div>

              <dl className="divide-y divide-[#1c1c1c] px-5">
                <div className="py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#909090]">
                    {card.roleLabel}
                  </dt>
                  <dd className="mt-1.5 text-[15px] text-[#e5e5e5]">
                    {card.role}
                    <span className="text-[#909090]"> · </span>
                    <span className="text-[#7CC4FF]">{card.company}</span>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#909090]">
                    {card.focusLabel}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {card.focus.map((item) => (
                      <span
                        key={item}
                        className="border border-[#2f2f2f] px-2.5 py-1 text-[12px] text-[#d4d4d4]"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#909090]">
                    {card.baseLabel}
                  </dt>
                  <dd className="mt-1.5 text-[15px] text-[#e5e5e5]">{card.base}</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between gap-3 border-t border-[#262626] px-5 py-3.5">
                <a
                  href={`mailto:${general.email}`}
                  className="min-w-0 truncate text-[12px] text-[#a3a3a3] transition-colors hover:text-[#e5e5e5]"
                >
                  {general.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex-none border border-[#262626] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#FFE27A] transition-colors hover:border-[#525252] hover:text-[#e5e5e5]"
                >
                  {copied ? about.copied : about.copyEmail}
                </button>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-3 px-1 text-[12px] leading-relaxed text-[#909090]">
              <ThorLogo size={28} />
              <span>{about.catNote}</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/**
 * About.jsx
 *
 * Sección Sobre Mí: lead compacto arriba y dos columnas equilibradas:
 * izquierda con narrativa + etiquetas "fuera del trabajo",
 * derecha con ficha rápida y tarjeta interactiva de Thor.
 */

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import { ThorLogo } from './AmsEmblems';
import RevealPortrait from './RevealPortrait';

/** Enlace a amstech.dev con tarjeta de vista previa al pasar el ratón o enfocar. */
function AmstechLinkPreview({ label, lang }) {
  const [open, setOpen] = useState(false);
  const href = portfolioData.social.amstech;
  const items = portfolioData.projects.items.slice(0, 4);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-nowrap text-[#9EA6F2] underline decoration-[#9EA6F2]/50 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
      >
        {label}
      </a>

      <span
        aria-hidden="true"
        className={`absolute bottom-full left-0 z-40 w-[290px] max-w-[calc(100vw-3rem)] pb-2.5 transition-all duration-150 sm:w-[320px] ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-1 opacity-0'
        }`}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="block overflow-hidden rounded-md border-2 border-[#1E1B2E] bg-[#FFF6E9] shadow-[4px_4px_0_#1E1B2E] transition-transform duration-100 hover:-translate-x-px hover:-translate-y-px"
        >
          <span className="flex items-center justify-between border-b-2 border-[#1E1B2E] bg-white px-3 py-2">
            <span className="flex items-center gap-2">
              <ThorLogo size={20} />
              <span className="font-ams-brand text-[13px] font-extrabold text-[#1E1B2E]">
                amstech.dev
              </span>
            </span>
            <span className="font-ams-mono text-[10px] font-medium uppercase tracking-wider text-[#2B36D9]">
              open source ↗
            </span>
          </span>

          <span className="block p-2.5">
            <span className="grid grid-cols-2 gap-1.5">
              {items.map((project) => (
                <span
                  key={project.title}
                  className="block aspect-[16/10] overflow-hidden rounded-[3px] border border-[#1E1B2E] bg-[#F7EFE0]"
                >
                  <img
                    src={project.shot}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </span>
              ))}
            </span>

            <span className="mt-2 block font-ams text-[12px] leading-snug text-[#3B3850]">
              {lang === 'es'
                ? 'LensPipe, CircuitBin, mom, fin-cli y más herramientas.'
                : 'LensPipe, CircuitBin, mom, fin-cli, and more tools.'}
            </span>
          </span>
        </a>
      </span>
    </span>
  );
}

const THOR_WORDS = {
  es: ['ZZZ...', 'MIAU', 'THOR'],
  en: ['ZZZ...', 'MEOW', 'THOR'],
};

export default function About() {
  const { lang } = useLanguage();
  const about = portfolioData.about[lang];

  return (
    <section id="about" className="relative overflow-hidden bg-[#111111] px-6 py-20">
      <div className="terminal-scanlines pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading title={about.title} />

        {/* Lead a ancho completo con acento verde */}
        <div className="mb-7 border border-[#262626] border-l-2 border-l-[#6FD08C] bg-[#161616] px-5 py-3.5 md:px-6">
          <p className="max-w-4xl text-base font-medium leading-relaxed tracking-tight text-[#f5f5f5] md:text-lg">
            {about.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:items-start">
          {/* Columna izquierda: narrativa ordenada + etiquetas fuera del trabajo */}
          <div>
            <div className="space-y-4 text-[14.5px] leading-[1.75] text-[#c2c2c2]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {typeof paragraph === 'string' ? (
                    paragraph
                  ) : (
                    <>
                      {paragraph.before}
                      <AmstechLinkPreview label={paragraph.linkText} lang={lang} />
                      {paragraph.after}
                    </>
                  )}
                </p>
              ))}
            </div>

            <div className="mt-7 border-t border-[#222222] pt-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#909090]">
                {about.offClockTitle}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {about.offClock.map((tag) => (
                  <li
                    key={tag}
                    className="border border-[#2e2e2e] bg-[#0a0a0a] px-3 py-1 font-mono text-xs text-[#e5e5e5] transition-colors hover:border-[#6FD08C]/60 hover:text-white"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna derecha: ficha rápida + tarjeta compacta de Thor */}
          <div className="space-y-4">
            <div className="border border-[#2e2e2e] bg-[#0a0a0a]">
              <div className="flex items-center justify-between border-b border-[#222222] bg-[#151515] px-5 py-2.5">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#d4d4d4]">
                  {about.specsTitle}
                </p>
                <span className="h-2 w-2 bg-[#6FD08C]" aria-hidden="true" />
              </div>

              <dl className="divide-y divide-[#1e1e1e] px-5 py-0.5">
                {about.specs.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[88px_1fr] items-baseline gap-3 py-2.5 sm:grid-cols-[96px_1fr] sm:gap-4"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9EA6F2]">
                      {item.label}
                    </dt>
                    <dd className="flex min-w-0 items-center gap-2 text-[13px] text-[#f0f0f0]">
                      {item.active && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 bg-[#6FD08C]"
                          aria-hidden="true"
                        />
                      )}
                      {item.href ? (
                        <a
                          href={item.href}
                          className="break-all text-[#9EA6F2] transition-colors hover:text-white hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex items-stretch justify-between overflow-hidden border border-[#262626] bg-[#0a0a0a]">
              <div className="flex flex-1 flex-col justify-center gap-1.5 px-4 py-3">
                <div className="flex items-center gap-2.5 text-[12.5px] leading-snug text-[#a3a3a3]">
                  <ThorLogo size={22} />
                  <span>{about.catNote}</span>
                </div>
                <p className="pl-[32px] font-mono text-[10px] text-[#737373]">
                  {about.catHint}
                </p>
              </div>

              <div className="flex w-40 shrink-0 border-l border-[#1e1e1e] sm:w-52">
                <RevealPortrait
                  src="/img/thor.jpg"
                  alt="Thor"
                  width={900}
                  height={1199}
                  aspectClass="aspect-[4/3] min-h-[132px] h-full"
                  trailMs={4500}
                  brushRadius={44}
                  autoIntro={false}
                  idleWords={THOR_WORDS[lang]}
                  dimFilter="blur(6px) brightness(0.28) saturate(0.4)"
                  focalX={0.5}
                  focalY={0.54}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

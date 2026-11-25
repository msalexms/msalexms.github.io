/**
 * About.jsx
 *
 * Sección Sobre Mí — estética terminal.
 * Relato a la izquierda; ficha de sistema y vida fuera del trabajo a la derecha.
 */

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import SectionHeading from './SectionHeading';
import { ThorLogo } from './AmsEmblems';

function TerminalLine({ command, children, color = 'text-[#a3a3a3]' }) {
  return (
    <div>
      <p className="text-[#6FD08C]">
        <span className="text-[#525252]">$ </span>
        {command}
      </p>
      <p className={color}>{children}</p>
    </div>
  );
}

export default function About() {
  const { lang } = useLanguage();
  const about = portfolioData.about[lang];
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

          <div className="lg:sticky lg:top-24">
            <div className="border border-[#262626] bg-[#0d0d0d]">
              <div className="space-y-4 px-5 py-5 font-mono text-[11px] leading-[1.7]">
                <TerminalLine command="whoami" color="text-[#e5e5e5]">
                  {about.terminal.whoami}
                </TerminalLine>
                <TerminalLine command="cat role.txt" color="text-[#7CC4FF]">
                  {about.terminal.role}
                </TerminalLine>
                <TerminalLine command="cat focus.txt" color="text-[#B48CFF]">
                  {about.terminal.focus}
                </TerminalLine>
                <TerminalLine command="cat location.txt" color="text-[#a3a3a3]">
                  {about.terminal.base}
                </TerminalLine>
                <TerminalLine command="uptime" color="text-[#6FD08C]">
                  {about.terminal.status}
                </TerminalLine>
                <p className="flex items-center gap-1.5 pt-1 text-[#6FD08C]">
                  <span className="text-[#525252]">$</span>
                  <span className="inline-block h-3 w-[7px] animate-pulse bg-[#FFE27A]" aria-hidden="true" />
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[#262626] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#909090]">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="text-[#FFE27A] transition-colors hover:text-[#e5e5e5]"
                >
                  {copied ? about.copied : about.copyEmail}
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 border border-[#262626] bg-[#0d0d0d] p-4">
              <ThorLogo size={32} />
              <p className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.06em] text-[#9c9c9c]">
                {about.catNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

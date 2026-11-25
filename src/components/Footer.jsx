/**
 * Footer.jsx
 *
 * Cierre de la web: contacto directo, estado actual y enlaces.
 * Mantiene la estética terminal y convierte el cierre en una llamada clara.
 */

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { lang } = useLanguage();
  const general = portfolioData.general[lang];
  const social = portfolioData.social;
  const footer = portfolioData.footer[lang];
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
    <footer id="contact" className="relative overflow-hidden border-t border-[#262626] bg-[#0a0a0a] px-6 py-20">
      <div className="terminal-scanlines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[#262626] pb-7">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-[#e5e5e5] md:text-5xl">
              {footer.ctaTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#a3a3a3]">
              {footer.ctaText}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${general.email}`}
              className="border border-[#e5e5e5] bg-[#e5e5e5] px-5 py-2.5 font-mono text-xs font-medium text-[#0a0a0a] transition-colors hover:bg-white"
            >
              {footer.emailCta}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="border border-[#262626] px-5 py-2.5 font-mono text-xs text-[#a3a3a3] transition-colors hover:border-[#525252] hover:text-[#e5e5e5]"
            >
              {copied ? footer.copiedLabel : footer.copyLabel}
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-tight text-[#e5e5e5]">[AMS]</h3>
            <p className="max-w-[260px] text-xs leading-relaxed text-[#7d7d7d]">{general.slogan}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6FD08C]">
              {footer.statusValue}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#a3a3a3]">
              {footer.contactTitle}
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${general.email}`}
                className="block text-xs text-[#a3a3a3] transition-colors hover:text-[#e5e5e5]"
              >
                {general.email}
              </a>
              <p className="text-xs text-[#a3a3a3]">{general.location}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#a3a3a3]">
              {lang === 'es' ? 'Sígueme' : 'Follow me'}
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#262626] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#7d7d7d] transition-colors hover:border-[#525252] hover:text-[#e5e5e5]"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#262626] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#7d7d7d] transition-colors hover:border-[#525252] hover:text-[#e5e5e5]"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href={social.amstech}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#262626] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#7d7d7d] transition-colors hover:border-[#525252] hover:text-[#e5e5e5]"
                aria-label="AMS Tech"
              >
                amstech.dev ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-[#262626] pt-6 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-[#7d7d7d] md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {general.name}. {footer.rights}
          </p>
          <p>{footer.builtWith}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition-colors hover:text-[#e5e5e5]"
          >
            {footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}

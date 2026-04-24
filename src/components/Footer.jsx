/**
 * Footer.jsx
 *
 * Footer minimalista — links como texto ASCII, sin iconos circulares.
 * Estética OPENCODE.
 */

import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { lang } = useLanguage();
  const general = portfolioData.general[lang];
  const social = portfolioData.social;
  const footer = portfolioData.footer[lang];

  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-[#262626] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-bold text-[#e5e5e5] mb-4 tracking-tight">
              [AMS]
            </h3>
            <p className="text-xs text-[#525252] leading-relaxed">{general.slogan}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#a3a3a3] uppercase tracking-widest mb-4">
              {footer.contactTitle}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#525252]">[MAIL]</span>
                <a
                  href={`mailto:${general.email}`}
                  className="text-xs text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors"
                >
                  {general.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#525252]">[LOC]</span>
                <span className="text-xs text-[#a3a3a3]">{general.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#a3a3a3] uppercase tracking-widest mb-4">
              {lang === 'es' ? 'Sígueme' : 'Follow Me'}
            </h4>
            <div className="flex gap-4">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#525252] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-3 py-1 hover:border-[#525252]"
                aria-label="GitHub"
              >
                [GitHub]
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#525252] hover:text-[#e5e5e5] transition-colors border border-[#262626] px-3 py-1 hover:border-[#525252]"
                aria-label="LinkedIn"
              >
                [LinkedIn]
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#262626] pt-8 text-center">
          <p className="text-xs text-[#525252]">
            &copy; {new Date().getFullYear()} {general.name}. {footer.rights}
          </p>
          <p className="text-[10px] text-[#333333] mt-2">{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}

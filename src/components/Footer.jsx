/**
 * Footer.jsx — Acento: Esmeralda
 */

import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { lang } = useLanguage();
  const general = portfolioData.general[lang];
  const social = portfolioData.social;
  const footer = portfolioData.footer[lang];

  return (
    <footer id="contact" className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-emerald-400">{'<'}</span>
              {general.name.split(' ')[0]}
              <span className="text-emerald-400">{'/>'}</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">{general.slogan}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{footer.contactTitle}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-400" />
                <a
                  href={`mailto:${general.email}`}
                  className="hover:text-emerald-400 transition-colors text-sm"
                >
                  {general.email}
                </a>
              </div>
              {/* <div className="flex items-center gap-3">
                  <Phone size={18} className="text-emerald-400" />
                  <span className="text-sm">{general.phone}</span>
                </div> */}
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-400" />
                <span className="text-sm">{general.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {lang === 'es' ? 'Sígueme' : 'Follow Me'}
            </h4>
            <div className="flex gap-4">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 rounded-full hover:bg-emerald-600 transition-colors duration-300"
                aria-label="GitHub"
              >
                <img src="/github.png" alt="GitHub" className="w-5 h-5" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 rounded-full hover:bg-emerald-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {general.name}. {footer.rights}
          </p>
          <p className="text-xs text-slate-600 mt-2">{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
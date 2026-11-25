/**
 * GitLog.jsx
 *
 * Terminal con los últimos commits REALES de los repos de AMS Tech.
 * Los datos los genera scripts/fetchActivity.js en cada build (y el workflow
 * reconstruye a diario), así que no hay peticiones a GitHub desde el navegador.
 * Si el fichero no existe o falla, no muestra nada.
 */

import { useLanguage } from '../context/LanguageContext';
import { useActivity } from '../hooks/useActivity';
import { ago } from '../lib/ago';

export default function GitLog() {
  const { lang } = useLanguage();
  const data = useActivity();

  if (!data) return null;

  return (
    <div
      className="ams-rise mt-10 overflow-hidden border border-[#262626] bg-[#0a0a0a] px-5 py-4 font-mono text-[12px] leading-[1.7] text-[#e5e5e5]"
      style={{ animationDelay: '0.4s' }}
    >
      <div className="text-[#9EA6F2] mb-1.5">
        <span className="text-[#9EA6F2]">$</span> <span className="text-[#FFE27A]">git</span> log --all --oneline
      </div>
      <ul>
        {data.commits.map((c) => (
          <li key={c.sha} className="flex gap-3 min-w-0">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 min-w-0 flex-1 hover:bg-white/5 -mx-1 px-1 rounded-[3px]"
            >
              <span className="text-[#FFE27A] flex-none">{c.sha}</span>
              <span className="text-[#7CC4FF] flex-none w-[84px] sm:w-[110px] truncate">{c.repo}</span>
              <span className="truncate min-w-0 flex-1">{c.message}</span>
              <span className="text-[#9EA6F2] flex-none hidden sm:inline">{ago(c.date, lang)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

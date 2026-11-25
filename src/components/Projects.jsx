/**
 * Projects.jsx
 *
 * Banda "Proyectos" — proyectos de AMS Tech (amstech.dev) dentro de la web
 * oscura retro/ASCII. Mantiene la identidad de marca (emblemas de color, Thor 3D,
 * terminal de commits) pero con las mismas superficies, bordes y tipografía
 * que el resto de secciones, para que la web se sienta una sola.
 *
 * La entrada se hace con animación CSS solo de transform (nunca opacity):
 * el contenido es visible aunque el JS tarde o no haya animaciones.
 */

import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { ProjectEmblem } from './AmsEmblems';
import Thor3D from './Thor3D';
import GitLog from './GitLog';

export default function Projects() {
  const { lang } = useLanguage();
  const projects = portfolioData.projects;
  const social = portfolioData.social;

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-y border-[#262626] bg-[#111111] px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Cabecera de la banda: texto + Thor 3D interactivo */}
        <div className="ams-rise mb-12 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#e5e5e5] md:text-4xl">
              {projects[lang].title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#909090]">{projects[lang].subtitle}</p>
            <a
              href={social.amstech}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-xs text-[#FFE27A] transition-colors hover:text-white"
            >
              amstech.dev ↗
            </a>
          </div>

          <div className="justify-self-center lg:-my-4 lg:justify-self-end">
            <Thor3D />
          </div>
        </div>

        {/* Proyectos insignia */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, index) => (
            <article
              key={project.title}
              className="ams-rise group relative flex cursor-pointer flex-col gap-3 border border-[#262626] bg-[#0d0d0d] p-[18px] transition-colors duration-200 hover:border-[#525252]"
              style={{ animationDelay: `${0.08 + index * 0.08}s` }}
            >
              {/* Toda la tarjeta lleva a la web de amstech.dev (el botón inferior ya ofrece el enlace accesible) */}
              <a
                href={project.site}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute inset-0 z-10"
              />

              <div className="flex items-center gap-3">
                <ProjectEmblem kind={project.emblem} size={44} />
                <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold leading-tight text-[#e5e5e5]">
                    {project.title}
                  </h3>
                  <span className="border border-[#262626] px-2 py-[3px] font-mono text-[10px] leading-none text-[#9c9c9c]">
                    {project.version} · {project.lic}
                  </span>
                </div>
              </div>

              {project.shot && (
                <div className="block aspect-[16/10] overflow-hidden border border-[#262626] bg-[#161616]">
                  <img
                    src={project.shot}
                    alt={project.title}
                    decoding="async"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.02]"
                  />
                </div>
              )}

              <p className="text-[13px] leading-relaxed text-[#a3a3a3]">
                {project.description[lang]}
              </p>

              <span className="font-mono text-[11px] text-[#909090]">{project.stack}</span>

              <div className="relative z-20 mt-auto flex flex-wrap gap-2 pt-1">
                <a
                  href={project.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ams-btn ams-btn--ink"
                >
                  {projects[lang].viewLabel}
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ams-btn"
                >
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Más herramientas */}
        <div className="mt-10">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#909090]">
            {projects[lang].moreLabel}
          </h3>
          <div className="mt-3 border-b border-[#262626]">
            {projects.tools.map((tool, index) => (
              <div
                key={tool.title}
                className="ams-rise flex flex-col gap-2 border-t border-[#262626] py-4 md:flex-row md:items-center md:justify-between"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <div className="min-w-0 text-[13px] leading-relaxed text-[#a3a3a3]">
                  <strong className="font-bold text-[#e5e5e5]">{tool.title}</strong>
                  {': '}
                  {tool.description[lang]}
                </div>
                <div className="flex flex-none items-center gap-3">
                  <span className="font-mono text-[11px] text-[#909090]">{tool.stack}</span>
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ams-btn"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal de banda: commits reales (o la nota de siempre) */}
        <GitLog />
      </div>
    </section>
  );
}

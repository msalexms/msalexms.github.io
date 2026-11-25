/**
 * Projects.jsx
 *
 * Banda "Proyectos" — contraste de marca: AMSTech UI (amstech.dev)
 * dentro de la web oscura retro/ASCII.
 *
 * Estilo AMSTech: fondo claro, bordes gruesos de tinta, sombras duras,
 * esquinas 6px, Bricolage Grotesque + Figtree + DM Mono.
 * Tras la banda, la web continúa con su estética oscura habitual.
 *
 * La entrada se hace con animación CSS solo de transform (nunca opacity):
 * el contenido es visible aunque el JS tarde o no haya animaciones.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { ProjectEmblem } from './AmsEmblems';
import Thor3D from './Thor3D';
import GitLog from './GitLog';

export default function Projects() {
  const { lang } = useLanguage();
  const projects = portfolioData.projects;
  const social = portfolioData.social;

  // Origen del "portal": coincide con Thor según el layout (arriba derecha en lg, centrado en móvil)
  const [isLg, setIsLg] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const portalOrigin = isLg ? '76% 13%' : '50% 18%';

  // Entrada "portal": al llegar a la banda, un círculo de color nace desde Thor
  // y se expande poco a poco durante casi todo el scroll de entrada (de abajo del viewport hasta casi arriba).
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 100%', 'start 8%'] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [`circle(0% at ${portalOrigin})`, `circle(150% at ${portalOrigin})`]
  );

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="relative overflow-hidden bg-[#FFFFFF] border-y-[3px] border-[#1E1B2E]"
      style={{
        paddingTop: 'clamp(44px, 6.5vw, 80px)',
        paddingBottom: 'clamp(44px, 6.5vw, 80px)',
        ...(reduced ? {} : { clipPath }),
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabecera de la banda: texto + Thor 3D interactivo */}
        <div className="ams-rise mb-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">
          <div>
            <h2 className="font-ams-brand font-extrabold text-[clamp(28px,4vw,40px)] leading-[1.08] tracking-[-0.025em] text-[#1E1B2E]">
              {projects[lang].title}
            </h2>
            <p className="font-ams text-[14.5px] text-[#5A5670] mt-2 max-w-xl">
              {projects[lang].subtitle}
            </p>
            <a
              href={social.amstech}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-ams text-[14px] font-extrabold text-[#2B36D9] no-underline hover:underline mt-3"
            >
              amstech.dev ↗
            </a>
          </div>

          <div className="justify-self-center lg:justify-self-end lg:-my-4">
            <Thor3D />
          </div>
        </div>

        {/* Proyectos insignia */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${projects.items.length % 3 === 0 ? 'lg:grid-cols-3' : ''} gap-4`}>
          {projects.items.map((project, index) => (
            <article
              key={project.title}
              className="ams-rise group relative flex flex-col gap-2.5 bg-[#FFF6E9] border-2 border-[#1E1B2E] rounded-md p-[18px] shadow-[4px_4px_0_#1E1B2E] hover:shadow-[5px_5px_0_#1E1B2E] hover:-translate-x-px hover:-translate-y-px transition-transform duration-100 cursor-pointer"
              style={{ animationDelay: `${0.08 + index * 0.08}s` }}
            >
              {/* Toda la tarjeta lleva a la web de amstech.dev (el botón inferior ya ofrece el enlace accesible) */}
              <a
                href={project.site}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute inset-0 z-10 rounded-md"
              />

              <div className="flex items-center gap-3">
                <ProjectEmblem kind={project.emblem} size={46} />
                <div className="flex flex-wrap items-baseline justify-between gap-2 flex-1 min-w-0">
                  <h3 className="font-ams-brand font-extrabold text-[19px] leading-[1.2] tracking-[-0.015em] text-[#1E1B2E]">
                    {project.title}
                  </h3>
                  <span className="font-ams-mono text-[11.5px] leading-[1.2] font-medium text-[#5A5670] bg-white border-[1.5px] border-[#E9DFCB] rounded-[4px] px-2 py-[3px]">
                    {project.version} · {project.lic}
                  </span>
                </div>
              </div>

              {project.shot && (
                <div className="block aspect-[16/10] rounded-[4px] border-[1.5px] border-[#1E1B2E] overflow-hidden bg-[#F7EFE0]">
                  <img
                    src={project.shot}
                    alt={project.title}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.02]"
                  />
                </div>
              )}

              <p className="font-ams text-[14.5px] leading-[1.5] text-[#3B3850]">
                {project.description[lang]}
              </p>

              <span className="font-ams-mono text-[12px] text-[#5A5670]">
                {project.stack}
              </span>

              <div className="relative z-20 flex flex-wrap gap-2 mt-auto pt-1">
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
        <div className="mt-7">
          <span className="block font-ams text-[11px] font-extrabold leading-[1.25] tracking-[0.09em] uppercase text-[#5A5670]">
            {projects[lang].moreLabel}
          </span>
          <div className="mt-2.5 border-b-[1.5px] border-[#E9DFCB]">
            {projects.tools.map((tool, index) => (
              <div
                key={tool.title}
                className="ams-rise flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-3 border-t-[1.5px] border-[#E9DFCB]"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <div className="font-ams text-[14.5px] text-[#3B3850] min-w-0">
                  <strong className="font-ams-brand text-[#1E1B2E]">{tool.title}</strong>
                  {': '}
                  {tool.description[lang]}
                </div>
                <div className="flex items-center gap-3 flex-none">
                  <span className="font-ams-mono text-[12px] text-[#5A5670]">
                    {tool.stack}
                  </span>
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
    </motion.section>
  );
}

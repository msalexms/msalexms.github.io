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

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { ProjectEmblem } from './AmsEmblems';
import Thor3D from './Thor3D';
import GitLog from './GitLog';

function getOffsetWithin(el, ancestor) {
  let x = 0;
  let y = 0;
  let cur = el;
  while (cur && cur !== ancestor) {
    x += cur.offsetLeft;
    y += cur.offsetTop;
    cur = cur.offsetParent;
  }
  if (cur === ancestor) return { x, y };
  const elRect = el.getBoundingClientRect();
  const ancRect = ancestor.getBoundingClientRect();
  return { x: elRect.left - ancRect.left, y: elRect.top - ancRect.top };
}

export default function Projects() {
  const { lang } = useLanguage();
  const projects = portfolioData.projects;
  const social = portfolioData.social;

  const sectionRef = useRef(null);
  const thorWrapRef = useRef(null);
  const curtainRef = useRef(null);
  const pathRef = useRef(null);

  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Entrada "portal": cortina SVG del tamaño del viewport que abre un círculo
  // centrado en Thor (en escritorio) o en la cabecera (en móvil) durante el scroll.
  useLayoutEffect(() => {
    if (reduced) return undefined;
    const section = sectionRef.current;
    const curtain = curtainRef.current;
    const path = pathRef.current;
    if (!section || !curtain || !path) return undefined;

    let raf = 0;
    let lastD = '';
    let metrics = {
      w: 0,
      overlayH: 0,
      cx: 0,
      cy: 0,
      maxR: 0,
      isLg: true,
    };

    const update = () => {
      raf = 0;
      const { w, overlayH, cx, cy, maxR, isLg } = metrics;
      if (w < 1 || overlayH < 1) return;

      const vh = window.innerHeight || 700;
      const startY = vh * (isLg ? 0.96 : 0.94);
      const endY = vh * (isLg ? 0.14 : 0.16);
      const span = Math.max(1, startY - endY);
      const rectTop = section.getBoundingClientRect().top;
      const p = Math.max(0, Math.min(1, (startY - rectTop) / span));

      if (p >= 1) {
        if (curtain.style.display !== 'none') {
          curtain.style.display = 'none';
        }
        return;
      }

      if (curtain.style.display !== 'block') {
        curtain.style.display = 'block';
      }

      const r = p * maxR;
      let d;
      if (r <= 0.5) {
        d = `M0 0 H${w} V${overlayH} H0 Z`;
      } else {
        const rStr = r.toFixed(1);
        const cyStr = cy.toFixed(1);
        const x1 = (cx + r).toFixed(1);
        const x2 = (cx - r).toFixed(1);
        d = `M0 0 H${w} V${overlayH} H0 Z M${x1} ${cyStr} A${rStr} ${rStr} 0 1 0 ${x2} ${cyStr} A${rStr} ${rStr} 0 1 0 ${x1} ${cyStr} Z`;
      }

      if (d !== lastD) {
        lastD = d;
        path.setAttribute('d', d);
      }
    };

    const scheduleUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const measure = () => {
      const w = section.clientWidth;
      const sectionH = section.scrollHeight;
      const vh = window.innerHeight || 700;
      if (w < 1 || sectionH < 1) return;

      const isLg = window.matchMedia('(min-width: 1024px)').matches;
      const thorWrap = thorWrapRef.current;
      let thorCx = isLg ? w * 0.76 : w * 0.5;
      let thorCy = isLg ? 200 : 110;
      if (thorWrap) {
        const off = getOffsetWithin(thorWrap, section);
        if (thorWrap.offsetWidth > 0 && thorWrap.offsetHeight > 0) {
          thorCx = off.x + thorWrap.offsetWidth / 2;
          thorCy = off.y + thorWrap.offsetHeight / 2;
        }
      }

      const cx = isLg ? thorCx : w / 2;
      const cy = isLg ? thorCy : Math.min(thorCy, Math.round(w * 0.28));
      const overlayH = Math.min(sectionH, Math.ceil(vh + 180));
      const endY = vh * (isLg ? 0.14 : 0.16);
      const visibleBottom = Math.min(sectionH, Math.ceil(vh - endY + 180));
      const maxR =
        Math.ceil(
          Math.max(
            Math.hypot(cx, cy),
            Math.hypot(w - cx, cy),
            Math.hypot(cx, visibleBottom - cy),
            Math.hypot(w - cx, visibleBottom - cy)
          )
        ) + 24;

      metrics = { w, overlayH, cx, cy, maxR, isLg };
      curtain.style.height = `${overlayH}px`;
      curtain.setAttribute('viewBox', `0 0 ${w} ${overlayH}`);
      lastD = '';
      update();
    };

    const onResize = () => {
      measure();
    };

    let resizeObs = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObs = new ResizeObserver(onResize);
      resizeObs.observe(section);
    }

    measure();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      resizeObs?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
    };
  }, [reduced, lang]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative isolate overflow-hidden bg-[#FFFFFF] border-b-[3px] border-[#1E1B2E]"
      style={{
        paddingTop: 'clamp(44px, 6.5vw, 80px)',
        paddingBottom: 'clamp(44px, 6.5vw, 80px)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-[#1E1B2E]"
      />

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

          <div ref={thorWrapRef} className="justify-self-center lg:justify-self-end lg:-my-4">
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
        {projects.tools.length > 0 && (
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
        )}

        {/* Salida a la web completa */}
        <div className="mt-6">
          <a
            href={social.amstech}
            target="_blank"
            rel="noopener noreferrer"
            className="ams-btn ams-btn--ink"
          >
            {projects[lang].allLabel}
          </a>
        </div>

        {/* Terminal de banda: commits reales (o la nota de siempre) */}
        <GitLog />
      </div>

      {!reduced && (
        <svg
          ref={curtainRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-30 block w-full overflow-hidden"
          preserveAspectRatio="none"
        >
          <path ref={pathRef} fill="#0a0a0a" fillRule="evenodd" />
        </svg>
      )}
    </section>
  );
}

/**
 * Projects.jsx
 *
 * Proyectos — grid cuadrado, sin sombras, sin redondeo.
 * Links como texto [src] [demo].
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { lang } = useLanguage();
  const projects = portfolioData.projects;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="projects" className="py-24 px-6 bg-[#111111]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xs font-medium text-[#525252] uppercase tracking-widest mb-2">
            03.
          </h2>
          <h2 className="text-3xl font-bold text-[#e5e5e5] tracking-tight">
            {projects[lang].title}
          </h2>
          <p className="text-sm text-[#525252] mt-2">{projects[lang].subtitle}</p>
          <div className="w-full h-px bg-[#262626] mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.items.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group border border-[#262626] hover:border-[#525252] transition-colors duration-200 bg-[#171717]"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="p-5 border-t border-[#262626]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-[#e5e5e5]">{project.title}</h3>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#525252] hover:text-[#a3a3a3] transition-colors"
                    >
                      [src]
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#525252] hover:text-[#a3a3a3] transition-colors"
                      >
                        [demo]
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#a3a3a3] mb-4 leading-relaxed">
                  {project.description[lang]}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#0a0a0a] border border-[#262626] text-[#525252]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

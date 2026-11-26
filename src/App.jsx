/**
 * App.jsx
 *
 * Componente raíz de la aplicación.
 * Tema oscuro único, estética OPENCODE retro/ASCII.
 */

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

// El visor de PDF arrastra react-pdf + pdfjs (~1 MB): se carga bajo demanda
const AcademicViewer = lazy(() => import('./components/AcademicViewer'));

/** Monta su contenido solo cuando la sección se acerca al viewport. */
function Deferred({ children, placeholder }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? children : placeholder}
    </div>
  );
}

function DeferredAcademic() {
  const { lang } = useLanguage();
  const loadingText = lang === 'es' ? '[cargando visor pdf...]' : '[loading pdf viewer...]';

  return (
    <section id="academic" className="py-24 px-6 bg-[#0a0a0a]">
      <Deferred
        placeholder={<div className="max-w-6xl mx-auto min-h-[820px]" aria-hidden="true" />}
      >
        <Suspense
          fallback={
            <div className="max-w-6xl mx-auto min-h-[820px] text-xs text-[#9c9c9c]">
              {loadingText}
            </div>
          }
        >
          <AcademicViewer />
        </Suspense>
      </Deferred>
    </section>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      {/* reducedMotion="user": desactiva animaciones si el usuario lo pide en su SO */}
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono">
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <DeferredAcademic />
            <Education />
          </main>
          <Footer />
          <CommandPalette />
        </div>
      </MotionConfig>
    </LanguageProvider>
  );
}

/**
 * App.jsx
 *
 * Componente raíz de la aplicación.
 * Tema oscuro único, estética OPENCODE retro/ASCII.
 */

import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import AcademicViewer from './components/AcademicViewer';
import Education from './components/Education';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <AcademicViewer />
          <Education />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

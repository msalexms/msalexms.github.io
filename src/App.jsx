/**
 * App.jsx
 *
 * Componente raíz de la aplicación.
 * Envuelve todo con el LanguageProvider y renderiza las secciones.
 * Incluye inicialización del tema oscuro desde localStorage.
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
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
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
/**
 * AcademicViewer.jsx
 *
 * Visor de TFM/TFG — rediseñado cuadrado, oscuro, minimalista.
 * Tabs cuadrados, iconos reemplazados por texto ASCII.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Worker de PDF empaquetado junto a la web (sin CDN externo)
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function AcademicViewer() {
  const { lang } = useLanguage();
  const academic = portfolioData.academic;

  const [activeDoc, setActiveDoc] = useState(academic.documents[0].id);
  const doc = academic.documents.find((d) => d.id === activeDoc);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfError, setPdfError] = useState(false);

  function switchDocument(id) {
    setActiveDoc(id);
    setPageNumber(1);
    setNumPages(null);
    setPdfError(false);
    setScale(1.0);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPdfError(false);
  }

  function onDocumentLoadError() {
    setPdfError(true);
  }

  const es = lang === 'es';

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading title={academic.sectionTitle[lang]} />

      <div className="flex gap-0 mb-6">
        {academic.documents.map((d) => (
          <button
            key={d.id}
            onClick={() => switchDocument(d.id)}
            className={`px-5 py-2 text-xs font-mono uppercase tracking-wider border transition-colors duration-200 ${
              activeDoc === d.id
                ? 'bg-[#262626] text-[#e5e5e5] border-[#525252]'
                : 'bg-[#171717] text-[#858585] border-[#262626] hover:text-[#e5e5e5] hover:border-[#525252]'
            }`}
          >
            {d[lang].tabLabel}
          </button>
        ))}
      </div>

      <motion.div
        key={doc.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-[#262626] bg-[#171717] p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-[#e5e5e5] mb-3">
          {doc[lang].documentTitle}
        </h3>
        <p className="text-sm text-[#a3a3a3] leading-relaxed">
          {doc[lang].abstract}
        </p>
      </motion.div>

      <div className="border border-[#262626] bg-[#171717] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between p-4 border-b border-[#262626] bg-[#0a0a0a] gap-4">
          <div className="flex items-center gap-2 text-[#a3a3a3]">
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="px-2 py-1 border border-[#262626] text-xs hover:border-[#525252] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label={es ? 'Página anterior' : 'Previous page'}
            >
              [&lt;]
            </button>
            <span className="text-xs font-mono min-w-[60px] text-center">
              {pageNumber} / {numPages || '--'}
            </span>
            <button
              onClick={() => setPageNumber((p) => Math.min(numPages || p, p + 1))}
              disabled={pageNumber >= numPages}
              className="px-2 py-1 border border-[#262626] text-xs hover:border-[#525252] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label={es ? 'Siguiente página' : 'Next page'}
            >
              [&gt;]
            </button>
          </div>

          <div className="flex items-center gap-2 text-[#a3a3a3]">
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
              disabled={scale <= 0.5}
              className="px-2 py-1 border border-[#262626] text-xs hover:border-[#525252] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label={es ? 'Alejar' : 'Zoom out'}
            >
              [-]
            </button>
            <span className="text-xs font-mono min-w-[40px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(2, s + 0.25))}
              disabled={scale >= 2}
              className="px-2 py-1 border border-[#262626] text-xs hover:border-[#525252] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label={es ? 'Acercar' : 'Zoom in'}
            >
              [+]
            </button>
          </div>

          <a
            href={doc.pdfPath}
            download
            className="flex items-center gap-2 px-4 py-2 border border-[#262626] text-[#e5e5e5] text-xs hover:bg-[#262626] transition-colors duration-200"
          >
            {doc[lang].downloadLabel}
          </a>
        </div>

        <div className="flex justify-center p-8 bg-[#0a0a0a] min-h-[500px] overflow-auto">
          {!pdfError ? (
            <Document
              file={doc.pdfPath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              <Page pageNumber={pageNumber} scale={scale} className="shadow-none" loading="" />
            </Document>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-12">
              <p className="text-sm font-medium mb-2 text-[#e5e5e5]">
                {es ? 'No se pudo cargar el PDF' : 'The PDF could not be loaded'}
              </p>
              <p className="text-xs text-[#858585] mb-4">
                {es ? 'Descárgalo para leerlo.' : 'Download it to read it.'}
              </p>
              <a
                href={doc.pdfPath}
                download
                className="px-4 py-2 border border-[#262626] text-[#e5e5e5] text-xs hover:bg-[#262626] transition-colors duration-200"
              >
                {doc[lang].downloadLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

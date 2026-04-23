import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function AcademicViewer() {
  const { lang } = useLanguage();
  const academic = portfolioData.academic;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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

  return (
    <section id="academic" className="py-24 px-6 bg-slate-50 dark:bg-slate-950">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            {academic.sectionTitle[lang]}
            <span className="block w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">
            {academic.sectionSubtitle[lang]}
          </p>
        </motion.div>

        <div className="flex gap-2 mb-6 justify-center">
          {academic.documents.map((d) => (
            <button
              key={d.id}
              onClick={() => switchDocument(d.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeDoc === d.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
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
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md mb-8"
        >
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
            {doc[lang].title}
          </p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            {doc[lang].documentTitle}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {doc[lang].abstract}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between p-4 border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800 gap-4">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <button
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-medium min-w-[80px] text-center">
                {pageNumber} / {numPages || '--'}
              </span>
              <button
                onClick={() => setPageNumber((p) => Math.min(numPages || p, p + 1))}
                disabled={pageNumber >= numPages}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <button
                onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                disabled={scale <= 0.5}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-sm font-medium min-w-[50px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(2, s + 0.25))}
                disabled={scale >= 2}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn size={20} />
              </button>
            </div>

            <a
              href={doc.pdfPath}
              download
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors duration-300"
            >
              <Download size={16} />
              {doc[lang].downloadLabel}
            </a>
          </div>

          <div className="flex justify-center p-8 bg-slate-100 dark:bg-slate-900 min-h-[500px] overflow-auto">
            {!pdfError ? (
              <Document
                file={doc.pdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                <Page pageNumber={pageNumber} scale={scale} className="shadow-lg" loading="" />
              </Document>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12">
                <p className="text-lg font-medium mb-2 text-slate-900 dark:text-white">PDF no disponible</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Coloca tu archivo PDF en la carpeta{' '}
                  <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{doc.pdfPath.replace('/', '')}</code>
                </p>
                <a
                  href={doc.pdfPath}
                  download
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-300"
                >
                  {doc[lang].downloadLabel}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
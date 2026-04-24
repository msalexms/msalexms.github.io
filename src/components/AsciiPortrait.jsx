/**
 * AsciiPortrait.jsx
 *
 * Componente que convierte una imagen a arte ASCII.
 * Por defecto muestra ASCII; al hacer hover revela la imagen original.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

const ASCII_CHARS = '@%#*+=-:. ';

export default function AsciiPortrait({ src, alt, width = 280, height = 280 }) {
  const canvasRef = useRef(null);
  const [asciiLines, setAsciiLines] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const generateAscii = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    // Reducimos resolución para que los caracteres ASCII sean legibles
    const cols = 60;
    const rows = 60;
    canvas.width = cols;
    canvas.height = rows;

    ctx.drawImage(img, 0, 0, cols, rows);
    const imageData = ctx.getImageData(0, 0, cols, rows);
    const data = imageData.data;

    const lines = [];
    for (let y = 0; y < rows; y++) {
      let line = '';
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Luminosidad
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
        line += ASCII_CHARS[charIndex];
      }
      lines.push(line);
    }
    setAsciiLines(lines);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => generateAscii(img);
  }, [src, generateAscii]);

  return (
    <div
      className="relative overflow-hidden group"
      style={{ width, height }}
    >
      {/* Canvas oculto para procesamiento */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Capa ASCII */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 z-10 group-hover:opacity-0"
      >
        {loaded ? (
          <pre
            className="font-mono text-[#a3a3a3] leading-[0.65] select-none"
            style={{
              fontSize: `${width / 60}px`,
              whiteSpace: 'pre',
            }}
          >
            {asciiLines.join('\n')}
          </pre>
        ) : (
          <span className="text-[#525252] text-xs">loading...</span>
        )}
      </div>

      {/* Imagen original (revelada en hover) */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top transition-opacity duration-500 opacity-0 group-hover:opacity-100"
      />
    </div>
  );
}

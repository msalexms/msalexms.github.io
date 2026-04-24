/**
 * AsciiPortrait.jsx
 *
 * Componente ASCII con múltiples efectos visuales seleccionables.
 *
 * Efectos disponibles (prop 'effect'):
 *   'scan'    -> Línea de escaneo que revela la imagen
 *   'decode'  -> Decodificación progresiva tipo terminal
 *   'static'  -> Estática de TV que se sintoniza
 *   'glitch'  -> Bloques glitch que desplazan
 *   'matrix'  -> Lluvia Matrix que revela
 *
 * Click para revelar/ocultar la imagen real completa.
 */

import { useRef, useEffect, useState, useCallback } from 'react';

const ASCII_CHARS = '@%#*+=-:. ';

export default function AsciiPortrait({
  src,
  alt,
  width = 320,
  height = 320,
  effect = 'scan',
}) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const asciiDataRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({});

  const generateAsciiData = useCallback((img) => {
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    const cols = 80;
    const rows = 80;
    offCanvas.width = cols;
    offCanvas.height = rows;
    offCtx.drawImage(img, 0, 0, cols, rows);
    const imageData = offCtx.getImageData(0, 0, cols, rows);
    const data = imageData.data;

    const asciiData = [];
    for (let y = 0; y < rows; y++) {
      const row = [];
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = r * 0.299 + g * 0.587 + b * 0.114;
        const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
        row.push({
          char: ASCII_CHARS[charIndex],
          brightness,
          r,
          g,
          b,
        });
      }
      asciiData.push(row);
    }
    return { asciiData, cols, rows };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      asciiDataRef.current = generateAsciiData(img);
      setLoaded(true);
    };
  }, [src, generateAsciiData]);

  // Efectos de dibujo
  const drawAscii = useCallback((ctx, { asciiData, cols, rows }, _time, _state) => {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    const fontW = width / cols;
    const fontH = height / rows;
    ctx.font = `${fontW}px "JetBrains Mono", monospace`;
    ctx.textBaseline = 'top';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = asciiData[y][x];
        ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
        ctx.fillText(cell.char, x * fontW, y * fontH);
      }
    }
  }, [width, height]);

  const drawScan = useCallback((ctx, { asciiData, cols, rows }, time, state) => {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    const scanY = (time * 0.08) % (rows + 20) - 10;
    const fontW = width / cols;
    const fontH = height / rows;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = asciiData[y][x];
        const dist = Math.abs(y - scanY);
        if (dist < 3) {
          const alpha = 1 - dist / 3;
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},${alpha})`;
          ctx.fillRect(x * fontW, y * fontH, fontW, fontH);
        } else {
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},0.3)`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(cell.char, x * fontW, y * fontH);
        }
      }
    }
  }, [width, height]);

  const drawDecode = useCallback((ctx, { asciiData, cols, rows }, time, state) => {
    if (!state.startTime) state.startTime = time;
    const elapsed = time - state.startTime;
    const duration = 4000;
    const progress = Math.min(elapsed / duration, 1);

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    const fontW = width / cols;
    const fontH = height / rows;
    const randomChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = asciiData[y][x];
        const cellProgress = (x + y * cols) / (cols * rows);
        if (progress > cellProgress + 0.1) {
          ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(cell.char, x * fontW, y * fontH);
        } else if (progress > cellProgress) {
          const randChar = randomChars[Math.floor(Math.random() * randomChars.length)];
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},0.6)`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(randChar, x * fontW, y * fontH);
        } else {
          ctx.fillStyle = `rgba(80,80,80,0.15)`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(randomChars[Math.floor(Math.random() * randomChars.length)], x * fontW, y * fontH);
        }
      }
    }

    if (progress >= 1) {
      state.startTime = time + 1000;
    }
  }, [width, height]);

  const drawStatic = useCallback((ctx, { asciiData, cols, rows }, time, state) => {
    if (!state.startTime) state.startTime = time;
    const elapsed = time - state.startTime;
    const tuneProgress = Math.min(elapsed / 3000, 1);
    const noiseAmount = 1 - tuneProgress;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    const fontW = width / cols;
    const fontH = height / rows;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = asciiData[y][x];
        if (Math.random() < noiseAmount * 0.7) {
          const gray = Math.floor(Math.random() * 100);
          ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
          ctx.fillRect(x * fontW, y * fontH, fontW, fontH);
        } else {
          const flicker = 0.7 + Math.random() * 0.3;
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},${flicker})`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(cell.char, x * fontW, y * fontH);
        }
      }
    }

    // Barras de estática horizontales
    if (noiseAmount > 0.1) {
      for (let i = 0; i < 5; i++) {
        const barY = Math.floor(Math.random() * rows);
        const barH = Math.floor(Math.random() * 3) + 1;
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(0, barY * fontH, width, barH * fontH);
      }
    }

    if (tuneProgress >= 1) {
      state.startTime = time + 800;
    }
  }, [width, height]);

  const drawGlitch = useCallback((ctx, { asciiData, cols, rows }, time, state) => {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    const fontW = width / cols;
    const fontH = height / rows;

    if (!state.glitchBlocks) {
      state.glitchBlocks = [];
    }
    if (Math.random() < 0.1) {
      state.glitchBlocks.push({
        y: Math.floor(Math.random() * rows),
        h: Math.floor(Math.random() * 8) + 2,
        offset: (Math.random() - 0.5) * 40,
        life: 1,
      });
    }

    state.glitchBlocks = state.glitchBlocks.filter((b) => {
      b.life -= 0.02;
      return b.life > 0;
    });

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = asciiData[y][x];
        let isGlitch = false;
        let offsetX = 0;

        for (const block of state.glitchBlocks) {
          if (y >= block.y && y < block.y + block.h) {
            isGlitch = true;
            offsetX = block.offset;
          }
        }

        if (isGlitch) {
          ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
          ctx.fillRect(x * fontW + offsetX, y * fontH, fontW, fontH);
        } else {
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},0.4)`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(cell.char, x * fontW, y * fontH);
        }
      }
    }
  }, [width, height]);

  const drawMatrix = useCallback((ctx, { asciiData, cols, rows }, time, state) => {
    if (!state.drops) {
      state.drops = [];
      for (let i = 0; i < cols; i++) {
        state.drops.push({
          x: i,
          y: Math.random() * -rows,
          speed: Math.random() * 2 + 1,
          revealed: [],
        });
      }
    }

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    const fontW = width / cols;
    const fontH = height / rows;

    for (const drop of state.drops) {
      drop.y += drop.speed * 0.3;
      const cy = Math.floor(drop.y);

      if (cy >= 0 && cy < rows) {
        if (!drop.revealed.includes(cy)) {
          drop.revealed.push(cy);
        }
      }

      if (cy > rows + 10) {
        drop.y = Math.random() * -10;
        drop.revealed = [];
      }
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = asciiData[y][x];
        const drop = state.drops[x];
        const isRevealed = drop.revealed.includes(y);
        const isTrail = drop.revealed.includes(y - 1) || drop.revealed.includes(y - 2);

        if (isRevealed) {
          ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
          ctx.fillRect(x * fontW, y * fontH, fontW, fontH);
        } else if (isTrail) {
          ctx.fillStyle = `rgba(100,255,100,0.3)`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(cell.char, x * fontW, y * fontH);
        } else {
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},0.1)`;
          ctx.font = `${fontW}px monospace`;
          ctx.textBaseline = 'top';
          ctx.fillText(cell.char, x * fontW, y * fontH);
        }
      }
    }
  }, [width, height]);

  useEffect(() => {
    if (!loaded || !asciiDataRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const data = asciiDataRef.current;
    const state = stateRef.current;

    let animId;
    const loop = (time) => {
      if (!revealed) {
        switch (effect) {
          case 'scan':
            drawScan(ctx, data, time, state);
            break;
          case 'decode':
            drawDecode(ctx, data, time, state);
            break;
          case 'static':
            drawStatic(ctx, data, time, state);
            break;
          case 'glitch':
            drawGlitch(ctx, data, time, state);
            break;
          case 'matrix':
            drawMatrix(ctx, data, time, state);
            break;
          default:
            drawAscii(ctx, data, time, state);
        }
      } else {
        ctx.drawImage(imgRef.current, 0, 0, width, height);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [loaded, effect, revealed, width, height, drawScan, drawDecode, drawStatic, drawGlitch, drawMatrix, drawAscii]);

  const handleClick = () => {
    setRevealed((prev) => !prev);
  };

  return (
    <div
      className="relative overflow-hidden cursor-pointer select-none"
      style={{ width, height }}
      onClick={handleClick}
    >
      {!loaded ? (
        <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] border border-[#262626]">
          <span className="text-[#525252] text-xs animate-pulse">loading...</span>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
          {/* Indicador de interacción */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center opacity-100 hover:opacity-0 transition-opacity duration-300 pointer-events-none">
            <span className="text-[10px] text-[#525252] bg-[#0a0a0a] px-2 py-1 border-t border-x border-[#262626]">
              [ click to reveal ]
            </span>
          </div>
        </>
      )}
    </div>
  );
}

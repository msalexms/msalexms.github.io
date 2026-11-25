/**
 * AsciiPortrait.jsx
 *
 * Componente ASCII con múltiples efectos visuales seleccionables.
 * Los datos ASCII se generan en build time y se sirven desde
 * /data/asciiData.json para no incrustarlos en el bundle del JS.
 *
 * Efectos disponibles (prop 'effect'):
 *   'scan'    -> Línea de escaneo que revela la imagen
 *   'decode'  -> Decodificación progresiva tipo terminal
 *   'static'  -> Estática de TV que se sintoniza
 *   'glitch'  -> Bloques glitch que desplazan
 *   'matrix'  -> Lluvia Matrix que revela
 *
 * Click para alternar entre efecto animado y ASCII estático.
 */

import { useRef, useEffect, useState, useCallback } from 'react';

export default function AsciiPortrait({
  alt,
  width = 320,
  height = 320,
  effect = 'scan',
}) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [asciiData, setAsciiData] = useState(null);
  const animRef = useRef(null);
  const stateRef = useRef({});

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

  const drawPixelArt = useCallback((ctx, { asciiData, cols, rows }) => {
    const cellW = width / cols;
    const cellH = height / rows;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = asciiData[y][x];
        ctx.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
        ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
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
    // Ráfagas breves y poco frecuentes: la cara se lee casi siempre
    if (Math.random() < 0.012) {
      state.glitchBlocks.push({
        y: Math.floor(Math.random() * rows),
        h: Math.floor(Math.random() * 3) + 1,
        offset: (Math.random() - 0.5) * 20,
        life: 1,
      });
    }

    state.glitchBlocks = state.glitchBlocks.filter((b) => {
      b.life -= 0.09;
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
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},0.85)`;
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

  // Datos del retrato: se sirven como fichero estático, no en el bundle
  useEffect(() => {
    let cancelled = false;
    fetch('/data/asciiData.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAsciiData(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !asciiData) return;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const data = asciiData;
    const state = stateRef.current;

    // Sin animación si el usuario prefiere menos movimiento: retrato estático
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      drawAscii(ctx, data, 0, state);
      return;
    }

    let animId;
    let inView = true;
    const loop = (time) => {
      if (!inView || document.hidden) {
        animId = requestAnimationFrame(loop);
        return;
      }
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
        drawPixelArt(ctx, data);
      }
      animId = requestAnimationFrame(loop);
    };

    // No gastar CPU/GPU dibujando el retrato cuando ya no se ve (o la pestaña está oculta)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(canvas);

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [effect, revealed, width, height, asciiData, drawScan, drawDecode, drawStatic, drawGlitch, drawMatrix, drawAscii, drawPixelArt]);

  const handleClick = () => {
    setRevealed((prev) => !prev);
  };

  return (
    <div
      className="relative mx-auto aspect-square w-full cursor-pointer select-none overflow-hidden"
      style={{ maxWidth: width }}
      onClick={handleClick}
      role="img"
      aria-label={alt}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}

/**
 * RevealPortrait.jsx
 *
 * Retrato que empieza "apagado" (desenfocado y oscuro) y se va revelando a
 * color y nítido por donde pasa el ratón. El rastro se desvanece poco a poco,
 * así que la foto vuelve a quedar apagada cuando dejas de moverte.
 * Al cargar hace un barrido automático corto para que se descubra el efecto.
 *
 * En pantallas táctiles y con "reducir movimiento" se muestra la foto nítida,
 * sin efecto. La imagen con `alt` siempre está en el DOM.
 */

import { useEffect, useRef, useState } from 'react';

const TRAIL_MS = 2400; // cuánto tarda en apagarse el rastro
const BRUSH = 84; // radio del pincel (px CSS)
const STEP = 9; // separación entre toques al mover el ratón (px CSS)
const MAX_DABS = 360;

function canHoverFine() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function RevealPortrait({ src, alt, width, height }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [interactive, setInteractive] = useState(canHoverFine);

  useEffect(() => {
    setInteractive(canHoverFine());
  }, []);

  useEffect(() => {
    if (!interactive) return undefined;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const reveal = document.createElement('canvas');
    const rctx = reveal.getContext('2d');
    const brush = document.createElement('canvas');

    let dpr = 1;
    let w = 0;
    let h = 0;
    let raf = 0;
    let alive = true;
    let ready = false;
    let last = null;
    let introStart = performance.now();
    const introMs = 1700;
    const dabs = [];

    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      ready = true;
      kick();
    };
    img.src = src;

    const makeBrush = () => {
      const r = BRUSH * dpr;
      brush.width = brush.height = Math.ceil(r * 2);
      const b = brush.getContext('2d');
      const g = b.createRadialGradient(r, r, 0, r, r, r);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.5, 'rgba(255,255,255,0.8)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      b.fillStyle = g;
      b.fillRect(0, 0, brush.width, brush.height);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = reveal.width = w;
      canvas.height = reveal.height = h;
      makeBrush();
    };

    const addDab = (x, y, now) => {
      dabs.push({ x: x * dpr, y: y * dpr, t: now });
      if (dabs.length > MAX_DABS) dabs.shift();
    };

    const frame = (now) => {
      raf = 0;
      if (!alive) return;

      // barrido inicial: una pasada suave por la cara
      const ip = (now - introStart) / introMs;
      if (ip >= 0 && ip < 1) {
        const rect = wrap.getBoundingClientRect();
        const x = rect.width * (0.18 + 0.64 * ip);
        const y = rect.height * (0.5 + 0.18 * Math.sin(ip * Math.PI * 2.4));
        addDab(x, y, now);
      }

      while (dabs.length && now - dabs[0].t > TRAIL_MS) dabs.shift();

      rctx.clearRect(0, 0, w, h);
      const half = brush.width / 2;
      for (const d of dabs) {
        const p = (now - d.t) / TRAIL_MS;
        rctx.globalAlpha = Math.pow(1 - p, 1.4);
        rctx.drawImage(brush, d.x - half, d.y - half);
      }
      rctx.globalAlpha = 1;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      if (dabs.length && ready) {
        ctx.drawImage(img, 0, 0, w, h);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(reveal, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
      }

      if (dabs.length || (now - introStart) / introMs < 1) {
        raf = requestAnimationFrame(frame);
      }
    };

    function kick() {
      if (!raf && alive) raf = requestAnimationFrame(frame);
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const n = Math.max(1, Math.floor(dist / STEP));
        for (let i = 1; i <= n; i++) addDab(last.x + (dx * i) / n, last.y + (dy * i) / n, now);
      } else {
        addDab(x, y, now);
      }
      last = { x, y };
      kick();
    };
    const onLeave = () => {
      last = null;
    };

    resize();
    introStart = performance.now() + 350;
    kick();
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [interactive, src]);

  return (
    <div ref={wrapRef} className="relative aspect-[4/5] w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${
          interactive ? 'scale-105 [filter:blur(5px)_brightness(0.45)_saturate(0.7)]' : ''
        }`}
      />
      {interactive && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}

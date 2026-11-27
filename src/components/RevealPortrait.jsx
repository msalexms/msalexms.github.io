/**
 * RevealPortrait.jsx
 *
 * Retrato que empieza "apagado" (desenfocado y oscuro) y se va revelando a
 * color y nítido por donde pasa el ratón o el dedo. El rastro se desvanece
 * poco a poco, así que la foto vuelve a quedar apagada cuando dejas de moverte.
 * Al cargar puede hacer un barrido automático corto y, cuando lleva un rato
 * cubierto por completo, escribe palabras o da pequeños pincelazos con el borrado.
 *
 * Con "reducir movimiento" activado se muestra la foto nítida, sin efecto.
 * La imagen con `alt` siempre está en el DOM.
 */

import { useEffect, useRef, useState } from 'react';
import { buildWordStrokes } from '../lib/strokeFont';

const STEP = 9; // separación entre toques al mover el ratón o el dedo (px CSS)
const WRITE_STEP = 3; // paso fino para trazos legibles al escribir
const MAX_DABS = 900;

function canAnimateReveal() {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function RevealPortrait({
  src,
  alt,
  width,
  height,
  aspectClass = 'aspect-[4/5]',
  trailMs = 2400,
  brushRadius = 84,
  autoIntro = true,
  idlePeek = true,
  initialPeekMs = 1500,
  idleWords,
  dimFilter = 'blur(5px) brightness(0.45) saturate(0.7)',
  focalX = 0.5,
  focalY = 0.5,
  hint,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [interactive, setInteractive] = useState(canAnimateReveal);
  const [touched, setTouched] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setInteractive(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!interactive) return undefined;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const reveal = document.createElement('canvas');
    const rctx = reveal.getContext('2d');
    if (!ctx || !rctx) return undefined;
    const brush = document.createElement('canvas');

    const initialRect = wrap.getBoundingClientRect();
    let dpr = 1;
    let w = 0;
    let h = 0;
    let raf = 0;
    let peekTimer = 0;
    let alive = true;
    let ready = false;
    let visible =
      initialRect.width > 0 &&
      initialRect.bottom > 0 &&
      initialRect.top < window.innerHeight;
    let wordIndex = 0;
    const lastByPointer = new Map();
    let activeStroke = null;
    let activeWriting = null;
    let introStart = performance.now();
    const introMs = 1700;
    const dabs = [];

    const makeBrush = () => {
      const r = brushRadius * dpr;
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
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextW = Math.max(1, Math.round(rect.width * nextDpr));
      const nextH = Math.max(1, Math.round(rect.height * nextDpr));
      if (nextW === w && nextH === h && nextDpr === dpr) return;
      dpr = nextDpr;
      w = nextW;
      h = nextH;
      canvas.width = reveal.width = w;
      canvas.height = reveal.height = h;
      makeBrush();
      if (dabs.length) kick();
    };

    const addDab = (x, y, now, scale = 1, life = trailMs) => {
      dabs.push({ x: x * dpr, y: y * dpr, t: now, scale, life });
      if (dabs.length > MAX_DABS) dabs.shift();
    };

    const addLineDabs = (from, to, now, scale = 1, step = STEP, life = trailMs) => {
      if (!from) {
        addDab(to.x, to.y, now, scale, life);
        return;
      }
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.hypot(dx, dy);
      const n = Math.max(1, Math.floor(dist / step));
      for (let i = 1; i <= n; i++) {
        addDab(from.x + (dx * i) / n, from.y + (dy * i) / n, now, scale, life);
      }
    };

    const startIdleAction = () => {
      if (!alive || !idlePeek || !visible || document.visibilityState === 'hidden') return;
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 20) return;

      if (idleWords && idleWords.length > 0) {
        const word = idleWords[wordIndex % idleWords.length];
        wordIndex += 1;
        const { strokes, strokePx } = buildWordStrokes(word, rect.width, rect.height);
        if (strokes.length > 0) {
          const strokeScale = Math.max(0.11, Math.min(0.26, strokePx / brushRadius));
          const speed = Math.max(140, rect.width * 0.72); // px/s
          const segs = [];
          let cursor = 0;
          for (const poly of strokes) {
            for (let i = 0; i < poly.length - 1; i++) {
              const len = Math.hypot(poly[i + 1].x - poly[i].x, poly[i + 1].y - poly[i].y);
              const dur = Math.max(45, (len / speed) * 1000);
              segs.push({ from: poly[i], to: poly[i + 1], t0: cursor, t1: cursor + dur, lastPt: null });
              cursor += dur;
            }
            cursor += 45; // pequeña pausa entre trazos
          }
          activeWriting = {
            start: performance.now(),
            totalMs: cursor,
            segs,
            scale: strokeScale,
            life: Math.max(trailMs, cursor + 1600),
          };
          kick();
          return;
        }
      }

      const angle = Math.random() * Math.PI * 2;
      const len = rect.width * (0.2 + Math.random() * 0.18);
      const cx = rect.width * (0.26 + Math.random() * 0.48);
      const cy = rect.height * (0.28 + Math.random() * 0.44);
      const dx = Math.cos(angle) * (len * 0.5);
      const dy = Math.sin(angle) * (len * 0.5);

      activeStroke = {
        start: performance.now(),
        duration: 520 + Math.random() * 240,
        x0: Math.max(12, Math.min(rect.width - 12, cx - dx)),
        y0: Math.max(12, Math.min(rect.height - 12, cy - dy)),
        x1: Math.max(12, Math.min(rect.width - 12, cx + dx)),
        y1: Math.max(12, Math.min(rect.height - 12, cy + dy)),
        bend: (Math.random() - 0.5) * 26,
        lastPt: null,
      };
      kick();
    };

    const schedulePeek = (delay = 1800 + Math.random() * 1200) => {
      clearTimeout(peekTimer);
      if (!alive || !idlePeek || !visible) return;
      peekTimer = window.setTimeout(() => {
        if (!dabs.length && !activeStroke && !activeWriting) startIdleAction();
      }, delay);
    };

    const frame = (now) => {
      raf = 0;
      if (!alive) return;

      // Barrido inicial opcional: una pasada suave
      const ip = autoIntro ? (now - introStart) / introMs : 1;
      if (autoIntro && ip >= 0 && ip < 1) {
        const rect = wrap.getBoundingClientRect();
        const x = rect.width * (0.18 + 0.64 * ip);
        const y = rect.height * (0.5 + 0.18 * Math.sin(ip * Math.PI * 2.4));
        addDab(x, y, now, 1, trailMs);
      }

      // Escritura automática letra a letra cuando lleva un rato cubierto
      if (activeWriting) {
        const elapsed = now - activeWriting.start;
        for (const seg of activeWriting.segs) {
          if (elapsed < seg.t0 || seg.done) continue;
          const p = Math.min(1, (elapsed - seg.t0) / (seg.t1 - seg.t0));
          const pt = {
            x: seg.from.x + (seg.to.x - seg.from.x) * p,
            y: seg.from.y + (seg.to.y - seg.from.y) * p,
          };
          addLineDabs(seg.lastPt ?? seg.from, pt, now, activeWriting.scale, WRITE_STEP, activeWriting.life);
          seg.lastPt = pt;
          if (p >= 1) seg.done = true;
        }
        if (elapsed >= activeWriting.totalMs) {
          activeWriting = null;
        }
      }

      // Pincelazo suave automático si no hay palabras configuradas
      if (activeStroke) {
        const sp = Math.min(1, (now - activeStroke.start) / activeStroke.duration);
        const ease = sp < 0.5 ? 2 * sp * sp : 1 - Math.pow(-2 * sp + 2, 2) / 2;
        const pt = {
          x: activeStroke.x0 + (activeStroke.x1 - activeStroke.x0) * ease,
          y:
            activeStroke.y0 +
            (activeStroke.y1 - activeStroke.y0) * ease +
            Math.sin(sp * Math.PI) * activeStroke.bend,
        };
        addLineDabs(activeStroke.lastPt, pt, now, 0.55, STEP, trailMs);
        activeStroke.lastPt = pt;
        if (sp >= 1) activeStroke = null;
      }

      // Limpia toques expirados
      for (let i = dabs.length - 1; i >= 0; i--) {
        if (now - dabs[i].t > dabs[i].life) dabs.splice(i, 1);
      }

      rctx.clearRect(0, 0, w, h);
      const half = brush.width / 2;
      for (const d of dabs) {
        const p = (now - d.t) / d.life;
        const r = half * d.scale;
        rctx.globalAlpha = Math.pow(Math.max(0, 1 - p), 1.4);
        rctx.drawImage(brush, d.x - r, d.y - r, r * 2, r * 2);
      }
      rctx.globalAlpha = 1;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      if (dabs.length && ready) {
        // Recorte equivalente a object-cover + object-position para que coincida con el <img>
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        const dx = (w - dw) * focalX;
        const dy = (h - dh) * focalY;
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(reveal, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
      }

      const introActive = autoIntro && (now - introStart) / introMs < 1;
      if (dabs.length || introActive || activeStroke || activeWriting) {
        raf = requestAnimationFrame(frame);
      } else {
        schedulePeek();
      }
    };

    function kick() {
      if (!raf && alive) raf = requestAnimationFrame(frame);
    }

    const markTouched = () => {
      if (!revealedRef.current) {
        revealedRef.current = true;
        setTouched(true);
      }
    };

    const getPoint = (e) => {
      const rect = wrap.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onPointerDown = (e) => {
      clearTimeout(peekTimer);
      activeStroke = null;
      activeWriting = null;
      markTouched();
      const pt = getPoint(e);
      addDab(pt.x, pt.y, performance.now(), e.pointerType === 'touch' ? 1.1 : 1, trailMs);
      lastByPointer.set(e.pointerId, pt);
      kick();
    };

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch' && !lastByPointer.has(e.pointerId)) return;
      clearTimeout(peekTimer);
      activeStroke = null;
      activeWriting = null;
      markTouched();
      const pt = getPoint(e);
      addLineDabs(lastByPointer.get(e.pointerId) ?? null, pt, performance.now(), 1, STEP, trailMs);
      lastByPointer.set(e.pointerId, pt);
      kick();
    };

    const onPointerEnd = (e) => {
      lastByPointer.delete(e.pointerId);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (
          !wasVisible &&
          visible &&
          !dabs.length &&
          !activeStroke &&
          !activeWriting &&
          !(autoIntro && (performance.now() - introStart) / introMs < 1)
        ) {
          schedulePeek(initialPeekMs <= 0 ? 250 : 600);
        } else if (!visible) {
          clearTimeout(peekTimer);
        }
      },
      { threshold: 0.15 }
    );

    const onVisibilityChange = () => {
      if (
        document.visibilityState === 'visible' &&
        visible &&
        !dabs.length &&
        !activeStroke &&
        !activeWriting
      ) {
        schedulePeek(800);
      }
    };

    let resizeObs = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObs = new ResizeObserver(resize);
      resizeObs.observe(wrap);
    }

    resize();
    introStart = performance.now() + 350;
    observer.observe(wrap);

    const handleLoad = () => {
      if (!alive || ready) return;
      ready = true;
      if (!autoIntro && initialPeekMs <= 0 && visible && !dabs.length && !activeStroke && !activeWriting) {
        startIdleAction();
      } else {
        kick();
      }
    };

    const img = new Image();
    if (initialPeekMs > 0) img.decoding = 'async';
    img.onload = handleLoad;
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    }

    if (autoIntro) {
      kick();
    } else if (initialPeekMs > 0) {
      schedulePeek(initialPeekMs);
    }

    wrap.addEventListener('pointerdown', onPointerDown);
    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerup', onPointerEnd);
    wrap.addEventListener('pointercancel', onPointerEnd);
    wrap.addEventListener('pointerleave', onPointerEnd);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      alive = false;
      clearTimeout(peekTimer);
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObs?.disconnect();
      wrap.removeEventListener('pointerdown', onPointerDown);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerup', onPointerEnd);
      wrap.removeEventListener('pointercancel', onPointerEnd);
      wrap.removeEventListener('pointerleave', onPointerEnd);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [interactive, src, trailMs, brushRadius, autoIntro, idlePeek, initialPeekMs, idleWords, focalX, focalY]);

  return (
    <div
      ref={wrapRef}
      className={`relative isolate ${aspectClass} w-full overflow-hidden ${interactive ? 'select-none' : ''}`}
      style={
        interactive
          ? { touchAction: 'pan-y', WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }
          : undefined
      }
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        draggable={false}
        className={`absolute inset-0 z-0 h-full w-full object-cover ${
          interactive ? 'pointer-events-none select-none scale-105' : ''
        }`}
        style={{
          objectPosition: `${focalX * 100}% ${focalY * 100}%`,
          ...(interactive ? { filter: dimFilter } : {}),
        }}
      />
      {interactive && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        />
      )}
      {interactive && hint && !touched && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <span className="border border-[#2e2e2e] bg-[#0a0a0a]/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FFE27A]">
            {hint}
          </span>
        </span>
      )}
    </div>
  );
}

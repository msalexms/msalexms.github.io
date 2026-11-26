/**
 * GridSpotlight.jsx
 *
 * Halo de luz blanca que sigue al ratón e ilumina las líneas de la rejilla de fondo.
 * Se coloca como primer hijo de una sección `relative`; escucha el puntero de
 * esa sección. La posición se actualiza con CSS variables (sin re-render) y un
 * pequeño suavizado, así que no cuesta nada en rendimiento.
 * No se muestra en pantallas táctiles ni con "reducir movimiento".
 */

import { useEffect, useRef } from 'react';

export default function GridSpotlight() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.parentElement;
    if (!root || !host) return undefined;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let started = false;

    const paint = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      root.style.setProperty('--sx', `${current.x.toFixed(1)}px`);
      root.style.setProperty('--sy', `${current.y.toFixed(1)}px`);
      if (Math.abs(target.x - current.x) > 0.3 || Math.abs(target.y - current.y) > 0.3) {
        raf = requestAnimationFrame(paint);
      } else {
        raf = 0;
      }
    };

    const onMove = (e) => {
      const rect = host.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!started) {
        current.x = target.x;
        current.y = target.y;
        started = true;
      }
      root.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      root.style.opacity = '0';
    };

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="grid-spotlight pointer-events-none absolute inset-0"
      style={{ opacity: 0 }}
    >
      <div className="grid-spotlight__lines absolute inset-0" />
      <div className="grid-spotlight__glow absolute inset-0" />
    </div>
  );
}

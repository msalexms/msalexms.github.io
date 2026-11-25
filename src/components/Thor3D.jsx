/**
 * Thor3D.jsx
 *
 * Logo Thor 3D interactivo de AMS Tech, portado del hero de amstech.dev.
 * - Sigue al ratón (rotación en perspectiva sobre las capas)
 * - Se puede arrastrar y estirar como un muelle
 * - Click / Enter lo "explota" en capas y guiña el ojo
 * - Respeta prefers-reduced-motion
 *
 * Colores ajustados para la banda oscura de proyectos.
 */

import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const HEAD_PATH = 'M10 4L21 14h6L38 4l5 14q1 2 1 6v12q0 8-8 8H12q-8 0-8-8V24q0-4 1-6z';
const CHEV_NORMAL = 'M14 25l6 5-6 5';
const CHEV_WINK = 'M14 29q4-5 8 0';

export default function Thor3D() {
  const { lang } = useLanguage();
  const stageRef = useRef(null);
  const toggleRef = useRef(null);
  const rigRef = useRef(null);
  const chevRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const toggle = toggleRef.current;
    const rig = rigRef.current;
    const chev = chevRef.current;
    if (!stage || !toggle || !rig) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let activePointer = null;
    let startX = 0;
    let startY = 0;
    let dragging = false;
    let wasDrag = false;
    let springTimer;
    let winkTimer;

    const syncChev = () => {
      if (!chev) return;
      chev.setAttribute('d', rig.classList.contains('is-exploded') ? CHEV_WINK : CHEV_NORMAL);
    };

    const wink = () => {
      if (!chev) return;
      chev.setAttribute('d', CHEV_WINK);
      clearTimeout(winkTimer);
      winkTimer = window.setTimeout(syncChev, 380);
    };

    const baseZ = () => (rig.classList.contains('is-exploded') ? 2.1 : 1);

    const releaseWithSpring = (doWink) => {
      clearTimeout(springTimer);
      rig.classList.remove('is-dragging');
      rig.classList.add('is-spring');
      rig.style.setProperty('--z', String(baseZ()));
      rig.style.setProperty('--lx', '0px');
      rig.style.setProperty('--ly', '0px');
      rig.style.transform = '';
      if (doWink && !reducedMotion) wink();
      springTimer = window.setTimeout(() => rig.classList.remove('is-spring'), 660);
    };

    const toggleExploded = () => {
      const next = !rig.classList.contains('is-exploded');
      rig.classList.toggle('is-exploded', next);
      toggle.setAttribute('aria-pressed', String(next));
      rig.style.setProperty('--z', String(next ? 2.1 : 1));
      syncChev();
      releaseWithSpring(true);
    };

    const onMove = (e) => {
      if (reducedMotion || dragging || activePointer !== null) return;
      const r = stage.getBoundingClientRect();
      if (r.bottom < 0) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const ry = Math.tanh(dx / 320) * 24;
      const rx = -Math.tanh(dy / 260) * 19;
      const lx = Math.tanh(dx / 260) * 4.5;
      const ly = Math.tanh(dy / 220) * 3.5;

      rig.classList.add('is-hover');
      rig.style.setProperty('--lx', `${lx.toFixed(1)}px`);
      rig.style.setProperty('--ly', `${ly.toFixed(1)}px`);
      rig.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg)`;
    };

    const onLeave = () => {
      if (dragging || activePointer !== null) return;
      rig.classList.remove('is-hover');
      releaseWithSpring(false);
    };

    const onPointerDown = (e) => {
      if (e.target?.closest?.('a')) return;
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      activePointer = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      dragging = false;
      wasDrag = false;
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== activePointer) return;
      const rawX = e.clientX - startX;
      const rawY = e.clientY - startY;
      const dist = Math.hypot(rawX, rawY);
      if (!dragging && dist > 5) {
        if (e.pointerType === 'touch' && Math.abs(rawY) > Math.abs(rawX)) return;
        dragging = true;
        wasDrag = true;
        if (!stage.hasPointerCapture(e.pointerId)) {
          try {
            stage.setPointerCapture(e.pointerId);
          } catch {
            /* noop */
          }
        }
        clearTimeout(springTimer);
        rig.classList.remove('is-spring', 'is-hover');
        rig.classList.add('is-dragging');
        rig.style.setProperty('--lx', '0px');
        rig.style.setProperty('--ly', '0px');
      }
      if (!dragging) return;

      const maxShift = window.innerWidth <= 480 ? 22 : 44;
      const tx = Math.tanh(rawX / 110) * maxShift;
      const ty = Math.tanh(rawY / 110) * maxShift;
      const absX = Math.abs(tx) / maxShift;
      const absY = Math.abs(ty) / maxShift;
      const sx = 1 + absX * 0.18 - absY * 0.12;
      const sy = 1 + absY * 0.18 - absX * 0.12;
      const rx = -Math.tanh(rawY / 90) * 26;
      const ry = Math.tanh(rawX / 90) * 32;
      const z = Math.min(2.35, baseZ() + dist / 95);

      rig.style.setProperty('--z', z.toFixed(2));
      rig.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
    };

    const endPointer = (e) => {
      if (e.pointerId !== activePointer) return;
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
      const stretched = dragging;
      activePointer = null;
      dragging = false;
      if (stretched) {
        releaseWithSpring(true);
        window.setTimeout(() => {
          wasDrag = false;
        }, 40);
      }
    };

    const onToggleClick = () => {
      if (wasDrag) {
        wasDrag = false;
        return;
      }
      toggleExploded();
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endPointer);
    window.addEventListener('pointercancel', endPointer);
    toggle.addEventListener('click', onToggleClick);

    return () => {
      clearTimeout(springTimer);
      clearTimeout(winkTimer);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endPointer);
      window.removeEventListener('pointercancel', endPointer);
      toggle.removeEventListener('click', onToggleClick);
    };
  }, []);

  const label =
    lang === 'es'
      ? 'Thor 3D interactivo de AMS Tech: arrastra para estirar o pulsa para expandir las capas'
      : 'Interactive 3D AMS Tech Thor: drag to stretch or activate to expand layers';

  return (
    <div ref={stageRef} className="thor3d-stage">
      <button
        ref={toggleRef}
        type="button"
        className="thor3d-toggle"
        aria-pressed="false"
        aria-label={label}
      />
      <div ref={rigRef} className="thor3d-rig">
        {/* Capa trasera: silueta */}
        <div className="thor3d-layer thor3d-back" aria-hidden="true">
          <svg viewBox="-2 -2 52 52">
            <path d={HEAD_PATH} fill="#FFFFFF" opacity="0.08" />
          </svg>
        </div>
        {/* Capa de alambre: contorno amarillo */}
        <div className="thor3d-layer thor3d-wire" aria-hidden="true">
          <svg viewBox="-2 -2 52 52">
            <path d={HEAD_PATH} fill="none" stroke="#FFE27A" strokeWidth="2.4" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Cuerpo: cabeza azul de marca */}
        <div className="thor3d-layer thor3d-body" aria-hidden="true">
          <svg viewBox="-2 -2 52 52">
            <path d={HEAD_PATH} fill="#2B36D9" stroke="#0a0a0a" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Prompt flotante: > _ */}
        <div className="thor3d-layer thor3d-prompt" aria-hidden="true">
          <svg viewBox="-2 -2 52 52">
            <path
              ref={chevRef}
              d={CHEV_NORMAL}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="thor3d-under"
              d="M25 36h9"
              fill="none"
              stroke="#FFE27A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Chips flotantes: proyectos insignia, directos a amstech.dev */}
        <a
          className="thor3d-chip thor3d-chip-1"
          href="https://amstech.dev/proyectos/lenspipe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="thor3d-dot" style={{ background: '#7CC4FF' }} aria-hidden="true" />
          LensPipe ↗
        </a>
        <a
          className="thor3d-chip thor3d-chip-2"
          href="https://amstech.dev/proyectos/circuitbin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="thor3d-dot" style={{ background: '#6FD08C' }} aria-hidden="true" />
          CircuitBin ↗
        </a>
        <a
          className="thor3d-chip thor3d-chip-3"
          href="https://amstech.dev/proyectos/mom/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="thor3d-dot" style={{ background: '#B48CFF' }} aria-hidden="true" />
          mom ↗
        </a>
      </div>
    </div>
  );
}

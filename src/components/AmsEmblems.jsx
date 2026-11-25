/**
 * AmsEmblems.jsx
 *
 * Emblemas y logo de la marca AMS Tech (amstech.dev).
 * SVGs adaptados de AMSTech UI (manual de marca v1.5).
 * Estilo neobrutalista: tinta #1E1B2E, trazos gruesos y colores de serie.
 */

/** Emblema de LensPipe: cámara de estudio. */
export function CameraEmblem({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true" style={{ flex: 'none' }}>
      <path d="M16 7l11 10h18L56 7l5 15v13H11V22z" fill="#2B36D9" stroke="#1E1B2E" strokeWidth="3.2" strokeLinejoin="round" />
      <circle cx="24" cy="23" r="2.6" fill="#FFFFFF" />
      <circle cx="48" cy="23" r="2.6" fill="#FFFFFF" />
      <rect x="7" y="27" width="58" height="39" rx="10" fill="#7CC4FF" stroke="#1E1B2E" strokeWidth="3.2" />
      <rect x="13" y="33" width="11" height="5" rx="2.5" fill="#FFE27A" stroke="#1E1B2E" strokeWidth="2.2" />
      <circle cx="56" cy="36" r="3.6" fill="#FF5C39" stroke="#1E1B2E" strokeWidth="2.2" />
      <circle cx="36" cy="47" r="13" fill="#FFFFFF" stroke="#1E1B2E" strokeWidth="3.2" />
      <circle cx="36" cy="47" r="7" fill="#1E1B2E" />
      <circle cx="33" cy="44" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}

/** Emblema de CircuitBin: chip con pines codificados por color. */
export function ChipEmblem({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true" style={{ flex: 'none' }}>
      <path d="M16 4l11 10h18L56 4l5 15v13H11V19z" fill="#2B36D9" stroke="#1E1B2E" strokeWidth="3.2" strokeLinejoin="round" />
      <circle cx="24" cy="18" r="2.5" fill="#FFFFFF" />
      <circle cx="48" cy="18" r="2.5" fill="#FFFFFF" />
      <g fill="#FFE27A" stroke="#1E1B2E" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="2" y="30.5" width="12" height="6.2" rx="2.2" />
        <rect x="2" y="42" width="12" height="6.2" rx="2.2" />
        <rect x="2" y="53.5" width="12" height="6.2" rx="2.2" />
        <rect x="58" y="30.5" width="12" height="6.2" rx="2.2" />
        <rect x="58" y="42" width="12" height="6.2" rx="2.2" />
        <rect x="58" y="53.5" width="12" height="6.2" rx="2.2" />
      </g>
      <rect x="12" y="25" width="48" height="40" rx="7" fill="#2A2742" stroke="#1E1B2E" strokeWidth="3.2" />
      <rect x="17" y="31.5" width="17.5" height="12.5" rx="3" fill="#7CC4FF" stroke="#1E1B2E" strokeWidth="2" />
      <rect x="37.5" y="31.5" width="17.5" height="12.5" rx="3" fill="#6FD08C" stroke="#1E1B2E" strokeWidth="2" />
      <rect x="17" y="47" width="17.5" height="12.5" rx="3" fill="#FFE27A" stroke="#1E1B2E" strokeWidth="2" />
      <rect x="37.5" y="47" width="17.5" height="12.5" rx="3" fill="#B48CFF" stroke="#1E1B2E" strokeWidth="2" />
      <rect x="23" y="35.3" width="5.5" height="5" rx="1.2" fill="#1E1B2E" />
      <path d="M41.5 39 L45 35.5 L47.5 39 L51 36" fill="none" stroke="#1E1B2E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25.7" cy="53.2" r="3" fill="#FF5C39" stroke="#1E1B2E" strokeWidth="1.8" />
      <path d="M41.5 55 H45.5 L48 51.5 H51.5" fill="none" stroke="#1E1B2E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.5 25 A4.5 4.5 0 0 0 40.5 25 Z" fill="#FFE27A" stroke="#1E1B2E" strokeWidth="2" />
      <rect x="15" y="22" width="10.5" height="7.2" rx="3.6" fill="#2B36D9" stroke="#1E1B2E" strokeWidth="2.6" />
      <rect x="46.5" y="22" width="10.5" height="7.2" rx="3.6" fill="#2B36D9" stroke="#1E1B2E" strokeWidth="2.6" />
    </svg>
  );
}

/** Emblema de mom: ventana de terminal con el gato Thor en pixel art. */
export function TerminalEmblem({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true" style={{ flex: 'none' }}>
      <path d="M16 4l11 10h18L56 4l5 15v13H11V19z" fill="#2B36D9" stroke="#1E1B2E" strokeWidth="3.2" strokeLinejoin="round" />
      <circle cx="24" cy="18.5" r="2.5" fill="#FFFFFF" />
      <circle cx="48" cy="18.5" r="2.5" fill="#FFFFFF" />
      <rect x="5" y="23" width="62" height="42" rx="8" fill="#18181D" stroke="#1E1B2E" strokeWidth="3.2" />
      <circle cx="14" cy="29.5" r="2" fill="#FF5C39" />
      <circle cx="20.5" cy="29.5" r="2" fill="#FFE27A" />
      <circle cx="27" cy="29.5" r="2" fill="#6FD08C" />
      <line x1="9" y1="34" x2="63" y2="34" stroke="#4A4A57" strokeWidth="1.6" />
      <g transform="translate(11.5 38.5) scale(1.75)">
        <path d="M2 0H3V1H4V2H5V3H7V2H8V1H9V0H10V2H11V3H12V11H11V12H1V11H0V3H1V2H2Z" fill="#9EA6F2" />
        <path d="M3 5H4V6H3ZM4 6H5V7H4ZM5 7H6V8H5ZM4 8H5V9H4ZM3 9H4V10H3ZM6 9H10V10H6Z" fill="#18181D" />
      </g>
      <text
        x="35.5"
        y="47"
        fontFamily="'DM Mono', ui-monospace, 'Cascadia Code', Consolas, Menlo, monospace"
        fontSize="11.5"
        fontWeight="800"
        letterSpacing="-0.4"
        fill="#E9E6E0"
      >
        mom
      </text>
      <rect x="35.5" y="51" width="23" height="3" rx="1.5" fill="#8FD3A4" />
      <rect x="35.5" y="56.5" width="16" height="3" rx="1.5" fill="#7CC4FF" />
      <rect x="2" y="39" width="8" height="12" rx="4" fill="#2B36D9" stroke="#1E1B2E" strokeWidth="2.8" />
      <rect x="62" y="39" width="8" height="12" rx="4" fill="#2B36D9" stroke="#1E1B2E" strokeWidth="2.8" />
    </svg>
  );
}

/** Logo Thor: la cabeza de gato-terminal de AMS Tech con su prompt "> _". */
export function ThorLogo({ size = 28, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-2 -2 52 52"
      aria-hidden="true"
      style={{ display: 'block', flex: 'none', overflow: 'visible' }}
    >
      <path
        d="M10 4L21 14h6L38 4l5 14q1 2 1 6v12q0 8-8 8H12q-8 0-8-8V24q0-4 1-6z"
        fill="#2B36D9"
        stroke="#1E1B2E"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M13 25l6 5-6 5" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 36h10" fill="none" stroke="#FFE27A" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const EMBLEMS = {
  camera: CameraEmblem,
  chip: ChipEmblem,
  terminal: TerminalEmblem,
};

export function ProjectEmblem({ kind, size = 46 }) {
  const Emblem = EMBLEMS[kind];
  if (!Emblem) return null;
  return <Emblem size={size} />;
}

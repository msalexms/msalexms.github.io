/**
 * BrandIcons.jsx
 *
 * Iconos SVG de marcas (GitHub, LinkedIn) que ya no están
 * disponibles en lucide-react por temas de trademark.
 * Estos son SVGs simples inline para usar como componentes React.
 */

export function GitHub({ size = 20, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3-1 6-3.5 6-7.8a8.8 8.8 0 0 0-2.5-6.2c.2-1 .2-2-.2-3a5 5 0 0 0-3 1.5 9.2 9.2 0 0 0-4.3 0A5 5 0 0 0 7 1a4.8 4.8 0 0 0-.2 3A8.8 8.8 0 0 0 4.2 10.7c0 4.3 3 6.8 6 7.8a4.8 4.8 0 0 0-1 3.5V22" />
      <path d="M9 22c-3 0-4.5-1.5-5-3" />
    </svg>
  );
}

export function LinkedIn({ size = 20, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
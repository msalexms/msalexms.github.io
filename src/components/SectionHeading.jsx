/**
 * SectionHeading.jsx
 *
 * Cabecera común de sección: solo el título, sin índices ni etiquetas.
 */

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold tracking-tight text-[#e5e5e5] md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-[#909090]">{subtitle}</p>}
    </div>
  );
}

/* Bloques de estructura reutilizables. */

type Tone = "light" | "dark";

/** Sección con fondo degradado: "light" (beige → arena) o "dark" (negro suave → negro). */
export function Section({
  id,
  tone,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  tone: Tone;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  const toneCls =
    tone === "dark" ? "bg-tone-dark text-beige" : "bg-tone-light text-negro";
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={`relative ${toneCls} ${className}`}
    >
      {children}
    </section>
  );
}

/** Franja de transición entre una sección clara y una oscura (o al revés).
 *  Evita cortes bruscos: el color se funde a medida que se hace scroll. */
export function Blend({ from, to }: { from: Tone; to: Tone }) {
  const cls = from === "light" && to === "dark" ? "blend-to-dark" : "blend-to-light";
  // Cada mitad declara su tono para que el header sepa cómo pintarse encima
  return (
    <div aria-hidden className={`flex h-[clamp(7rem,16vw,14rem)] w-full flex-col ${cls}`}>
      <div data-tone={from} className="flex-1" />
      <div data-tone={to} className="flex-1" />
    </div>
  );
}

/** Contenedor con márgenes laterales consistentes (16px en celular). */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[90rem] px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

/** Etiqueta pequeña sobre los títulos, con una línea de acento bronce. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-eyebrow font-semibold uppercase ${className}`}>
      <span aria-hidden className="h-px w-8 bg-bronce" />
      {children}
    </p>
  );
}

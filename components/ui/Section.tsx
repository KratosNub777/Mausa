/* Bloques de estructura reutilizables. */

export type Tone = "light" | "dark";

/** Lo que la página le pasa a cada sección: el tono de la anterior
 *  (para fundir los colores) y su número (01, 02…). */
export type SectionSlot = { from?: Tone; n?: string };

/* Colores de cada borde: las secciones claras van de beige a arena,
   las oscuras de carbón a negro. */
const inicio = { light: "#f3ecdf", dark: "#1c1a18" };
const fin = { light: "#e3d4ba", dark: "#0f0e0d" };

/* Mezcla en oklab precalculada (curva suave) para pasar de un tono al otro
   dentro del espacio superior de la sección, sin franjas ni huecos extra. */
const fundidos: Record<string, string[]> = {
  "light>dark": ["#e3d4ba", "#d9cbb2", "#c0b39e", "#9e9382", "#787063", "#544e46", "#36332e", "#23211e", "#1c1a18"],
  "dark>light": ["#0f0e0d", "#171514", "#2c2a28", "#4d4a46", "#76726c", "#a29d94", "#cac4b9", "#e8e1d5", "#f3ecdf"],
  "light>light": ["#e3d4ba", "#ebe0cc", "#f3ecdf"],
  "dark>dark": ["#0f0e0d", "#151412", "#1c1a18"],
};

function fondo(tone: Tone, from?: Tone) {
  const cuerpo = `${fin[tone]} 100%`;
  if (!from) return `linear-gradient(180deg, ${inicio[tone]} 0%, ${cuerpo})`;
  const stops = fundidos[`${from}>${tone}`];
  const fade = stops
    .map((c, i) => `${c} calc(var(--section-y) * ${(i / (stops.length - 1)).toFixed(3)})`)
    .join(", ");
  return `linear-gradient(180deg, ${fade}, ${cuerpo})`;
}

/** Sección con fondo degradado y ritmo vertical consistente.
 *  - tone: "light" (beige → arena) o "dark" (carbón → negro, con resplandor ámbar)
 *  - from: tono de la sección anterior; el color se funde en el espacio superior. */
export function Section({
  id,
  tone,
  from,
  children,
  className = "",
  labelledBy,
  as: Tag = "section",
}: {
  id?: string;
  tone: Tone;
  from?: Tone;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
  as?: "section" | "footer";
}) {
  const toneCls = tone === "dark" ? "glow-ambar text-beige" : "text-negro";
  return (
    <Tag
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={`relative isolate py-[var(--section-y)] ${toneCls} ${className}`}
      style={{ background: fondo(tone, from) }}
    >
      {children}
    </Tag>
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

/** Etiqueta sobre los títulos: número de sección + línea bronce + nombre. */
export function Eyebrow({
  children,
  n,
  className = "",
}: {
  children: React.ReactNode;
  n?: string;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-3 text-eyebrow font-semibold uppercase ${className}`}>
      {n && <span className="tabular-nums">{n}</span>}
      <span aria-hidden className="h-px w-8 bg-bronce" />
      {children}
    </p>
  );
}

import { Eyebrow } from "./Section";
import { MaskHeading, Reveal } from "./Reveal";

/* Encabezado estándar de sección: etiqueta + título con máscara + bajada. */
export function SectionHeader({
  id,
  eyebrow,
  lines,
  intro,
  tone,
  className = "",
}: {
  id: string;
  eyebrow: string;
  lines: readonly string[];
  intro?: string;
  tone: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow className={tone === "dark" ? "text-bronce" : "text-tinta"}>{eyebrow}</Eyebrow>
      </Reveal>
      <MaskHeading id={id} lines={lines} className="mt-6 font-serif text-h2 font-light" />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-7 max-w-[36rem] text-lead ${tone === "dark" ? "text-humo" : "text-tinta"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

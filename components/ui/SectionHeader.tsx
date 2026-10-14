import { Eyebrow } from "./Section";
import { MaskHeading, Reveal } from "./Reveal";

/* Encabezado estándar de sección: etiqueta + título con máscara + bajada. */
export function SectionHeader({
  id,
  n,
  eyebrow,
  lines,
  intro,
  tone,
  className = "",
}: {
  id: string;
  n?: string;
  eyebrow: string;
  lines: readonly string[];
  intro?: string;
  tone: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow n={n} className={tone === "dark" ? "text-bronce-claro" : "text-tinta"}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <MaskHeading
        id={id}
        lines={[lines.join(" ")]}
        className="mt-4 max-w-[22ch] font-serif text-h2"
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-4 max-w-[36rem] text-lead ${tone === "dark" ? "text-humo" : "text-tinta"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

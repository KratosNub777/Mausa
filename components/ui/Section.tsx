/* Estructura y espaciado compartidos, con cambios de fondo limpios. */
export type Tone = "light" | "dark";
export type SectionSlot = { from?: Tone; n?: string };

export function Section({
  id, tone, children, className = "", labelledBy, as: Tag = "section",
}: {
  id?: string;
  tone: Tone;
  from?: Tone;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
  as?: "section" | "footer";
}) {
  return (
    <Tag
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={`relative isolate py-[var(--section-y)] ${tone === "dark" ? "bg-negro-suave text-beige" : "bg-beige text-negro"} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[90rem] px-4 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, n, className = "" }: { children: React.ReactNode; n?: string; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-eyebrow font-semibold uppercase ${className}`}>
      {n && <span className="tabular-nums">{n}</span>}
      <span aria-hidden className="h-px w-8 shrink-0 bg-bronce" />
      {children}
    </p>
  );
}

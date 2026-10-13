import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { linkWhatsApp, textos } from "@/content/site";

const t = textos.hero;
const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

/* Fondo "mesh": manchas de color difusas que se mueven muy lento (22–30 s). */
function Mesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="mesh-blob mesh-a -left-[20vmax] -top-[25vmax] size-[75vmax]"
        style={{ background: "radial-gradient(closest-side, rgb(200 178 144 / 0.7), transparent)" }}
      />
      <div
        className="mesh-blob mesh-b -right-[18vmax] top-[5vh] size-[60vmax]"
        style={{ background: "radial-gradient(closest-side, rgb(255 251 244 / 0.85), transparent)" }}
      />
      <div
        className="mesh-blob mesh-c -bottom-[30vmax] left-[25%] size-[70vmax]"
        style={{ background: "radial-gradient(closest-side, rgb(169 133 87 / 0.22), transparent)" }}
      />
    </div>
  );
}

const spaces = [
  { id: "cocinas", label: "Cocinas" },
  { id: "oficinas", label: "Oficinas" },
  { id: "salones", label: "Salones" },
  { id: "placares", label: "Placares" },
];

export function Hero() {
  return (
    <Section id="inicio" tone="light" labelledBy="hero-titulo" className="pt-0!">
      <Mesh />
      <Container className="grid gap-9 pt-[calc(var(--header-h)+1.5rem)] lg:min-h-[calc(100svh-var(--section-y))] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-[calc(var(--header-h)+2rem)]">
        {/* Texto */}
        <div className="lg:col-span-6">
          <p className="hero-fade flex items-center gap-3 text-eyebrow font-semibold uppercase text-tinta" style={idx(0)}>
            <span aria-hidden className="h-px w-8 bg-bronce" />
            {t.eyebrow}
          </p>

          {/* Ritmo: dos líneas rectas, la segunda con sangría, y el remate en itálica */}
          <h1 id="hero-titulo" className="mt-5 font-serif text-display whitespace-nowrap">
            {t.lineas.map((l, i) => (
              <span key={l} className={`hero-line ${i === 1 ? "pl-[0.55em]" : ""}`}>
                <span style={idx(i + 1)}>{l}</span>
              </span>
            ))}
            <span className="hero-line">
              <span style={idx(t.lineas.length + 1)} className="italic">
                {t.destacado}
                <span className="not-italic text-bronce">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-[30rem] text-lead text-tinta" style={idx(4)}>
            {t.subtitulo}
          </p>

          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={idx(5)}>
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink href={linkWhatsApp()} external icon="whatsapp" className="w-full px-7 sm:w-auto">
                {t.ctaPrincipal}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#trabajos" variant="outline" icon="arrow">
              {t.ctaSecundario}
            </ButtonLink>
          </div>

          {/* Accesos directos a la galería filtrada */}
          <nav aria-label="Ver trabajos por espacio" className="hero-fade mt-8 hidden border-t border-negro/10 pt-4 sm:block" style={idx(6)}>
            <ul className="flex flex-wrap items-center gap-x-6 text-sm font-medium text-tinta">
              {spaces.map((s) => (
                <li key={s.id}>
                  <a href="#trabajos" data-filtro={s.id} className="group inline-flex min-h-11 items-center gap-2 hover:text-negro">
                    <span aria-hidden className="h-px w-3 bg-bronce transition-[width] duration-500 group-hover:w-6" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Foto principal: grande, protagonista */}
        <figure className="hero-img relative lg:col-span-6">
          <Parallax amount={5} className="aspect-[4/3] rounded-[1.25rem] bg-arena shadow-[0_50px_100px_-50px_rgb(15_14_13/0.6)] lg:aspect-square lg:rounded-[1.75rem]">
            <Image
              src="/trabajos/cocinas/isla-tonos-oscuros.jpg"
              alt="Isla de cocina hecha por Mausa, con frentes gris oscuro y mesada de granito claro"
              fill
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[45%_60%]"
            />
          </Parallax>
          <figcaption className="mt-3 flex items-center justify-between text-xs font-semibold tracking-[0.16em] text-tinta uppercase">
            <span>Proyecto real · Isla en tonos oscuros</span>
            <span aria-hidden className="h-px w-10 bg-bronce" />
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}

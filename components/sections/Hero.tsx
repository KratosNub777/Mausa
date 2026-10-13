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
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
      <div
        className="mesh-blob mesh-b -bottom-[25vmax] -right-[15vmax] size-[55vmax]"
        style={{ background: "radial-gradient(closest-side, rgb(28 26 24 / 0.09), transparent)" }}
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
    <Section id="inicio" tone="light" labelledBy="hero-titulo" className="overflow-hidden">
      <Mesh />
      <Container className="relative grid min-h-[100svh] grid-cols-1 content-center gap-10 pt-[calc(var(--header-h)+1.75rem)] pb-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-16">
        {/* Texto */}
        <div className="lg:col-span-7">
          <p
            className="hero-fade flex items-center gap-3 text-eyebrow font-semibold uppercase text-tinta"
            style={idx(0)}
          >
            <span aria-hidden className="h-px w-8 bg-bronce" />
            {t.eyebrow}
          </p>

          <h1 id="hero-titulo" className="mt-6 font-serif text-display font-light">
            {t.lineas.map((l, i) => (
              <span key={l} className="hero-line">
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

          <p className="hero-fade mt-7 max-w-[34rem] text-lead text-tinta" style={idx(4)}>
            {t.subtitulo}
          </p>

          <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={idx(5)}>
            <Magnetic>
              <ButtonLink href={linkWhatsApp()} external icon="whatsapp" className="w-full px-7 sm:w-auto">
                {t.ctaPrincipal}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#trabajos" variant="outline" icon="arrow">
              {t.ctaSecundario}
            </ButtonLink>
          </div>

          {/* Accesos directos a la galería filtrada */}
          <nav aria-label="Ver trabajos por espacio" className="hero-fade mt-12 hidden sm:block" style={idx(6)}>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-tinta">
              {spaces.map((s) => (
                <li key={s.id}>
                  <a href="#trabajos" data-filtro={s.id} className="group inline-flex items-center gap-2 py-1 hover:text-negro">
                    <span aria-hidden className="h-px w-3 bg-bronce transition-[width] duration-500 group-hover:w-6" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Composición de fotos */}
        <div className="relative lg:col-span-5">
          <div className="hero-img relative">
            <Parallax amount={6} className="aspect-[4/3] rounded-[1.5rem] bg-arena shadow-[0_40px_80px_-40px_rgb(15_14_13/0.55)] sm:aspect-[16/11] lg:aspect-[4/5] lg:rounded-[2rem]">
              <Image
                src="/trabajos/oficinas/escritorio-directorio.jpg"
                alt="Oficina terminada por Mausa: escritorio en L de madera clara, paneles oscuros y estantes con luz cálida"
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[60%_50%]"
              />
            </Parallax>
            <p className="absolute right-3 bottom-3 rounded-full bg-beige/90 px-3.5 py-1.5 text-xs font-semibold text-negro backdrop-blur-sm sm:right-4 sm:bottom-4">
              Proyecto real · Escritorio directorio
            </p>
          </div>

          <div className="hero-img-2 absolute -bottom-10 -left-10 hidden w-[38%] overflow-hidden rounded-[1.25rem] border-[6px] border-beige shadow-[0_30px_60px_-30px_rgb(15_14_13/0.6)] lg:block">
            <div className="relative aspect-[3/4]">
              <Image
                src="/trabajos/salones/comedor-integrado.jpg"
                alt="Comedor con mesa redonda de madera y pared con listones"
                fill
                sizes="16vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

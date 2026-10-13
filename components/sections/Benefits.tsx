import Image from "next/image";
import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageReveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { textos } from "@/content/site";

const t = textos.ventajas;

/* Por qué a medida: 4 ventajas.
   Celular: carrusel horizontal compacto (deslizable). Tablet/computadora: grilla 2×2 junto a la foto. */
export function Benefits({ from, n }: SectionSlot) {
  return (
    <Section id="ventajas" tone="light" from={from} labelledBy="ventajas-titulo">
      <Container>
        <SectionHeader id="ventajas-titulo" n={n} tone="light" eyebrow={t.eyebrow} lines={t.titulo} />

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          <ImageReveal className="hidden rounded-[1.5rem] md:block lg:col-span-5">
            <Parallax amount={6} className="aspect-[16/10] h-full bg-arena lg:aspect-auto lg:min-h-[26rem]">
              <Image
                src="/trabajos/cocinas/cajon-organizador.jpg"
                alt="Detalle de cajón de cocina abierto con organizador de cubiertos, hecho a medida"
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover object-[40%_55%]"
              />
            </Parallax>
          </ImageReveal>

          <div className="min-w-0 lg:col-span-7">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-tinta uppercase sm:hidden" aria-hidden>
              Deslizá para ver más →
            </p>
            <RevealGroup
              as="ul"
              className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:h-full sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-6 [&::-webkit-scrollbar]:hidden"
            >
              {t.items.map((item, i) => (
                <RevealItem
                  as="li"
                  key={item.titulo}
                  className="w-[78vw] max-w-[20rem] shrink-0 snap-start sm:w-auto sm:max-w-none"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-negro/10 bg-beige/55 p-5 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-2xl text-tinta tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden className="h-px flex-1 bg-bronce/50" />
                    </div>
                    <h3 className="mt-5 font-serif text-h3 sm:mt-auto sm:pt-8">{item.titulo}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-tinta">{item.texto}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}

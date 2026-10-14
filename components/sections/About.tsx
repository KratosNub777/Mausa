import Image from "next/image";
import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { informacionComercial, textos } from "@/content/site";

const t = textos.nosotros;

/* Acompañamiento del proyecto; antigüedad solo con un año de inicio confirmado. */
export function About({ from, n }: SectionSlot) {
  return (
    <Section id="nosotros" tone="dark" from={from} labelledBy="nosotros-titulo">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <SectionHeader id="nosotros-titulo" n={n} tone="dark" eyebrow={t.eyebrow} lines={t.titulo} />

          <div className="mt-8 space-y-4 text-lead text-humo">
            {t.parrafos.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 border-t border-bronce/30 pt-5">
            <p className="font-semibold">{t.acompanamiento}</p>
            {informacionComercial.anioInicio !== null && (
              <p className="mt-2 text-sm text-humo">Desde {informacionComercial.anioInicio}.</p>
            )}
            {informacionComercial.tallerEquipo && (
              <p className="mt-3 text-humo">{informacionComercial.tallerEquipo}</p>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:row-start-1">
          <ImageReveal className="rounded-[1.25rem] lg:rounded-[1.75rem]">
            <Parallax amount={6} className="aspect-[16/10] bg-negro-suave lg:aspect-[4/5]">
              <Image
                src="/trabajos/salones/comedor-integrado.jpg"
                alt="Comedor hecho por Mausa: mesa redonda de madera y pared revestida con listones y estantes"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-[50%_68%] lg:object-center"
              />
            </Parallax>
          </ImageReveal>
        </div>
      </Container>
    </Section>
  );
}

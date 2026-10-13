import Image from "next/image";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { MaskHeading, Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { textos } from "@/content/site";

const t = textos.nosotros;

/* Quiénes somos: historia breve y el único dato duro que tenemos (1 año). */
export function About() {
  return (
    <Section id="nosotros" tone="dark" labelledBy="nosotros-titulo">
      <Container className="grid gap-14 py-[clamp(4.5rem,11vw,10rem)] lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <Reveal>
            <Eyebrow className="text-bronce">{t.eyebrow}</Eyebrow>
          </Reveal>
          <MaskHeading id="nosotros-titulo" lines={t.titulo} className="mt-6 font-serif text-h2 font-light" />

          <div className="mt-10 space-y-5 text-lead text-humo">
            {t.parrafos.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-14 flex items-end gap-6 border-t border-beige/12 pt-8">
            <span className="font-serif text-[clamp(5.5rem,4rem+6vw,9rem)] leading-[0.8] font-light">
              {t.dato.numero}
            </span>
            <span className="pb-2">
              <span className="block text-lg font-semibold">{t.dato.texto}</span>
              <span className="block text-humo">{t.dato.detalle}</span>
            </span>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:row-start-1">
          <Reveal y={40}>
            <Parallax amount={8} className="aspect-[5/4] rounded-[1.5rem] bg-negro-suave lg:aspect-[4/5] lg:rounded-[2rem]">
              <Image
                src="/trabajos/salones/rack-tv-estanteria.jpg"
                alt="Mueble de TV hecho por Mausa: panel símil mármol con estantes de madera a los lados"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

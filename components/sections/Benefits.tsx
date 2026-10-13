"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { textos } from "@/content/site";

const t = textos.ventajas;
const EASE = [0.16, 1, 0.3, 1] as const;

/* Por qué a medida: 4 ventajas. La línea superior de cada una se dibuja
   al aparecer para marcar el orden de lectura. */
export function Benefits() {
  return (
    <Section id="ventajas" tone="light" labelledBy="ventajas-titulo">
      <Container className="py-[clamp(4.5rem,10vw,9rem)]">
        <SectionHeader id="ventajas-titulo" tone="light" eyebrow={t.eyebrow} lines={t.titulo} className="max-w-3xl" />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal y={40} className="lg:col-span-4">
            <figure>
              <Parallax amount={7} className="aspect-[4/5] rounded-[1.5rem] bg-arena sm:aspect-[16/11] lg:aspect-[3/4]">
                <Image
                  src="/trabajos/cocinas/cajon-organizador.jpg"
                  alt="Detalle de cajón de cocina abierto con organizador de cubiertos"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
              <figcaption className="mt-3 text-sm text-tinta">Detalle de un cajón con organizador, hecho a medida.</figcaption>
            </figure>
          </Reveal>

          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8 lg:pl-6">
            {t.items.map((item, i) => (
              <m.li
                key={item.titulo}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              >
                <m.span
                  aria-hidden
                  className="block h-px origin-left bg-negro/80"
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                  transition={{ duration: 1.1, ease: EASE, delay: (i % 2) * 0.12 }}
                />
                <m.div
                  variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + (i % 2) * 0.12 }}
                >
                  <p aria-hidden className="mt-6 font-serif text-[2.75rem] leading-none font-light text-beige-profundo">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 font-serif text-h3">{item.titulo}</h3>
                  <p className="mt-3 text-tinta">{item.texto}</p>
                </m.div>
              </m.li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

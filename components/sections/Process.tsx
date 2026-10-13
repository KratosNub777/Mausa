"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { textos } from "@/content/site";

const t = textos.proceso;
const EASE = [0.16, 1, 0.3, 1] as const;

/* Línea de tiempo: la línea bronce se "llena" a medida que se hace scroll,
   marcando en qué paso del proceso está la lectura. */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section id="proceso" tone="dark" labelledBy="proceso-titulo">
      <Container className="grid gap-14 py-[clamp(4.5rem,10vw,9rem)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionHeader id="proceso-titulo" tone="dark" eyebrow={t.eyebrow} lines={t.titulo} intro={t.intro} />
            <Reveal delay={0.25}>
              <p className="mt-10 max-w-[30rem] border-l border-bronce/60 pl-5 text-sm leading-relaxed text-humo">
                {t.nota}
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
          {/* Riel y relleno de la línea */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-beige/12 sm:left-[1.4rem]" />
          <m.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.15rem] w-px origin-top bg-bronce sm:left-[1.4rem]"
            style={{ scaleY: reduce ? 1 : fill }}
          />

          {t.pasos.map((paso, i) => (
            <m.li
              key={paso.titulo}
              className="relative grid grid-cols-[2.3rem_1fr] gap-5 pb-12 last:pb-0 sm:grid-cols-[2.8rem_1fr] sm:gap-8 sm:pb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -30% 0px" }}
            >
              {/* Punto: se enciende al llegar al paso */}
              <span className="relative z-10 mt-1 grid size-[2.3rem] place-items-center rounded-full border border-beige/20 bg-negro-suave sm:size-[2.8rem]">
                <m.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-bronce"
                  variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
                <m.span
                  aria-hidden
                  className="size-2 rounded-full bg-bronce"
                  variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                />
              </span>
              <m.div
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="text-xs font-semibold tracking-[0.22em] text-bronce">
                  PASO {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-h3 font-light">{paso.titulo}</h3>
                <p className="mt-3 max-w-[30rem] text-humo">{paso.texto}</p>
              </m.div>
            </m.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

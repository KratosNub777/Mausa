"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ExpandIcon } from "@/components/ui/Icons";
import { Lightbox } from "./Lightbox";
import { filtrosVisibles, nombreEspacio, trabajosDe, type Filtro, type Trabajo } from "@/data/trabajos";
import { textos } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const INICIALES = 8; // fotos antes de "Ver todos"

/* Mosaico con jerarquía: en cada bloque hay una foto grande (16:10) y fotos
   verticales (4:5). Celular/tablet: 1 grande + 2 verticales.
   Computadora: filas de grande + vertical, alternando el lado. */
function celda(i: number, total: number) {
  const ultimo = i === total - 1;
  // Celular / tablet (2 columnas)
  const grandeM = i % 3 === 0 || (ultimo && i % 3 === 1);
  const mob = grandeM ? "col-span-2" : "col-span-1";
  const mobImg = grandeM ? "aspect-[16/10]" : "aspect-[4/5]";
  // Computadora (12 columnas)
  const solo = ultimo && i % 2 === 0;
  const grandeD = solo || i % 4 === 0 || i % 4 === 3;
  const desk = solo ? "lg:col-span-12" : grandeD ? "lg:col-span-8" : "lg:col-span-4";
  const deskImg = solo ? "lg:aspect-[21/9]" : grandeD ? "lg:aspect-[16/10]" : "lg:aspect-auto lg:flex-1";
  return { li: `${mob} ${desk}`, img: `${mobImg} ${deskImg}`, grande: grandeM || grandeD };
}

export function Work({ from, n }: SectionSlot) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [abierta, setAbierta] = useState<number | null>(null);
  const [todas, setTodas] = useState(false);

  function elegir(f: Filtro) {
    setFiltro(f);
    setTodas(false);
  }

  const fotos = useMemo(() => trabajosDe(filtro), [filtro]);
  const mostradas = todas ? fotos : fotos.slice(0, INICIALES);
  const ocultas = fotos.length - mostradas.length;

  // Los accesos del hero (data-filtro="cocinas") preseleccionan un filtro
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLElement>("[data-filtro]");
      const f = a?.dataset.filtro as Filtro | undefined;
      if (f && filtrosVisibles.some((x) => x.id === f)) {
        setFiltro(f);
        setTodas(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <Section id="trabajos" tone="light" from={from} labelledBy="trabajos-titulo">
      <Container>
        <SectionHeader
          id="trabajos-titulo"
          n={n}
          tone="light"
          eyebrow={textos.trabajos.eyebrow}
          lines={textos.trabajos.titulo}
          intro={textos.trabajos.intro}
        />

        {/* Filtros: solo los que tienen fotos */}
        <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 border-y border-negro/10 py-3 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <div role="group" aria-label="Filtrar trabajos por espacio" className="flex flex-wrap gap-2">
            {filtrosVisibles.map((f) => {
              const activo = filtro === f.id;
              const separado = f.id === "diseno3d";
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => elegir(f.id)}
                  className={`relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                    activo ? "text-beige" : "text-negro can-hover:hover:bg-negro/5"
                  } ${separado ? "sm:ml-2" : ""}`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-full border transition-[background-color,border-color] duration-300 ${
                      activo ? "border-negro bg-negro" : separado ? "border-dashed border-bronce" : "border-negro/20"
                    }`}
                  />
                  <span className="relative">{f.label}</span>
                  <span className={`relative text-xs tabular-nums ${activo ? "text-beige/75" : "text-tinta"}`}>
                    {trabajosDe(f.id).length}
                  </span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-tinta">
            {filtro === "diseno3d"
              ? "Diseños 3D: propuestas, no obras terminadas"
              : `${fotos.length} ${fotos.length === 1 ? "trabajo real" : "trabajos reales"}`}
          </p>
        </Reveal>

        {/* Mosaico */}
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={filtro}
            className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:mt-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35 }}
          >
            {mostradas.map((t, i) => {
              const c = celda(i, mostradas.length);
              return (
                <m.li
                  key={t.id}
                  className={`flex flex-col ${c.li}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.06 }}
                >
                  <Card t={t} n={i + 1} imgCls={c.img} grande={c.grande} onOpen={() => setAbierta(i)} />
                </m.li>
              );
            })}
          </m.ul>
        </AnimatePresence>

        {ocultas > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setTodas(true)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-negro/25 px-7 text-[0.95rem] font-semibold transition-colors duration-300 hover:border-negro hover:bg-negro/5"
            >
              Ver todos los trabajos
              <span className="text-tinta">(+{ocultas})</span>
            </button>
          </div>
        )}
      </Container>

      <AnimatePresence>
        {abierta !== null && (
          <Lightbox fotos={fotos} index={abierta} onIndex={setAbierta} onClose={() => setAbierta(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}

/* Tarjeta: foto + subtítulo editorial debajo.
   Hover (con mouse): zoom suave y aparece el nombre del espacio sobre la foto. */
function Card({
  t,
  n,
  imgCls,
  grande,
  onOpen,
}: {
  t: Trabajo;
  n: number;
  imgCls: string;
  grande: boolean;
  onOpen: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver en grande: ${t.titulo}`}
        className={`group relative block w-full overflow-hidden rounded-xl bg-beige-profundo/40 sm:rounded-2xl ${imgCls}`}
      >
        <Image
          src={t.src}
          alt={t.alt}
          fill
          sizes={grande ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] can-hover:group-hover:scale-[1.04]"
          style={{ objectPosition: t.foco ?? "50% 50%" }}
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-negro/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 can-hover:group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span
          aria-hidden
          className="absolute bottom-4 left-4 translate-y-2 rounded-full bg-beige/92 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-negro uppercase opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          {nombreEspacio[t.espacio]}
        </span>
        <span
          aria-hidden
          className="absolute top-4 right-4 hidden size-10 place-items-center rounded-full bg-beige/92 text-negro opacity-0 transition-opacity duration-500 can-hover:grid can-hover:group-hover:opacity-100"
        >
          <ExpandIcon className="size-4" />
        </span>
        {t.render && (
          <span className="absolute top-3 left-3 rounded-full bg-negro/85 px-3 py-1.5 text-xs font-semibold tracking-[0.1em] text-beige uppercase">
            Diseño 3D
          </span>
        )}
      </button>
      <div className="mt-3 flex items-baseline gap-2.5" aria-hidden>
        <span className="text-xs tabular-nums text-tinta">{String(n).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span className={`block font-serif leading-tight ${grande ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>{t.titulo}</span>
          <span className="mt-0.5 block text-xs tracking-[0.14em] text-tinta uppercase">{nombreEspacio[t.espacio]}</span>
        </span>
      </div>
    </>
  );
}

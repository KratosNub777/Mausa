"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Container } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ExpandIcon, ImageIcon } from "@/components/ui/Icons";
import { Lightbox } from "./Lightbox";
import { espacios, nombreEspacio, trabajos, type Espacio, type Trabajo } from "@/data/trabajos";
import { textos } from "@/content/site";

type Filtro = Espacio | "todos";
const EASE = [0.16, 1, 0.3, 1] as const;
const INICIALES = 11; // fotos visibles antes de "Ver todos" (11 cierra filas completas)

// Cómo ocupa cada formato la cuadrícula tipo mosaico
const span: Record<Trabajo["formato"], string> = {
  vertical: "row-span-2",
  horizontal: "col-span-2",
  grande: "col-span-2 row-span-2",
  cuadrado: "",
};

export function Work() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [abierta, setAbierta] = useState<number | null>(null);
  const [todas, setTodas] = useState(false);

  function elegir(f: Filtro) {
    setFiltro(f);
    setTodas(false);
  }

  // "Todos" muestra solo fotos reales; los marcadores aparecen en su categoría
  const visibles = useMemo(
    () =>
      filtro === "todos"
        ? trabajos.filter((t) => !t.marcador)
        : trabajos.filter((t) => t.espacio === filtro),
    [filtro],
  );
  const fotos = useMemo(() => visibles.filter((t) => !t.marcador), [visibles]);
  const mostradas = todas ? visibles : visibles.slice(0, INICIALES);
  const ocultas = visibles.length - mostradas.length;

  const cantidad = (id: Filtro) =>
    id === "todos"
      ? trabajos.filter((t) => !t.marcador).length
      : trabajos.filter((t) => t.espacio === id && !t.marcador).length;

  // Los accesos del hero (data-filtro="cocinas") preseleccionan un filtro
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLElement>("[data-filtro]");
      const f = a?.dataset.filtro as Filtro | undefined;
      if (f && espacios.some((x) => x.id === f)) {
        setFiltro(f);
        setTodas(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <section id="trabajos" data-tone="light" aria-labelledby="trabajos-titulo" className="relative bg-tone-light text-negro">
      <Container className="py-[clamp(4.5rem,10vw,9rem)]">
        <SectionHeader
          id="trabajos-titulo"
          tone="light"
          eyebrow={textos.trabajos.eyebrow}
          lines={textos.trabajos.titulo}
          intro={textos.trabajos.intro}
        />

        {/* Filtros */}
        <Reveal delay={0.2} className="mt-12 flex flex-col gap-4 border-y border-negro/10 py-4 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <div role="group" aria-label="Filtrar trabajos por espacio" className="flex flex-wrap gap-2">
            {espacios.map((e) => {
              const activo = filtro === e.id;
              return (
                <button
                  key={e.id}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => elegir(e.id)}
                  className={`relative min-h-11 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                    activo ? "text-beige" : "text-negro can-hover:hover:bg-negro/5"
                  }`}
                >
                  {activo && (
                    <m.span
                      layoutId="filtro-activo"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-negro"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className={`absolute inset-0 rounded-full border ${activo ? "border-transparent" : "border-negro/20"}`} aria-hidden />
                  <span className="relative">
                    {e.label}
                    <sup className={`ml-1 text-[0.65em] ${activo ? "text-beige/70" : "text-tinta"}`}>{cantidad(e.id)}</sup>
                  </span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-tinta">
            {fotos.length === 0
              ? "Fotos en preparación"
              : `${fotos.length} ${fotos.length === 1 ? "trabajo" : "trabajos"}`}
          </p>
        </Reveal>

        {/* Mosaico */}
        <ul
          className="mt-8 grid auto-rows-[clamp(9.5rem,24vw,17rem)] grid-cols-2 gap-2.5 [grid-auto-flow:dense] sm:gap-4 md:grid-cols-3 lg:mt-16 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {mostradas.map((t, i) => (
              <m.li
                key={t.id}
                layout="position"
                className={span[t.formato]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 }}
              >
                {t.marcador ? (
                  <Marcador t={t} />
                ) : (
                  <Card t={t} onOpen={() => setAbierta(fotos.findIndex((f) => f.id === t.id))} />
                )}
              </m.li>
            ))}
          </AnimatePresence>
        </ul>

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
          <Lightbox
            fotos={fotos}
            index={abierta}
            onIndex={setAbierta}
            onClose={() => setAbierta(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* Tarjeta: al pasar el mouse la foto se acerca y aparece el nombre del espacio.
   En celular el nombre se ve siempre. */
function Card({ t, onOpen }: { t: Trabajo; onOpen: () => void }) {
  const grande = t.formato === "grande";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver en grande: ${t.titulo}`}
      className="group relative block size-full overflow-hidden rounded-xl bg-beige-profundo/40 text-left sm:rounded-2xl"
    >
      <Image
        src={t.src}
        alt={t.alt}
        fill
        sizes={grande ? "(min-width: 1024px) 46vw, 100vw" : "(min-width: 1024px) 23vw, (min-width: 768px) 32vw, 50vw"}
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] can-hover:group-hover:scale-[1.06]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-negro/75 via-negro/10 to-transparent transition-opacity duration-500 can-hover:opacity-0 can-hover:group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3 text-beige transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] sm:p-5 can-hover:translate-y-3 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <span className="text-[0.62rem] font-semibold tracking-[0.2em] text-beige/80 uppercase sm:text-[0.68rem]">
          {nombreEspacio[t.espacio]}
        </span>
        <span className={`font-serif leading-tight ${grande ? "text-xl sm:text-3xl" : "text-[0.95rem] sm:text-xl"}`}>
          {t.titulo}
        </span>
      </span>
      {t.render && (
        <span className="absolute top-2.5 left-2.5 rounded-full bg-beige/90 px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-negro uppercase sm:top-4 sm:left-4">
          Diseño 3D
        </span>
      )}
      <span
        aria-hidden
        className="absolute top-3 right-3 hidden size-9 place-items-center rounded-full bg-beige/90 text-negro opacity-0 transition-opacity duration-500 can-hover:grid can-hover:group-hover:opacity-100"
      >
        <ExpandIcon className="size-4" />
      </span>
    </button>
  );
}

/* Espacio reservado, claramente identificado, hasta tener la foto real. */
function Marcador({ t }: { t: Trabajo }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-negro/25 bg-beige/60 p-4 text-center text-tinta sm:rounded-2xl">
      <ImageIcon className="size-7" />
      <p className="text-xs font-bold tracking-[0.18em] uppercase">Foto pendiente</p>
      <p className="font-serif text-lg text-negro">{t.titulo}</p>
      <p className="text-xs">Marcador · {nombreEspacio[t.espacio]}</p>
    </div>
  );
}

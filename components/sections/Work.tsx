"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExpandIcon } from "@/components/ui/Icons";
import { Lightbox } from "./Lightbox";
import { filtrosVisibles, nombreEspacio, trabajosDe, type Filtro } from "@/data/trabajos";
import { textos } from "@/content/site";

const TANDA = 6;

export function Work({ from, n }: SectionSlot) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [abierta, setAbierta] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(TANDA);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const focusNext = useRef<number | null>(null);
  const fotos = useMemo(() => trabajosDe(filtro), [filtro]);
  const mostradas = fotos.slice(0, cantidad);
  const ocultas = fotos.length - mostradas.length;

  function elegir(f: Filtro) {
    setFiltro(f);
    setCantidad(TANDA);
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const f = (e.target as Element | null)?.closest<HTMLElement>("[data-filtro]")?.dataset.filtro;
      if (f && filtrosVisibles.some((x) => x.id === f)) elegir(f as Filtro);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (focusNext.current !== null) {
      cardsRef.current[focusNext.current]?.focus({ preventScroll: true });
      focusNext.current = null;
    }
  }, [cantidad]);

  return (
    <Section id="trabajos" tone="light" from={from} labelledBy="trabajos-titulo">
      <Container>
        <SectionHeader id="trabajos-titulo" n={n} tone="light" eyebrow={textos.trabajos.eyebrow} lines={textos.trabajos.titulo} intro={textos.trabajos.intro} />
        <div className="mt-6 border-y border-negro/10 py-3">
          <div role="group" aria-label="Filtrar trabajos por espacio" className="flex flex-wrap gap-2">
            {filtrosVisibles.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filtro === f.id}
                aria-controls="galeria-trabajos"
                onClick={() => elegir(f.id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${filtro === f.id ? "border-negro bg-negro text-beige" : "border-negro/25 text-negro hover:bg-negro/5"} ${f.id === "diseno3d" ? "border-dashed" : ""}`}
              >
                {f.label}<span className="text-xs tabular-nums">{trabajosDe(f.id).length}</span>
              </button>
            ))}
          </div>
          <p role="status" aria-atomic="true" className="mt-3 text-sm text-tinta">
            Mostrando {mostradas.length} de {fotos.length} {filtro === "diseno3d" ? "diseños 3D · Propuestas, no obras terminadas" : "trabajos reales"}
          </p>
        </div>
        <ul id="galeria-trabajos" className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-6 lg:grid-cols-3">
          {mostradas.map((t, i) => (
            <li key={t.id} className={`min-w-0 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
              <button
                ref={(node) => { cardsRef.current[i] = node; }}
                type="button"
                onClick={() => setAbierta(i)}
                aria-label={`Ver proyecto: ${t.titulo}${t.render ? " · Diseño 3D" : ""}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-arena"
              >
                <Image src={t.src} alt={t.alt} fill loading="lazy"
                  sizes={i === 0 ? "(min-width: 1440px) 432px, (min-width: 1024px) 30vw, calc(100vw - 32px)" : "(min-width: 1440px) 432px, (min-width: 1024px) 30vw, 46vw"}
                  className="object-cover transition-transform duration-300 can-hover:group-hover:scale-[1.025] motion-reduce:transform-none"
                  style={{ objectPosition: t.foco ?? "50% 50%" }} />
                <span aria-hidden className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-beige/95 text-negro"><ExpandIcon className="size-4" /></span>
                {t.render && <span className="absolute bottom-3 left-3 rounded-full bg-negro px-3 py-1.5 text-xs font-semibold text-beige">Diseño 3D</span>}
              </button>
              <h3 className="mt-3 font-serif text-xl leading-tight sm:text-2xl">{t.titulo}</h3>
              <p className="mt-1 text-sm text-tinta">{nombreEspacio[t.espacio]}{t.render && " · Diseño 3D"}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center">
          {ocultas > 0 ? (
            <button type="button" aria-controls="galeria-trabajos"
              onClick={() => {
                focusNext.current = mostradas.length;
                setCantidad((v) => v + TANDA);
              }}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-negro/25 px-6 text-sm font-semibold hover:bg-negro/5">
              Mostrar más <span className="text-tinta">(+{Math.min(TANDA, ocultas)})</span>
            </button>
          ) : <p className="text-sm text-tinta">Estás viendo todos los {filtro === "diseno3d" ? "diseños 3D" : "trabajos de esta selección"}.</p>}
        </div>
      </Container>
      {abierta !== null && (
        <Lightbox fotos={fotos} index={abierta} onIndex={setAbierta} onClose={() => setAbierta(null)} />
      )}
    </Section>
  );
}

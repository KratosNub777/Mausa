"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronIcon, CloseIcon } from "@/components/ui/Icons";
import { useModal } from "@/components/hooks/useModal";
import { nombreEspacio, type Trabajo } from "@/data/trabajos";

export function Lightbox({ fotos, index, onIndex, onClose }: {
  fotos: Trabajo[]; index: number; onIndex: (i: number) => void; onClose: () => void;
}) {
  const ref = useModal();
  const inicio = useRef<{ x: number; y: number } | null>(null);
  const foto = fotos[index];
  const total = fotos.length;
  const go = useCallback((d: number) => onIndex((index + d + total) % total), [index, total, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (total < 2) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(e.key === "ArrowRight" ? 1 : -1);
      }
    };
    const dialog = ref.current;
    dialog?.addEventListener("keydown", onKey);
    return () => dialog?.removeEventListener("keydown", onKey);
  }, [go, ref, total]);

  if (!foto) return null;
  return createPortal(
    <dialog ref={ref} aria-labelledby="visor-titulo" aria-describedby="visor-descripcion" aria-modal="true"
      data-lenis-prevent className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-negro text-beige"
      onCancel={(e) => { e.preventDefault(); onClose(); }}>
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-2 sm:px-8">
          <p aria-live="polite" aria-atomic="true" className="text-sm tabular-nums text-humo">{index + 1} / {total}{foto.render && " · Diseño 3D"}</p>
          <button type="button" autoFocus onClick={onClose} aria-label="Cerrar visor"
            className="grid size-11 place-items-center rounded-full border border-beige/30 hover:bg-beige/10"><CloseIcon className="size-5" /></button>
        </div>
        <div className="relative min-h-24 flex-1 mx-4 sm:mx-8"
          style={{ touchAction: "pan-y" }}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") {
              inicio.current = { x: e.clientX, y: e.clientY };
              e.currentTarget.setPointerCapture(e.pointerId);
            }
          }}
          onPointerCancel={() => { inicio.current = null; }}
          onPointerUp={(e) => {
            const start = inicio.current;
            inicio.current = null;
            if (!start || total < 2) return;
            const dx = e.clientX - start.x;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - start.y)) go(dx < 0 ? 1 : -1);
          }}>
          <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 1440px) 1200px, 100vw" loading="eager"
            className="pointer-events-none object-contain select-none" draggable={false} />
        </div>
        <div className="max-h-[45dvh] shrink-0 overflow-y-auto px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-humo">{nombreEspacio[foto.espacio]} · {foto.render ? "Diseño 3D · Propuesta" : "Trabajo real"}</p>
              <h2 id="visor-titulo" className="mt-1 font-serif text-2xl sm:text-3xl">{foto.titulo}</h2>
            </div>
            {total > 1 && <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="grid size-11 place-items-center rounded-full border border-beige/30 hover:bg-beige/10"><ChevronIcon className="size-5 rotate-180" /></button>
              <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" className="grid size-11 place-items-center rounded-full border border-beige/30 hover:bg-beige/10"><ChevronIcon className="size-5" /></button>
            </div>}
          </div>
          <p id="visor-descripcion" className="mt-2 max-w-[70ch] text-sm leading-relaxed text-humo">{foto.descripcion || foto.alt}</p>
          {(foto.materiales || foto.terminaciones) && <dl className="mt-3 text-sm">
            {foto.materiales && <div><dt className="font-semibold">Materiales</dt><dd className="text-humo">{foto.materiales}</dd></div>}
            {foto.terminaciones && <div className="mt-2"><dt className="font-semibold">Terminaciones</dt><dd className="text-humo">{foto.terminaciones}</dd></div>}
          </dl>}
          {!!foto.caracteristicas?.length && <ul className="mt-2 list-inside list-disc text-sm text-humo">{foto.caracteristicas.map((c) => <li key={c}>{c}</li>)}</ul>}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button type="button" onClick={() => {
              onClose();
              window.dispatchEvent(new CustomEvent("mausa:select-project", { detail: foto.id }));
            }} className="inline-flex min-h-11 items-center justify-center rounded-full bg-beige px-5 text-sm font-semibold text-negro hover:bg-arena">
              Quiero algo similar
            </button>
            <p className="text-sm text-humo">Lleva al formulario con este proyecto como referencia.</p>
          </div>
        </div>
      </div>
    </dialog>, document.body,
  );
}

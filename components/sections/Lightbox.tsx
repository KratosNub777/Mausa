"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useLenis } from "lenis/react";
import { ChevronIcon, CloseIcon } from "@/components/ui/Icons";
import { nombreEspacio, type Trabajo } from "@/data/trabajos";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Visor de fotos a pantalla completa.
   Teclado: ← → para navegar, Esc para cerrar. En celular: deslizar. */
export function Lightbox({
  fotos,
  index,
  onIndex,
  onClose,
}: {
  fotos: Trabajo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(0);
  const inicioX = useRef<number | null>(null);
  const lenis = useLenis();
  const foto = fotos[index];
  const total = fotos.length;

  const go = useCallback(
    (d: number) => {
      setDir(d);
      onIndex((index + d + total) % total);
    },
    [index, total, onIndex],
  );

  // Bloquea el scroll de fondo, guarda y devuelve el foco
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      prev?.focus({ preventScroll: true });
    };
  }, [lenis]);

  // Teclado + foco atrapado dentro del visor
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  if (!foto) return null;

  return createPortal(
    <m.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${foto.titulo}, foto ${index + 1} de ${total}`}
      data-lenis-prevent
      className="fixed inset-0 z-[70] flex flex-col bg-negro/95 text-beige backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-8 sm:pt-6">
        <p className="text-sm tabular-nums text-humo">
          <span className="text-beige">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className="grid size-11 place-items-center rounded-full border border-beige/20 transition-colors hover:bg-beige/10"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      {/* Foto (se puede deslizar en celular) */}
      <div className="relative min-h-0 flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <m.div
            key={foto.id}
            custom={dir}
            className="absolute inset-3 sm:inset-8"
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 60 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -60 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            style={{ touchAction: "pan-y" }}
            onPointerDown={(e) => (inicioX.current = e.clientX)}
            onPointerUp={(e) => {
              // Deslizar con el dedo: más de 60px cambia de foto
              if (inicioX.current === null || total < 2) return;
              const dx = e.clientX - inicioX.current;
              inicioX.current = null;
              if (dx < -60) go(1);
              else if (dx > 60) go(-1);
            }}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="100vw"
              className="pointer-events-none object-contain select-none"
              draggable={false}
            />
          </m.div>
        </AnimatePresence>
      </div>

      {/* Pie: título y navegación */}
      <div className="flex items-center justify-between gap-4 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.18em] text-humo uppercase">
            {nombreEspacio[foto.espacio]}
            {foto.render && " · Diseño 3D"}
          </p>
          <p className="truncate font-serif text-xl sm:text-2xl">{foto.titulo}</p>
        </div>
        {total > 1 && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="grid size-12 place-items-center rounded-full border border-beige/20 transition-colors hover:bg-beige/10"
            >
              <ChevronIcon className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className="grid size-12 place-items-center rounded-full border border-beige/20 transition-colors hover:bg-beige/10"
            >
              <ChevronIcon className="size-5" />
            </button>
          </div>
        )}
      </div>
    </m.div>,
    document.body,
  );
}

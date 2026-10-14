"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { linkWhatsApp } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

/* Botón flotante de WhatsApp (celular y tablet; en computadora ya está en el header).
   Aparece recién después del hero, y se oculta sobre la galería, el formulario y
   el contacto (zonas con botones propios): así nunca tapa otro botón. */
export function WhatsAppFloat() {
  const [pasoHero, setPasoHero] = useState(false);
  const [tapa, setTapa] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const zonas = ["trabajos", "presupuesto", "contacto"].map((id) => document.getElementById(id)).filter(
      (e): e is HTMLElement => !!e,
    );
    const visibles = new Set<Element>();

    const ioHero = new IntersectionObserver(([e]) => setPasoHero(!e.isIntersecting), {
      rootMargin: "0px 0px -40% 0px",
    });
    const ioZonas = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
        setTapa(visibles.size > 0);
      },
      { rootMargin: "0px" },
    );
    if (hero) ioHero.observe(hero);
    zonas.forEach((z) => ioZonas.observe(z));
    return () => {
      ioHero.disconnect();
      ioZonas.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {pasoHero && !tapa && (
        <m.a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar por WhatsApp · contacto principal"
          title="Consultar por WhatsApp"
          style={{ "--focus": "var(--color-beige)" } as React.CSSProperties}
          className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-negro text-beige shadow-[0_14px_30px_-10px_rgb(15_14_13/0.6)] ring-1 ring-beige/20 lg:hidden"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.92 }}
        >
          <WhatsAppIcon className="size-7" />
        </m.a>
      )}
    </AnimatePresence>
  );
}

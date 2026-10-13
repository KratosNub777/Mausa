"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { linkWhatsApp } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

/* Botón flotante de WhatsApp: visible en celular y tablet (en escritorio
   el header ya tiene el botón). Se oculta mientras el formulario de
   presupuesto está en pantalla, para no taparlo (ahí ya hay un botón de WhatsApp). */
export function WhatsAppFloat() {
  const [ocultar, setOcultar] = useState(false);

  useEffect(() => {
    const form = document.querySelector("#presupuesto form");
    if (!form) return;
    const io = new IntersectionObserver(([e]) => setOcultar(e.isIntersecting), {
      rootMargin: "0px 0px -10% 0px",
    });
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!ocultar && (
        <m.a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribinos por WhatsApp"
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-negro text-beige shadow-[0_14px_30px_-10px_rgb(15_14_13/0.6)] ring-1 ring-beige/20 lg:hidden"
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

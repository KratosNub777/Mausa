"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { contacto, linkWhatsApp, textos } from "@/content/site";

const t = textos.presupuesto;
const EASE = [0.16, 1, 0.3, 1] as const;

/* Formulario que NO usa servidor: arma el texto y abre WhatsApp
   (wa.me) con el mensaje ya escrito, listo para enviar. */
export function Quote() {
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nombre = String(d.get("nombre") ?? "").trim();
    const espacio = String(d.get("espacio") ?? "");
    const medidas = String(d.get("medidas") ?? "").trim();
    const mensaje = String(d.get("mensaje") ?? "").trim();

    if (!nombre || !espacio) {
      setError("Completá tu nombre y el tipo de espacio para continuar.");
      const campo = e.currentTarget.elements.namedItem(!nombre ? "nombre" : "espacio");
      (campo as HTMLElement | null)?.focus();
      return;
    }
    setError("");

    const lineas = [
      "¡Hola, Mausa Mobiliarios! Quiero pedir un presupuesto.",
      "",
      `• Nombre: ${nombre}`,
      `• Espacio: ${espacio}`,
    ];
    if (medidas) lineas.push(`• Medidas aproximadas: ${medidas}`);
    if (mensaje) lineas.push(`• Mensaje: ${mensaje}`);
    const texto = lineas.join("\n");

    window.open(linkWhatsApp(texto), "_blank", "noopener,noreferrer");
    setEnviado(true);
    window.setTimeout(() => setEnviado(false), 6000);
  }

  const field =
    "mt-2 block w-full rounded-xl border border-negro/20 bg-beige/70 px-4 py-3.5 text-base text-negro placeholder:text-tinta/70 transition-[border-color,background-color] duration-300 focus:border-negro focus:bg-beige focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro";
  const label = "text-sm font-semibold";

  return (
    <Section id="presupuesto" tone="light" labelledBy="presupuesto-titulo">
      <Container className="grid gap-14 py-[clamp(4.5rem,10vw,9rem)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader id="presupuesto-titulo" tone="light" eyebrow={t.eyebrow} lines={t.titulo} intro={t.intro} />

          <RevealGroup as="ol" className="mt-10 space-y-4">
            {t.pasos.map((p, i) => (
              <RevealItem as="li" key={p} className="flex items-baseline gap-4">
                <span className="font-serif text-lg text-tinta">{String(i + 1).padStart(2, "0")}</span>
                <span className="border-b border-negro/10 pb-4 flex-1">{p}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <p className="mt-10 text-sm text-tinta">¿Preferís escribir directo?</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {contacto.whatsapp.map((w) => (
                <li key={w.wa}>
                  <a
                    href={linkWhatsApp(undefined, w.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-bronce decoration-1 underline-offset-[6px] transition-colors hover:decoration-negro"
                  >
                    <WhatsAppIcon className="size-4" />
                    {w.numero}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40} className="lg:col-span-6 lg:col-start-7">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[1.75rem] border border-negro/10 bg-beige/60 p-5 shadow-[0_40px_80px_-50px_rgb(15_14_13/0.45)] backdrop-blur-sm sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="f-nombre" className={label}>
                  Nombre <span aria-hidden>*</span>
                </label>
                <input id="f-nombre" name="nombre" required autoComplete="name" placeholder="Tu nombre" className={field} />
              </div>
              <div>
                <label htmlFor="f-espacio" className={label}>
                  Tipo de espacio <span aria-hidden>*</span>
                </label>
                <select id="f-espacio" name="espacio" required defaultValue="" className={`${field} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%231c1a18%22%20stroke-width=%221.6%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-10`}>
                  <option value="" disabled>
                    Elegí una opción
                  </option>
                  {t.espacios.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-medidas" className={label}>
                  Medidas aproximadas
                </label>
                <input id="f-medidas" name="medidas" placeholder="Ej: 3 m x 2,40 m" className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-mensaje" className={label}>
                  Mensaje
                </label>
                <textarea
                  id="f-mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Contanos qué te imaginás: estilo, colores, materiales…"
                  className={`${field} resize-y`}
                />
              </div>
            </div>

            <div aria-live="polite" className="min-h-6 pt-3 text-sm">
              {error && <p className="font-semibold text-[#8a2c1d]">{error}</p>}
            </div>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Magnetic className="w-full sm:w-auto">
                <button
                  type="submit"
                  className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-negro px-8 font-semibold text-beige transition-colors duration-300 hover:bg-negro-suave sm:w-auto"
                >
                  <WhatsAppIcon className="size-5" />
                  Enviar por WhatsApp
                </button>
              </Magnetic>
              <p className="text-xs text-tinta">Sin compromiso. Te respondemos por WhatsApp.</p>
            </div>

            {/* Confirmación de la acción */}
            <AnimatePresence>
              {enviado && (
                <m.p
                  role="status"
                  className="mt-5 flex items-center gap-3 rounded-xl bg-negro px-4 py-3 text-sm text-beige"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-bronce" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <m.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                    />
                  </svg>
                  Listo: se abrió WhatsApp con tu mensaje. Solo falta tocar “Enviar”.
                </m.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </Container>
    </Section>
  );
}

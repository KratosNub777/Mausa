"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { contacto, linkWhatsApp, textos } from "@/content/site";
import { trabajos } from "@/data/trabajos";
import { quoteMessage, validateQuote, type QuoteDraft, type QuoteErrors } from "@/lib/quote";

const t = textos.presupuesto;
const espacios = { cocinas: "Cocina", oficinas: "Oficina", salones: "Salón / living", placares: "Placard / vestidor", otros: "Otro" };

export function Quote({ from, n }: SectionSlot) {
  const [draft, setDraft] = useState<QuoteDraft>({ nombre: "", espacio: "", medidas: "", mensaje: "", proyecto: "" });
  const [numero, setNumero] = useState<string>(contacto.whatsapp[0].wa);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [preparedUrl, setPreparedUrl] = useState("");
  const projectRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    let frame = 0;
    const selectProject = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const project = trabajos.find((p) => p.id === id);
      if (!project) return;
      setDraft((current) => ({ ...current,
        proyecto: `${project.titulo}${project.render ? " (Diseño 3D)" : ""}`,
        espacio: current.espacio || espacios[project.espacio],
      }));
      setPreparedUrl("");
      setErrors((current) => ({ ...current, espacio: undefined }));
      frame = requestAnimationFrame(() => {
        if (lenis) { lenis.start(); lenis.scrollTo("#presupuesto"); }
        else document.getElementById("presupuesto")?.scrollIntoView();
        history.replaceState(null, "", "#presupuesto");
        projectRef.current?.focus({ preventScroll: true });
      });
    };
    window.addEventListener("mausa:select-project", selectProject);
    return () => { window.removeEventListener("mausa:select-project", selectProject); cancelAnimationFrame(frame); };
  }, [lenis]);

  function update(key: keyof QuoteDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
    setPreparedUrl("");
    if (key === "nombre" || key === "espacio") setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateQuote(draft);
    setErrors(nextErrors);
    setPreparedUrl("");
    const first = nextErrors.nombre ? "nombre" : nextErrors.espacio ? "espacio" : null;
    if (first) {
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const url = linkWhatsApp(quoteMessage(draft), numero);
    window.open(url, "_blank", "noopener,noreferrer");
    setPreparedUrl(url);
  }

  const field = "mt-2 block min-h-13 w-full min-w-0 rounded-lg border border-negro/20 bg-white/55 px-4 py-3.5 text-base text-negro placeholder:text-tinta transition-[border-color,box-shadow] hover:border-bronce focus:border-negro focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro aria-invalid:border-[#8a2c1d]";
  const label = "block text-sm font-semibold";
  return (
    <Section id="presupuesto" tone="light" from={from} labelledBy="presupuesto-titulo">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border border-negro/15 bg-[#faf6ef] shadow-[0_24px_64px_-40px_rgba(15,14,13,0.4)] lg:grid-cols-12">
          <div data-tone="dark" className="relative flex flex-col bg-negro-suave p-6 text-beige sm:p-9 lg:col-span-5 lg:p-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-bronce" />
            <SectionHeader id="presupuesto-titulo" n={n} tone="dark" eyebrow={t.eyebrow} lines={["Tu próximo mueble empieza acá."]} intro={t.intro} />
            <p id="presupuesto-flujo" className="mt-5 max-w-[38ch] text-sm leading-relaxed text-humo">
              Completá tu idea. Abriremos WhatsApp con el mensaje listo para que lo revises y envíes.
            </p>
            <figure className="my-8 hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src="/trabajos/cocinas/terminacion-madera-clara.jpg" alt="" fill sizes="(min-width: 1024px) 34vw, 1px" className="object-cover" />
              </div>
              <figcaption className="mt-3 flex items-center gap-3 text-xs tracking-[0.16em] text-humo uppercase"><span aria-hidden className="h-px w-6 bg-bronce" />Diseño · Fabricación · Instalación</figcaption>
            </figure>
            <div className="mt-7 border-t border-beige/15 pt-5 lg:mt-auto">
              <p className="text-sm text-humo">¿Preferís conversar directamente?</p>
              <ul className="mt-2 space-y-2">
                {contacto.whatsapp.map((w) => <li key={w.wa}>
                  <a href={linkWhatsApp(undefined, w.wa)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-wrap items-center gap-3 text-sm font-semibold hover:text-bronce-claro">
                    <WhatsAppIcon className="size-5 shrink-0" /><span><span className="block text-xs font-normal text-humo">{w.etiqueta}</span>{w.numero}</span><ArrowUpRightIcon className="size-4" />
                  </a>
                </li>)}
              </ul>
            </div>
          </div>
          <form onSubmit={submit} noValidate aria-describedby="presupuesto-flujo" className="min-w-0 p-5 sm:p-9 lg:col-span-7 lg:p-10">
            <div className="mb-7 border-b border-negro/15 pb-5">
              <h3 className="font-serif text-3xl sm:text-4xl">Hagamos lugar a tu idea.</h3>
              <p className="mt-2 text-sm leading-relaxed text-tinta">Contanos lo esencial. Los detalles los vemos juntos.</p>
            </div>
            <fieldset className="min-w-0">
              <legend className="mb-5 flex items-center gap-3 text-sm font-semibold"><span aria-hidden className="grid size-7 place-items-center rounded-full border border-negro/20 text-xs text-tinta">01</span>Tu espacio, tu proyecto</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-nombre" className={label}>Tu nombre <span className="text-tinta">*</span></label>
                  <input id="f-nombre" name="nombre" required autoComplete="name" placeholder="¿Cómo te llamás?" value={draft.nombre} onChange={(e) => update("nombre", e.target.value)}
                    aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? "nombre-error" : undefined} className={field} />
                  {errors.nombre && <p id="nombre-error" className="mt-2 text-sm font-semibold text-[#8a2c1d]">{errors.nombre}</p>}
                </div>
                <div>
                  <label htmlFor="f-espacio" className={label}>Tipo de espacio <span className="text-tinta">*</span></label>
                  <select id="f-espacio" name="espacio" required value={draft.espacio} onChange={(e) => update("espacio", e.target.value)}
                    aria-invalid={!!errors.espacio} aria-describedby={errors.espacio ? "espacio-error" : undefined} className={`${field} quote-select`}>
                    <option value="" disabled>Elegí tu espacio</option>
                    {t.espacios.map((e) => <option key={e}>{e}</option>)}
                  </select>
                  {errors.espacio && <p id="espacio-error" className="mt-2 text-sm font-semibold text-[#8a2c1d]">{errors.espacio}</p>}
                </div>
              </div>
            </fieldset>
            <fieldset className="mt-8 min-w-0">
              <legend className="mb-5 flex items-center gap-3 text-sm font-semibold"><span aria-hidden className="grid size-7 place-items-center rounded-full border border-negro/20 text-xs text-tinta">02</span>Los primeros detalles</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-medidas" className={label}>Medidas <span className="font-normal text-tinta">(opcional)</span></label>
                  <input id="f-medidas" name="medidas" value={draft.medidas} onChange={(e) => update("medidas", e.target.value)} aria-describedby="medidas-ayuda" placeholder="Ej: 3 m × 2,40 m" className={field} />
                  <p id="medidas-ayuda" className="mt-2 text-xs leading-relaxed text-tinta">Si no las sabés, te ayudamos a medir.</p>
                </div>
                <div>
                  <label htmlFor="f-proyecto" className={label}>Referencia <span className="font-normal text-tinta">(opcional)</span></label>
                  <input ref={projectRef} id="f-proyecto" name="proyecto" value={draft.proyecto} onChange={(e) => update("proyecto", e.target.value)} aria-describedby="proyecto-ayuda" placeholder="Un trabajo que te gustó" className={field} />
                  <p id="proyecto-ayuda" className="mt-2 text-xs leading-relaxed text-tinta">Elegí de la galería o escribí tu referencia.</p>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-mensaje" className={label}>¿Qué tenés en mente? <span className="font-normal text-tinta">(opcional)</span></label>
                  <textarea id="f-mensaje" name="mensaje" rows={4} value={draft.mensaje} onChange={(e) => update("mensaje", e.target.value)}
                    placeholder="Estilo, colores, qué necesitás guardar…" className={`${field} resize-y`} />
                </div>
              </div>
            </fieldset>
            <div className="mt-6">
              <label htmlFor="f-contacto" className={label}>Contacto de WhatsApp</label>
              <select id="f-contacto" name="contacto" value={numero} onChange={(e) => { setNumero(e.target.value); setPreparedUrl(""); }} className={`${field} text-sm`}>
                {contacto.whatsapp.map((w) => <option key={w.wa} value={w.wa}>{w.etiqueta} · {w.numero}</option>)}
              </select>
            </div>
            <div aria-live="polite" className="sr-only">{Object.keys(errors).some((k) => errors[k as keyof QuoteErrors]) && "Revisá los campos indicados para continuar."}</div>
            <div className="mt-7 border-t border-negro/15 pt-5">
              <p className="mb-4 text-xs text-tinta">* Nombre y tipo de espacio son obligatorios.</p>
              <button type="submit" className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-negro px-4 py-4 text-sm font-semibold text-beige transition-colors hover:bg-negro-suave sm:text-base">
                <WhatsAppIcon className="size-5 shrink-0" />Continuar en WhatsApp<ArrowUpRightIcon className="ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-tinta">Revisá el mensaje y tocá “Enviar” en WhatsApp para completar tu consulta.</p>
            </div>
            {preparedUrl && <div role="status" className="mt-4 rounded-lg border border-negro/20 bg-beige p-4 text-sm leading-relaxed">
              <p>Mensaje preparado. Revisalo y envialo en WhatsApp para completar la consulta.</p>
              <a href={preparedUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Abrir el mensaje en WhatsApp</a>
            </div>}
          </form>
        </div>
      </Container>
    </Section>
  );
}

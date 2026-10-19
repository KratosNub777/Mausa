"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhatsAppIcon } from "@/components/ui/Icons";
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
      <Container className="grid gap-5 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <SectionHeader id="presupuesto-titulo" n={n} tone="light" eyebrow={t.eyebrow} lines={t.titulo} intro={t.intro} />
          <p id="presupuesto-flujo" className="mt-3 max-w-[40ch] text-sm leading-relaxed text-tinta">
            Completá el formulario, revisá el mensaje en WhatsApp y envialo allí para iniciar la consulta.
          </p>
        </div>
        <form onSubmit={submit} noValidate aria-describedby="presupuesto-flujo"
          className="min-w-0 rounded-2xl border border-negro/15 bg-arena/25 p-4 sm:p-6 lg:col-span-6 lg:col-start-7 lg:row-span-2">
          <p className="mb-4 text-sm text-tinta">Nombre y tipo de espacio son obligatorios. Los demás datos son opcionales.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="f-nombre" className={label}>Nombre (obligatorio)</label>
              <input id="f-nombre" name="nombre" required autoComplete="name" value={draft.nombre} onChange={(e) => update("nombre", e.target.value)}
                aria-invalid={!!errors.nombre} aria-describedby={`nombre-ayuda${errors.nombre ? " nombre-error" : ""}`} className={field} />
              <p id="nombre-ayuda" className="mt-1.5 text-sm text-tinta">Como querés que te llamemos.</p>
              {errors.nombre && <p id="nombre-error" className="mt-1 text-sm font-semibold text-[#8a2c1d]">{errors.nombre}</p>}
            </div>
            <div>
              <label htmlFor="f-espacio" className={label}>Tipo de espacio (obligatorio)</label>
              <select id="f-espacio" name="espacio" required value={draft.espacio} onChange={(e) => update("espacio", e.target.value)}
                aria-invalid={!!errors.espacio} aria-describedby={errors.espacio ? "espacio-error" : undefined} className={field}>
                <option value="" disabled>Elegí una opción</option>
                {t.espacios.map((e) => <option key={e}>{e}</option>)}
              </select>
              {errors.espacio && <p id="espacio-error" className="mt-1 text-sm font-semibold text-[#8a2c1d]">{errors.espacio}</p>}
            </div>
            <div>
              <label htmlFor="f-medidas" className={label}>Medidas (opcional)</label>
              <input id="f-medidas" name="medidas" value={draft.medidas} onChange={(e) => update("medidas", e.target.value)} aria-describedby="medidas-ayuda" placeholder="Ej: 3 m × 2,40 m" className={field} />
              <p id="medidas-ayuda" className="mt-1.5 text-sm text-tinta">Una medida aproximada alcanza.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="f-proyecto" className={label}>Proyecto de referencia (opcional)</label>
              <input ref={projectRef} id="f-proyecto" name="proyecto" value={draft.proyecto} onChange={(e) => update("proyecto", e.target.value)} aria-describedby="proyecto-ayuda" placeholder="Ej: Sala de reuniones" className={field} />
              <p id="proyecto-ayuda" className="mt-1.5 text-sm text-tinta">Podés editarlo o borrarlo. Tu mensaje se conserva al elegir un proyecto.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="f-mensaje" className={label}>Mensaje (opcional)</label>
              <textarea id="f-mensaje" name="mensaje" rows={3} value={draft.mensaje} onChange={(e) => update("mensaje", e.target.value)} aria-describedby="mensaje-ayuda"
                placeholder="Contanos qué te imaginás…" className={`${field} resize-y`} />
              <p id="mensaje-ayuda" className="mt-1.5 text-sm text-tinta">Podés incluir estilo, colores o necesidades de guardado.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="f-contacto" className={label}>Contacto de WhatsApp</label>
              <select id="f-contacto" name="contacto" value={numero} onChange={(e) => { setNumero(e.target.value); setPreparedUrl(""); }} className={`${field} text-sm`}>
                {contacto.whatsapp.map((w) => <option key={w.wa} value={w.wa}>{w.etiqueta} · {w.numero}</option>)}
              </select>
            </div>
          </div>
          <div aria-live="polite" className="sr-only">{Object.keys(errors).some((k) => errors[k as keyof QuoteErrors]) && "Revisá los campos indicados para continuar."}</div>
          <button type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-negro px-3 text-sm font-semibold text-beige hover:bg-negro-suave sm:text-base">
            <WhatsAppIcon className="size-5 shrink-0" />Continuar en WhatsApp
          </button>
          <p className="mt-2 text-sm leading-relaxed text-tinta">El formulario prepara el mensaje. La consulta se envía cuando tocás “Enviar” en WhatsApp.</p>
          {preparedUrl && <div role="status" className="mt-4 rounded-xl border border-negro/20 bg-beige p-3 text-sm leading-relaxed">
            <p>Mensaje preparado. Revisalo y envialo en WhatsApp para completar la consulta.</p>
            <a href={preparedUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Abrir el mensaje en WhatsApp</a>
          </div>}
        </form>
        <div className="lg:col-span-5 lg:row-start-2 lg:self-start">
          <p className="text-sm text-tinta">¿Preferís consultar directamente?</p>
          <ul className="mt-2 space-y-1">{contacto.whatsapp.map((w, i) => <li key={w.wa}>
            <a href={linkWhatsApp(undefined, w.wa)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-wrap items-center gap-x-2 text-sm underline underline-offset-4">
              <WhatsAppIcon className="size-4 shrink-0" /><span className={i === 0 ? "font-semibold" : "text-tinta"}>Consultar por WhatsApp · {i === 0 ? "principal" : "alternativo"}</span><span>{w.numero}</span>
            </a>
          </li>)}</ul>
        </div>
      </Container>
    </Section>
  );
}

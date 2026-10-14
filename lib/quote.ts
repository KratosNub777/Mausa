import { textos } from "@/content/site";

export type QuoteDraft = { nombre: string; espacio: string; medidas: string; mensaje: string; proyecto: string };
export type QuoteErrors = Partial<Record<"nombre" | "espacio", string>>;

export function validateQuote(draft: QuoteDraft): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!draft.nombre.trim()) errors.nombre = "Escribí tu nombre para continuar.";
  if (!textos.presupuesto.espacios.some((e) => e === draft.espacio)) errors.espacio = "Elegí el tipo de espacio que querés amoblar.";
  return errors;
}

/** Prepara el mensaje; no envía ninguna consulta. */
export function quoteMessage(draft: QuoteDraft): string {
  const lines = ["¡Hola, Mausa Mobiliarios! Quiero pedir un presupuesto.", "", `• Nombre: ${draft.nombre.trim()}`, `• Espacio: ${draft.espacio}`];
  if (draft.proyecto.trim()) lines.push(`• Proyecto de referencia: ${draft.proyecto.trim()}`);
  if (draft.medidas.trim()) lines.push(`• Medidas aproximadas: ${draft.medidas.trim()}`);
  if (draft.mensaje.trim()) lines.push(`• Mensaje: ${draft.mensaje.trim()}`);
  return lines.join("\n");
}

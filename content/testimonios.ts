/* =========================================================
   TESTIMONIOS
   La sección muestra tarjetas pendientes hasta que haya opiniones reales.
   Cargá opiniones reales abajo (con permiso del cliente) para reemplazar las tarjetas.
   Cambiá `mostrar` a false si querés ocultar toda la sección.
   No inventes opiniones.
   ========================================================= */

export type Testimonio = {
  texto: string; // la opinión, con las palabras del cliente
  nombre: string; // ej: "María G." (con su permiso)
  espacio: string; // ej: "Cocina", "Placard", "Oficina"
};

export const testimonios: { mostrar: boolean; items: Testimonio[] } = {
  mostrar: true,
  items: [
    // { texto: "…", nombre: "…", espacio: "Cocina" },
  ],
};

/** true solo si está activada y hay al menos una opinión cargada. */
export const hayTestimonios = testimonios.mostrar && testimonios.items.length > 0;

/** Muestra la sección con opiniones reales o espacios claramente pendientes. */
export const mostrarTestimonios = testimonios.mostrar;

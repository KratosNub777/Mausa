/* =========================================================
   TESTIMONIOS
   La sección está oculta hasta que haya opiniones reales.
   Para activarla:
   1. Cargá al menos una opinión real abajo (con permiso del cliente).
   2. Cambiá `mostrar` a true.
   No inventes opiniones.
   ========================================================= */

export type Testimonio = {
  texto: string; // la opinión, con las palabras del cliente
  nombre: string; // ej: "María G." (con su permiso)
  espacio: string; // ej: "Cocina", "Placard", "Oficina"
};

export const testimonios: { mostrar: boolean; items: Testimonio[] } = {
  mostrar: false,
  items: [
    // { texto: "…", nombre: "…", espacio: "Cocina" },
  ],
};

/** true solo si está activada y hay al menos una opinión cargada. */
export const hayTestimonios = testimonios.mostrar && testimonios.items.length > 0;

/* =========================================================
   GALERÍA DE TRABAJOS
   Para agregar una foto:
   1. Copiá la imagen (.jpg) en public/trabajos/<espacio>/
   2. Agregá un bloque nuevo en la lista de abajo.
   El orden de la lista es el orden de la galería: poné primero las fotos
   más nítidas y luminosas. La cuadrícula alterna sola fotos grandes (16:10)
   y verticales (4:5), así que no hace falta indicar el tamaño.
   Espacios válidos: "cocinas" | "oficinas" | "salones" | "placares" | "otros"
   foco (opcional): qué parte de la foto conservar al recortar,
     en "horizontal vertical" (ej: "50% 70%" = centro, más abajo).
   render: true → es un diseño 3D, no una foto de obra terminada.
     Se muestra aparte, en el filtro "Diseños 3D".
   Los filtros sin fotos se ocultan solos.
   ========================================================= */

export type Espacio = "cocinas" | "oficinas" | "salones" | "placares" | "otros";
export type Filtro = Espacio | "todos" | "diseno3d";

export type Trabajo = {
  id: string;
  titulo: string;
  espacio: Espacio;
  src: string;
  alt: string;
  foco?: string;
  render?: boolean;
};

export const filtros: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "cocinas", label: "Cocinas" },
  { id: "oficinas", label: "Oficinas" },
  { id: "salones", label: "Salones" },
  { id: "placares", label: "Placares" },
  { id: "otros", label: "Otros" },
  { id: "diseno3d", label: "Diseños 3D" },
];

export const nombreEspacio: Record<Espacio, string> = {
  cocinas: "Cocina",
  oficinas: "Oficina",
  salones: "Salón",
  placares: "Placard y vestidor",
  otros: "Otros",
};

export const trabajos: Trabajo[] = [
  {
    id: "escritorio-directorio",
    titulo: "Escritorio directorio",
    espacio: "oficinas",
    src: "/trabajos/oficinas/escritorio-directorio.jpg",
    alt: "Oficina con escritorio en L de madera clara, paneles oscuros y estantes con iluminación cálida",
    foco: "55% 55%",
  },
  {
    id: "modulo-anafe-campana",
    titulo: "Módulo de anafe y campana",
    espacio: "cocinas",
    src: "/trabajos/cocinas/modulo-anafe-campana.jpg",
    alt: "Bajo mesada negro con anafe, campana de acero y alacenas blancas",
    foco: "50% 55%",
  },
  {
    id: "vestidor-a-medida",
    titulo: "Vestidor a medida",
    espacio: "placares",
    src: "/trabajos/placares/vestidor-a-medida.jpg",
    alt: "Vestidor blanco con estantes, cajoneras y barral, sin puertas",
  },
  {
    id: "sala-de-reuniones",
    titulo: "Sala de reuniones",
    espacio: "oficinas",
    src: "/trabajos/oficinas/sala-de-reuniones.jpg",
    alt: "Sala de reuniones con revestimiento de listones de madera, mesa clara y sillas negras",
    foco: "45% 50%",
  },
  {
    id: "rack-tv-estanteria",
    titulo: "Rack de TV con estantería",
    espacio: "salones",
    src: "/trabajos/salones/rack-tv-estanteria.jpg",
    alt: "Mueble de TV con panel símil mármol, estantes de madera a los lados y cajones abajo",
    foco: "50% 45%",
  },
  {
    id: "cocina-en-l-alacenas-blancas",
    titulo: "Cocina en L con alacenas blancas",
    espacio: "cocinas",
    src: "/trabajos/cocinas/cocina-en-l-alacenas-blancas.jpg",
    alt: "Cocina en L con alacenas blancas, nichos abiertos y bajo mesada símil madera",
  },
  {
    id: "cocina-barra-negra",
    titulo: "Cocina con barra",
    espacio: "cocinas",
    src: "/trabajos/cocinas/cocina-barra-negra.jpg",
    alt: "Cocina en madera clara con mesada y barra negra en L",
    foco: "60% 60%",
  },
  {
    id: "lineas-modernas",
    titulo: "Líneas modernas y minimalistas",
    espacio: "cocinas",
    src: "/trabajos/cocinas/lineas-modernas.jpg",
    alt: "Barra de cocina con frente gris oscuro y mesada de granito",
    foco: "50% 60%",
  },
  {
    id: "isla-tonos-oscuros",
    titulo: "Isla en tonos oscuros",
    espacio: "cocinas",
    src: "/trabajos/cocinas/isla-tonos-oscuros.jpg",
    alt: "Isla de cocina con frentes gris oscuro y mesada de granito claro",
    foco: "45% 60%",
  },
  {
    id: "placard-puertas-cajonera",
    titulo: "Placard con puertas y cajonera",
    espacio: "placares",
    src: "/trabajos/placares/placard-puertas-cajonera.jpg",
    alt: "Mueble de guardado claro con puertas, nichos y cajonera",
  },
  {
    id: "cajon-organizador",
    titulo: "Cajón con organizador",
    espacio: "cocinas",
    src: "/trabajos/cocinas/cajon-organizador.jpg",
    alt: "Cajón de cocina abierto con organizador de cubiertos bajo mesada de granito",
    foco: "40% 55%",
  },
  {
    id: "terminacion-madera-clara",
    titulo: "Terminación en madera clara",
    espacio: "cocinas",
    src: "/trabajos/cocinas/terminacion-madera-clara.jpg",
    alt: "Cocina en L con muebles en madera clara y mesada de granito oscuro",
    foco: "50% 55%",
  },
  {
    id: "comedor-integrado",
    titulo: "Comedor integrado",
    espacio: "salones",
    src: "/trabajos/salones/comedor-integrado.jpg",
    alt: "Comedor con mesa redonda de madera y pared revestida con listones y estantes",
    foco: "50% 70%",
  },
  {
    id: "vestidor-walk-in",
    titulo: "Vestidor walk-in",
    espacio: "placares",
    src: "/trabajos/placares/vestidor-walk-in.jpg",
    alt: "Vestidor de paso blanco con estantes a ambos lados y barral al fondo",
  },
  {
    id: "cocina-gris",
    titulo: "Cocina en gris",
    espacio: "cocinas",
    src: "/trabajos/cocinas/cocina-gris.jpg",
    alt: "Cocina con alacenas y bajo mesada grises junto a la heladera",
  },
  {
    id: "cocina-en-l-alacenas-altas",
    titulo: "Cocina en L con alacenas altas",
    espacio: "cocinas",
    src: "/trabajos/cocinas/cocina-en-l-alacenas-altas.jpg",
    alt: "Cocina en L gris claro con alacenas altas y ventana sobre la mesada",
  },
  {
    id: "diseno-tonos-claros",
    titulo: "Diseño en tonos claros",
    espacio: "cocinas",
    src: "/trabajos/cocinas/diseno-tonos-claros.jpg",
    alt: "Cocina con muebles en madera clara, anafe y mesada oscura",
  },
  {
    id: "cocina-compacta-madera",
    titulo: "Cocina compacta en madera",
    espacio: "cocinas",
    src: "/trabajos/cocinas/cocina-compacta-madera.jpg",
    alt: "Cocina compacta con alacenas de madera y bajo mesada blanco",
  },
  {
    id: "mueble-cocina-compacto",
    titulo: "Mueble de cocina compacto",
    espacio: "cocinas",
    src: "/trabajos/cocinas/mueble-cocina-compacto.jpg",
    alt: "Mueble de cocina compacto en madera clara con bacha y alacena",
  },
  {
    id: "escritorio-con-cajonera",
    titulo: "Escritorio con cajonera",
    espacio: "oficinas",
    src: "/trabajos/oficinas/escritorio-con-cajonera.jpg",
    alt: "Escritorio en L de madera con cajonera móvil y silla de oficina",
  },
  {
    id: "mueble-recepcion",
    titulo: "Mueble de recepción",
    espacio: "salones",
    src: "/trabajos/salones/mueble-recepcion.jpg",
    alt: "Mostrador de recepción blanco en un local con piso claro",
  },
  {
    id: "biblioteca-y-escritorio",
    titulo: "Biblioteca y escritorio",
    espacio: "oficinas",
    src: "/trabajos/oficinas/biblioteca-y-escritorio.jpg",
    alt: "Oficina con biblioteca de madera oscura y escritorio con frentes en dos tonos",
    foco: "45% 55%",
  },
  {
    id: "integracion-electrodomesticos",
    titulo: "Integración con electrodomésticos",
    espacio: "cocinas",
    src: "/trabajos/cocinas/integracion-electrodomesticos.jpg",
    alt: "Cocina con heladera integrada, horno empotrado y luz bajo alacenas",
    foco: "40% 55%",
  },
  {
    id: "puesto-de-trabajo-en-l",
    titulo: "Puesto de trabajo en L",
    espacio: "oficinas",
    src: "/trabajos/oficinas/puesto-de-trabajo-en-l.jpg",
    alt: "Puesto de trabajo en L con muebles oscuros y panel de madera",
    foco: "40% 55%",
  },
  {
    id: "cocina-isla-integrada",
    titulo: "Cocina con isla integrada",
    espacio: "cocinas",
    src: "/trabajos/cocinas/cocina-isla-integrada.jpg",
    alt: "Diseño 3D de cocina en tonos crema con isla blanca, banquetas y lámparas colgantes",
    foco: "45% 60%",
    render: true,
  },
];

/** Trabajos de cada filtro. "Todos" y los espacios muestran solo fotos reales;
 *  los diseños 3D van en su propio filtro. */
export function trabajosDe(f: Filtro): Trabajo[] {
  if (f === "diseno3d") return trabajos.filter((t) => t.render);
  const reales = trabajos.filter((t) => !t.render);
  return f === "todos" ? reales : reales.filter((t) => t.espacio === f);
}

/** Filtros que tienen al menos un trabajo (los vacíos no se muestran). */
export const filtrosVisibles = filtros.filter((f) => trabajosDe(f.id).length > 0);

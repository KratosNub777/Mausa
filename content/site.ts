/* =========================================================
   TEXTOS PRINCIPALES Y DATOS DE CONTACTO
   Cambiá acá cualquier texto del sitio: se actualiza en todas las secciones.
   Los títulos van como lista de líneas: ["primera línea", "segunda línea"].
   Lo marcado con "EDITABLE" son textos a confirmar por Mausa.
   ========================================================= */

/** URL pública del sitio. En Vercel se completa sola; si comprás un dominio,
 *  cargalo como variable NEXT_PUBLIC_SITE_URL (ej: https://mausa.com.py). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const contacto = {
  whatsapp: [
    { etiqueta: "WhatsApp 1", numero: "+595 982 170272", wa: "595982170272" },
    { etiqueta: "WhatsApp 2", numero: "+595 992 948128", wa: "595992948128" },
  ],
  email: "mausamobiliarios@gmail.com",
  instagram: {
    usuario: "@mausamueblesamedidapy",
    url: "https://www.instagram.com/mausamueblesamedidapy/",
  },
  facebook: "https://www.facebook.com/share/1JFREPqAv8/?mibextid=wwXIfr",
  mapa: {
    url: "https://maps.app.goo.gl/EubdRd4QuWs76R696",
    /* EDITABLE: para mostrar el mapa dentro de la página, abrí la ubicación en
       Google Maps → Compartir → "Insertar un mapa" → copiá solo lo que está
       dentro de src="..." y pegalo acá. Mientras esté vacío se muestra un botón. */
    embedSrc: "",
  },
} as const;

/** Arma un link de WhatsApp con el mensaje ya escrito. */
export function linkWhatsApp(
  mensaje: string = textos.whatsappMensaje,
  numero: string = contacto.whatsapp[0].wa,
) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export const textos = {
  marca: "Mausa Mobiliarios",
  lema: "Diseño · Fabricación · Instalación",
  whatsappMensaje:
    "¡Hola, Mausa Mobiliarios! Vi su página web y quiero pedir un presupuesto.",

  seo: {
    titulo: "Mausa Mobiliarios | Muebles a medida en Paraguay",
    descripcion:
      "Diseñamos, fabricamos e instalamos muebles a medida en Paraguay: cocinas, oficinas, placares, vestidores y salones. Pedí tu presupuesto por WhatsApp.",
  },

  nav: [
    { href: "#nosotros", label: "Nosotros" },
    { href: "#trabajos", label: "Trabajos" },
    { href: "#proceso", label: "Proceso" },
    { href: "#presupuesto", label: "Presupuesto" },
    { href: "#contacto", label: "Contacto" },
  ],

  /* Opciones de frase para el hero (se usa la primera):
     1. "Muebles pensados a tu medida"            ← elegida: clara, directa y con la palabra clave.
     2. "Cada centímetro, a tu manera"
     3. "El mueble que tu espacio estaba esperando" */
  hero: {
    eyebrow: "Muebles a medida · Paraguay",
    lineas: ["Muebles", "pensados"],
    destacado: "a tu medida",
    subtitulo:
      "Diseñamos, fabricamos e instalamos cocinas, oficinas, placares y salones hechos para tu espacio y tu forma de vivir.",
    ctaPrincipal: "Pedir presupuesto",
    ctaSecundario: "Ver trabajos",
  },

  nosotros: {
    eyebrow: "Quiénes somos",
    titulo: ["Cada mueble,", "pensado para un lugar", "y una persona."],
    parrafos: [
      "En Mausa Mobiliarios diseñamos y fabricamos muebles a medida pensados para adaptarse a cada espacio, cada necesidad y cada estilo de vida.",
      "Combinamos precisión en la fabricación con procesos de trabajo prolijos para transformar ambientes cotidianos en espacios funcionales y con identidad propia. Acompañamos cada proyecto de principio a fin, desde el relevamiento inicial hasta la instalación final.",
    ],
    dato: { numero: "1", texto: "año de trayectoria", detalle: "Y cada proyecto, de principio a fin." },
  },

  trabajos: {
    eyebrow: "Nuestros trabajos",
    titulo: ["Trabajos", "por espacio"],
    intro:
      "Una selección de proyectos reales que diseñamos, fabricamos e instalamos. Tocá cualquier foto para verla en grande.",
  },

  proceso: {
    eyebrow: "Cómo trabajamos",
    titulo: ["De la primera", "charla a la", "instalación."],
    intro: "Un método claro, pensado para que sepas qué esperar en cada etapa de tu proyecto.",
    pasos: [
      {
        titulo: "Consulta",
        texto: "Conversamos sobre tus necesidades, tus gustos y tu presupuesto.",
      },
      {
        titulo: "Medidas",
        texto: "Visitamos el espacio y tomamos las medidas exactas para que todo encaje.",
      },
      {
        titulo: "Diseño",
        texto: "Elaboramos una propuesta a medida, con materiales, colores y acabados a elección.",
      },
      {
        titulo: "Fabricación",
        texto: "Producimos cada mueble con procesos controlados y materiales seleccionados.",
      },
      {
        titulo: "Instalación",
        texto: "Instalamos en el lugar, cuidando cada detalle y dejando el espacio listo para usar.",
      },
    ],
    nota: "Cada proyecto es distinto: el plazo y el presupuesto se definen según el alcance y las características de cada trabajo.",
  },

  ventajas: {
    eyebrow: "Por qué a medida",
    titulo: ["Lo que un mueble", "estándar no te", "puede dar."],
    items: [
      {
        titulo: "Aprovecha cada centímetro",
        texto: "Se proyecta según tu espacio real: rincones, alturas y medidas que un mueble de serie no resuelve.",
      },
      {
        titulo: "Materiales a elección",
        texto: "Maderas, melamina, colores, acabados y herrajes pensados para durar. Vos elegís cómo se ve y se siente.",
      },
      {
        titulo: "Diseño propio",
        texto: "Cada mueble se diseña según el espacio y las necesidades de quien lo va a usar. No hay dos iguales.",
      },
      {
        // EDITABLE: si la instalación está incluida en el precio, podés decirlo acá.
        titulo: "Instalación profesional",
        texto: "Equipo propio para una entrega prolija y a tiempo, dejando el espacio listo para usar.",
      },
    ],
  },

  testimonios: {
    eyebrow: "Testimonios",
    titulo: ["Lo que dicen", "nuestros clientes"],
    intro: "Experiencias de quienes ya confiaron en nosotros.",
    // Las opiniones se cargan en content/testimonios.ts
  },

  presupuesto: {
    eyebrow: "Presupuesto",
    titulo: ["Pedí tu", "presupuesto"],
    intro:
      "Contanos qué estás imaginando para tu espacio. Te asesoramos sin compromiso y armamos una propuesta a medida.",
    pasos: [
      "Completá el formulario.",
      "Se abre WhatsApp con tu mensaje ya escrito.",
      "Lo enviás y coordinamos los detalles.",
    ],
    espacios: ["Cocina", "Oficina", "Salón / living", "Placard / vestidor", "Otro"],
  },

  contacto: {
    eyebrow: "Hablemos",
    titulo: ["Hagamos realidad", "tu proyecto"],
    intro: "Escribinos por el canal que prefieras.",
  },
} as const;

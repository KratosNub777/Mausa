# Mausa Mobiliarios — Sitio web

Sitio oficial de **Mausa Mobiliarios**, muebles a medida en Paraguay.
Hecho con Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion y Lenis.

## Correrlo en tu computadora

1. Instalá **Node.js 20.9 o más nuevo** (versión LTS) desde <https://nodejs.org>.
2. Abrí una terminal en esta carpeta y ejecutá:

   ```bash
   npm install      # solo la primera vez: descarga las dependencias
   npm run dev      # inicia el sitio en modo desarrollo
   ```

3. Abrí <http://localhost:3000> en el navegador. Los cambios que guardes se ven al instante.

Otros comandos útiles:

```bash
npm run build    # compila la versión final (detecta errores)
npm run lint     # revisa el código
npm start        # sirve la versión compilada
```

## Dónde cambiar cada cosa

| Qué querés cambiar | Archivo |
| --- | --- |
| Textos de todas las secciones, teléfonos, email, redes, mapa | `content/site.ts` |
| Opiniones de clientes (y mostrar u ocultar la sección) | `content/testimonios.ts` |
| Fotos de la galería (título, espacio, descripción) | `data/trabajos.ts` |
| Colores, tamaños de letra y animaciones de fondo | `app/globals.css` (bloque `@theme`) |
| Título y descripción para Google / redes | `content/site.ts` → `seo` |
| Imagen que aparece al compartir el link | `app/opengraph-image.jpg` (1200×630) |
| Ícono de la pestaña | `app/icon.png` y `app/apple-icon.png` |

### Agregar o cambiar fotos

1. Copiá la foto (`.jpg`) en `public/trabajos/<espacio>/`
   (`cocinas`, `oficinas`, `salones`, `placares` u `otros`). Usá nombres sin espacios ni tildes, por ejemplo `cocina-blanca.jpg`.
2. En `data/trabajos.ts` agregá un bloque como este:

   ```ts
   {
     id: "cocina-blanca",
     titulo: "Cocina blanca con isla",
     espacio: "cocinas",
     src: "/trabajos/cocinas/cocina-blanca.jpg",
     alt: "Cocina blanca con isla y banquetas", // describe la foto (accesibilidad)
     foco: "50% 60%", // opcional: qué parte conservar al recortar
   },
   ```

3. El orden de la lista es el orden de la galería: poné primero las fotos más nítidas y luminosas. Las primeras 8 se ven de entrada; el resto aparece con "Ver todos los trabajos".
4. La cuadrícula alterna sola una foto grande (16:10) y verticales (4:5); no hace falta indicar tamaños.
5. Los filtros sin fotos se ocultan solos (por ejemplo **Otros**, hasta que cargues una).
6. Si la imagen es un diseño 3D y no una obra terminada, agregá `render: true`: va al filtro **Diseños 3D** y no se mezcla con las fotos reales.

No hace falta achicar las fotos: Next.js las optimiza solo (AVIF/WebP y el tamaño justo para cada pantalla). Igual conviene que no pasen de ~2000 px de ancho.

### Pendientes marcados para completar

- **Testimonios**: la sección está oculta. Cargá opiniones reales (con permiso del cliente) en `content/testimonios.ts` y cambiá `mostrar` a `true`.
- **Mapa dentro de la página**: en Google Maps abrí tu ubicación → *Compartir* → *Insertar un mapa* → copiá solo la dirección que está dentro de `src="..."` y pegala en `content/site.ts` → `mapa.embedSrc`. Mientras esté vacío se muestra una tarjeta compacta con el botón "Abrir en Google Maps".
- **Fotos para reemplazar** (oscuras, poco nítidas o de baja resolución): biblioteca y escritorio, puesto de trabajo en L, integración con electrodomésticos, mueble de recepción, escritorio con cajonera y mueble de cocina compacto. Ideal: con luz de día, celular a la altura del pecho, sin zoom digital y de al menos 1600 px de ancho.
- **Instalación incluida**: si está incluida en el precio, podés decirlo en `ventajas` (está marcado como `EDITABLE`).
- La imagen "Cocina con isla integrada" es un **diseño 3D**: aparece solo en el filtro "Diseños 3D". Si tenés la foto de la obra terminada, reemplazala y borrá `render: true`.

## Publicarlo gratis en Vercel

1. Creá una cuenta en <https://github.com> y subí este proyecto a un repositorio (este repo ya está en GitHub).
2. Entrá a <https://vercel.com> y registrate con tu cuenta de GitHub (plan **Hobby**, gratis).
3. Tocá **Add New… → Project**, elegí el repositorio y tocá **Deploy**. Vercel detecta Next.js solo, no hay que configurar nada.
4. En 1–2 minutos te da un link del tipo `https://mausa-xxxx.vercel.app` listo para compartir.
5. Cada vez que subas cambios a GitHub, Vercel publica la nueva versión automáticamente.

**Dominio propio (opcional):** si comprás uno (por ejemplo `mausa.com.py`), agregalo en Vercel → *Settings → Domains*, y cargá la variable `NEXT_PUBLIC_SITE_URL` con esa dirección en *Settings → Environment Variables* para que Google y las redes usen el dominio correcto.

## Estructura

```
app/            layout (fuentes, SEO), página, sitemap, robots, íconos
components/
  layout/       header, logo, botón flotante de WhatsApp
  sections/     cada sección de la página (Hero, Trabajos, Proceso…)
  ui/           piezas reutilizables (botones, apariciones, parallax…)
content/site.ts textos y datos de contacto
data/trabajos.ts galería
public/trabajos fotos de los trabajos
public/marca    logo original de Mausa
```

## Accesibilidad y movimiento

- Si el sistema de la persona tiene activado "reducir movimiento", el sitio apaga el scroll suave, el parallax y los desplazamientos (solo quedan fundidos).
- Se puede recorrer todo con teclado (Tab), con foco visible y enlace "Saltar al contenido".

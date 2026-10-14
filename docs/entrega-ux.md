# Entrega: diseño y experiencia de Mausa

## Cambios implementados

- Todos los enlaces **Pedir presupuesto** llevan a `#presupuesto`. Los accesos directos a WhatsApp se identifican de forma explícita y conservan los números originales.
- Galería de seis imágenes iniciales, con **Mostrar más** en tandas de hasta seis, contadores según el filtro y foco en la primera tarjeta añadida. Los 24 trabajos reales y el diseño 3D siguen separados.
- Fichas con nombre, categoría y descripción del catálogo; estructura opcional para materiales, terminaciones y características confirmadas. Los campos sin datos no aparecen.
- Visor con imagen completa, navegación por teclado y gestos, cierre con Escape, fondo inerte, foco circular y retorno al disparador.
- **Quiero algo similar** lleva al formulario con una referencia editable. Conserva nombre, mensaje, medidas y el espacio que ya se eligió. Los renders mantienen la etiqueta Diseño 3D.
- Formulario más compacto, ayudas y etiquetas visibles, campos obligatorios/opcionales, errores específicos con `aria-invalid` y `aria-describedby`, foco en el primer error y conservación del borrador.
- **Continuar en WhatsApp** prepara el mensaje para el número seleccionado. La confirmación aclara que todavía hay que enviarlo allí y ofrece un enlace para volver a abrirlo.
- Tipografía editorial más contenida, títulos sin cortes forzados, fondos con transiciones limpias y espaciados menores. Se conservan la paleta y las fotografías reales.
- Portada con la sala de reuniones, conservando el encuadre completo, carga prioritaria y tamaños responsivos. Galería con carga diferida y espacio reservado.
- Ventajas como lista vertical en móvil; menú sin numeración inconsistente y apto para pantallas bajas. WhatsApp flotante se oculta mientras galería, presupuesto o contacto están visibles.
- Información comercial preparada para incorporar datos confirmados. La antigüedad fija “1 año” se retiró porque no hay fecha de inicio que permita validarla; podrá mostrarse “Desde …” al confirmar el año.

## Validación realizada

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Aprobado; compilación de producción y generación de rutas estáticas |
| `npx tsc --noEmit` | Aprobado |
| `npm run lint` | Aprobado |
| `git diff --check` | Aprobado |
| Suite principal Playwright | 30 aprobadas; 2 omitidas porque el menú móvil no existe a 1024/1440 px |
| Suite de detalles Playwright | 5 aprobadas |
| Anchos 320, 390, 768, 1024 y 1440 px | Sin desbordamiento horizontal; navegación, anclas, galería, visor, formulario y referencias comprobados |
| Pantallas bajas y horizontales | Menú a 360 px de alto y gesto táctil del visor a 844 × 390 px comprobados |
| Teclado | Tab, Shift+Tab, flechas, Escape, foco visible, retorno al disparador y fondo sin interacción comprobados |
| WhatsApp | Destinos principal y alternativo, acentos, saltos de línea, datos opcionales y referencia comprobados interceptando `window.open`; no se enviaron consultas |
| Movimiento reducido e imágenes | Contenido visible, portada prioritaria, tamaños responsivos, carga diferida y proporciones reservadas comprobados |
| Contraste | Textos secundarios claros y oscuros cumplen al menos 4,5:1; controles con foco visible y áreas de 44 px comprobados |
| Errores del navegador | Ningún error JavaScript en los recorridos de la suite principal |
| Revisión visual | Capturas de portada, formulario y visor revisadas, incluyendo 320/390 px y escritorio |

La suite se ejecutó sobre el servidor de producción compilado con Chromium. Los detalles adicionales se ejecutaron por separado después de que la suite principal pasó, sin cambios funcionales entre ambas ejecuciones. Las capturas de validación quedan en `/workspace/mausa-final-<ancho>.png`, `/workspace/mausa-form-<ancho>.png` y `/workspace/mausa-viewer-<ancho>.png` en este entorno.

## Datos pendientes de Mausa

1. Ciudad y ubicación en texto, zona exacta de cobertura y horarios de atención. Se conserva el enlace original de Google Maps; el país Paraguay está confirmado en el contenido existente.
2. Condiciones de garantía e instalación incluida, si corresponden, antes de publicar condiciones comerciales.
3. Información confirmada del taller/equipo y año de inicio para contextualizar su trayectoria.
4. Opiniones verificables de clientes con permiso para publicarlas. La sección continúa oculta porque no hay testimonios disponibles.
5. Descripciones técnicas, materiales, terminaciones y soluciones de cada proyecto. El ZIP contiene las mismas 25 imágenes y el logo; no incluye esas fichas.
6. Fotos más nítidas de biblioteca y escritorio, puesto de trabajo en L, integración con electrodomésticos, recepción, escritorio con cajonera y cocina compacta. La sala de reuniones disponible sirve como portada; una toma de mayor resolución permitiría mejorar su nitidez en pantallas grandes.
7. Foto de la obra de la cocina con isla integrada, si llegó a realizarse. La imagen disponible se mantiene como Diseño 3D y no se cuenta como trabajo terminado.

## Límites de verificación y publicación

- Las pruebas automatizadas se hicieron en Chromium; no se comprobó Safari/WebKit ni Firefox en este entorno.
- La apertura y codificación del mensaje de WhatsApp están verificadas. Su entrega depende de que la persona confirme el envío en WhatsApp; no se hicieron envíos reales.
- Los cambios se entregan en la rama del PR. La publicación del dominio actual depende del flujo de integración y despliegue de Vercel del repositorio.

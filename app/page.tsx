import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Quote } from "@/components/sections/Quote";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/JsonLd";
import type { SectionSlot, Tone } from "@/components/ui/Section";
import { hayTestimonios } from "@/content/testimonios";

type Bloque = { key: string; tone: Tone; Comp: (p: SectionSlot) => React.ReactNode };

/* Orden de la página. Cada sección recibe su número (01, 02…).
   Testimonios aparece solo cuando hay opiniones reales (content/testimonios.ts). */
const bloques: Bloque[] = [
  { key: "nosotros", tone: "dark", Comp: About },
  { key: "trabajos", tone: "light", Comp: Work },
  { key: "proceso", tone: "dark", Comp: Process },
  { key: "ventajas", tone: "light", Comp: Benefits },
  ...(hayTestimonios ? [{ key: "testimonios", tone: "dark" as Tone, Comp: Testimonials }] : []),
  { key: "presupuesto", tone: "light", Comp: Quote },
];

export default function Home() {
  const ultimo = bloques[bloques.length - 1].tone;
  return (
    <>
      <main id="contenido">
        <Hero />
        {bloques.map(({ key, Comp }, i) => (
          <Comp key={key} from={i === 0 ? "light" : bloques[i - 1].tone} n={String(i + 1).padStart(2, "0")} />
        ))}
      </main>
      <Contact from={ultimo} n={String(bloques.length + 1).padStart(2, "0")} />
      <JsonLd />
    </>
  );
}

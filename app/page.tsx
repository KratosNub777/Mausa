import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Quote } from "@/components/sections/Quote";
import { Contact } from "@/components/sections/Contact";
import { Blend } from "@/components/ui/Section";
import { JsonLd } from "@/components/JsonLd";

/* Orden de la página. Las secciones alternan claro / oscuro
   y <Blend> funde los colores entre una y otra. */
export default function Home() {
  return (
    <>
      <main id="contenido">
        <Hero />
        <Blend from="light" to="dark" />
        <About />
        <Blend from="dark" to="light" />
        <Work />
        <Blend from="light" to="dark" />
        <Process />
        <Blend from="dark" to="light" />
        <Benefits />
        <Blend from="light" to="dark" />
        <Testimonials />
        <Blend from="dark" to="light" />
        <Quote />
        <Blend from="light" to="dark" />
      </main>
      <Contact />
      <JsonLd />
    </>
  );
}

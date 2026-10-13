import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { QuoteIcon } from "@/components/ui/Icons";
import { textos } from "@/content/site";

const t = textos.testimonios;

/* Testimonios: preparado para opiniones reales.
   Mientras `marcador` sea true, se muestra un espacio reservado bien señalado. */
export function Testimonials() {
  return (
    <Section id="testimonios" tone="dark" labelledBy="testimonios-titulo">
      <Container className="py-[clamp(4.5rem,10vw,9rem)]">
        <SectionHeader id="testimonios-titulo" tone="dark" eyebrow={t.eyebrow} lines={t.titulo} intro={t.intro} />

        <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {t.items.map((item, i) =>
            item.marcador ? (
              <RevealItem as="li" key={i}>
                <div className="flex h-full min-h-60 flex-col justify-between rounded-2xl border border-dashed border-beige/25 p-6 sm:p-8">
                  <div>
                    <p className="inline-flex rounded-full border border-beige/25 px-3 py-1 text-[0.68rem] font-bold tracking-[0.18em] text-humo uppercase">
                      Marcador · Testimonio pendiente
                    </p>
                    <p className="mt-6 font-serif text-xl text-beige/60">
                      Acá va la opinión real de un cliente sobre su {item.espacio.toLowerCase()}.
                    </p>
                  </div>
                  <p className="mt-8 text-sm text-humo">Nombre del cliente · {item.espacio}</p>
                </div>
              </RevealItem>
            ) : (
              <RevealItem as="li" key={i}>
                <figure className="flex h-full flex-col justify-between rounded-2xl bg-beige/5 p-6 sm:p-8">
                  <div>
                    <QuoteIcon className="size-7 text-bronce" />
                    <blockquote className="mt-5 font-serif text-xl leading-snug">{item.texto}</blockquote>
                  </div>
                  <figcaption className="mt-8 text-sm text-humo">
                    <span className="font-semibold text-beige">{item.nombre}</span> · {item.espacio}
                  </figcaption>
                </figure>
              </RevealItem>
            ),
          )}
        </RevealGroup>
      </Container>
    </Section>
  );
}

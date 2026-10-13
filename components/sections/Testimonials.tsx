import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { QuoteIcon } from "@/components/ui/Icons";
import { textos } from "@/content/site";
import { hayTestimonios, testimonios } from "@/content/testimonios";

const t = textos.testimonios;

/* Testimonios reales. No se muestra nada hasta activarla en content/testimonios.ts. */
export function Testimonials({ from, n }: SectionSlot) {
  if (!hayTestimonios) return null;
  return (
    <Section id="testimonios" tone="dark" from={from} labelledBy="testimonios-titulo">
      <Container>
        <SectionHeader id="testimonios-titulo" n={n} tone="dark" eyebrow={t.eyebrow} lines={t.titulo} intro={t.intro} />

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {testimonios.items.map((item, i) => (
            <RevealItem as="li" key={i}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-beige/10 bg-beige/[0.03] p-6 sm:p-8">
                <div>
                  <QuoteIcon className="size-6 text-bronce" />
                  <blockquote className="mt-5 font-serif text-2xl leading-snug">{item.texto}</blockquote>
                </div>
                <figcaption className="mt-8 text-sm text-humo">
                  <span className="font-semibold text-beige">{item.nombre}</span> · {item.espacio}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

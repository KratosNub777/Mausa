import { Container, Section, type SectionSlot } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { QuoteIcon } from "@/components/ui/Icons";
import { textos } from "@/content/site";
import { hayTestimonios, mostrarTestimonios, testimonios } from "@/content/testimonios";

const t = textos.testimonios;

/* Las tarjetas pendientes se distinguen de las opiniones reales. */
export function Testimonials({ from, n }: SectionSlot) {
  if (!mostrarTestimonios) return null;
  return (
    <Section id="testimonios" tone="dark" from={from} labelledBy="testimonios-titulo">
      <Container>
        <SectionHeader id="testimonios-titulo" n={n} tone="dark" eyebrow={t.eyebrow} lines={t.titulo} intro={hayTestimonios ? t.intro : "Cada proyecto tiene una historia. Pronto compartiremos las de nuestros clientes."} />

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {hayTestimonios ? testimonios.items.map((item, i) => (
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
          )) : ["Cocinas a medida", "Placares y vestidores", "Espacios de trabajo"].map((espacio, i) => (
            <RevealItem as="li" key={espacio}>
              <div className="flex h-full flex-col rounded-2xl border border-beige/15 bg-beige/[0.03] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <QuoteIcon className="size-7 text-bronce-claro" />
                  <span className="text-xs tracking-[0.16em] text-humo uppercase">Próximamente</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl">Una historia por compartir.</h3>
                <p className="mt-3 text-sm leading-relaxed text-humo">Espacio reservado para una opinión real de un cliente de Mausa.</p>
                <div className="mt-8 flex items-center gap-3 border-t border-beige/10 pt-5">
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-bronce/40 font-serif text-lg text-bronce-claro">{String(i + 1).padStart(2, "0")}</span>
                  <div><p className="text-sm font-semibold">{espacio}</p><p className="mt-1 text-xs text-humo">Testimonio pendiente</p></div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

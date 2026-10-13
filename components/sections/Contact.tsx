import { Container } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "@/components/layout/Logo";
import {
  ArrowUpRightIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { contacto, linkWhatsApp, textos } from "@/content/site";

const t = textos.contacto;

const canales = [
  ...contacto.whatsapp.map((w) => ({
    label: w.etiqueta,
    valor: w.numero,
    href: linkWhatsApp(undefined, w.wa),
    Icon: WhatsAppIcon,
  })),
  { label: "Email", valor: contacto.email, href: `mailto:${contacto.email}`, Icon: MailIcon },
  { label: "Instagram", valor: contacto.instagram.usuario, href: contacto.instagram.url, Icon: InstagramIcon },
  { label: "Facebook", valor: "Mausa Mobiliarios", href: contacto.facebook, Icon: FacebookIcon },
  { label: "Ubicación", valor: "Ver en Google Maps", href: contacto.mapa.url, Icon: PinIcon },
];

/* Contacto + pie de página (todo en el <footer>). */
export function Contact() {
  return (
    <footer id="contacto" data-tone="dark" aria-labelledby="contacto-titulo" className="relative bg-tone-dark text-beige">
      <Container className="pt-[clamp(4.5rem,10vw,9rem)] pb-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 xl:col-span-4">
            <SectionHeader id="contacto-titulo" tone="dark" eyebrow={t.eyebrow} lines={t.titulo} intro={t.intro} />
            <Reveal delay={0.2} className="mt-10">
              <Magnetic>
                <ButtonLink href={linkWhatsApp()} external variant="light" icon="whatsapp" className="px-7">
                  Escribinos por WhatsApp
                </ButtonLink>
              </Magnetic>
            </Reveal>
          </div>

          <RevealGroup as="ul" className="grid border-t border-beige/12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {canales.map(({ label, valor, href, Icon }) => {
              const externo = !href.startsWith("mailto:");
              return (
                <RevealItem as="li" key={label} className="border-b border-beige/12 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                  <a
                    href={href}
                    {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-24 items-center gap-4 py-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-beige/15 transition-colors duration-300 group-hover:border-bronce group-hover:text-bronce">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.68rem] font-semibold tracking-[0.2em] text-humo uppercase">{label}</span>
                      <span className="mt-1 block font-medium [overflow-wrap:anywhere]">{valor}</span>
                    </span>
                    <ArrowUpRightIcon className="size-4 shrink-0 text-humo transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-beige" />
                  </a>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* Mapa */}
        <Reveal className="mt-16 lg:mt-24">
          {contacto.mapa.embedSrc ? (
            <iframe
              src={contacto.mapa.embedSrc}
              title="Ubicación de Mausa Mobiliarios en Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full rounded-[1.5rem] border-0 grayscale-[0.6] sm:aspect-[21/8]"
            />
          ) : (
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.5rem] border border-beige/12 bg-negro sm:aspect-[21/8]">
              {/* Trama tipo plano, decorativa */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-beige-profundo) 1px, transparent 1px), linear-gradient(90deg, var(--color-beige-profundo) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                  maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                }}
              />
              <div className="relative flex flex-col items-center gap-5 px-6 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-beige text-negro">
                  <PinIcon className="size-6" />
                </span>
                <p className="max-w-sm text-humo">Encontranos en Google Maps para ver cómo llegar.</p>
                <ButtonLink href={contacto.mapa.url} external variant="outline-light" icon="arrow">
                  Abrir ubicación en Google Maps
                </ButtonLink>
              </div>
            </div>
          )}
        </Reveal>

        {/* Pie */}
        <div className="mt-16 flex flex-col gap-6 border-t border-beige/12 pt-8 text-sm text-humo md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <Logo className="text-beige" />
            <span>{textos.lema}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="whitespace-nowrap">© Mausa Mobiliarios · Paraguay</span>
            <a href="#inicio" className="whitespace-nowrap font-semibold text-beige underline decoration-bronce underline-offset-4">
              Volver arriba
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

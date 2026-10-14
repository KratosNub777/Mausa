import { Container, Section, type SectionSlot } from "@/components/ui/Section";
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
import { contacto, informacionComercial, linkWhatsApp, textos } from "@/content/site";

const t = textos.contacto;
const datosComerciales = [
  { label: "Zona de cobertura", valor: informacionComercial.cobertura },
  { label: "Horarios de atención", valor: informacionComercial.horarios },
  { label: "Garantía", valor: informacionComercial.garantia },
].filter((dato) => dato.valor.trim());

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
];

/* Contacto + pie de página (todo en el <footer>). */
export function Contact({ from, n }: SectionSlot) {
  return (
    <Section as="footer" id="contacto" tone="dark" from={from} labelledBy="contacto-titulo" className="pb-8!">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 xl:col-span-4">
            <SectionHeader id="contacto-titulo" n={n} tone="dark" eyebrow={t.eyebrow} lines={t.titulo} intro={t.intro} />
            <Reveal delay={0.2} className="mt-8">
              <Magnetic>
                <ButtonLink href={linkWhatsApp()} external variant="light" icon="whatsapp" className="px-7">
                  Consultar por WhatsApp
                </ButtonLink>
              </Magnetic>
            </Reveal>
            {datosComerciales.length > 0 && <dl className="mt-6 space-y-4 text-sm">
              {datosComerciales.map((dato) => <div key={dato.label}>
                <dt className="font-semibold text-beige">{dato.label}</dt>
                <dd className="mt-1 leading-relaxed text-humo">{dato.valor}</dd>
              </div>)}
            </dl>}
          </div>

          <RevealGroup as="ul" className="grid border-t border-beige/10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {canales.map(({ label, valor, href, Icon }) => {
              const externo = !href.startsWith("mailto:");
              return (
                <RevealItem as="li" key={label} className="border-b border-beige/10 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                  <a
                    href={href}
                    {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-20 items-center gap-4 py-4"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-beige/15 transition-colors duration-300 group-hover:border-bronce group-hover:text-bronce">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold tracking-[0.18em] text-humo uppercase">{label}</span>
                      <span className="mt-1 block font-medium [overflow-wrap:anywhere]">{valor}</span>
                    </span>
                    <ArrowUpRightIcon className="size-4 shrink-0 text-humo transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-beige" />
                  </a>
                </RevealItem>
              );
            })}
            {/* Ubicación: mapa incrustado si hay código, si no una tarjeta compacta */}
            <RevealItem as="li" className="border-b border-beige/10 py-4 sm:pl-6">
              {contacto.mapa.embedSrc ? (
                <iframe
                  src={contacto.mapa.embedSrc}
                  title="Ubicación de Mausa Mobiliarios en Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[16/10] w-full rounded-xl border-0 [filter:grayscale(0.7)_sepia(0.15)_contrast(0.95)]"
                />
              ) : (
                <div className="flex min-h-12 items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-beige text-negro">
                    <PinIcon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold tracking-[0.18em] text-humo uppercase">Ubicación</span>
                    <p className="mt-2 text-sm">{informacionComercial.ubicacion || "Paraguay"}</p>
                    <a
                      href={contacto.mapa.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex min-h-11 items-center gap-2 font-medium underline decoration-bronce underline-offset-4 hover:decoration-beige"
                    >
                      Abrir en Google Maps
                      <ArrowUpRightIcon className="size-4" />
                    </a>
                  </span>
                </div>
              )}
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Pie */}
        <div className="mt-14 flex flex-col gap-4 border-t border-beige/10 pt-6 text-sm text-humo md:flex-row md:items-center md:justify-between lg:mt-20">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <Logo className="text-beige" />
            <span>{textos.lema}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <span className="whitespace-nowrap">© Mausa Mobiliarios · Paraguay</span>
            <a
              href="#inicio"
              className="inline-flex min-h-11 items-center whitespace-nowrap font-semibold text-beige underline decoration-bronce underline-offset-4"
            >
              Volver arriba
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

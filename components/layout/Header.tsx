"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useLenis } from "lenis/react";
import { Logo } from "./Logo";
import { contacto, linkWhatsApp, textos } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Header fijo y translúcido.
   Cambia de color según la sección que tiene debajo (clara u oscura)
   para que el logo y el menú siempre se lean bien. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();

  // Detecta el tono de la sección bajo el header
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      const y = 36;
      const els = document.querySelectorAll<HTMLElement>("#contenido [data-tone], footer[data-tone]");
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          setTone(el.dataset.tone === "dark" ? "dark" : "light");
          break;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Menú abierto: bloquea el scroll, deja inerte el resto y maneja el foco
  useEffect(() => {
    const main = document.getElementById("contenido");
    const footer = document.querySelector("footer");
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      firstLinkRef.current?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    lenis?.start();
    document.documentElement.style.overflow = "";
    main?.removeAttribute("inert");
    footer?.removeAttribute("inert");
  }, [open, lenis]);

  function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    if (wasOpen) toggleRef.current?.focus({ preventScroll: true });
    // Espera un cuadro para que el scroll se desbloquee y luego navega
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.start();
        lenis.scrollTo(href); // el alto del header lo da scroll-padding-top (CSS)
      } else {
        document.querySelector(href)?.scrollIntoView();
      }
      history.replaceState(null, "", href);
    });
  }

  const dark = open || tone === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Fondo translúcido */}
      <div
        aria-hidden
        className={`absolute inset-0 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color] duration-500 border-b ${
          open
            ? "bg-transparent border-transparent backdrop-blur-none"
            : dark
              ? "bg-negro/65 border-beige/10"
              : scrolled
                ? "bg-beige/70 border-negro/10"
                : "bg-transparent border-transparent backdrop-blur-none"
        }`}
      />
      <div
        className={`relative mx-auto flex h-[var(--header-h)] max-w-[90rem] items-center justify-between gap-4 px-4 transition-colors duration-500 sm:px-8 lg:px-12 ${
          dark ? "text-beige" : "text-negro"
        }`}
        style={{ "--focus": dark ? "var(--color-beige)" : "var(--color-negro)" } as React.CSSProperties}
      >
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} aria-label="Mausa Mobiliarios, ir al inicio" className="inline-flex min-h-11 items-center rounded-md">
          <Logo />
        </a>

        {/* Navegación de escritorio */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.92rem] font-medium">
            {textos.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  className="group relative py-2"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-bronce transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-300 sm:inline-flex ${
              dark ? "bg-beige text-negro hover:bg-arena" : "bg-negro text-beige hover:bg-negro-suave"
            }`}
          >
            <WhatsAppIcon className="size-4" />
            Pedir presupuesto
          </a>

          {/* Botón hamburguesa (celular y tablet) */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="relative grid size-11 place-items-center rounded-full lg:hidden"
          >
            <m.span
              aria-hidden
              className="absolute h-[1.5px] w-6 bg-current"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
            <m.span
              aria-hidden
              className="absolute h-[1.5px] w-6 bg-current"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            data-tone="dark"
            data-lenis-prevent
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-negro px-4 pt-[calc(var(--header-h)+2rem)] pb-8 text-beige sm:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Menú móvil">
              <m.ul
                className="flex flex-col"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
              >
                {textos.nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    className="overflow-hidden border-b border-beige/10"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={(e) => go(e, item.href)}
                      className="flex items-baseline justify-between py-4 font-serif text-[2.4rem] leading-none tracking-tight"
                    >
                      {item.label}
                      <span className="font-sans text-xs tracking-[0.2em] text-humo">0{i + 1}</span>
                    </a>
                  </m.li>
                ))}
              </m.ul>
            </nav>

            <m.div
              className="mt-auto pt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6, ease: EASE } }}
              exit={{ opacity: 0 }}
            >
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-beige text-base font-semibold text-negro"
              >
                <WhatsAppIcon className="size-5" />
                Pedir presupuesto
              </a>
              <p className="mt-5 text-center text-sm text-humo">
                {contacto.whatsapp.map((w) => w.numero).join("  ·  ")}
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

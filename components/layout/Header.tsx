"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { Logo } from "./Logo";
import { contacto, linkWhatsApp, textos } from "@/content/site";
import { CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { useModal } from "@/components/hooks/useModal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      for (const el of document.querySelectorAll<HTMLElement>("#contenido [data-tone], footer[data-tone]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= 36 && r.bottom > 36) { setTone(el.dataset.tone === "dark" ? "dark" : "light"); break; }
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      if (lenis) { lenis.start(); lenis.scrollTo(href); }
      else document.querySelector(href)?.scrollIntoView();
      history.replaceState(null, "", href);
    });
  }

  const dark = tone === "dark";
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${dark ? "border-beige/10 bg-negro/95 text-beige" : scrolled ? "border-negro/10 bg-beige/95 text-negro" : "border-transparent bg-beige/95 text-negro"}`}
        style={{ "--focus": dark ? "var(--color-beige)" : "var(--color-negro)" } as React.CSSProperties}>
        <div className="mx-auto flex h-[var(--header-h)] max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
          <a href="#inicio" onClick={(e) => go(e, "#inicio")} aria-label="Mausa Mobiliarios, ir al inicio" className="inline-flex min-h-11 items-center"><Logo /></a>
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-4 text-sm font-medium xl:gap-7">
              {textos.nav.map((item) => <li key={item.href}><a href={item.href} onClick={(e) => go(e, item.href)} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">{item.label}</a></li>)}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#presupuesto" onClick={(e) => go(e, "#presupuesto")}
              className={`hidden min-h-11 items-center rounded-full px-4 text-sm font-semibold sm:inline-flex ${dark ? "bg-beige text-negro hover:bg-arena" : "bg-negro text-beige hover:bg-negro-suave"}`}>Pedir presupuesto</a>
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu-movil" aria-label="Abrir menú" className="grid size-11 place-items-center rounded-full lg:hidden">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6" aria-hidden><path d="M3 8h18M3 16h18" /></svg>
            </button>
          </div>
        </div>
      </header>
      {open && <MobileMenu onClose={() => setOpen(false)} onNavigate={go} />}
    </>
  );
}

function MobileMenu({ onClose, onNavigate }: {
  onClose: () => void; onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const ref = useModal();
  return createPortal(
    <dialog ref={ref} id="menu-movil" aria-label="Menú" aria-modal="true" data-tone="dark" data-lenis-prevent
      className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-negro text-beige"
      onCancel={(e) => { e.preventDefault(); onClose(); }}>
      <div className="sticky top-0 z-10 flex h-[var(--header-h)] items-center justify-between bg-negro px-4 sm:px-8">
        <Logo /><button type="button" autoFocus onClick={onClose} aria-label="Cerrar menú" className="grid size-11 place-items-center rounded-full border border-beige/30"><CloseIcon className="size-5" /></button>
      </div>
      <div className="flex min-h-[calc(100dvh-var(--header-h))] flex-col px-4 pb-6 sm:px-8">
        <nav aria-label="Menú móvil"><ul>
          {textos.nav.map((item) => <li key={item.href} className="border-b border-beige/15">
            <a href={item.href} onClick={(e) => onNavigate(e, item.href)} className="flex min-h-11 items-center py-3 font-serif text-3xl">{item.label}</a>
          </li>)}
        </ul></nav>
        <div className="menu-contact mt-auto pt-6">
          <a href="#presupuesto" onClick={(e) => onNavigate(e, "#presupuesto")} className="flex min-h-12 items-center justify-center rounded-full bg-beige px-4 font-semibold text-negro">Pedir presupuesto</a>
          <p className="mt-4 text-sm text-humo">Consulta directa</p>
          <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-11 flex-wrap items-center gap-x-2 text-sm underline underline-offset-4">
            <WhatsAppIcon className="size-4 shrink-0" />{contacto.whatsapp[0].etiqueta} · {contacto.whatsapp[0].numero}
          </a>
        </div>
      </div>
    </dialog>, document.body,
  );
}

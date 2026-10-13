"use client";

import { type Variants } from "motion/react";
import * as m from "motion/react-m";

/* Apariciones al hacer scroll.
   Propósito: guiar la mirada en orden de lectura (título → texto → acción). */

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fundido + leve desplazamiento hacia arriba. */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/** Contenedor que escalona la aparición de sus RevealItem. */
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={group} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}

/** Título con máscara: cada línea sube desde abajo de un borde invisible. */
export function MaskHeading({
  lines,
  className,
  as = "h2",
  id,
}: {
  lines: readonly React.ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={className}>
      <m.span
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <m.span
              className="inline-block text-balance"
              variants={{
                hidden: { y: "108%" },
                show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
            >
              {line}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}

/** Imagen que aparece con fundido y un leve "acercamiento" que se asienta. */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <m.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </m.div>
    </div>
  );
}

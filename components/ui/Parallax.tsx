"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

/* Parallax suave: la imagen se desplaza un poco más lento que la página.
   Propósito: dar profundidad a las fotos grandes. Solo usa transform. */
export function Parallax({
  children,
  className,
  amount = 9,
}: {
  children: React.ReactNode;
  className?: string;
  /** Recorrido en % de la altura (más alto = más movimiento) */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <m.div
        className="absolute inset-x-0"
        style={{
          top: `-${amount + 1}%`,
          bottom: `-${amount + 1}%`,
          y: reduce ? 0 : y,
        }}
      >
        {children}
      </m.div>
    </div>
  );
}

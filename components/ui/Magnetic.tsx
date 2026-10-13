"use client";

import { useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as m from "motion/react-m";

/* Efecto magnético sutil: el botón se inclina hacia el cursor.
   Propósito: invitar al clic en la acción principal (WhatsApp).
   Solo con mouse; en celular y con movimiento reducido queda quieto. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = 12; // px: límite para que sea sutil
    x.set(Math.max(-max, Math.min(max, dx * strength)));
    y.set(Math.max(-max, Math.min(max, dy * strength)));
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}

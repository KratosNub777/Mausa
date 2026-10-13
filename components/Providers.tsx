"use client";

import { LazyMotion, MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

const cargarAnimaciones = () => import("./motion-features").then((mod) => mod.default);

/* Envuelve todo el sitio:
   - LazyMotion: el motor de animaciones se descarga aparte (página más rápida).
   - MotionConfig "user": si la persona pidió menos movimiento, Motion
     apaga los desplazamientos y deja solo fundidos suaves.
   - Lenis (scroll suave) solo se activa si NO pidió menos movimiento. */
export function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={cargarAnimaciones} strict>
      <MotionConfig reducedMotion="user">
        {!reduce && <ReactLenis root options={{ lerp: 0.11, anchors: true, autoRaf: true }} />}
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

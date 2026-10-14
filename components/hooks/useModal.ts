"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

/** El diálogo nativo contiene el foco y vuelve inerte el fondo, incluido el header. */
export function useModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.documentElement.style.overflow;
    dialog.showModal();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.documentElement.style.overflow = overflow;
      lenis?.start();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [lenis]);
  return dialogRef;
}

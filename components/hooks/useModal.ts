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
    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
      )).filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    dialog.addEventListener("keydown", containFocus);
    return () => {
      dialog.removeEventListener("keydown", containFocus);
      dialog.close();
      document.documentElement.style.overflow = overflow;
      lenis?.start();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [lenis]);
  return dialogRef;
}

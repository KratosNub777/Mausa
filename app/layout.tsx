import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { siteUrl, textos } from "@/content/site";
import "./globals.css";

/* Tipografías: Instrument Serif (editorial, para títulos) y Manrope (textos).
   next/font las descarga al compilar y las sirve desde tu dominio (rápido, sin saltos). */
const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif-display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: textos.seo.titulo, template: "%s | Mausa Mobiliarios" },
  description: textos.seo.descripcion,
  applicationName: "Mausa Mobiliarios",
  keywords: [
    "muebles a medida",
    "muebles a medida Paraguay",
    "cocinas a medida",
    "placares a medida",
    "vestidores",
    "muebles de oficina",
    "carpintería",
    "Mausa Mobiliarios",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PY",
    url: "/",
    siteName: "Mausa Mobiliarios",
    title: textos.seo.titulo,
    description: textos.seo.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: textos.seo.titulo,
    description: textos.seo.descripcion,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F3ECDF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PY" className={`${serif.variable} ${manrope.variable} antialiased`}>
      <body>
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-negro px-5 py-3 text-sm font-semibold text-beige focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Providers>
          <Header />
          <ViewTransition>{children}</ViewTransition>
          <WhatsAppFloat />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}

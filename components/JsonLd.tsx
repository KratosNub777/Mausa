import { contacto, siteUrl, textos } from "@/content/site";

/* Datos estructurados para Google (LocalBusiness → FurnitureStore).
   Solo datos reales: sin dirección, horarios ni precios inventados. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${siteUrl}/#negocio`,
    name: "Mausa Mobiliarios",
    description: textos.seo.descripcion,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/opengraph-image.jpg`,
    email: contacto.email,
    telephone: contacto.whatsapp[0].numero,
    address: { "@type": "PostalAddress", addressCountry: "PY" },
    areaServed: { "@type": "Country", name: "Paraguay" },
    hasMap: contacto.mapa.url,
    sameAs: [contacto.instagram.url, contacto.facebook],
    contactPoint: contacto.whatsapp.map((w) => ({
      "@type": "ContactPoint",
      telephone: w.numero,
      contactType: "customer service",
      availableLanguage: "es",
    })),
    knowsAbout: ["Muebles a medida", "Cocinas", "Oficinas", "Placares y vestidores", "Salones"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

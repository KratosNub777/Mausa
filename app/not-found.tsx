import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <main id="contenido" data-tone="light" className="bg-tone-light grid min-h-[100svh] place-items-center px-4 text-center">
      <div>
        <p className="text-eyebrow font-semibold uppercase text-tinta">Error 404</p>
        <h1 className="mt-5 font-serif text-h2 font-light">
          Esta página no está <em>a medida</em>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-tinta">La dirección no existe o cambió. Volvé al inicio para ver nuestros trabajos.</p>
        <ButtonLink href="/" icon="arrow" className="mt-8">
          Volver al inicio
        </ButtonLink>
      </div>
    </main>
  );
}

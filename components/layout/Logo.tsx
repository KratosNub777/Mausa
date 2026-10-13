/* Logotipo tipográfico: "Mausa" en serif + "Mobiliarios" espaciado en sans. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 leading-none ${className}`}>
      <span className="font-serif text-[1.9rem] tracking-[-0.01em]">
        Mausa<span className="text-bronce">.</span>
      </span>
      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] opacity-85">
        Mobiliarios
      </span>
    </span>
  );
}

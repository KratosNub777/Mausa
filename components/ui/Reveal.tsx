/* El contenido se muestra desde el primer render, incluso sin JavaScript.
   Conservamos estas piezas de composición sin retrasos decorativos al leer. */
type RevealProps = { children: React.ReactNode; className?: string; delay?: number; y?: number };
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
export function RevealGroup({ children, className, as: Tag = "div" }: {
  children: React.ReactNode; className?: string; as?: "div" | "ul" | "ol";
}) {
  return <Tag className={className}>{children}</Tag>;
}
export function RevealItem({ children, className, as: Tag = "div" }: {
  children: React.ReactNode; className?: string; as?: "div" | "li";
}) {
  return <Tag className={className}>{children}</Tag>;
}
export function MaskHeading({ lines, className, as: Tag = "h2", id }: {
  lines: readonly React.ReactNode[]; className?: string; as?: "h1" | "h2" | "h3"; id?: string;
}) {
  return <Tag id={id} className={`text-balance ${className ?? ""}`}>{lines.map((line, i) => <span key={i}>{i > 0 && " "}{line}</span>)}</Tag>;
}
export function ImageReveal({ children, className }: Omit<RevealProps, "y">) {
  return <div className={`relative overflow-hidden ${className ?? ""}`}>{children}</div>;
}

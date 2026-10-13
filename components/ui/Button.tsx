import { ArrowIcon, WhatsAppIcon } from "./Icons";

/* Botones del sitio. Siempre son links (<a>) porque llevan a WhatsApp o a una sección. */
type Variant = "solid" | "outline" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  solid: "bg-negro text-beige hover:bg-negro-suave",
  outline: "border border-negro/25 text-negro hover:border-negro hover:bg-negro/5",
  light: "bg-beige text-negro hover:bg-arena",
  "outline-light": "border border-beige/30 text-beige hover:border-beige hover:bg-beige/5",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  icon,
  external,
  className = "",
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: "whatsapp" | "arrow";
  external?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight transition-[background-color,border-color,color] duration-300 ${styles[variant]} ${className}`}
      {...rest}
    >
      {icon === "whatsapp" && <WhatsAppIcon className="size-5" />}
      <span>{children}</span>
      {icon === "arrow" && (
        <ArrowIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
    </a>
  );
}

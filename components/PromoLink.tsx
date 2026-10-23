import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

type PromoLinkProps = {
  href: string;
  className: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
};

export default function PromoLink({
  href,
  className,
  icon: Icon,
  eyebrow,
  title,
  description,
}: PromoLinkProps) {
  return (
    <Link href={href} className={`promo ${className}`}>
      <span className="promo-icon">
        <Icon />
      </span>
      <div>
        <span>{eyebrow}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <ArrowUpRight />
    </Link>
  );
}

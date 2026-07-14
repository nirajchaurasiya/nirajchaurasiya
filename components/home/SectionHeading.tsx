import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__content">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>

        {description && (
          <p className="section-heading__description">{description}</p>
        )}
      </div>

      {action && (
        <Link href={action.href} className="section-heading__action">
          <span>{action.label}</span>
          <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
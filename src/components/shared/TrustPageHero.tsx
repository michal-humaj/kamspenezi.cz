import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

interface TrustPageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  /** Optional data attribute for analytics */
  ctaAnalytics?: string;
}

export function TrustPageHero({
  breadcrumbs,
  title,
  subtitle,
  ctaText,
  ctaHref,
  ctaOnClick,
  ctaAnalytics,
}: TrustPageHeroProps) {
  return (
    <section 
      className="pt-8 pb-10 md:pt-12 md:pb-14"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* H1 Title */}
        <h1 className="font-displaySerif text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p 
            className="mt-4 text-base leading-relaxed md:text-lg max-w-2xl"
            style={{ color: 'var(--color-secondary)' }}
          >
            {subtitle}
          </p>
        )}

        {/* CTA Button */}
        {ctaText && (ctaHref || ctaOnClick) && (
          <div className="mt-6">
            {ctaHref ? (
              <Button asChild data-analytics-click={ctaAnalytics}>
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            ) : (
              <Button onClick={ctaOnClick} data-analytics-click={ctaAnalytics}>
                {ctaText}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      {/* Visual Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center gap-1.5 text-sm font-uiSans"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <span key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight 
                  className="h-3.5 w-3.5 flex-shrink-0" 
                  style={{ color: 'var(--color-bullet)' }}
                  aria-hidden="true"
                />
              )}
              {isLast || !item.href ? (
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-primary)' }}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:underline"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              ...(item.href && {
                "item": `https://kamspenezi.cz${item.href}`
              })
            }))
          })
        }}
      />
    </>
  );
}


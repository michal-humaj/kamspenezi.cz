"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Bydlení" },
  { href: "/investice", label: "Investice" },
  { href: "/o-projektu", label: "O projektu" },
];

const CTA_CONFIG = [
  {
    match: (pathname: string) => pathname === "/",
    label: "Otevřít kalkulačku",
    href: "/bydleni-kalkulacka",
  },
  {
    match: (pathname: string) => pathname.startsWith("/investice"),
    label: "Investice kalkulačka",
    href: "/investice-kalkulacka",
  },
  {
    match: () => true,
    label: "Bydlení kalkulačka",
    href: "/bydleni-kalkulacka",
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const cta = CTA_CONFIG.find((config) => config.match(pathname))!;

  return (
    <header 
      className="border-b border-[#EDEEF3]"
      style={{
        background: 'var(--bg-base)'
      }}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-displaySerif text-[1.25rem] font-semibold text-[var(--color-primary)]"
        >
          kamspenezi.cz
        </Link>

        <nav className="hidden items-center gap-8 text-body font-medium md:flex">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative pb-1 font-uiSans",
                  isActive 
                    ? "text-[var(--color-primary)] font-semibold" 
                    : "text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                )}
                style={{
                  transition: `color var(--transition-duration) var(--transition-easing)`
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: 'var(--color-primary)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <Button asChild>
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex items-center justify-center border p-2 font-uiSans"
                style={{
                  borderRadius: 'var(--radius-pill)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--color-primary)'
                }}
                aria-label="Otevřít navigaci"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full max-w-sm"
              style={{ background: 'var(--bg-card)' }}
            >
              <nav className="flex flex-col gap-6 pt-16">
                <Link
                  href="/"
                  className="font-displaySerif text-[1.4rem] font-semibold text-[var(--color-primary)]"
                >
                  kamspenezi.cz
                </Link>
                <div className="flex flex-col gap-5 text-[var(--color-primary)] font-uiSans">
                  <Link
                    href="/"
                    className={cn(
                      "text-[1.3rem] font-semibold",
                      pathname === "/" && "border-l-[3px] pl-3"
                    )}
                    style={pathname === "/" ? { borderLeftColor: 'var(--color-primary)' } : {}}
                    aria-current={pathname === "/" ? "page" : undefined}
                  >
                    Bydlení
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/investice"
                      className={cn(
                        "text-[1.3rem] font-semibold",
                        pathname.startsWith("/investice") && "border-l-[3px] pl-3"
                      )}
                      style={pathname.startsWith("/investice") ? { borderLeftColor: 'var(--color-primary)' } : {}}
                      aria-current={pathname.startsWith("/investice") ? "page" : undefined}
                    >
                      Investice
                    </Link>
                    <span 
                      className="px-3 py-1 text-xs font-medium"
                      style={{
                        background: 'var(--bg-section-alt)',
                        color: '#9CA3AF',
                        borderRadius: 'var(--radius-pill)'
                      }}
                    >
                      Nové
                    </span>
                  </div>
                </div>
                <div className="h-px" style={{ background: 'var(--border-subtle)' }} />
                <div className="flex flex-col gap-3 text-body font-medium text-[var(--color-primary)] font-uiSans">
                  <Link 
                    href="/o-projektu"
                    className={cn(
                      pathname === "/o-projektu" && "border-l-[3px] pl-3"
                    )}
                    style={pathname === "/o-projektu" ? { borderLeftColor: 'var(--color-primary)' } : {}}
                    aria-current={pathname === "/o-projektu" ? "page" : undefined}
                  >
                    O projektu
                  </Link>
                  <Link 
                    href="/kontakt"
                    className={cn(
                      pathname === "/kontakt" && "border-l-[3px] pl-3"
                    )}
                    style={pathname === "/kontakt" ? { borderLeftColor: 'var(--color-primary)' } : {}}
                    aria-current={pathname === "/kontakt" ? "page" : undefined}
                  >
                    Kontakt
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild>
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/investice-kalkulacka">
                      Investice kalkulačka
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


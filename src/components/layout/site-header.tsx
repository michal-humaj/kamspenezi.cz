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
    <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-body)]">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-displaySerif text-[1.25rem] font-semibold text-[var(--text-main)]"
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
                  "relative pb-1 transition-colors",
                  isActive 
                    ? "text-[var(--accent-primary)] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[var(--accent-primary)]" 
                    : "text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
                )}
                style={{ transition: 'var(--transition-fast)' }}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
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
                className="inline-flex items-center justify-center rounded-pill border border-[var(--border-subtle)] p-2 text-[var(--text-main)]"
                aria-label="Otevřít navigaci"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-white">
              <nav className="flex flex-col gap-6 pt-16">
                <Link
                  href="/"
                  className="font-displaySerif text-[1.4rem] font-semibold text-[var(--text-main)]"
                >
                  kamspenezi.cz
                </Link>
                <div className="flex flex-col gap-5 text-[var(--text-main)]">
                  <Link
                    href="/"
                    className={cn(
                      "text-[1.3rem] font-semibold",
                      pathname === "/" && "border-l-[3px] border-[var(--accent-primary)] pl-3 text-[var(--accent-primary)]"
                    )}
                    aria-current={pathname === "/" ? "page" : undefined}
                  >
                    Bydlení
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/investice"
                      className={cn(
                        "text-[1.3rem] font-semibold",
                        pathname.startsWith("/investice") && "border-l-[3px] border-[var(--accent-primary)] pl-3 text-[var(--accent-primary)]"
                      )}
                      aria-current={pathname.startsWith("/investice") ? "page" : undefined}
                    >
                      Investice
                    </Link>
                    <span className="rounded-pill bg-[var(--bg-section-soft)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                      Nové
                    </span>
                  </div>
                </div>
                <div className="h-px bg-[var(--border-subtle)]" />
                <div className="flex flex-col gap-3 text-body font-medium text-[var(--text-main)]">
                  <Link 
                    href="/o-projektu"
                    className={cn(
                      pathname === "/o-projektu" && "border-l-[3px] border-[var(--accent-primary)] pl-3 text-[var(--accent-primary)]"
                    )}
                    aria-current={pathname === "/o-projektu" ? "page" : undefined}
                  >
                    O projektu
                  </Link>
                  <Link 
                    href="/kontakt"
                    className={cn(
                      pathname === "/kontakt" && "border-l-[3px] border-[var(--accent-primary)] pl-3 text-[var(--accent-primary)]"
                    )}
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


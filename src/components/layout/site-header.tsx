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
    <header className="border-b border-border-subtle bg-surface-default/95 backdrop-blur supports-[backdrop-filter]:bg-surface-default/80">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-displaySerif text-[1.25rem] font-semibold text-text-main"
        >
          kamspenezi.cz
        </Link>

        <nav className="hidden items-center gap-8 text-body font-medium text-text-muted md:flex">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-text-main",
                  isActive && "text-text-main"
                )}
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
                className="inline-flex items-center justify-center rounded-pill border border-border-subtle p-2 text-text-main"
                aria-label="Otevřít navigaci"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <nav className="flex flex-col gap-6 pt-16">
                <Link
                  href="/"
                  className="font-displaySerif text-[1.4rem] font-semibold text-slate-900"
                >
                  kamspenezi.cz
                </Link>
                <div className="flex flex-col gap-5 text-slate-900">
                  <Link
                    href="/"
                    className="text-[1.3rem] font-semibold"
                  >
                    Bydlení
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/investice"
                      className="text-[1.3rem] font-semibold"
                    >
                      Investice
                    </Link>
                    <span className="rounded-pill bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      Nové
                    </span>
                  </div>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex flex-col gap-3 text-body font-medium text-slate-900">
                  <Link href="/o-projektu">O projektu</Link>
                  <Link href="/kontakt">Kontakt</Link>
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


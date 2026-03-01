"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Bydlení" },
  { href: "/investice", label: "Investice" },
  { href: "/o-projektu", label: "O projektu" },
];

const MOBILE_SECONDARY_LINKS = [
  { href: "/metodika/bydleni", label: "Metodika: Bydlení" },
  { href: "/metodika/investice", label: "Metodika: Investice" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)]"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex h-14 items-center justify-between md:h-16">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Hlavní navigace">
          {NAV_LINKS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative pb-1 font-uiSans text-sm",
                  active
                    ? "text-[var(--color-primary)] font-semibold"
                    : "text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                )}
                style={{ transition: "color var(--transition-duration) var(--transition-easing)" }}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "var(--color-primary)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex items-center justify-center border border-slate-200/70 p-2 font-uiSans"
                style={{ borderRadius: "var(--radius-pill)", color: "var(--color-primary)" }}
                aria-label="Otevřít navigaci"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm" style={{ background: "var(--bg-card)" }}>
              {/* Close button is built into SheetContent */}
              <nav className="flex flex-col gap-6 pt-8" aria-label="Mobilní navigace">
                <Logo />

                {/* Primary links */}
                <div className="flex flex-col gap-5 font-uiSans">
                  {NAV_LINKS.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "text-[1.2rem] font-semibold transition-colors",
                            active ? "border-l-[3px] pl-3" : "hover:text-[var(--color-primary)]"
                          )}
                          style={{
                            color: "var(--color-primary)",
                            ...(active ? { borderLeftColor: "var(--color-primary)" } : {}),
                          }}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "var(--color-border)" }} />

                {/* Secondary links — methodology */}
                <div className="flex flex-col gap-3 font-uiSans">
                  {MOBILE_SECONDARY_LINKS.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "text-sm font-medium transition-colors",
                            active ? "border-l-[3px] pl-3" : "hover:text-[var(--color-primary)]"
                          )}
                          style={{
                            color: active ? "var(--color-primary)" : "var(--color-secondary)",
                            ...(active ? { borderLeftColor: "var(--color-primary)" } : {}),
                          }}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

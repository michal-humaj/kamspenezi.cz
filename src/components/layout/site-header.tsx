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
  { href: "/jak-to-funguje", label: "Jak to funguje" },
  { href: "/metodika-a-zdroje", label: "Metodika" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header 
      className="border-b border-[#EDEEF3]"
      style={{
        background: 'var(--bg-base)'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex h-14 items-center justify-between md:h-16">
        <Logo />

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

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex items-center justify-center border border-slate-200/70 p-2 font-uiSans"
                style={{
                  borderRadius: 'var(--radius-pill)',
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
                <Logo />
                <div className="flex flex-col gap-5 text-[var(--color-primary)] font-uiSans">
                  <SheetClose asChild>
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
                  </SheetClose>
                  <SheetClose asChild>
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
                  </SheetClose>
                </div>
                <div className="h-px" style={{ background: 'var(--border-subtle)' }} />
                <div className="flex flex-col gap-3 text-body font-medium text-[var(--color-primary)] font-uiSans">
                  <SheetClose asChild>
                    <Link 
                      href="/jak-to-funguje"
                      className={cn(
                        pathname === "/jak-to-funguje" && "border-l-[3px] pl-3"
                      )}
                      style={pathname === "/jak-to-funguje" ? { borderLeftColor: 'var(--color-primary)' } : {}}
                      aria-current={pathname === "/jak-to-funguje" ? "page" : undefined}
                    >
                      Jak to funguje
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/metodika-a-zdroje"
                      className={cn(
                        pathname === "/metodika-a-zdroje" && "border-l-[3px] pl-3"
                      )}
                      style={pathname === "/metodika-a-zdroje" ? { borderLeftColor: 'var(--color-primary)' } : {}}
                      aria-current={pathname === "/metodika-a-zdroje" ? "page" : undefined}
                    >
                      Metodika a zdroje
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
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
                  </SheetClose>
                  <SheetClose asChild>
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
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

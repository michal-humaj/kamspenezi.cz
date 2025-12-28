import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const FOOTER_LINKS = [
  { href: "/jak-to-funguje", label: "Jak to funguje" },
  { href: "/metodika-a-zdroje", label: "Metodika a zdroje" },
  { href: "/o-projektu", label: "O projektu" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface-default">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-sm text-body text-text-muted">
            Nezávislá kalkulačka pro lidi v Česku, kteří chtějí dělat
            informovaná rozhodnutí o bydlení a investicích.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-body-sm font-medium text-text-muted md:flex-row md:items-start md:gap-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-text-main"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="text-body-sm text-text-muted md:text-right">
          Toto je neutrální kalkulačka. Obsah není finanční poradenství.
        </div>
      </div>
    </footer>
  );
}


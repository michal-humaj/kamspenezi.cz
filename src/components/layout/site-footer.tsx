import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/o-projektu", label: "O projektu" },
  { href: "mailto:ahoj@kamspenezi.cz", label: "Kontakt" },
  { href: "/podminky", label: "Podmínky" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface-default">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="space-y-2">
          <Link
            href="/"
            className="font-displaySerif text-[1.25rem] font-semibold text-text-main"
          >
            kamspenezi.cz
          </Link>
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


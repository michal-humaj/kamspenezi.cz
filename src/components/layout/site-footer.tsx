import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const FOOTER_COLUMNS = [
  {
    heading: "Kalkulačky",
    links: [
      { href: "/", label: "Kalkulačka bydlení" },
      { href: "/investice", label: "Kalkulačka investice" },
    ],
  },
  {
    heading: "Metodika",
    links: [
      { href: "/metodika/bydleni", label: "Metodika: Bydlení" },
      { href: "/metodika/investice", label: "Metodika: Investice" },
    ],
  },
  {
    heading: "Projekt",
    links: [
      { href: "/o-projektu", label: "O projektu" },
    ],
  },
  {
    heading: "Články",
    links: [
      { href: "/koupit-nebo-pronajmout", label: "Koupit nebo pronajmout?" },
      { href: "/vyplati-se-investicni-byt", label: "Vyplatí se investiční byt?" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      className="border-t"
      style={{ background: "var(--bg-base)", borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-3">
            <Logo />
            <p
              className="max-w-xs text-sm leading-relaxed font-uiSans"
              style={{ color: "var(--color-secondary)" }}
            >
              Nezávislá kalkulačka pro lidi v Česku, kteří chtějí dělat
              informovaná rozhodnutí o bydlení a investicích.
            </p>
            <p className="text-xs font-uiSans" style={{ color: "var(--color-bullet)" }}>
              © {new Date().getFullYear()} kamspenezi.cz
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="space-y-3">
              <h3
                className="text-xs font-semibold uppercase tracking-widest font-uiSans"
                style={{ color: "var(--color-bullet)" }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-uiSans transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 border-t pt-6 text-xs font-uiSans"
          style={{ borderColor: "var(--color-border)", color: "var(--color-bullet)" }}
        >
          Obsah na tomto webu není finanční poradenství. Kalkulačka slouží výhradně k orientačním účelům.
        </div>
      </div>
    </footer>
  );
}

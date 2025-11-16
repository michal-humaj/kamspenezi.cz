import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="nav-logo inline-flex items-center">
      <span className="nav-logo-text">
        kamspenezi<span className="nav-logo-tld">.cz</span>
      </span>
    </Link>
  );
}


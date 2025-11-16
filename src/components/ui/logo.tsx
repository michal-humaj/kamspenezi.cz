import Link from "next/link";

export function Logo() {
  return (
    <Link 
      href="/" 
      className="nav-logo hover:opacity-90 transition-opacity"
      style={{
        height: '48px'
      }}
    >
      <span className="nav-logo-main">kamspenezi</span>
      <span className="nav-logo-suffix">.cz</span>
    </Link>
  );
}


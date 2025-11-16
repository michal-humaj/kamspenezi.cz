import Link from "next/link";

export function Logo() {
  return (
    <Link 
      href="/" 
      className="nav-logo flex items-center hover:opacity-90 transition-opacity"
      style={{
        height: '48px'
      }}
    >
      <span 
        className="font-uiSans leading-none"
        style={{
          color: 'var(--color-primary)',
          textRendering: 'optimizeLegibility'
        }}
      >
        kamspenezi.cz
      </span>
    </Link>
  );
}


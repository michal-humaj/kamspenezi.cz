import Link from "next/link";

export function Logo() {
  return (
    <Link 
      href="/" 
      className="inline-flex items-center hover:opacity-90 transition-opacity"
    >
      <span 
        className="font-uiSans text-slate-900 leading-none"
        style={{
          fontSize: 'clamp(16px, 4vw, 19px)',
          fontWeight: 600,
          letterSpacing: '0.015em'
        }}
      >
        kamspenezi<span style={{ opacity: 0.75 }}>.cz</span>
      </span>
    </Link>
  );
}


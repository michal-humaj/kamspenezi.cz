import Link from "next/link";

export function Logo() {
  return (
    <Link 
      href="/" 
      className="inline-flex items-center hover:opacity-90 transition-opacity"
    >
      <span className="font-semibold tracking-tight text-slate-900 text-lg md:text-xl leading-none font-uiSans">
        kamspenezi.cz
      </span>
    </Link>
  );
}


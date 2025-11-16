"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link 
      href="/" 
      className="nav-logo inline-flex items-center transition-opacity focus-visible:outline-none"
      style={{
        transitionDuration: 'var(--transition-duration)',
        transitionTimingFunction: 'var(--transition-easing)',
        WebkitTapHighlightColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.7';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.opacity = '0.7';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      <span className="nav-logo-text">
        kamspenezi<span className="nav-logo-tld">.cz</span>
      </span>
    </Link>
  );
}


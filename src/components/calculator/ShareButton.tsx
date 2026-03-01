"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackTrustPageEvent } from "@/lib/analytics";

interface ShareButtonProps {
  onCopy: () => Promise<boolean>;
  variant?: "default" | "small" | "pill";
}

export function ShareButton({ onCopy, variant = "default" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);
      trackTrustPageEvent("copy_share_link", "calculator_share_button");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        style={{
          background: copied ? "var(--scenario-b-dot)" : "var(--btn-primary-bg)",
          color: "var(--btn-primary-text)",
          borderRadius: "var(--radius-pill)",
          padding: "10px 24px",
          fontSize: 14,
          fontWeight: 500,
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          boxShadow: "var(--btn-primary-shadow)",
          transition: `background ${200}ms ease`,
        }}
        title="Zkopírovat odkaz na výpočet"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            <span>Zkopírováno</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Sdílet</span>
          </>
        )}
      </button>
    );
  }

  if (variant === "small") {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
        style={{
          background: copied ? "var(--scenario-b-bg)" : "var(--bg-lilac-section)",
          color: copied ? "var(--scenario-b-dot)" : "var(--color-primary)",
        }}
        title="Zkopírovat odkaz na výpočet"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            <span>Zkopírováno</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Sdílet</span>
          </>
        )}
      </button>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Odkaz zkopírován!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Sdílet výpočet
        </>
      )}
    </Button>
  );
}


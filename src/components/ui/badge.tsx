import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-pill border px-3 py-1 text-body-sm font-medium text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark",
  {
    variants: {
      variant: {
        neutral:
          "border-transparent bg-bg-subtle text-text-muted",
        outline: "border-border-subtle bg-surface-default text-text-main",
        scenarioA:
          "border-transparent bg-scenario-aSoft text-text-main",
        scenarioB:
          "border-transparent bg-scenario-bSoft text-text-main",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

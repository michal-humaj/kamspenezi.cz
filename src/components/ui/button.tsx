import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-uiSans text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-accent-dark text-white hover:translate-y-px hover:shadow-[0_10px_26px_rgba(0,0,0,0.18)]",
        secondary:
          "border border-text-main/30 bg-surface-default text-text-main hover:bg-bg-subtle",
        ghost:
          "text-text-muted hover:text-text-main hover:bg-bg-subtle/70",
        destructive:
          "border border-text-main text-text-main hover:bg-bg-subtle",
        link: "text-text-main underline underline-offset-4 hover:text-text-muted",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-5 text-body-sm",
        lg: "h-14 px-8 text-h3 font-semibold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

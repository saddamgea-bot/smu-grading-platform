import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const characterVariants = cva("inline-block transition-all duration-300", {
  variants: {
    variant: {
      default: "text-primary",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
    },
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-24 h-24",
    },
    animation: {
      none: "",
      bounce: "animate-bounce-slight",
      celebrate: "animate-celebrate",
      wave: "animate-wave",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    animation: "none",
  },
})

export interface DuoCharacterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof characterVariants> {
  mood?: "happy" | "neutral" | "sad" | "excited"
}

export function DuoCharacter({ className, variant, size, animation, mood = "neutral", ...props }: DuoCharacterProps) {
  return (
    <div className={cn(characterVariants({ variant, size, animation }), className)} {...props}>
      {mood === "happy" && (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="60" fill="currentColor" />
          <circle cx="42" cy="50" r="8" fill="white" />
          <circle cx="86" cy="50" r="8" fill="white" />
          <path d="M40 80C50 96 78 96 88 80" stroke="white" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )}
      {mood === "neutral" && (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="60" fill="currentColor" />
          <circle cx="42" cy="50" r="8" fill="white" />
          <circle cx="86" cy="50" r="8" fill="white" />
          <line x1="40" y1="85" x2="88" y2="85" stroke="white" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )}
      {mood === "sad" && (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="60" fill="currentColor" />
          <circle cx="42" cy="50" r="8" fill="white" />
          <circle cx="86" cy="50" r="8" fill="white" />
          <path d="M40 90C50 74 78 74 88 90" stroke="white" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )}
      {mood === "excited" && (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="60" fill="currentColor" />
          <circle cx="42" cy="50" r="8" fill="white" />
          <circle cx="86" cy="50" r="8" fill="white" />
          <path d="M40 75C50 95 78 95 88 75" stroke="white" strokeWidth="6" strokeLinecap="round" />
          <path d="M30 30L40 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M98 30L88 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}

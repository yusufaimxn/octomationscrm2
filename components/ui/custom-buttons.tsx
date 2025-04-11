import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg"
}

export function ButtonPrimary({ children, className, size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-[#2be0bc] text-black font-medium rounded-full shadow-sm px-4 py-2 transition-all duration-200 hover:scale-105 hover:shadow hover:bg-[#22c9a8]",
        size === "sm" && "text-sm px-3 py-1.5",
        size === "lg" && "text-lg px-5 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonSecondary({ children, className, size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-[#e8eae5] text-black font-medium rounded-full shadow-sm px-4 py-2 transition-all duration-200 hover:scale-105 hover:shadow hover:bg-[#d8dad5]",
        size === "sm" && "text-sm px-3 py-1.5",
        size === "lg" && "text-lg px-5 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonDanger({ children, className, size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-[#e63327] text-white font-medium rounded-full shadow-sm px-4 py-2 transition-all duration-200 hover:scale-105 hover:shadow hover:bg-[#d12d22]",
        size === "sm" && "text-sm px-3 py-1.5",
        size === "lg" && "text-lg px-5 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonNeutral({ children, className, size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-secondary text-foreground font-medium rounded-2xl shadow-md p-3 btn-hover hover:bg-muted",
        size === "sm" && "text-sm px-3 py-1.5",
        size === "lg" && "text-lg px-5 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonWarning({ children, className, size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-[#facc15] text-black font-medium rounded-full shadow-sm px-4 py-2 transition-all duration-200 hover:scale-105 hover:shadow hover:bg-[#eabc05]",
        size === "sm" && "text-sm px-3 py-1.5",
        size === "lg" && "text-lg px-5 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

import { twMerge } from "tailwind-merge"
import { Link } from "./link"

const sizeMap = {
  xs: "text-xs/5 sm:text-xs/5",
  sm: "text-sm/6 sm:text-sm/6",
  md: "text-base/6 sm:text-sm/6",
  lg: "text-lg/7 sm:text-base/6",
  xl: "text-xl/8 sm:text-lg/7",
} as const

type TextSize = keyof typeof sizeMap

export function Text({
  className,
  size = "md",
  ...props
}: React.ComponentPropsWithoutRef<"p"> & { size?: TextSize }) {
  return (
    <p
      data-slot="text"
      {...props}
      className={twMerge(
        "text-pretty text-muted-foreground",
        sizeMap[size],
        className
      )}
    />
  )
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={twMerge(
        className,
        "text-foreground underline decoration-foreground/50 data-hover:decoration-foreground"
      )}
    />
  )
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={twMerge(className, "font-medium text-foreground")}
    />
  )
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={twMerge(
        className,
        "rounded-sm border border-border bg-foreground/5 px-0.5 text-sm font-medium text-foreground sm:text-[0.8125rem]"
      )}
    />
  )
}

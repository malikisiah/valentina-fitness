import { twMerge } from "tailwind-merge"

const sizeMap = {
  xs: "text-lg/7 sm:text-base/7",
  sm: "text-xl/8 sm:text-lg/8",
  md: "text-2xl/8 sm:text-xl/8",
  lg: "text-4xl/10 sm:text-3xl/9",
  xl: "text-5xl/12 sm:text-4xl/10",
  "2xl": "text-6xl/none sm:text-5xl/none",
  "3xl": "text-7xl/none sm:text-6xl/none",
} as const

type HeadingSize = keyof typeof sizeMap

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: HeadingSize
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">

export function Heading({
  className,
  level = 1,
  size = "2xl",
  ...props
}: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={twMerge(
        "font-semibold text-foreground",
        sizeMap[size],
        className
      )}
    />
  )
}

export function Subheading({
  className,
  level = 2,
  size = "md",
  ...props
}: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={twMerge(
        "font-semibold text-foreground",
        sizeMap[size],
        className
      )}
    />
  )
}

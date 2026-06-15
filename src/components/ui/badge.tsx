import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "outline" | "destructive";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "border-transparent bg-primary text-primary-foreground shadow-sm": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "text-foreground": variant === "outline",
          "border-transparent bg-destructive text-white shadow-sm": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };

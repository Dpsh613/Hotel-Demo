import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Layout & base
        "h-11 w-full min-w-0 rounded-[var(--radius-base)] px-3 py-2 text-sm",
        // Colors — GROVEside palette
        "border border-border-subtle bg-surface-default text-text-primary",
        "placeholder:text-text-secondary",
        // Transition
        "transition-[color,box-shadow,border-color] outline-none",
        // Focus state — brand ring
        "focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:border-brand-primary",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // File input reset
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

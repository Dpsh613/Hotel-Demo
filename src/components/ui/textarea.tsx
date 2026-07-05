import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Layout
        "flex min-h-[120px] w-full rounded-[var(--radius-base)] px-3 py-2 text-sm resize-y",
        // Colors — GROVEside palette
        "border border-border-subtle bg-surface-default text-text-primary",
        "placeholder:text-text-secondary",
        // Transition
        "transition-[color,box-shadow,border-color] outline-none",
        // Focus state — brand ring
        "focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:border-brand-primary",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

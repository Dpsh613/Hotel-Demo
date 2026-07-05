"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Square checkbox — GROVEside premium restrained design language
        "peer size-4 shrink-0 rounded-none border border-border-strong",
        "transition-shadow outline-none",
        "focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:border-brand-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Checked state
        "data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary data-[state=checked]:text-text-on-dark",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

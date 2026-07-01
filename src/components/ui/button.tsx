import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: shared across all variants — accessibility, disabled, icon handling
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-colors duration-150 ease-out outline-none select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Dark-filled — the primary CTA button
        default:
          "bg-brand-primary text-text-on-dark hover:bg-[#2A2A28] rounded-[var(--radius-btn)] focus-visible:outline-brand-primary",
        // Outlined — secondary actions
        secondary:
          "bg-transparent border border-brand-primary text-text-primary hover:bg-brand-primary hover:text-text-on-dark rounded-[var(--radius-btn)] transition-all duration-200",
        // Transparent — tertiary / navigation ghost actions
        ghost:
          "bg-transparent text-text-primary hover:text-text-secondary hover:bg-transparent transition-colors duration-150",
        // Text link style — inline CTAs
        link: "text-text-primary underline-offset-4 hover:underline hover:text-text-secondary p-0 h-auto font-normal transition-all duration-150",
      },
      size: {
        default: "h-11 px-8", // Standard "Get in touch"
        sm: "h-9 px-6 text-xs", // Quick-link buttons (Practical Info)
        lg: "h-12 px-10", // Hero-level CTAs
        icon: "size-10", // Lightbox nav arrows, close button
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

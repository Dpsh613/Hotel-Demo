// Server Component — no "use client" directive
import { cn } from "@/lib/utils";

interface ProseContentProps {
  html: string;
  className?: string;
}

export function ProseContent({ html, className }: ProseContentProps) {
  return (
    <div
      className={cn(
        // Base prose
        "prose prose-sm md:prose-base lg:prose-lg",
        // Remove prose max-width — parent containers control width
        "max-w-none",
        // Headings: display font, brand primary color
        "prose-headings:font-display prose-headings:text-text-primary prose-headings:font-semibold",
        // Body text
        "prose-p:text-text-secondary prose-p:leading-relaxed",
        // Links: brand primary, underline treatment
        "prose-a:text-brand-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:no-underline",
        // Strong / bold
        "prose-strong:text-text-primary prose-strong:font-semibold",
        // Lists
        "prose-li:text-text-secondary prose-ul:my-4 prose-li:my-1",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function SkipToContent() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-text-on-dark focus:rounded-base focus:outline-none"
    >
      Skip to content
    </a>
  );
}

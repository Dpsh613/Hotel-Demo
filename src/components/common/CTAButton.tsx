"use client";

import Link from "next/link";
import type { Route } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn, isExternalUrl } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
  openInNewTab?: boolean;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  openInNewTab = false,
}: CTAButtonProps) {
  // Map CTAButton variant names → shadcn button variant names
  const buttonVariant = variant === "primary" ? "default" : "secondary";

  const classes = cn(
    buttonVariants({ variant: buttonVariant, size }),
    className,
  );

  // tel: and mailto: links: render as plain <a> (not Next.js <Link>)
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  // External URLs (http/https): use <a> with security attrs
  if (isExternalUrl(href) || openInNewTab) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <span className="sr-only">(opens in new tab)</span>
      </a>
    );
  }

  // Internal routes: use Next.js <Link>
  return (
    <Link href={href as Route} className={classes}>
      {children}
    </Link>
  );
}

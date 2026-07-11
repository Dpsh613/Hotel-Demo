"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  background?: "default" | "alternate" | "dark";
  children: React.ReactNode;
  revealDelay?: number; // ms
  disableReveal?: boolean;
}

export function SectionWrapper({
  id,
  className,
  background = "default",
  children,
  revealDelay = 0,
  disableReveal = false,
}: SectionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !disableReveal && !prefersReducedMotion;

  const bgClasses = {
    default: "bg-surface-default text-text-primary",
    alternate:
      "bg-surface-alternate text-text-primary border-y border-border-subtle",
    dark: "bg-surface-dark text-text-on-dark",
  };

  const currentBgClass = bgClasses[background];

  const initialProps = shouldAnimate ? { opacity: 0, y: 40 } : {};
  const whileInViewProps = shouldAnimate ? { opacity: 1, y: 0 } : {};
  const viewportProps = shouldAnimate
    ? { once: true, margin: "-80px" as any }
    : undefined;
  const transitionProps = shouldAnimate
    ? {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1] as const,
        delay: revealDelay / 1000,
      }
    : undefined;

  return (
    <section
      id={id}
      className={cn("py-20 md:py-32 w-full", currentBgClass, className)}
    >
      <motion.div
        className="container-content"
        initial={initialProps}
        whileInView={whileInViewProps}
        viewport={viewportProps}
        transition={transitionProps}
      >
        {children}
      </motion.div>
    </section>
  );
}

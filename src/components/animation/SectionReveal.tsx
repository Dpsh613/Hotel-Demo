"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Direction the element enters from. Default: "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
}

function getInitial(direction: SectionRevealProps["direction"]) {
  switch (direction) {
    case "down":
      return { opacity: 0, y: -40 };
    case "left":
      return { opacity: 0, x: -40 };
    case "right":
      return { opacity: 0, x: 40 };
    case "none":
      return { opacity: 0 };
    case "up":
    default:
      return { opacity: 0, y: 40 };
  }
}

function getAnimate(direction: SectionRevealProps["direction"]) {
  switch (direction) {
    case "left":
    case "right":
      return { opacity: 1, x: 0 };
    case "down":
    case "up":
    default:
      return { opacity: 1, y: 0 };
    case "none":
      return { opacity: 1 };
  }
}

export function SectionReveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is preferred: render immediately, no animation
  const initial = prefersReducedMotion ? { opacity: 1 } : getInitial(direction);
  const whileInView = prefersReducedMotion
    ? { opacity: 1 }
    : getAnimate(direction);

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.4, 0, 0.2, 1],
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

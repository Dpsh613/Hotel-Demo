"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GsapRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  triggerOffset?: string;
}

export function GsapReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 50,
  triggerOffset = "top 85%",
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let x = 0;
      let y = 0;

      switch (direction) {
        case "up":
          y = distance;
          break;
        case "down":
          y = -distance;
          break;
        case "left":
          x = distance;
          break;
        case "right":
          x = -distance;
          break;
        default:
          break;
      }

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerOffset,
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

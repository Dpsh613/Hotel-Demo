"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/common/CTAButton";
import Link from "next/link";
import { ServiceData } from "@/types";
import type { Route } from "next";

interface NotFoundContentProps {
  heading: string;
  body: string;
  services: ServiceData[];
}

export function NotFoundContent({
  heading,
  body,
  services,
}: NotFoundContentProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Focus the H1 for accessibility on mount
    h1Ref.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-content flex flex-col items-center justify-center text-center py-20 md:py-32 min-h-[60vh]"
    >
      <div className="reading-column mx-auto">
        <div
          className="text-[120px] md:text-[160px] leading-none font-display font-bold text-border-subtle select-none"
          aria-hidden="true"
        >
          404
        </div>

        <h1
          ref={h1Ref}
          tabIndex={-1}
          className="text-page-h1 text-text-primary mt-2 focus:outline-none font-display font-bold"
        >
          {heading}
        </h1>

        <p className="text-body-large text-text-secondary mt-4 leading-relaxed">
          {body}
        </p>

        <div className="mt-8">
          <CTAButton href="/" variant="primary">
            Back to homepage
          </CTAButton>
        </div>

        {services.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border-subtle w-full max-w-md mx-auto">
            <p className="text-body-base text-text-secondary mt-6">
              Or explore:
            </p>
            <nav className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-body-base text-text-secondary">
              {services.slice(0, 4).map((service, index) => (
                <span key={service.slug} className="flex items-center">
                  <Link
                    href={`/${service.slug}` as Route}
                    className="hover:text-brand-primary transition-colors duration-base font-medium"
                  >
                    {service.nav_label}
                  </Link>
                  {index < Math.min(services.length, 4) - 1 && (
                    <span className="ml-4 select-none" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        )}
      </div>
    </motion.div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CookiesData } from "@/types";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CookieConsent({ data }: { data: CookiesData }) {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't jarringly appear on first paint immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem("cookie-consent", "accepted");
    // In a real scenario, you would fire a tag manager or analytics init event here
  };

  const handleReject = () => {
    setIsVisible(false);
    localStorage.setItem("cookie-consent", "rejected");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-heading"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.001 : 0.5,
            ease: "easeOut",
          }}
          className="fixed bottom-0 left-0 w-full z-40 p-4 md:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6 pointer-events-none"
        >
          <div className="container-content pointer-events-auto">
            <div className="bg-surface-default border border-border-subtle shadow-subtle rounded-base p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
              <div className="flex-1 space-y-2">
                <h3
                  id="cookie-heading"
                  className="text-body-large font-bold text-text-primary"
                >
                  {data.banner_heading}
                </h3>
                <p className="text-body-base text-text-secondary leading-relaxed max-w-4xl">
                  {data.banner_body}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button
                  variant="secondary"
                  onClick={() => {}}
                  className="hidden sm:inline-flex"
                >
                  {data.settings_label}
                </Button>
                <Button variant="secondary" onClick={handleReject}>
                  {data.reject_label}
                </Button>
                <Button onClick={handleAccept}>{data.accept_label}</Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

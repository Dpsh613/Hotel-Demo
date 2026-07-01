"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Banner } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";

export function AnnouncementBanner({ banner }: { banner: Banner }) {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const isDismissed = localStorage.getItem(`dismissed-banner-${banner.slug}`);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, [banner.slug]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(`dismissed-banner-${banner.slug}`, "true");
  };

  const bgClasses = {
    info: "bg-brand-secondary/10 border-brand-secondary/20 text-brand-secondary",
    promotional: "bg-surface-dark text-text-on-dark border-surface-dark",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-green-50 border-green-200 text-green-900",
    promo: "bg-surface-dark text-text-on-dark border-surface-dark",
  };

  const currentBgClass = bgClasses[banner.type || "info"] || bgClasses.info;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.001 : 0.4 }}
          className={`w-full z-50 border-b relative ${currentBgClass} ${banner.position === "bottom" ? "fixed bottom-0 top-auto border-t border-b-0" : "sticky top-0"}`}
        >
          <div className="container-content py-3 flex items-center justify-between gap-4">
            <div className="flex-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
              <span className="text-body-sm font-medium">{banner.text}</span>
              {banner.cta_text && banner.cta_url && (
                <Link
                  href={banner.cta_url as any}
                  className="text-body-sm font-bold underline hover:opacity-80 transition-opacity"
                >
                  {banner.cta_text}
                </Link>
              )}
            </div>
            {banner.dismissible && (
              <button
                onClick={handleDismiss}
                aria-label="Dismiss announcement"
                className="p-1 hover:opacity-70 transition-opacity shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

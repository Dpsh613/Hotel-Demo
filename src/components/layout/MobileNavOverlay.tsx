"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { BusinessContact, NavItem, SocialPlatform } from "@/types";
import { SocialIconLink } from "@/components/common/SocialIconLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, isExternalUrl } from "@/lib/utils";

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  contact: BusinessContact;
  socials: SocialPlatform[];
  businessName: string;
  vatNumber?: string;
  showContact: boolean;
  showSocials: boolean;
}

function getNavHref(item: NavItem) {
  return item.path || item.url || "/";
}

function OverlayNavLink({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const href = getNavHref(item);
  const isExternal = isExternalUrl(href);
  const className = cn(
    "text-white text-[13px] tracking-[0.10em] uppercase font-bold underline underline-offset-8 decoration-white",
    "hover:text-white/80 hover:decoration-white/80 transition-colors duration-150 w-max block",
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={item.open_in_new_tab ? "_blank" : undefined}
        rel={item.open_in_new_tab ? "noopener noreferrer" : undefined}
        onClick={onClose}
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={href as Route} onClick={onClose} className={className}>
      {item.label}
    </Link>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="text-white"
    >
      <path
        d="M1 1L13 13M1 13L13 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileNavOverlay({
  isOpen,
  onClose,
  navItems,
  contact,
  socials,
  businessName,
  vatNumber,
  showContact,
  showSocials,
}: MobileNavOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.2 },
    },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: "tween", duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: "tween", duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          id="nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 focus:outline-none pointer-events-none"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-auto bg-[#070707] shadow-2xl overflow-y-auto rounded-md border border-white/5"
            style={{
              width: "min(540px, calc(100vw - 32px))",
              maxHeight: "calc(100vh - 48px)",
              padding: "25px",
            }}
          >
            {/* Header Row: Logo & Close Button */}
            <div className="flex items-center justify-between mb-8">
              <Image
                src="/images/brand/logo-icon.svg"
                alt=""
                width={50}
                height={50}
                className="size-12 object-contain brightness-0 invert"
                unoptimized
              />

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-[10px] text-white hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label="Close navigation menu"
              >
                <span className="text-[15px] font-medium uppercase tracking-[0.1em]">
                  MENU
                </span>
                <CloseIcon />
              </button>
            </div>

            <div
              className="grid gap-8 md:gap-8"
              style={{
                gridTemplateColumns: "1fr 0.8fr",
              }}
            >
              {/* Left Column: Business Info */}
              <div className="flex flex-col gap-2">
                {showContact ? (
                  <>
                    <div className="flex flex-col">
                      <p className="text-white text-[15px] font-medium tracking-wide mb-2">
                        {businessName}
                      </p>
                      <address className="not-italic flex flex-col text-white text-[15px] leading-[1.8]">
                        <span>
                          {contact.address_line_1}
                          {contact.postcode} {contact.city}
                        </span>
                        {vatNumber ? <span>VAT: {vatNumber}</span> : null}
                      </address>
                    </div>

                    <div className="flex flex-col text-[#A3A3A3] text-[15px] leading-[1.8]">
                      {contact.email ? (
                        <a
                          className="hover:text-white transition-colors"
                          href={`mailto:${contact.email}`}
                        >
                          {contact.email}
                        </a>
                      ) : null}
                      {contact.phone && contact.phone_uri ? (
                        <a
                          className="hover:text-white transition-colors"
                          href={contact.phone_uri}
                        >
                          T: {contact.phone}
                        </a>
                      ) : null}
                    </div>
                  </>
                ) : null}

                {showSocials && socials.length > 0 ? (
                  <div className="flex items-center gap-3 mt-16">
                    {socials.map((social) => (
                      <div
                        key={social.platform}
                        className="bg-white rounded-[4px] flex items-center justify-center size-[32px] hover:bg-white/80 transition-colors"
                      >
                        <SocialIconLink
                          platform={social.platform}
                          display_name={social.display_name}
                          url={social.url}
                          variant="color"
                          size="sm"
                          className="!text-black !m-0 !min-h-0 !min-w-0 scale-[1.1]"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Right Column: Nav Links */}
              <nav
                aria-label="Main navigation"
                className="flex flex-col"
                style={{ gap: "15px" }}
              >
                {navItems.map((item) => (
                  <OverlayNavLink
                    key={`${item.label}-${getNavHref(item)}`}
                    item={item}
                    onClose={onClose}
                  />
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

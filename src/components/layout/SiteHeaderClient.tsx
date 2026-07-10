"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { NavItem, BusinessContact, SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";
import { MobileNavOverlay } from "./MobileNavOverlay";
import { TreePalm } from "lucide-react";

interface SiteHeaderClientProps {
  navItems: NavItem[];
  contact: BusinessContact;
  socials: SocialPlatform[];
  businessName: string;
  brandTagline: string;
  vatNumber?: string;
  menuTriggerLabel: string;
  showContactInMenu: boolean;
  showSocialInMenu: boolean;
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex flex-col gap-[4px]", className)}
    >
      <span className="block h-[1.5px] w-5 bg-current" />
      <span className="block h-[1.5px] w-5 bg-current" />
      <span className="block h-[1.5px] w-5 bg-current" />
    </span>
  );
}

export function SiteHeaderClient({
  navItems,
  contact,
  socials,
  businessName,
  brandTagline,
  vatNumber,
  menuTriggerLabel,
  showContactInMenu,
  showSocialInMenu,
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const isLightHeader = pathname === "/" || pathname === "/business-events";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldCollapse = window.scrollY > 150;
      setIsScrolled((current) =>
        current === shouldCollapse ? current : shouldCollapse,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const normalizedMenuLabel = menuTriggerLabel || "MENU";
  const menuButtonLabel = isMenuOpen
    ? "Close navigation menu"
    : "Open navigation menu";

  // --- DRY Extractions ---
  const textColorClass = isLightHeader ? "text-white" : "text-[#111]";
  const transitionClass = "transition-all duration-700 ease-out";
  const homeLinkProps = {
    href: "/" as Route,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  };

  return (
    <>
      <header role="banner" className="groveside-site-header">
        <div className="groveside-site-header__inner">
          {/* Left Element (Tagline only) */}
          <div className="relative z-10 flex items-center h-12 w-full">
            <Link
              {...homeLinkProps}
              className={cn(
                "absolute left-0 hidden lg:flex items-center gap-2",
                transitionClass,
                !isScrolled ? "opacity-100" : "opacity-0 pointer-events-none",
                textColorClass,
              )}
              aria-label={`${brandTagline} - ${businessName} home`}
            >
              <TreePalm strokeWidth={1.5} className="size-[22px] shrink-0" />
              <span className="text-[14px] font-semibold uppercase tracking-[0.15em]">
                {brandTagline}
              </span>
            </Link>
          </div>

          {/* Center Element */}
          <div className="relative flex items-center justify-start lg:justify-center h-12 w-full">
            <Link
              {...homeLinkProps}
              aria-label={`${businessName} home`}
              className={cn(
                "absolute left-0 lg:left-auto flex items-center gap-2",
                transitionClass,
                !isScrolled
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none",
                textColorClass,
              )}
            >
              <Image
                src={
                  isLightHeader
                    ? "/images/brand/logo.svg"
                    : "/images/brand/logo-icon.svg"
                }
                alt=""
                width={40}
                height={40}
                className={cn(
                  "size-10 md:size-[40px] object-contain",
                  isLightHeader ? "brightness-0 invert" : "brightness-0",
                )}
                unoptimized
              />
              <span
                className={cn(
                  "text-[26px] md:text-[34px] tracking-wide italic font-semibold font-display",
                  isLightHeader ? "text-white" : "text-[#111]",
                )}
              >
                CelestialEve
              </span>
            </Link>
          </div>

          {/* Right Element */}
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            aria-label={menuButtonLabel}
            onClick={() => setIsMenuOpen((current) => !current)}
            className={cn(
              "z-[60] flex cursor-pointer items-center gap-[10px] justify-self-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
              transitionClass,
              isMenuOpen ? "opacity-0 pointer-events-none" : "hover:opacity-70",
              isScrolled
                ? "bg-black text-white rounded-xl px-[18px] h-10 focus-visible:outline-black"
                : cn(
                    "h-10 px-0 rounded-none bg-transparent",
                    isLightHeader
                      ? "text-white focus-visible:outline-white"
                      : "text-[#111] focus-visible:outline-black",
                  ),
            )}
          >
            <span className="text-[13px] font-medium uppercase tracking-[0.1em] mt-[1px]">
              {normalizedMenuLabel}
            </span>
            <HamburgerIcon />
          </button>
        </div>
      </header>

      <MobileNavOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        contact={contact}
        socials={socials}
        businessName={businessName}
        vatNumber={vatNumber}
        showContact={showContactInMenu}
        showSocials={showSocialInMenu}
      />
    </>
  );
}

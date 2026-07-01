import Link from "next/link";
import {
  getBusinessIdentity,
  getBusinessContact,
  getSocialPlatforms,
  getNavigationConfig,
  getSiteConfig,
} from "@/lib/data/loaders";
import { SocialIconLink } from "@/components/common/SocialIconLink";
import type { Route } from "next";

export async function SiteFooter() {
  const [identity, contact, socialData, navConfig, siteConfig] =
    await Promise.all([
      getBusinessIdentity(),
      getBusinessContact(),
      getSocialPlatforms(),
      getNavigationConfig(),
      getSiteConfig(),
    ]);

  if (!identity || !contact || !navConfig || !siteConfig) return null;

  const socialPlatforms =
    socialData?.platforms.filter((p) => p.show_in_footer) || [];

  const navItems = navConfig.footer_navigation?.duplicate_primary
    ? navConfig.main || []
    : navConfig.footer_navigation?.custom_items || [];

  return (
    <footer
      className="bg-transparent text-white pt-[65px] pb-[35px]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer Content */}
      <div className="max-w-[760px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-[60px]">
          {/* Left Column */}
          <div className="max-w-[260px] text-center md:text-left flex flex-col items-center md:items-start">
            <p className="text-[20px] lg:text-[16px] font-semibold text-white mb-2">
              {identity.legal_entity_name || "GROVEside La Mama BV"}
            </p>

            <p className="text-[18px] lg:text-[14px] leading-[1.8] text-white/85">
              {contact.address_line_1 || "123 Demo Street, 9999 Demoville"}
            </p>

            <p className="text-[18px] lg:text-[14px] leading-[1.8] text-white/85 mb-6">
              VAT: {identity.vat_number || "BE 0742576075"}
            </p>

            <a
              href={`mailto:${contact.email}`}
              className="block text-[18px] lg:text-[14px] leading-[1.8] text-white/85 hover:text-white transition-colors"
            >
              {contact.email || "info@example.com"}
            </a>

            <a
              href={contact.phone_uri || "tel:+15551234567"}
              className="block text-[18px] lg:text-[14px] leading-[1.8] text-white/85 hover:text-white transition-colors"
            >
              T: {contact.phone || "+1 (0) 555 123 4567"}
            </a>

            {socialPlatforms.length > 0 && (
              <div className="flex gap-3 mt-7 justify-center md:justify-start w-full">
                {socialPlatforms.map((platform) => (
                  <div
                    key={platform.platform}
                    className="w-[30px] h-[30px] bg-white rounded-[4px] flex items-center justify-center"
                  >
                    <SocialIconLink
                      {...platform}
                      size="sm"
                      className="!bg-transparent !w-auto !h-auto text-black"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-[220px] bg-white/20 shrink-0" />

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start pt-[2px]">
            {navItems
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  key={item.label}
                  href={(item.path || "/") as Route}
                  target={item.open_in_new_tab ? "_blank" : undefined}
                  className="
                    w-fit
                    uppercase
                    text-[15px] lg:text-[11px]
                    tracking-[0.12em]
                    font-bold
                    text-white
                    border-b
                    border-white
                    pb-[2px]
                    mb-[12px]
                    hover:opacity-80
                    transition-opacity
                  "
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-[85px] px-[50px] lg:px-[65px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-[13px] font-bold tracking-[0.14em] uppercase text-white text-center">
            ALL RIGHTS RESERVED GROVESIDE®
            <span className="mx-2 text-white/50">•</span>
            <Link
              href="/privacy-policy"
              className="text-white/60 underline underline-offset-4 hover:text-white transition-colors"
            >
              PRIVACY POLICY
            </Link>
          </div>

          <div className="text-[13px] font-bold tracking-[0.14em] uppercase text-white text-center">
            CODE & DESIGN
            <span className="mx-2 text-white/50">•</span>
            <a
              href={siteConfig.credit_url || "https://rohittmehta.netlify.app"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline underline-offset-4 hover:text-white transition-colors"
            >
              ROHIT MEHTA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

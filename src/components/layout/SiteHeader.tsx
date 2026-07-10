import {
  getNavigationConfig,
  getBusinessContact,
  getSocialPlatforms,
  getBusinessIdentity,
} from "@/lib/data/loaders";
import { SiteHeaderClient } from "./SiteHeaderClient";

export async function SiteHeader() {
  const [navConfig, contact, socialsData, identity] = await Promise.all([
    getNavigationConfig(),
    getBusinessContact(),
    getSocialPlatforms(),
    getBusinessIdentity(),
  ]);

  if (!navConfig || !contact || !socialsData || !identity) return null;

  const navItems = navConfig.main?.filter((item) => item.show) || [];
  const socials = socialsData.platforms.filter((p) => p.show_in_header);
  const businessName = identity.business_name || "CelestialEve";
  const brandTagline = identity.brand_tagline || "";
  const menuTriggerLabel =
    navConfig.mobile_navigation?.menu_trigger_label || "Menu";

  return (
    <SiteHeaderClient
      navItems={navItems}
      contact={contact}
      socials={socials}
      businessName={businessName}
      brandTagline={brandTagline}
      vatNumber={identity.vat_number}
      menuTriggerLabel={menuTriggerLabel}
      showContactInMenu={
        navConfig.mobile_navigation?.show_contact_in_menu ?? true
      }
      showSocialInMenu={
        navConfig.mobile_navigation?.show_social_in_menu ?? true
      }
    />
  );
}

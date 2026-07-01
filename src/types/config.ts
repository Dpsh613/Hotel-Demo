export interface SiteConfig {
  name: string;
  url: string;
  locale?: string;
  currency?: string;
  date_format?: string;
  time_format?: string;
  timezone?: string;
  active_theme?: string;
  enable_dark_mode?: boolean;
  favicon_ref?: string;
  og_image_default_ref?: string;
  twitter_card_type?: string;
  analytics_provider?: string;
  analytics_id?: string;
  cookie_consent_required?: boolean;
  credit_name?: string;
  credit_url?: string;
  not_found?: {
    heading: string;
    body: string;
  };
}

export interface FeaturesConfig {
  hero_slideshow?: boolean;
  hero_single_image?: boolean;
  quick_navigation?: boolean;
  gallery_lightbox?: boolean;
  newsletter_signup?: boolean;
  testimonials_section?: boolean;
  faq_section?: boolean;
  blog?: boolean;
  online_booking?: boolean;
  multilingual?: boolean;
  cookie_consent?: boolean;
  pre_header_bar?: boolean;
  announcement_banner?: boolean;
  team_section?: boolean;
  hours_section?: boolean;
  map_embed?: boolean;
  pricing_visible?: boolean;
  enableBlog?: boolean;
  enableEcommerce?: boolean;
  [key: string]: boolean | undefined;
}

export interface NavItem {
  label: string;
  url?: string;
  path?: string;
  service_slug?: string;
  open_in_new_tab?: boolean;
  show?: boolean;
}

export interface NavigationConfig {
  main?: NavItem[];
  primary_navigation?: {
    items: NavItem[];
    max_visible_items?: number;
  };
  mobile_navigation?: {
    show_contact_in_menu?: boolean;
    show_social_in_menu?: boolean;
    show_hours_in_menu?: boolean;
    menu_trigger_label?: string;
  };
  footer_navigation?: {
    duplicate_primary?: boolean;
    show_legal_links?: boolean;
    custom_items?: NavItem[];
  };
  sticky_header?: boolean;
  header_transparency?: "always" | "never" | "on-scroll" | "on-hero-only";
  scroll_behavior?: "smooth" | "auto";
}

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface CTABlock {
  slug: string;
  heading: string;
  body?: string;
  button_text: string;
  button_url: string;
  button_style?: "primary" | "secondary" | "outline" | "text";
  open_in_new_tab: boolean;
  section_background?: "default" | "light" | "dark" | "accent";
  show_divider_above?: boolean;
}

export interface FeatureItem {
  slug: string;
  icon_ref?: string;
  label: string;
  descriptor?: string;
  body?: string;
  sort_order: number;
}

export interface FeatureGroup {
  slug: string;
  heading?: string;
  intro?: string;
  note?: string;
  display_layout?: "icon-grid" | "icon-list" | "card-grid" | "photo-card-grid";
  items: FeatureItem[];
}

export interface ValueItem {
  slug: string;
  label: string;
  description: string;
  image_ref: string | StaticImport;
  icon_ref?: string;
  sort_order: number;
}

export interface ValuesData {
  values: ValueItem[];
  section_heading: string;
  section_subheading?: string;
}

export interface NewsletterData {
  section_label: any;
  heading: string;
  subheading?: string;
  input_placeholder: string;
  submit_label: string;
  consent_text: string;
  loading_label?: string;
  success_message: string;
  error_message: string;
  notice_label?: string;
  show_on_all_pages: boolean;
  max_email_length?: number;
}

export interface Banner {
  slug: string;
  text: string;
  cta_text?: string;
  cta_url?: string;
  type?: "info" | "warning" | "success" | "promo" | "promotional";
  start_date?: string;
  end_date?: string;
  show: boolean;
  position?: "top" | "bottom" | "floating";
  dismissible: boolean;
}

export interface CookiesData {
  banner_heading: string;
  banner_body: string;
  accept_label: string;
  reject_label: string;
  settings_label: string;
}

export interface PrivacyData {
  page_title: string;
  last_updated: string;
  controller_name: string;
  controller_email: string;
}

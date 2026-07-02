export interface HeroImage {
  image_ref: string;
  mobile_image_ref?: string;
  alt_text: string;
  caption?: string;
}

export interface HeroContent {
  slug: string;
  type: "slideshow" | "single-image" | "video" | "split";
  eyebrow_text?: string;
  headline: string;
  headline_parts?: {
    text: string;
    emphasis: boolean;
  }[];
  subheadline?: "string";
  overlay_opacity?: number;
  slideshow_images?: HeroImage[];
  single_image_ref?: string;
  single_image_alt?: string;
  show_cta: boolean;
  cta_ref?: string;
  text_position?: "left" | "center" | "right";
}

// HomePageData

export interface HomePageData {
  meta_title: string;
  meta_description: string;
  hero: {
    eyebrow_text?: string;
    headline: string;
    headline_emphasis?: string;
    subheadline?: string;
    show_cta?: boolean;
    cta_ref?: string;
    slideshow_images?: HeroImage[];
  };
  about_section?: {
    show_section: boolean;
    heading: string;
    body_paragraphs: string[];
  };
  services_section?: {
    show_section?: boolean;
    heading?: string;
    intro?: string;
  };
  features_section?: Record<string, unknown>;
  values_section?: Record<string, unknown>;
  cta_section_ref?: string;
  newsletter_section_ref?: string;
}

// ServiceData

export interface OnePriceConcept {
  service_slug: string;
  headline: string;
  body: string;
  inclusions_heading?: string | null;
  inclusions_body?: string;
  catering_note?: string | null;
  supporting_image_ref?: string | null;
  supporting_image_alt?: string;
  show_tailored_section?: boolean;
}

export interface ServiceData {
  slug: string;
  status: "published" | "draft" | "hidden";
  nav_label: string;
  page_title: string;
  page_subtitle?: string;
  card_title: string;
  card_tagline: string;
  card_cta_text: string;
  card_image_ref?: string;
  card_image_alt?: string;
  page_intro?: string;
  meta_title: string;
  meta_description: string;
  quick_nav_items?: { label: string; id: string }[];
  hero_image_ref?: string;
  hero_image_alt?: string;
  sections?: string[];
  show_one_price_section?: boolean;
  one_price_content_ref?: string;
  show_technologies?: boolean;
  technologies_ref?: string;
  show_amenities?: boolean;
  amenities_ref?: string;
  cta_section_ref?: string;
  sort_order: number;
}

// meeting-spaces Page interfaces
export interface SpaceData {
  slug: string;
  parent_service_slug: string;
  status: "published" | "draft";
  name: string;
  capacity_min?: number;
  capacity_max: number;
  capacity_label: string;
  area_sqm?: number;
  area_display?: string;
  layout_styles?: string[];
  special_features?: string[];
  description_short: string;
  description_long: string;
  cover_image_ref?: string;
  cover_image_alt?: string;
  gallery_images?: HeroImage[];
  gallery_trigger_label?: string;
  sort_order: number;
}

export interface RoomData extends SpaceData {
  room_type: "standard" | "deluxe" | "suite" | "custom";
  room_count: number;
  max_guests: number;
  bed_configuration: string;
  bathroom_type: "en-suite" | "shared" | "none";
  bathroom_features?: string[];
  rate_single?: number;
  rate_double?: number;
  rate_currency: string;
  rate_from_text: boolean;
  rate_note?: string;
  exclusive_features?: string[];
}

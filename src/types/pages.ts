import { ProximityPoint } from "./business";

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
    heading: {
      eyebrow?: string;
      title: string;
      subtitle?: string;
    };
    body_paragraphs: string[];
  };
  services_section?: {
    show_section?: boolean;
    heading: {
      eyebrow?: string;
      title: string;
      subtitle?: string;
    };
    intro_text?: string;
    layout_variant?: string;
  };
  discover_section?: Record<string, unknown>;
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

// story-page
export interface StoryChapter {
  slug: string;
  heading: string;
  date_label?: string;
  summary_text: string;
  image_ref?: string;
  image_alt?: string;
  image_position?: "left" | "right" | "below";
}

export interface StoryPageData {
  page_eyebrow: string;
  page_title: string;
  page_subtitle?: string;
  meta_title: string;
  meta_description: string;
  hero_image_ref?: string;
  hero_image_alt?: string;
  chapters: StoryChapter[];
  founder_note?: {
    show: boolean;
    heading: string;
    member_ref: string;
    custom_body?: string;
    closing_salutation: string;
  };
}

// practical-info page

export interface PracticalInfoBlock {
  slug: string;
  icon_ref?: string;
  heading: string;
  content_type: "paragraph" | "list" | "distance-table" | "hours";
  content: string | string[] | ProximityPoint[] | unknown; // Hours might be complex
  note?: string;
}

// contact-page

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "radio" | "checkbox" | "file";
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation_message?: string;
  max_file_size_mb?: number;
  max_length?: number;
}

export interface ContactPageData {
  page_title: string;
  page_subtitle?: string;
  meta_title: string;
  meta_description: string;
  show_social_links: boolean;
  show_address_block: boolean;
  show_maps_link: boolean;
  form_config: {
    heading?: string;
    fields: ContactFormField[];
    submit_label: string;
    consent_text: string;
    success_heading: string;
    success_body: string;
    error_message: string;
  };
}

// business-events page

export interface EventsPageData {
  hero_image_ref?: string;
  hero_mobile_ref?: string;
  hero_image_alt?: string;
  page_eyebrow?: string;
  hero_headline?: string;
  page_intro_paragraphs?: string[];
  pricing_heading?: string;
  pricing_paragraphs?: string[];
  event_types: string[];
  pricing: {
    heading: string;
    body: string;
    catering_note: string;
  };
  versatile_setup_heading?: string;
  versatile_setup_intro?: string;
  versatile_setup_items?: {
    image_ref: string;
    alt_text: string;
    caption: string;
  }[];
  tailored_heading?: string;
  tailored_body?: string;
  tailored_image_ref?: string;
  tailored_image_alt?: string;
  gallery_images: {
    image_ref: string;
    alt_text: string;
  }[];
}

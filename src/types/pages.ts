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

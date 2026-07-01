export interface BusinessIdentity {
  business_name: string;
  brand_tagline: string;
  brand_description_short: string;
  brand_description_long: string;
  legal_entity_name: string;
  vat_number: string;
  registration_country: string;
  registration_year: string;
  trademark_symbol: boolean;
}

export interface ProximityPoint {
  label: string;
  distance_km: number;
  distance_text?: string;
}

export interface BusinessContact {
  phone: string;
  phone_uri: string;
  email: string;
  email_label?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  postcode: string;
  region?: string;
  country: string;
  country_code: string;
  maps_link?: string;
  maps_embed_url?: string;
  proximity_points: ProximityPoint[];
}

export interface ServiceSchedule {
  days: string;
  open?: string;
  close?: string;
  closed: boolean;
  note?: string;
}

export interface ServiceHours {
  service_name: string;
  schedule: ServiceSchedule[];
}

export interface BusinessHours {
  timezone: string;
  holiday_note?: string;
  services: ServiceHours[];
}

export interface SocialPlatform {
  platform: string;
  display_name: string;
  url: string;
  icon_ref?: string;
  show_in_header: boolean;
  show_in_footer: boolean;
  show_in_contact: boolean;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio_short: string;
  bio_long: string;
  image_ref?: string;
  signature_name?: string;
  signature_title?: string;
  show_on_story: boolean;
  show_on_contact: boolean;
}

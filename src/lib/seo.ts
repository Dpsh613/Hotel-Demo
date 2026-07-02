import { Metadata } from "next";
import { getSiteConfig, getBusinessIdentity } from "@/lib/data/loaders";

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export async function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: BuildMetadataOptions): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const identity = await getBusinessIdentity();

  const businessName = identity?.business_name || "GROVEside";
  const siteUrl = siteConfig?.url || "https://groveside.be";
  const canonicalUrl = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const finalImage = ogImage || siteConfig?.og_image_default_ref || "";

  return {
    title: {
      absolute: `${title} — ${businessName}®`,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalUrl,
      siteName: businessName,
      images: finalImage ? [{ url: finalImage, alt: title }] : [],
      locale: siteConfig?.locale || "en-BE",
    },
    twitter: {
      card: (siteConfig?.twitter_card_type as any) || "summary_large_image",
      title,
      description,
      images: finalImage ? [finalImage] : [],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    metadataBase: new URL(siteUrl),
  };
}

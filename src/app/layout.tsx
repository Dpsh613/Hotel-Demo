import type { Metadata, Viewport } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import {
  getSiteConfig,
  getBusinessIdentity,
  getBusinessContact,
  getFeaturesConfig,
  getActiveBanners,
  getCookiesData,
} from "@/lib/data/loaders";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { AnnouncementBanner } from "@/components/interactive/AnnouncementBanner";
import { CookieConsent } from "@/components/interactive/CookieConsent";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import { FloatingScrollbar } from "@/components/interactive/FloatingScrollbar";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const identity = await getBusinessIdentity();

  const businessName = identity?.business_name || "GROVEside";
  const tagline = identity?.brand_tagline || "Where work meets comfort";
  const description = identity?.brand_description_short || "";

  return {
    title: {
      template: `%s — ${businessName}`,
      default: `${businessName}® — ${tagline}`,
    },
    description: description,
    openGraph: {
      type: "website",
      siteName: businessName,
      locale: siteConfig?.locale || "en-BE",
      images: siteConfig?.og_image_default_ref
        ? [siteConfig.og_image_default_ref]
        : [],
    },
    twitter: {
      card:
        (siteConfig?.twitter_card_type as "summary_large_image" | "summary") ||
        "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
    metadataBase: siteConfig?.url ? new URL(siteConfig.url) : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  const identity = await getBusinessIdentity();
  const contact = await getBusinessContact();
  const features = await getFeaturesConfig();
  const banners = await getActiveBanners();
  const cookiesData = await getCookiesData();

  const activeBanner =
    features?.announcement_banner && banners.length > 0 ? banners[0] : null;

  const businessName = identity?.business_name || "GROVEside";
  const siteUrl = siteConfig?.url || "https://groveside.be";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    description: identity?.brand_description_short || "",
    url: siteUrl,
    telephone: contact?.phone || "",
    email: contact?.email || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact?.address_line_1 || "",
      addressLocality: contact?.city || "",
      postalCode: contact?.postcode || "",
      addressCountry: contact?.country_code || "",
    },
  };

  return (
    <html
      lang={siteConfig?.locale || "en"}
      className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col font-body text-text-primary bg-surface-default antialiased"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <SkipToContent />
          {activeBanner && <AnnouncementBanner banner={activeBanner} />}
          <MotionProvider>{children}</MotionProvider>
          <FloatingScrollbar />
          {features?.cookie_consent && cookiesData && (
            <CookieConsent data={cookiesData} />
          )}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

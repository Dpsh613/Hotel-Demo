import { Metadata } from "next";
import {
  getSiteConfig,
  getBusinessIdentity,
  getAllServices,
  getFeaturesConfig,
} from "@/lib/data/loaders";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PreHeaderBar } from "@/components/layout/PreHeaderBar";
import { PreFooterCTA } from "@/components/sections/PreFooterCTA";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

// Note: generateMetadata is not currently supported in not-found.tsx by Next.js.
// However, we include it here in case future versions add support or if
// this is rendered as a normal page in some contexts.
export async function generateMetadata(): Promise<Metadata> {
  const identity = await getBusinessIdentity();
  const businessName = identity?.business_name || "GROVEside";

  return {
    title: `Page Not Found — ${businessName}®`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NotFound() {
  const [siteConfig, identity, servicesData, features] = await Promise.all([
    getSiteConfig(),
    getBusinessIdentity(),
    getAllServices(),
    getFeaturesConfig(),
  ]);

  const heading = siteConfig.not_found?.heading || "Page not found";
  const body =
    siteConfig.not_found?.body ||
    "The page you're looking for doesn't exist or has been moved.";
  const services = servicesData?.services || [];

  return (
    <div className="flex min-h-screen flex-col">
      <PreHeaderBar />
      <SiteHeader />
      <main className="flex-1 bg-surface-default">
        <NotFoundContent heading={heading} body={body} services={services} />
      </main>
      <PreFooterCTA />
      {features?.newsletter_signup && <NewsletterSection />}
      <SiteFooter />
    </div>
  );
}
